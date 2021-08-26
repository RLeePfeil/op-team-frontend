import logo from './logo.svg';
import {PageHeader} from '@workday/canvas-kit-react/page-header';
import {IconButton} from '@workday/canvas-kit-react/button';
import {questionFillIcon} from '@workday/canvas-system-icons-web';
import {Layout} from '@workday/canvas-kit-react/layout'
import './App.css';
import QRCode from "qrcode.react";
import {Card} from '@workday/canvas-kit-react/card';

function App() {

    const QRCode = require('qrcode.react');

    const QRCodes = [

    ]

    return (
        <>
            <PageHeader title={'Vote'} capWidth={true}>
                <IconButton icon={questionFillIcon} />
            </PageHeader>
            <Layout>
                <Layout.Column>
                    <Card>
                        <a href={"http://facebook.github.io/react/"}>
                            <QRCode value="http://facebook.github.io/react/" />
                            http://facebook.github.io/react/
                        </a>
                    </Card>
                </Layout.Column>
            </Layout>
        </>
  );
}

export default App;
