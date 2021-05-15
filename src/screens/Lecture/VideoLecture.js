import React, { useEffect, useRef, useState } from 'react'
import SimplePeer, { Instance, SignalData } from "simple-peer"

//Material-UI
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import CircularProgress from '@material-ui/core/CircularProgress'

import camera from '../../assets/images/Course/videoChat/camera.svg'
import camerastop from '../../assets/images/Course/videoChat/camera-stop.svg'
import microphone from '../../assets/images/Course/videoChat/microphone.svg'
import microphonestop from '../../assets/images/Course/videoChat/microphone-stop.svg'
import share from '../../assets/images/Course/videoChat/share.svg'
import hangup from '../../assets/images/Course/videoChat/hang-up.svg'
import fullscreen from '../../assets/images/Course/videoChat/fullscreen.svg'
import minimize from '../../assets/images/Course/videoChat/minimize.svg'

import './OnlineLesson.css'

const webSocketConnection = new WebSocket("ws://localhost:8080/videochat");

const VideoLecture = ({joinId, handleInputOnChange, handleStart, handleDisconnect, connectedTo, startLoading, startError}) => {
    const videoSelf = useRef()
    const videoCaller = useRef()
    const myPeer = useRef()
    const [connectionStatus, setConnectionStatus] = useState(null)
    const [offerSignal, setOfferSignal] = useState(SignalData)
    const [simplePeer, setSimplePeer] = useState(Instance)
    const [userVideoOn, setUserVideoOn] = useState(false)
    const [callerVideoOn, setCallerVideoOn] = useState(false)
    const [audioMuted, setAudioMuted] = useState(false)
    const [videoMuted, setVideoMuted] = useState(false)
    const [isfullscreen, setFullscreen] = useState(false)
    const [stream, setStream] = useState()

    useEffect(() => {
        webSocketConnection.onmessage = (message) => {
            const payload = JSON.parse(message.data)
            if (payload?.type === "offer") {
                setOfferSignal(payload)
                setConnectionStatus("RECEIVING")
            } else if (payload?.type === "answer") {
                simplePeer?.signal(payload)
            }
        }
    }, [simplePeer])

    const handleStartOnClick = async() => {
        const verified = await handleStart()
        if (verified) {
            navigator.mediaDevices.getUserMedia({ video: true, audio: false }).then((mediaStream) => {
                const video = videoSelf.current
                video.srcObject = mediaStream
                video.play()
                setStream(mediaStream)
                const sp = new SimplePeer({
                    trickle: false,
                    initiator: true,
                    stream: mediaStream,
                })
                setUserVideoOn(true)
                setConnectionStatus("OFFERING")
                handleSimplepeer(sp)
            })
        }
    }

    const sendOrAcceptInvitation = (offer) => {
        navigator.mediaDevices.getUserMedia({ video: true, audio: false }).then((mediaStream) => {
            const video = videoSelf.current
            video.srcObject = mediaStream
            video.play()
            setStream(mediaStream)
            const sp = new SimplePeer({
                trickle: false,
                initiator: false,
                stream: mediaStream,
            })
            setUserVideoOn(true)
            sp.signal(offer)
            handleSimplepeer(sp)
        })
    }

    const handleSimplepeer = (sp) => {
        sp.on("signal", (data) => {
            webSocketConnection.send(JSON.stringify(data))
        })
        sp.on("connect", () => {
            setConnectionStatus("CONNECTED")
        })
        sp.on("stream", (stream) => {
            const video = videoCaller.current;
            video.srcObject = stream;
            video.play()
        })
        setCallerVideoOn(true)
        setSimplePeer(sp)
        myPeer.current = sp
    }

    const toggleMuteAudio = () => {
        if (stream) {
            setAudioMuted(!audioMuted)
            stream.getAudioTracks()[0].enabled = audioMuted
        }
    }

    const toggleMuteVideo = () => {
        if (stream) {
            setVideoMuted(!videoMuted)
            stream.getVideoTracks()[0].enabled = videoMuted
        }
    }

    const rejectCall = () => {
        setStream(null)
        setUserVideoOn(false)
        setCallerVideoOn(false)
        setConnectionStatus(null)
    }

    const endCall = () => {
        myPeer.current.destroy()
        setStream(null)
        setUserVideoOn(false)
        setCallerVideoOn(false)
        stream.getTracks().forEach((track) => {
            track.stop()
        })
        setConnectionStatus(null)
        handleDisconnect()
    }
    
    const shareScreen = () => {
        navigator.mediaDevices.getDisplayMedia({cursor:true}).then(screenStream=>{
            myPeer.current.replaceTrack(stream.getVideoTracks()[0],screenStream.getVideoTracks()[0],stream)
            videoSelf.current.srcObject=screenStream
            screenStream.getTracks()[0].onended = () =>{
              myPeer.current.replaceTrack(screenStream.getVideoTracks()[0],stream.getVideoTracks()[0],stream)
              videoSelf.current.srcObject=stream
            }
        })
    }

    const renderFullScreenButton = () => {
        if (isfullscreen) {
            return (
                <span className = "iconContainer" onClick={() => {setFullscreen(false)}}>
                    <img src={minimize} alt="fullscreen"/>
                </span>
            )
        } else {
            return (
                <span className = "iconContainer" onClick={() => {setFullscreen(true)}}>
                    <img src={fullscreen} alt="fullscreen"/>
                </span>
            )
        }
    }

    const renderHangUp = () => {
        return (
            <span className = "iconContainer" onClick = {() => endCall()}>
                <img src = {hangup} alt="End call"/>
            </span>
        )
    }

    const renderScreenShare = () => {
        return (
            <span className = "iconContainer" onClick = {shareScreen}>
                <img src = {share} alt="Share screen"/>
            </span>
        )
    }

    const renderVideoControl = () => {
        if (videoMuted) {
            return ( 
                <span className = "iconContainer" onClick = {() => toggleMuteVideo()}>
                    <img src = {camerastop} alt="Resume video"/>
                </span>
            )
        } else {
            return (  
                <span className = "iconContainer" onClick = {() => toggleMuteVideo()}>
                    <img src = {camera} alt="Stop audio"/>
                </span>
            )
        }
    }

    const renderAudioControl = () => {
        if (audioMuted) {
            return (
                <span className = "iconContainer" onClick = {toggleMuteAudio}>
                    <img src={microphonestop} alt="Unmute audio"/>
                </span>
            )
        } else {
            return (
                <span className = "iconContainer" onClick = {toggleMuteAudio}>
                    <img src={microphone} alt="Mute audio"/>
                </span>
            )
        }
    }

    const renderModal = () => {
        return (
            <Dialog
                open={connectionStatus === "RECEIVING"}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle>
                    <div><span className = "callerID"></span> trying to join you!</div>
                </DialogTitle>
                <DialogContent> 
                    <button 
                        name = "accept" 
                        className = "alertButtonPrimary" 
                        onClick = {() => sendOrAcceptInvitation(offerSignal)}
                    >Accept</button>
                    <button name = "reject" className = "alertButtonSecondary" onClick = {rejectCall}>Reject</button>
                </DialogContent>
            </Dialog>
        )
    }

    const renderOpener = () => {
        return (
            <div className = "video_lec_opener_root">
                <h5> Just click the button & start your online lesson </h5>
                <div className = "callBox flex">
                    <input 
                        type = "text" 
                        placeholder = "Join ID" 
                        value = {joinId} 
                        onChange = {handleInputOnChange} 
                        className = "form-input"
                        name = "joinId"    
                    />
                    <button onClick={handleStartOnClick} className="primaryButton">
                        { startLoading ? <CircularProgress/> : "Start" }
                    </button>
                </div>
                <div className = "flex">
                { startError && <span className = "error">{startError}</span>}
                </div>
                <h6 className = "secondary_text"> find the best experience for the year ahead </h6>
            </div>
        )
    }

    const renderConnectedContainer = () => {
        return (
            <>
            <div className = "partnerVideoContainer">
                <video className = "partnerVideo" playsInline ref = {videoCaller} autoPlay/>
            </div>
            <div className = "userVideoContainer">
                <video className="userVideo" playsInline muted ref={videoSelf} autoPlay/>
            </div>
            <div className = "controlsContainer flex">
                { renderAudioControl() }
                { renderVideoControl() }
                { renderScreenShare() }
                { renderFullScreenButton() }
                { renderHangUp() }
            </div>
            </>
        )
    }


    return (
        <div className="web-rtc-page">
            {connectionStatus === null && renderOpener()}
            {connectionStatus === "OFFERING" && <CircularProgress/>}
            {connectionStatus === "RECEIVING" && renderModal()}
            <div className = { userVideoOn && callerVideoOn ? "callContainer" : "video-container_non" }>
                { renderConnectedContainer() }
            </div>
        </div>
    )
}

export default VideoLecture
