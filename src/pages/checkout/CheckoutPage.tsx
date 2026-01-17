import {useEffect, useMemo, useState} from "react";
import {EventService, type Event} from "../../service/event.service.ts";
import {useParams} from "react-router-dom";

export const CheckoutPage = () => {

    const { id } = useParams();
    const [response, setResponse] = useState<Event>({ status: "waiting" });

    const responsePromise = useMemo(() => {
        if (null !== id && undefined !== id) {
            const eventService = new EventService();
            return eventService.updates(id);
        }
        throw new Error("Missing checkout id parameter");
    }, [id]);

    const fetchCheckout = async ()=> {
        const rr = await responsePromise;
        setResponse(rr);
    }

    useEffect(() => {
        fetchCheckout().then();
    }, []);
    
    return (
        <h1>Response: { response.status }</h1>)
}