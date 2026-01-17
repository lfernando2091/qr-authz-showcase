import {type ReactNode, useEffect, useState} from "react";
import {QRAuthZApiError} from "../error/error.model.ts";
import {Alert, AlertTitle} from "@mui/material";

export function useApi<R> (query: () => Promise<R>, run: boolean = true): [R | null, boolean | null, ReactNode | null] {
    const [loading, setLoading] = useState<boolean>(false);
    const [response, setResponse] = useState<R | null>(null);
    const [errorComponent, setErrorComponent] = useState<ReactNode | null>(null);

    const resetStatus = () => {
        setLoading(true);
        setResponse(null);
        setErrorComponent(null);
    }

    const executeApiCall = () => {
        resetStatus();
        query().then((response) => {
            setResponse(response);
        }).catch((error) => {
            if (error instanceof QRAuthZApiError) {
                setErrorComponent(<Alert severity="error" sx={{ marginY: 2 }}>
                    <AlertTitle>{ error.name }</AlertTitle>
                    <strong>{ error.code }</strong>{` ${error.message}` }
                </Alert>)
            } else if (error instanceof TypeError) {
                setErrorComponent(<Alert severity="error" variant="filled" sx={{ marginY: 2 }}>
                    <AlertTitle>{ error.name }</AlertTitle>
                    { error.message }
                </Alert>)
            } else {
                setErrorComponent(<Alert severity="error" variant="filled" sx={{ marginY: 2 }}>
                    <AlertTitle>Unknown error</AlertTitle>
                    QR Code request failed with an <strong>unknown reason</strong>
                </Alert>)
            }
        }).finally(() => {
            setLoading(false);
        });
    }

    useEffect(() => {
        if (run) {
            executeApiCall();
        }
    }, [run]);

    return [response, loading, errorComponent];
}