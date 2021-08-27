import React from 'react';
import {Card} from "@workday/canvas-kit-react/card";
import {SecondaryButton} from "@workday/canvas-kit-react/button";
import QRCode from "qrcode.react";

export default function Question(q) {
    const [qr, setQr] = React.useState(null);

    const handleUpvote = () => {
        // TODO initiate request to server

        // Get question ID back for QR code
        handleUpvoteSuccess(Math.round(Math.random() * 100000))
    }

    const handleUpvoteSuccess = (data) => {
        setQr(data);
    }

    return (
        <Card>
            <h4>{q.question}</h4>
            <SecondaryButton className='upvote' onClick={() => handleUpvote(q.id)}>&#128588;</SecondaryButton>

            { qr === null ? null : (
                <div>
                    <QRCode value={qr} />
                    <p>{qr}</p>
                </div>
            )}
        </Card>
    )
}
