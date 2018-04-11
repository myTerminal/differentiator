/* global require */

import '../styles/styles.less';
import './service-worker-starter.js';

const React = require('react');
const ReactDOM = require('react-dom');

const page = document.getElementById('page');

class App extends React.Component {
    constructor() {
        super();

        this.state = {
            
        };
    }

    render() {
        return (
            <div className="container">
                differentiator
            </div>
        );
    }
}

ReactDOM.render(<App />, page);
