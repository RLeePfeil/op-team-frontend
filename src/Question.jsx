import React from 'react';
import {Card} from "@workday/canvas-kit-react/card";
import {SecondaryButton} from "@workday/canvas-kit-react/button";
import QRCode from "qrcode.react";

export default function Question(q, qr, initializeQr, clearQRs) {
    console.log(qr);

    const handleUpvote = () => {
        initializeQr(q.id);
        // TODO Show loading state
    }

    const qrString = qr ? JSON.stringify(qr) : null;

    return (
        <Card key={q.id}>
            <h4>{q.question}</h4>
            <SecondaryButton className='upvote' onClick={() => handleUpvote(q.id)}>{q.dids.length} &#128588;</SecondaryButton>

            {qrString === null ? null : (
                <div>
                    <br/>
                    <QRCode value={qrString} />
                    <br/>
                    <br/>
                    <SecondaryButton onClick={() => clearQRs()}>Done &#10004;</SecondaryButton>
                </div>
            )}
        </Card>
    )
}
