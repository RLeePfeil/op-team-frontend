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
import {Radio, RadioGroup} from '@workday/canvas-kit-react/radio';
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

    const [question, setQuestion] = React.useState('');
    const [questionType, setQuestionType] = React.useState('');

    const handleChange = (event) => {
        setQuestion(event.target.value);
        console.log(event.target.value);
    };

    const handleType = (value) => {
        setQuestionType(value);
        console.log(value);
    }

    const handleSubmit = (event) => {
        // TODO Give the server the question
        alert(question + "\nQuestion category:" + questionType);
    }

    return (
        <>
            <PageHeader title={'Ask Me Anything Anonymously'} capWidth={true}>
                <IconButton icon={questionFillIcon} />
            </PageHeader>

            <section className={'topContainer'} >
                <div className={'top'} >
                    <h3 style={{textAlign: 'center'}}>Never be afraid of asking a "stupid question" again!<br/>
                        Ask and vote anonymously.</h3>

                    <FormField label="Ask a Question">
                        <TextArea onChange={handleChange} value={question} />

                        <FormField label="type" required={true} useFieldset={true}>
                            <RadioGroup name="crust" onChange={handleType} value={questionType}>
                                <Radio label="Fun" value="Fun" />
                                <Radio label="Integrity" value="Integrity" />
                                <Radio label="Profitability" value="Profitability" />
                                <Radio label="Employees" value="Employees" />
                                <Radio label="Innovation" value="Innovation" />
                                <Radio label="Customer Service" value="Customer-Service" />
                            </RadioGroup>
                        </FormField>

                        <PrimaryButton onClick={handleSubmit}>Ask Away!</PrimaryButton>
                    </FormField>
                </div>
            </section>

            <section className={'middleContainer'} >
                <div className={'middle'} >
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
