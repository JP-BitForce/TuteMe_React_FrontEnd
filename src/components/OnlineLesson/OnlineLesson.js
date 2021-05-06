import React, { useEffect, useState, useRef } from 'react'

import io from "socket.io-client"
import Peer from "simple-peer"
import Rodal from 'rodal'

import camera from '../../assets/images/Course/videoChat/camera.svg'
import camerastop from '../../assets/images/Course/videoChat/camera-stop.svg'
import microphone from '../../assets/images/Course/videoChat/microphone.svg'
import microphonestop from '../../assets/images/Course/videoChat/microphone-stop.svg'
import share from '../../assets/images/Course/videoChat/share.svg'
import hangup from '../../assets/images/Course/videoChat/hang-up.svg'
import fullscreen from '../../assets/images/Course/videoChat/fullscreen.svg'
import minimize from '../../assets/images/Course/videoChat/minimize.svg'

import  'rodal/lib/rodal.css'
import './OnlineLesson.css'

const OnlineLesson = ({handleInputOnChange, joinId, handleJoin}) => {
    const [yourID, setYourID] = useState("")
    const [users, setUsers] = useState({"user": true})
    const [stream, setStream] = useState()
    const [caller, setCaller] = useState("")
    const [callingFriend, setCallingFriend] = useState(false)
    const [callAccepted, setCallAccepted] = useState(false)
    const [modalVisible, setModalVisible] = useState(false)
    const [modalMessage, setModalMessage] = useState('')
    const [audioMuted, setAudioMuted] = useState(false)
    const [videoMuted, setVideoMuted] = useState(false)
    const [isfullscreen, setFullscreen] = useState(false)
    const [copied, setCopied] = useState(false)
    
    const userVideo = useRef()
    const partnerVideo = useRef()
    const socket = useRef()
    const myPeer = useRef()

    useEffect(() => {
        socket.current = io.connect("/")
        socket.current.on("yourID", (id) => {
          setYourID(id)
        })
        socket.current.on("allUsers", (users) => {
          setUsers(users)
        })
        socket.current.on("hey", (data) => {
          setCaller(data.from)
        })
    },[])

    const callPeer = (id) => {
        if (id !== '' && users[id] && id !== yourID) {
          navigator.mediaDevices.getUserMedia({ video: true, audio: true }).then(stream => {
            setStream(stream)
            setCallingFriend(true)
            setCaller(id)
            if (userVideo.current) {
              userVideo.current.srcObject = stream
            }
            const peer = new Peer({
              initiator: true,
              trickle: false,
              config: {
                iceServers: [
                    {url:'stun:stun01.sipphone.com'},
                    {url:'stun:stun.ekiga.net'},
                    {url:'stun:stun.fwdnet.net'},
                    {url:'stun:stun.ideasip.com'},
                    {url:'stun:stun.iptel.org'},
                    {url:'stun:stun.rixtelecom.se'},
                    {url:'stun:stun.schlund.de'},
                    {url:'stun:stun.l.google.com:19302'},
                    {url:'stun:stun1.l.google.com:19302'},
                    {url:'stun:stun2.l.google.com:19302'},
                    {url:'stun:stun3.l.google.com:19302'},
                    {url:'stun:stun4.l.google.com:19302'},
                    {url:'stun:stunserver.org'},
                    {url:'stun:stun.softjoys.com'},
                    {url:'stun:stun.voiparound.com'},
                    {url:'stun:stun.voipbuster.com'},
                    {url:'stun:stun.voipstunt.com'},
                    {url:'stun:stun.voxgratia.org'},
                    {url:'stun:stun.xten.com'},
                ]
            },
              stream: stream,
            });
    
            myPeer.current = peer
        
            peer.on("signal", data => {
              socket.current.emit("callUser", { userToCall: id, signalData: data, from: yourID })
            })
        
            peer.on("stream", stream => {
              if (partnerVideo.current) {
                partnerVideo.current.srcObject = stream
              }
            });
    
            peer.on('error', (err)=>{
              endCall()
            })
        
            socket.current.on("callAccepted", signal => {
              setCallAccepted(true)
              peer.signal(signal)
            })
    
            socket.current.on('close', ()=>{
              window.location.reload()
            })
      
            socket.current.on('rejected', ()=>{
              window.location.reload()
            })
          })
          .catch(()=>{
            setModalMessage('You cannot place/ receive a call without granting video and audio permissions! Please change your settings to use Cuckoo.')
            setModalVisible(true)
          })
        } else {
          setModalMessage('Username entered is wrong. Please check again and retry!')
          setModalVisible(true)
          return
        }
    }
    
    const endCall = () => {
        myPeer.current.destroy()
        socket.current.emit('close',{to:caller})
        setStream(null)
        setCallAccepted(false)
        setCallingFriend(false)
        stream.getTracks().forEach((track) => {
            track.stop()
        })
    }
    
    const shareScreen = () => {
        navigator.mediaDevices.getDisplayMedia({cursor:true}).then(screenStream=>{
          myPeer.current.replaceTrack(stream.getVideoTracks()[0],screenStream.getVideoTracks()[0],stream)
          userVideo.current.srcObject=screenStream
          screenStream.getTracks()[0].onended = () =>{
            myPeer.current.replaceTrack(screenStream.getVideoTracks()[0],stream.getVideoTracks()[0],stream)
            userVideo.current.srcObject=stream
          }
        })
    }
    
    const toggleMuteAudio = () => {
        if(stream){
          setAudioMuted(!audioMuted)
          stream.getAudioTracks()[0].enabled = audioMuted
        }
    }
    
    const toggleMuteVideo = () => {
        if(stream){
          setVideoMuted(!videoMuted)
          stream.getVideoTracks()[0].enabled = videoMuted
        }
    }
    
    const renderLanding = () => {
        if(!callAccepted && !callingFriend)
          return 'block'
        return 'none'
    }
    
    const renderCall = () => {
        if(!callAccepted && !callingFriend)
          return 'none'
        return 'block'
    }
    
    const showCopiedMessage = () => {
        navigator.clipboard.writeText(yourID)
        setCopied(true)
        setInterval(()=>{
          setCopied(false)
        },1000)
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
            <span className = "iconContainer" onClick = {() => shareScreen()}>
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
                <span className = "iconContainer" onClick = {() => toggleMuteAudio()}>
                    <img src={microphonestop} alt="Unmute audio"/>
                </span>
            )
        } else {
            return (
                <span className = "iconContainer" onClick = {() => toggleMuteAudio()}>
                    <img src={microphone} alt="Mute audio"/>
                </span>
            )
        }
    }

    const renderUserVideo = () => {
        if (stream) {
            return <video className="userVideo" playsInline muted ref={userVideo} autoPlay/>
        }
    }

    const renderParterVideo = () => {
        if (callAccepted && isfullscreen) {
            return <video className = "partnerVideo cover" playsInline ref = {partnerVideo} autoPlay/>
        } else if (callAccepted && !isfullscreen){
            return <video className = "partnerVideo" playsInline ref = {partnerVideo} autoPlay/>
        }
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

    const renderOpener = () => {
        return (
            <div className="u-margin-top-xxlarge u-margin-bottom-xxlarge">
                <div className="o-wrapper-l">
                    <div className="hero flex flex-column">
                        <div>
                            <div className="actionText">
                                Want to join ?
                                <span 
                                    className={copied?"username highlight copied":"username highlight"} 
                                    onClick={()=>{showCopiedMessage()}}
                                >
                                {yourID}
                                </span>
                            </div>
                        </div>
                        <div className="callBox flex">
                            <input 
                                type = "text" 
                                placeholder = "Join ID" 
                                value = {joinId} 
                                onChange = {handleInputOnChange} 
                                className = "form-input"
                                name = "joinId"    
                            />
                            <button 
                                onClick={() => callPeer(joinId.toLowerCase().trim())} 
                                className="primaryButton"
                            >
                            Join
                            </button>
                        </div>
                        <div>
                            Send your joining ID and wait for tutor accept your joining
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div>
            <div style={{display: renderLanding()}}>
                { renderOpener() }
                <Rodal 
                    visible = {modalVisible} 
                    onClose = {() => setModalVisible(false)} 
                    width = {20} 
                    height = {5} 
                    measure = {'em'}
                    closeOnEsc = {true}
                >
                    <div>{ modalMessage }</div>
                </Rodal>
            </div>
            <div className = "callContainer" style={{display: renderCall()}}>
                <div className = "partnerVideoContainer">
                    {renderParterVideo()}
                </div>
                <div className = "userVideoContainer">
                    { renderUserVideo() }
                </div>
                <div className = "controlsContainer flex">
                    { renderAudioControl() }
                    { renderVideoControl() }
                    { renderScreenShare() }
                    { renderFullScreenButton() }
                    { renderHangUp() }
                </div>
            </div>
        </div>
    )
}

export default OnlineLesson
