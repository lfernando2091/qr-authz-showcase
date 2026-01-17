import "./AuthZPaymentPage.css"
import {Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Skeleton} from "@mui/material";
import type {AuthZStatusType} from "./AuthZModels.ts";
import {type Event, type EventCreateResponse, EventService} from "../../service/event.service.ts";
import {useApi} from "../../service/api.hook.tsx";
import {useEffect, useState} from "react";

const eventService = new EventService();
const APP_ID = "6963124de3fd9dce56d79485";

export interface AuthZPaymentPageProps {
    open: boolean;
    onClose: (state: AuthZStatusType) => void;
    transactionId: string;
}

export const AuthZPaymentPage = (props: AuthZPaymentPageProps) => {
    const { open, onClose, transactionId } = props;
    const [event, setEvent] = useState<Event | null>(null);

    const [response, loading, errorComponent] = useApi<EventCreateResponse>(async () => {
        return await eventService.create(APP_ID, {
            transaction_id: transactionId
        });
    }, open);

    const waitForAuthorization = () => {
        setEvent({ status: "waiting" });
        eventService.updates(response!.id)
            .then((event) => {
                setEvent(event);
            }).catch((error) => {

            }).finally(() => {

            });
    }

    useEffect(() => {
        if (null !== response) {
            waitForAuthorization();
        }
    }, [response]);

    const handleClose = () => {
        onClose('cancelled');
    };

    const cancelPayment = () => {
        onClose('cancelled');
    }

    return <Dialog onClose={handleClose} open={open}>
        <DialogTitle>Authorize Payment</DialogTitle>
        <DialogContent dividers>
            <DialogContentText>
                Scan the next QR code for authorizing this payment.
            </DialogContentText>
            {loading &&
                <Skeleton variant="rectangular" sx={{ marginY: 2 }} height={150} />}
            {response &&
                <div style={{display: 'flex', justifyContent: 'center', paddingTop: '20px', paddingBottom: '20px'}}>
                    <img
                        src={response.qrCode}
                        alt="Authorization QR Code"
                        style={{width: '300px', height: 'auto'}}
                    />
                </div>
            }
            {errorComponent &&
                <>{errorComponent}</>
            }
            {event &&
                <>
                { event.status }
                </>
            }
        </DialogContent>
        <DialogActions>
            <Button onClick={cancelPayment}>
                Cancel
            </Button>
        </DialogActions>
    </Dialog>
}