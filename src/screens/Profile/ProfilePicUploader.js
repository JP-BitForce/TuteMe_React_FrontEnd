import React, { useRef } from 'react'

import CameraIcon from '@material-ui/icons/PhotoCamera';
import './Profile.css'

const ProfilePicUploader = ({handleProfilePicUpload}) => {
    const inputFile = useRef(null)

    const profilePicOnChange = (e) => {
        const { files } = e.target;
        if (files && files.length) {
            handleProfilePicUpload(files[0])
        }
    }

    const onProfilePicOnClick = () => {
        inputFile.current.click()
    }

    return (
        <div>
            <input 
                type='file' 
                id='file' 
                ref={inputFile}
                style={{display: 'none'}}
                onChange = {profilePicOnChange}
            />
            <div className="overlay" onClick = {onProfilePicOnClick}>
                <CameraIcon/>
            </div>
        </div>
    )
}

export default ProfilePicUploader
