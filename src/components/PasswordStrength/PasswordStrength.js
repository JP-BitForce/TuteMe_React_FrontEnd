import React from 'react'

import PasswordStrengthBar from 'react-password-strength-bar';

const PasswordStrength = ({value, min}) => {
    return (
        <div style = {{marginBottom:"2%"}}>
            <PasswordStrengthBar 
                password={value} 
                minLength={min}
                onChangeScore={score => {
                    console.log(score);
                }}
            />
        </div>
    )
}

export default PasswordStrength