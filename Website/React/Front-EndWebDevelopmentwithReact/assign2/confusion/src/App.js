import Main from './components/MainComponent';
import './App.css';
import * as React from 'react';
import { BrowserRouter } from 'react-router-dom';

class App extends React.Component {

    render() {
        return (
            <BrowserRouter>
                <div>
                    <Main />
                </div>
            </BrowserRouter>
        );
    }

}


export default App;
