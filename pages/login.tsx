import React from "react";
import ReactDOM from "react-dom";
import JssProvider from "react-jss/lib/JssProvider";
import { createGenerateClassName } from "@material-ui/core/styles";
import { MuiThemeProvider } from "@material-ui/core/styles";
import { createTheme } from '@material-ui/core/styles'
import LoginPage from "../demo/components/Login";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { Page } from '../types/types';
const muiBaseTheme = createTheme();

const generateClassName = createGenerateClassName({
    dangerouslyUseGlobalCSS: true
}) as () => string;

const theme = createTheme({
    typography: {
        useNextVariants: true
    },
    overrides: LoginPage.getTheme(muiBaseTheme)
});

const Login: Page = () => {
    const router = useRouter();
    const { status } = useSession();
    useEffect(() => {
        if (status === "authenticated") {
            void router.push("/Water");
        }
    }, [status]);
    return (
        <JssProvider generateClassName={generateClassName}>
            <MuiThemeProvider theme={theme}>
                <LoginPage />
            </MuiThemeProvider>
        </JssProvider>
    );
}
Login.getLayout = function getLayout(page) {
    return (
        <React.Fragment>
            {page}
            {/* <AppConfig simple /> */}
        </React.Fragment>
    );
};

export default Login