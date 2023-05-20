import type { AppProps } from 'next/app';
import type { Page } from '../types/types';
import React from 'react';
import { LayoutProvider } from '../layout/context/layoutcontext';
import Layout from '../layout/layout';
import 'primereact/resources/primereact.css';
import 'primeflex/primeflex.css';
import 'primeicons/primeicons.css';
import '../styles/layout/layout.scss';
import '../styles/demo/Demos.scss';
import AppConfig from './../layout/AppConfig';
import { Checkbox } from 'primereact/checkbox';
import { Button } from 'primereact/button';
import { Password } from 'primereact/password';
import { LayoutContext } from './../layout/context/layoutcontext';
import { InputText } from 'primereact/inputtext';
import { classNames } from 'primereact/utils';
import { SessionProvider } from 'next-auth/react';
import { useRouter } from 'next/router';

type Props = AppProps & {
    Component: Page;
};

export default function MyApp({ Component, pageProps }: Props) {
    const router = useRouter();

    if (Component.getLayout) {
        return (
            <SessionProvider session={pageProps.session} refetchInterval={0}>
                <LayoutProvider>
                    {Component.getLayout(<Component {...pageProps} />)}
                </LayoutProvider>
            </SessionProvider>
        );
    } else {
        return (
            <SessionProvider session={pageProps.session} refetchInterval={0}>
                <LayoutProvider>
                    <Layout>
                        <Component {...pageProps} />
                    </Layout>
                </LayoutProvider>
            </SessionProvider>
        );
    }
}
