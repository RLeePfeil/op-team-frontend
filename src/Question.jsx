import React from 'react';
import {Card} from "@workday/canvas-kit-react/card";
import {SecondaryButton} from "@workday/canvas-kit-react/button";
import QRCode from "qrcode.react";

export default function Question(q) {
    const [qr, setQr] = React.useState();
    console.log(qr);

    const handleUpvote = () => {
        // Initiate request to server
        getQuestionQR().then(data => {
            handleUpvoteSuccess(data);
        }).catch((error) => {
            alert(error);
            console.error('Error:', error);
        });
    }

    async function getQuestionQR() {
        // TODO proper url
        const url = 'https://localhost:8080/initialize?id=' + q.id;

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
        setQr(data);
    }

    const numUpvotes = () => {
        return q.Upvotes.length;
    }

    return (
        <Card key={q.id}>
            <h4>{q.Text}</h4>
            <SecondaryButton className='upvote' onClick={handleUpvote}>{numUpvotes} &#128588;</SecondaryButton>

            { qr === null ? null : (
                <div>
                    <QRCode value={qr} />
                    <p>{qr}</p>
                </div>
            )}
        </Card>
    )
}
