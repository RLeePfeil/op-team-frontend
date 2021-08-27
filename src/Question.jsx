import React from 'react';
import {Card} from "@workday/canvas-kit-react/card";
import {SecondaryButton} from "@workday/canvas-kit-react/button";
import QRCode from "qrcode.react";

export default function Question(q, qr, initializeQr) {
    const handleUpvote = () => {
        initializeQr(q.id);
        // TODO Show loading state
    }

    return (
        <Card key={q.id}>
            <h4>{q.text}</h4>
            <SecondaryButton
                className='upvote'
                onClick={handleUpvote}>{q.dids.length} &#128588;
            </SecondaryButton>

            { qr === null ? null : (
                <div>
                    <QRCode value={qr} />
                    <p>{qr}</p>
                </div>
            )}
        </Card>
    )
}
