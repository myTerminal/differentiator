/* global require document FileReader alert */

import React from 'react';
import ReactDOM from 'react-dom';
import { FilePicker } from 'react-file-picker';
import DiffMatchPatch from 'diff-match-patch';

import '../styles/styles.less';
import './service-worker-starter';
import packageDetails from '../../package.json';

const page = document.getElementById('page');

const classes = ['equal', 'add', 'delete'];

class App extends React.Component {
    constructor() {
        super();

        this.state = {
            isLeftFileLoaded: false,
            isRightFileLoaded: false,
            leftFileContents: '',
            rightFileContents: '',
            isDiffReady: false,
            shouldWrapText: false,
            diff: []
        };
    }

    componentDidMount() {
        var fileContents1 = document.getElementById('file-contents-1'),
            fileContents2 = document.getElementById('file-contents-2');

        fileContents1.addEventListener('scroll', function () {
            fileContents2.scrollTop = this.scrollTop;
        });

        fileContents2.addEventListener('scroll', function () {
            fileContents1.scrollTop = this.scrollTop;
        });
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

    toggleTextWrap() {
        this.setState({
            shouldWrapText: !this.state.shouldWrapText
        });
    }

    resetComparison() {
        this.setState({
            isLeftFileLoaded: false,
            isRightFileLoaded: false,
            leftFileContents: '',
            rightFileContents: '',
            isDiffReady: false,
            diff: []
        });
    }

    startComparingFileContents() {
        var dmp = new DiffMatchPatch(),
            diff = dmp.diff_main(
                this.state.leftFileContents,
                this.state.rightFileContents
            );

        this.setState({
            isDiffReady: true,
            diff: diff
        });
    }

    render() {
        return (
            <div className="root-container">
                <div className="header">
                    <b>differentiator</b> - A simple file compare tool (v {packageDetails.version})
                    <a className="source fa fa-github fa-lg" href="https://github.com/myTerminal/differentiator" target="_blank">&nbsp;</a>
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
                        <div className={'file-contents' + (this.state.shouldWrapText ? ' wrap' : '')} id="file-contents-1">
                            {
                                !this.state.isDiffReady ?
                                    this.state.leftFileContents :
                                    this.state.diff.map(d =>
                                        <span key={d[0] + d[1]} className={'diff ' + (classes[d[0]] || 'delete')}>{d[1]}</span>
                                    )
                            }
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
                        <div className={'file-contents' + (this.state.shouldWrapText ? ' wrap' : '')} id="file-contents-2">
                            {
                                !this.state.isDiffReady ?
                                    this.state.leftFileContents :
                                    this.state.diff.map(d =>
                                        <span key={d[0] + d[1]} className={'diff ' + (classes[d[0]] || 'delete')}>{d[1]}</span>
                                    )
                            }
                        </div>
                    </div>
                </div>
                <div className={'footer' + (this.state.isLeftFileLoaded && this.state.isRightFileLoaded ? ' loaded' : '')}>
                    <div className="instruction">
                        Pick a file on each side to begin comparing contents
                    </div>
                    <div className={'control' + (this.state.shouldWrapText ? ' active' : '')} onClick={this.toggleTextWrap.bind(this)}>
                        Wrap text
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
