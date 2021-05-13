import React, { useEffect, useRef, useState } from 'react'
import SimplePeer, { Instance, SignalData } from "simple-peer"

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

const VideoLecture = ({joinId, handleInputOnChange, handleStart, handleDisconnect, connectedTo}) => {
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

    const sendOrAcceptInvitation = (isInitiator, offer) => {
        if (isInitiator) {
            handleStart()
        }
        navigator.mediaDevices.getUserMedia({ video: true, audio: false }).then((mediaStream) => {
            const video = videoSelf.current
            video.srcObject = mediaStream
            video.play()
            setStream(mediaStream)
            const sp = new SimplePeer({
                trickle: false,
                initiator: isInitiator,
                stream: mediaStream,
            })
            setUserVideoOn(true)

            if (isInitiator) setConnectionStatus("OFFERING")
            else offer && sp.signal(offer)

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
        })
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

    const renderInComing = () => {
        return (
            <div className="incomingCallContainer">
                <div className="incomingCall flex flex-column">
                    <div><span className="callerID"></span> is calling you!</div>
                    <div className="incomingCallButtons flex">
                        <button name="accept" className="alertButtonPrimary" onClick={() => sendOrAcceptInvitation(false, offerSignal)}>Accept</button>
                        <button name="reject" className="alertButtonSecondary" onClick={rejectCall}>Reject</button>
                    </div>
                </div>
            </div>
        )
    }

    const renderOpener = () => {
        return (
            <div className = "video_lec_opener_root">
                <h5> Just click the button & start your online lesson </h5>
                <div className="callBox flex">
                    <input 
                        type = "text" 
                        placeholder = "Join ID" 
                        value = {joinId} 
                        onChange = {handleInputOnChange} 
                        className = "form-input"
                        name = "joinId"    
                    />
                    <button onClick={() => sendOrAcceptInvitation(true)} className="primaryButton">
                        Start
                    </button>
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
            {connectionStatus === "RECEIVING" && renderInComing()}
            <div className = { userVideoOn && callerVideoOn ? "callContainer" : "video-container_non" }>
                { renderConnectedContainer() }
            </div>
        </div>
    )
}

export default VideoLecture
