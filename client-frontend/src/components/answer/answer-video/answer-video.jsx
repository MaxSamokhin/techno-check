import React from 'react';
import PropTypes from 'prop-types';
// import MediaCapturer from 'react-multimedia-capture';
import Button from '../../button/button.jsx';
import MediaCapturer from '../../media-recorder/media-recorder.jsx';

import './answer-video.less';
import LinearProgress from '@material-ui/core/LinearProgress/LinearProgress';

export default class AnswerVideo extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            granted: false,
            rejectedReason: '',
            recording: false,
            paused: false,

            completed: 100,
        };

        this.handleGranted = this.handleGranted.bind(this);
        this.handleDenied = this.handleDenied.bind(this);
        this.handleStart = this.handleStart.bind(this);
        this.handleStop = this.handleStop.bind(this);

        this.setStreamToVideo = this.setStreamToVideo.bind(this);
        this.releaseStreamFromVideo = this.releaseStreamFromVideo.bind(this);
        this.downloadVideo = this.downloadVideo.bind(this);
        this.progress = this.progress.bind(this);
    }

    componentDidMount() {
        clearInterval(this.timer);
    }

    handleGranted() {
        this.setState({granted: true});
    }

    handleDenied(err) {
        this.setState({rejectedReason: err.name});
        console.log('Permission Denied!', err);
    }

    handleStart(stream) {
        this.setState({
            recording: true
        });

        this.timer = setInterval(this.progress, 1000);

        this.setStreamToVideo(stream);
        console.log('Recording Started.');
    }

    progress() {
        const {completed} = this.state;
        const delta = 100 / (10); // 5 - минуты

        if (completed <= 0) {
            this.setState({completed: 0});
        } else {
            this.setState({completed: completed - delta});
        }
    }

    handleStop(blob) {
        clearInterval(this.timer);

        this.setState({
            recording: false
        });

        this.releaseStreamFromVideo();

        console.log('Recording Stopped.');
        this.downloadVideo(blob);
    }

    handleError(err) {
        console.log(err);
    }

    setStreamToVideo(stream) {
        let video = this.refs.app.querySelector('video');

        if (window.URL) {
            video.src = window.URL.createObjectURL(stream);
        }
        else {
            video.src = stream;
        }
    }

    releaseStreamFromVideo() {
        this.refs.app.querySelector('video').src = '';
    }

    downloadVideo(blob) {
        const {setVideo} = this.props;

        console.log('downloadVideo', blob);

        let url = URL.createObjectURL(blob);

        console.log('downloadVideo');
        console.log(blob, url);

        // // вставка видео на страницу!
        // const video = document.getElementsByClassName('video-insert')[0];
        // video.src = url;
        // video.load();

        setVideo(blob);
    }

    myHandleStop(stop) {
        stop();
    }

    render() {
        const {completed, granted} = this.state;

        return (
            <React.Fragment>
                <div className='answer-video' ref='app'>
                    <MediaCapturer
                        constraints={{audio: true, video: true}}
                        timeSlice={10}
                        onGranted={this.handleGranted}
                        onDenied={this.handleDenied}
                        onStart={this.handleStart}
                        onStop={this.handleStop}
                        onError={this.handleError}

                        render={({start, stop, request}) =>
                            <div className='answer-video__buttons-and-video'>
                                <div className='answer-video__buttons'>
                                    {!granted && <Button handleClick={request} text={'Получить разрешение'}/>}
                                    <Button text='Начать запись' style='startRecord' handleClick={start}/>
                                    <Button text='Остановить запись' style='stopRecord' handleClick={stop}/>
                                </div>

                                <div className='answer-video__video'>
                                    <video className={'video'} width={600} height={390} autoPlay/>
                                </div>

                                <LinearProgress variant='determinate' value={completed}/>
                                {completed <= 0 ? stop() : ''}
                            </div>
                        }/>

                    {/*<div className='answer-video__video'>*/}
                    {/*<video controls={true} className='video-insert answer-video__insert' />*/}
                    {/*</div>*/}
                </div>
            </React.Fragment>
        );
    }
}

AnswerVideo.propTypes = {
    setVideo: PropTypes.func
};
