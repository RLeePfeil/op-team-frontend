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

function App() {

    const server = 'http://localhost:8080';

    const [question, setQuestion] = React.useState('');
    const [questionType, setQuestionType] = React.useState([]);
    const [questions, setQuestions] = React.useState([
        {
            id: '1234',
            text: 'Question Text',
            dids: [
                '123',
                '234'
            ],
            tags: [
                1,
                2,
                3
            ]
        }
    ]);

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

    const handleQuestionSubmit = () => {
        // TODO Give the server the question
        alert("Question text:\n" + question + "\n\nQuestion category:\n" + questionType);
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
                    { questions.length > 0 && questions.map(q => Question(q)) }
                </div>
            </section>

            {/*<ReactPolling
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
            />*/}
        </>
  );
}

export default App;
