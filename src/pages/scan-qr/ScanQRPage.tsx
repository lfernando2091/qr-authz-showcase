import {type IDetectedBarcode, Scanner} from '@yudiel/react-qr-scanner';
import {useMemo, useState} from "react";
import {EventService} from "../../service/event.service.ts";

export const ScannerPage = () => {

    const [message, setMessage] = useState<string | null>(null);
    const [code, setCode] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);

    const createNewEvent = async (id: string)=> {
        try {
            const eventService = new EventService();
            const response = await eventService.authorize(id, {
                device: "browser",
                time: "2025-01-09"
            });
            setMessage(response.message)
        } catch (e) {
            // @ts-ignore
            if (e instanceof Error) {
                setError(`name: ${e.name} message: ${e.message} stack: ${e}`);
            }
        }
    }

    const handleScan = (detectedCodes: IDetectedBarcode[]) => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        setCode(detectedCodes[0].rawValue);
        createNewEvent(detectedCodes[0].rawValue).then(_result => {});
    };

    return (<h1>
        <Scanner
            onScan={handleScan}
            onError={(error) => console.log(error)}
        />
        {null != message &&
            <>
                Message: {message}
            </>
        }
        {code &&
            <>
                Code: <h4>{code}</h4>
            </>
        }
        {error &&
            <pre>Error: { error }</pre>
        }
    </h1>)
}