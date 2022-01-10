import { createTheme } from "@mui/material";

export const Theme = createTheme({
    palette: {
        type: 'light',
        primary: {
            main: '#50c8aa',
        },
        secondary: {
            main: '#f8bbd0',
        },
        background: {
            default: '#313131',
            paper: '#3f3f3f',
        },
        text: {
            primary: 'rgba(255,255,255,0.87)',
            secondary: 'rgba(255,255,255,0.54)',
            disabled: 'rgba(255,255,255,0.38)',
            hint: 'rgba(255,255,255,0.38)',
        },
    },
});