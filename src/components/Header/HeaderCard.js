import React from 'react'

import { makeStyles } from '@material-ui/core/styles';

import './Header.css'

const useStyles = makeStyles({
    root: props => ({
        backgroundImage: `url(${props.img})`,
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        backgroundRepeat: "no-repeat",
        backgroundColor: 'rgb(255, 255, 255)',
        color: 'rgb(33, 43, 54)',
        transition: 'box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
        overflow: 'hidden',
        borderRadius: '16px',
        zIndex: 0,
        marginBottom: '24px',
        height: '280px',
        position: 'relative',
        boxShadow: 'rgb(145 158 171 / 24%) 0px 0px 2px 0px, rgb(145 158 171 / 24%) 0px 16px 32px -4px'
    }),
})


const HeaderCard = ({tabs, src, icons, tabValue, handleTabChange}) => {
    const styles = useStyles({img:src})
    
    return (
        <div className = {styles.root}>
            <div className = "container__top"></div>
            <div className = "container_bottom">
                <div className = "multitab_root">
                    {
                        tabs.map((item, index) => {
                            return (
                                <div 
                                    className = {[
                                        "multi_btn_base",
                                        tabValue === index && "multi_btn_base_active"
                                        ].join(" ")
                                    } 
                                    onClick = {() => {handleTabChange(index)}}
                                >
                                    {icons[item]}
                                    <span 
                                        className = {[
                                            "multitab_wrapper", 
                                            tabValue === index && "multitab_active"
                                            ].join(" ")
                                        }
                                    >{item}</span>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </div>
    )
}

export default HeaderCard
