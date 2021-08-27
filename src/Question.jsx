import React from 'react';
import {Card} from "@workday/canvas-kit-react/card";
import {SecondaryButton} from "@workday/canvas-kit-react/button";
import QRCode from "qrcode.react";

export default function Question(q, qr, initializeQr, clearQRs, types) {
    const handleUpvote = () => {
        initializeQr(q.id);
    }

    const qrString = qr ? JSON.stringify(qr) : null;

    const QuestionTypePill = (type) => {
        return (
            <span className={`questionTypePills type-${type}`}>{typeName(type)}</span>
        )
    }

    const typeName = (type) => {
        const typeObj = types.filter(t => t.value === type);
        if (typeObj.length > 0) {
            return typeObj[0].name;
        } else {
            return type;
        }
    }

    return (
        <Card key={q.id}>
            <Card.Heading>{q.question}</Card.Heading>
            <Card.Body>
                <div className={'questionTagsContainer'}>
                    { q.tags.map((type) => QuestionTypePill(type)) }
                </div>

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

                <p className={'questionId'}><small>{q.id}</small></p>
            </Card.Body>
        </Card>
    )
}
