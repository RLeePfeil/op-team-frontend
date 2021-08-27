import React from "react";
import {PageHeader} from '@workday/canvas-kit-react/page-header';
import {IconButton} from '@workday/canvas-kit-react/button';
import {questionFillIcon} from '@workday/canvas-system-icons-web';
import './App.css';
import {FormField} from '@workday/canvas-kit-react/form-field';
import {PrimaryButton, SecondaryButton} from '@workday/canvas-kit-react/button';
import {TextArea} from '@workday/canvas-kit-react/text-area';
import ReactPolling from "react-polling";
import Question from "./Question";
import { v4 } from "uuid"

function App() {

    const server = 'http://localhost:8080';

    const [question, setQuestion] = React.useState('');
    const [questionType, setQuestionType] = React.useState([]);
    const [questions, setQuestions] = React.useState([]);
    const [qrs, setQrs] = React.useState([]);

    const handleChange = (event) => {
        setQuestion(event.target.value);
        console.log(event.target.value);
    };

    const pollSuccess = (resp) => {
        setQuestions(resp.questions)
    }
    const pollFailure = () => {
        // shhhh
        console.log('poll failure');
    }

    const handleQuestionSubmit = async () => {
        if (question == "") {
            return
        }
        // TODO Give the server the question
       //  alert("Question text:\n" + question + "\n\nQuestion category:\n" + questionType);
        let url = "http://localhost:8080/askQuestion";
        let fullquestion = {
            "question": question,
            "id": v4(),
            "tags": questionType,
        }
        await fetch(url, {
            method: 'POST', // *GET, POST, PUT, DELETE, etc.
            headers: {
                'Content-Type': 'application/json'
            },
            redirect: 'follow', // manual, *follow, error
            body: JSON.stringify(fullquestion),
        });
        setQuestion("")
        setQuestionType([])
    }

    const showHelp = () => {
        // TODO add modal with instructions on how to vote
        alert('modal with instructions on how to vote');
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
                onClick={() => setTypeActive(value)}>
                {name}
            </SecondaryButton>
        )
    }
    const isTypeActive = (type) => questionType.indexOf(type) !== -1 ? 'active' : '';
    const setTypeActive = (type) => {
        if (isTypeActive(type) === 'active') {
            // Remove type from list
            setQuestionType(questionType.filter((value) => value !== type))
        } else {
            // Add type to list
            setQuestionType([...questionType, type])
        }
    }

    const myQR = (id) => {
        const list = qrs.filter(row => row.id === id);
        return list.length === 0 ? null : list[list.length-1].qr;
    }

    const handleUpvote = (id) => {
        // Data expects to be in format:
        // {id: id, qr: 'abcdefg'}

        // Initiate request to server
        getQuestionQR(id).then(data => {
            console.log(data)
            handleUpvoteSuccess(data);
        }).catch((error) => {
            alert(error);
            console.error('Error:', error);
        });
    }

    async function getQuestionQR(id) {
        // TODO proper url
        const url = 'http://localhost:8080/relationship/initiate/' + id;

        const response = await fetch(url, {
            method: 'GET', // *GET, POST, PUT, DELETE, etc.
            mode: 'cors', // no-cors, *cors, same-origin
            cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
            //credentials: 'same-origin', // include, *same-origin, omit
            headers: {
                'Content-Type': 'application/json'
                // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            redirect: 'follow', // manual, *follow, error
            referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
        });
        return response.json(); // parses JSON response into native JavaScript objects
    }

    const handleUpvoteSuccess = (data) => {
        setQrs([...qrs, data]);
    }

    return (
        <>
            <PageHeader title={'Ask Me Anything Anonymously'} capWidth={true}>
                <IconButton aria-label='help' icon={questionFillIcon} onClick={showHelp} />
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
                        onClick={handleQuestionSubmit}>Ask Away!</PrimaryButton>
                </div>
            </section>

            <section className={'middleContainer'} >
                <div className={'middle'} >
                    { questions.length > 0 && questions.map(q => Question(q, myQR(q.id), handleUpvote)) }
                </div>
            </section>

            <ReactPolling
                url={`${server}/getQuestionsMetadata`}
                interval= {3000} // in milliseconds(ms)
                retryCount={9999} // this is optional
                onSuccess={pollSuccess}
                onFailure={pollFailure}
                method={'GET'}
                // headers={headers object} // this is optional
                render={({ startPolling, stopPolling, isPolling }) => {
                    if(isPolling) {
                        return (
                            <button onClick={stopPolling} title={'Stop Polling'}>Polling</button>
                        );
                    } else {
                        return (
                            <button onClick={startPolling} title={'Start Polling'}>Not polling</button>
                        );
                    }
                }}
            />
        </>
  );
}

export default App;
