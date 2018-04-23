/* global require document FileReader alert */

import React from 'react';
import ReactDOM from 'react-dom';
import { FilePicker } from 'react-file-picker';

import '../styles/styles.less';
import './service-worker-starter';
import packageDetails from '../../package.json';

const page = document.getElementById('page');

class App extends React.Component {
    constructor() {
        super();

        this.state = {
            isLeftFileLoaded: false,
            isRightFileLoaded: false,
            leftFileContents: '',
            rightFileContents: ''
        };
    }

    onFilePick(file, containerNumber) {
        this.loadFile(file, containerNumber);
    }

    loadFile(file, containerNumber) {
        var context = this,
            reader = new FileReader();

        reader.onload = function (event) {
            if (containerNumber === 1) {
                context.setState({
                    isLeftFileLoaded: true,
                    leftFileContents: event.target.result
                });

                if (context.state.isRightFileLoaded) {
                    context.startComparingFileContents();
                }
            } else if (containerNumber === 2) {
                context.setState({
                    isRightFileLoaded: true,
                    rightFileContents: event.target.result
                });

                if (context.state.isLeftFileLoaded) {
                    context.startComparingFileContents();
                }
            }
        };

        reader.readAsText(file);
    }

    resetComparison() {
        this.setState({
            isLeftFileLoaded: false,
            isRightFileLoaded: false,
            leftFileContents: '',
            rightFileContents: ''
        });
    }

    startComparingFileContents() {
        console.log('Comparing file contents');
    }

    render() {
        return (
            <div className="root-container">
                <div className="header">
                    <b>differentiator</b> - A simple file compare tool (v {packageDetails.version})
                    <a className="source" href="https://github.com/myTerminal/differentiator" target="_blank">&nbsp;</a>
                </div>
                <div className="container">
                    <div className={'file-input' + (this.state.isLeftFileLoaded ? ' loaded' : '')}>
                        <div className="picker">
                            <FilePicker
                                onChange={file => this.onFilePick(file, 1)}
                                onError={err => alert(err)}>
                                <button className="file-picker-button">
                                    Pick a file to compare
                                </button>
                            </FilePicker>
                        </div>
                        <div className="file-contents">
                            {this.state.leftFileContents}
                        </div>
                    </div>
                    <div className={'file-input' + (this.state.isRightFileLoaded ? ' loaded' : '')}>
                        <div className="picker">
                            <FilePicker
                                onChange={file => this.onFilePick(file, 2)}
                                onError={err => alert(err)}>
                                <button className="file-picker-button">
                                    Pick a file to compare
                                </button>
                            </FilePicker>
                        </div>
                        <div className="file-contents">
                            {this.state.rightFileContents}
                        </div>
                    </div>
                </div>
                <div className={'footer' + (this.state.isLeftFileLoaded && this.state.isRightFileLoaded ? ' loaded' : '')}>
                    <div className="instruction">
                        Pick a file on each side to begin comparing contents
                    </div>
                    <div className="control" onClick={this.resetComparison.bind(this)}>
                        Reset comparison
                    </div>
                </div>
            </div>
        );
    }
}

ReactDOM.render(<App />, page);
