
// const BASE_URL = "http://localhost:3333";
import {QRAuthZApiError} from "../error/error.model.ts";

const BASE_URL = "https://6h90slf5-3333.usw3.devtunnels.ms";


export interface Event {
    status: string;
}

export interface EventAuthZResponse {
    id: string;
    appId: string;
    status: boolean;
    message: string;
}

export interface EventCreateResponse {
    id: string;
    appId: string;
    metadata: Record<string, string>;
    qrCode: string;
}

export class EventService {

    private eventSource: EventSource | null = null;

    constructor() {
    }

    async updates(id: string): Promise<Event> {
        this.eventSource = new EventSource(`${BASE_URL}/api/v1/event/updates/${id}`);
        return new Promise<Event>((resolve, reject) => {
            // Handling the specific "close" event sent by the server
            this.eventSource!.addEventListener('close', (event) => {
                console.log('Server signaling end of stream:', event.data);
                this.eventSource!.close(); // This stops the browser from reconnecting
            });

            this.eventSource!.onmessage = (event) => {
                const { data } = event;
                const jsonData = JSON.parse(data);
                console.log('Data received:', jsonData);
                if (jsonData.message == 'successful authorization') {
                    console.log('Data received: ===========', jsonData);
                    resolve({ status: data });
                }
            };
            this.eventSource!.onerror = (event) => {
                console.log('Error:', event);
                reject({ status: "error" });
            }
        });
    }

    async create(appId: string, metadata: Record<string, string>): Promise<EventCreateResponse> {
        const data = {
            appId,
            metadata
        };
        const query = new URLSearchParams();
        query.set('responseType', 'base64png');
        const url = new URL(`${BASE_URL}/api/v1/event`);
        url.search = query.toString();
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });
        if (!response.ok) {
            throw new QRAuthZApiError(response.statusText, response.status);
        }
        return await response.json();
    }

    async authorize(id: string, metadata: Record<string, string>): Promise<EventAuthZResponse> {
        const data = {
            authorizerId: "my_user_id",
            metadata
        };
        const response = await fetch(`${BASE_URL}/api/v1/event/authorize/${id}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return await response.json();
    }
}