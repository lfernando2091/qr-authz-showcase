import {useEffect, useMemo, useState} from "react";
import {type Event, type EventCreateResponse, EventService} from "../../service/event.service.ts";

export const StorePage = () => {

    const [qrEvent, setQREvent] = useState<EventCreateResponse | null>(null);
    const [responseClient, setResponseClient] = useState<Event>({ status: "waiting" });

    const eventService = useMemo(() => {
        return new EventService();
    }, []);

    const createNewEvent = async ()=> {
        const response = await eventService.create("6963124de3fd9dce56d79485", {
            payment_id: "6961e2851252e4b87bd0af4e",
            amount: "$100.00"
        });
        setQREvent(response);
        setResponseClient({ status: "waiting" });
    }

    const waitingEvent = async ()=> {
        const newEvent = await eventService.updates(qrEvent!.id);
        setResponseClient(newEvent);
    }

    useEffect(() => {
        if (null !== qrEvent) {
            waitingEvent().then(() => { });
        }
    }, [qrEvent]);

    return <>
        <button onClick={createNewEvent}>Create New Event</button>
        <br/>
        {null != qrEvent &&
            <>
                <img
                    src={qrEvent.qrCode}
                    alt="Description of the image"
                    style={{ width: '300px', height: 'auto' }}
                />
                <br/>
                <h3>{ responseClient.status }</h3>
            </>
        }
    </>
}