import React from "react";
import {PageHeader} from '@workday/canvas-kit-react/page-header';
import {IconButton} from '@workday/canvas-kit-react/button';
import {questionFillIcon} from '@workday/canvas-system-icons-web';
import './App.css';
import QRCode from "qrcode.react";
import {Card} from '@workday/canvas-kit-react/card';
import {FormField} from '@workday/canvas-kit-react/form-field';
import {PrimaryButton, SecondaryButton} from '@workday/canvas-kit-react/button';
import {TextArea} from '@workday/canvas-kit-react/text-area';
import ReactPolling from "react-polling";

function App() {

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
    const [questionType, setQuestionType] = React.useState([]);

    const handleChange = (event) => {
        setQuestion(event.target.value);
        console.log(event.target.value);
    };

    const pollSuccess = (resp) => {
        console.log(resp);
    }
    const pollFailure = () => {
        // shhhh
        console.log('poll failure');
    }

    const handleSubmit = (event) => {
        // TODO Give the server the question
        alert(question + "\nQuestion category:" + questionType);
    }

    const Types = [
        {name: 'Fun', value: 'fun'},
        {name: 'Integrity', value: 'integrity'},
        {name: 'Profitability', value: 'profitability'},
        {name: 'Employees', value: 'employees'},
        {name: 'Innovation', value: 'innovation'},
        {name: 'Customer Service', value: 'customerservice'}
    ]
    const TypeButton = (name, value) => {
        return (
            <SecondaryButton
                key={value}
                id={`type-${value}`}
                className={isTypeActive(value)}
                onClick={() => setTypeActive(value)}
            >
                {name}
            </SecondaryButton>
        )
    }
    const isTypeActive = (type) => questionType.indexOf(type) !== -1 ? 'active' : '';
    const setTypeActive = (type) => {
        console.log('setting active type');
        if (isTypeActive(type) === 'active') {
            // Remove type from list
            setQuestionType(questionType.filter((value) => value !== type))
        } else {
            // Add type to list
            console.log('add type to list');
            setQuestionType([...questionType, type])
        }
    }

    return (
        <>
            <PageHeader title={'Ask Me Anything Anonymously'} capWidth={true}>
                <IconButton icon={questionFillIcon} />
            </PageHeader>

            <section className={'topContainer'} >
                <div className={'top'} >
                    <h3>Never be afraid of asking a "stupid question" again!<br/>
                        Ask and vote anonymously.</h3>

                    <div className={'questionBox'}>
                        <FormField label="Your Question">
                            <TextArea onChange={handleChange} value={question} />
                        </FormField>
                        <div className={'questionTypes'}>
                            { Types.map((type) => TypeButton(type.name, type.value)) }
                            { /*questionType.toString()*/ }
                        </div>
                    </div>

                    <PrimaryButton
                        size={'large'}
                        onClick={handleSubmit}>Ask Away!</PrimaryButton>
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

            <ReactPolling
                url={'url to poll'}
                interval= {3000} // in milliseconds(ms)
                //retryCount={3} // this is optional
                onSuccess={pollSuccess}
                onFailure={pollFailure} // this is optional
                method={'GET'}
                // headers={headers object} // this is optional
                // body={JSON.stringify(data)} // data to send in a post call. Should be stringified always
                render={({ startPolling, stopPolling, isPolling }) => {
                    if(isPolling) {
                        return (
                            <div>Polling</div>
                        );
                    } else {
                        return (
                            <div>Not polling</div>
                        );
                    }
                }}
            />
        </>
  );
}

export default App;
