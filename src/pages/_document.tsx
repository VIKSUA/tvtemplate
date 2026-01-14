import Document, { Html, Head, Main, NextScript } from 'next/document';
import React from 'react';
import { CONFIG } from '../config';

class MyDocument extends Document {
    render() {
        return (
            <Html lang="en">
                <Head>
                    <meta name="description" content={CONFIG.welcomeMessage} />
                    <link rel="icon" href="/images/favicon.ico" sizes="any" />
                    <style>{`
                        html, body, #__next {
                            height: 100%;
                            margin: 0;
                            background-color: #1B1C23;
                        }
                        body {
                            overflow: hidden;
                        }
                    `}</style>
                </Head>
                <body>
                    <Main />
                    <NextScript />
                </body>
            </Html>
        );
    }
}

export default MyDocument;
