import { Outlet } from "react-router-dom";
import {Box, Paper, type SxProps, useMediaQuery, useTheme} from "@mui/material";
import type {ReactNode} from "react";

const rootStyles: SxProps = {
    display: 'flex',
    minHeight: '100vh',
};

const mainStyles: SxProps = {
    flex: 1,
    display: 'flex',
    flexDirection: 'column'
};

const containerStyles: SxProps = {
    p: 0,
    flex: 1,
};

export type MainContainerProps = {
    children: ReactNode;
}

export const MainContainer = ({ children }: MainContainerProps) => {
    const theme = useTheme();
    const isSxUp = useMediaQuery(theme.breakpoints.up('sm'));
    const radiusTop = 30;
    const radiusBottom = isSxUp ? 25 : 0;

    const paperStyle: SxProps = {
        p: isSxUp ? 4 : 2,
        borderTopLeftRadius: radiusTop,
        borderTopRightRadius: radiusTop,
        borderBottomLeftRadius: radiusBottom,
        borderBottomRightRadius: radiusBottom,
        height: isSxUp ? 'auto' : 1,
        mt: 0,
        mb: isSxUp ? 2 : 0,
        mr: isSxUp ? 2 : 0,
        ml: isSxUp ? 2 : 0
    };

    return (
        <Paper sx={paperStyle} elevation={0} >
            { children }
        </Paper>
    );
}

export const SimpleLayout = () => {

    return (<Box sx={rootStyles}>
        <div></div>
        <Box sx={mainStyles}>
            <Box sx={containerStyles}>
                <div></div>
                <MainContainer>
                    <Outlet/>
                </MainContainer>
            </Box>
        </Box>
    </Box>)
}