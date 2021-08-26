import logo from './logo.svg';
import React from "react";
import {PageHeader} from '@workday/canvas-kit-react/page-header';
import {IconButton} from '@workday/canvas-kit-react/button';
import {questionFillIcon} from '@workday/canvas-system-icons-web';
import {Layout} from '@workday/canvas-kit-react/layout'
import './App.css';
import QRCode from "qrcode.react";
import {Card} from '@workday/canvas-kit-react/card';

function App() {

    const QRCode = require('qrcode.react');

    const QRCodes = [
        `{
            "type": "https://didcomm.org/didexchange/1.0/invitation",
            // some uuid for the interaction
            "id": "31ffa98d-db02-4e14-8b3f-8ecd9e094598",
            "label": "Question App",
            // this is the websites pubkey
            // maybe a unique key for the interaction
            "recipientKeys":["pJh/gE6rYRhxZnGrDQEZmAbB11GF+gLSwZuYuYkb8R4="], 
            // some callback url like this-ish
            "serviceEndpoint": "localhost:3000/question/:questionID" 
        } `
    ]

    return (
        <>
            <PageHeader title={'Vote'} capWidth={true}>
                <IconButton icon={questionFillIcon} />
            </PageHeader>
            <Layout spacing={5}>
                <Layout.Column>
                    <Card>
                        <a href={QRCodes[0]}>
                            <QRCode value={QRCodes[0]} />
                            {QRCodes[0]}
                        </a>
                    </Card>
                </Layout.Column>

                <Layout.Column>
                    <Card>
                        <a href={QRCodes[0]}>
                            <QRCode value={QRCodes[0]} />
                            {QRCodes[0]}
                        </a>
                    </Card>
                </Layout.Column>

                <Layout.Column>
                    <Card>
                        <a href={QRCodes[0]}>
                            <QRCode value={QRCodes[0]} />
                            {QRCodes[0]}
                        </a>
                    </Card>
                </Layout.Column>
            </Layout>
        </>
  );
}

export default App;
