import logo from './logo.svg';
import React from "react";
import {PageHeader} from '@workday/canvas-kit-react/page-header';
import {IconButton} from '@workday/canvas-kit-react/button';
import {questionFillIcon} from '@workday/canvas-system-icons-web';
import {Layout} from '@workday/canvas-kit-react/layout'
import './App.css';
import QRCode from "qrcode.react";
import {Card} from '@workday/canvas-kit-react/card';
import {FormField} from '@workday/canvas-kit-react/form-field';
import {PrimaryButton} from '@workday/canvas-kit-react/button';
import {TextArea} from '@workday/canvas-kit-react/text-area';

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

    const [value, setValue] = React.useState('');

    const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setValue(event.target.value);
        console.log(value);
    };

    const styles = {
        topContainer: {
            padding: '36px 0',
            backgroundColor: '#EFEFEF'
        },
        top: {
            maxWidth: '1360px',
            margin: '0 auto',
        },
        middleContainer: {
            padding: '36px 0'
        },
        middle: {
            maxWidth: '1360px',
            margin:'0 auto'
        }
    }

    return (
        <>
            <PageHeader title={'Ask Me Anything Anonymously'} capWidth={true}>
                <IconButton icon={questionFillIcon} />
            </PageHeader>

            <section style={styles.topContainer}>
                <div style={styles.top}>
                    <h3 style={{textAlign: 'center'}}>Never be afraid of asking a "stupid question" again!<br/>
                        Ask and vote anonymously.</h3>

                    <FormField label="Ask a Question">
                        <TextArea onChange={handleChange} value={value} />
                        <PrimaryButton>Ask Away!</PrimaryButton>
                    </FormField>
                </div>
            </section>

            <section style={styles.middleContainer}>
                <div style={styles.middle}>
                    <Layout>
                        <Layout.Column columns={12}>

                        </Layout.Column>
                    </Layout>

                    <Card>
                        <QRCode value={QRCodes[0]} />
                        <p>{QRCodes[0]}</p>
                    </Card>

                    <Card>
                        <QRCode value={QRCodes[0]} />
                        <p>{QRCodes[0]}</p>
                    </Card>

                    <Card>
                        <QRCode value={QRCodes[0]} />
                        <p>{QRCodes[0]}</p>
                    </Card>
                </div>
            </section>
        </>
  );
}

export default App;
