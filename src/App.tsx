import { useMemo } from 'react';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { getPalette, getTheme } from '@react-m3/m3';
import {BrowserRouter} from "react-router-dom";
import {Router} from "./pages/pages.router.tsx";

const color = '#95BF47';

export function App() {
    const m3Theme = useMemo(() => {
        const palette = getPalette(color);
        return getTheme('dark', palette);
    }, [color]);

    return (
        <ThemeProvider theme={m3Theme}>
            <CssBaseline enableColorScheme />
            <BrowserRouter basename={import.meta.env.BASE_URL}>
                <Router/>
            </BrowserRouter>
        </ThemeProvider>
    );
}
