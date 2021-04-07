import React, {useState, useRef} from 'react'

//Material-UI
import TextField from '@material-ui/core/TextField';
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
import Fade from '@material-ui/core/Fade';
import Grid from '@material-ui/core/Grid';
import Chip from '@material-ui/core/Chip';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';

import FormatAlignLeftIcon from '@material-ui/icons/FormatAlignLeft';
import FormatAlignCenterIcon from '@material-ui/icons/FormatAlignCenter';
import FormatAlignRightIcon from '@material-ui/icons/FormatAlignRight';
import FormatAlignJustifyIcon from '@material-ui/icons/FormatAlignJustify';
import FormatBoldIcon from '@material-ui/icons/FormatBold';
import FormatItalicIcon from '@material-ui/icons/FormatItalic';
import FormatUnderlinedIcon from '@material-ui/icons/FormatUnderlined';
import FormatColorFillIcon from '@material-ui/icons/FormatColorFill';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import ExpandMore from '@material-ui/icons/ExpandMore';

import upload from '../../assets/images/Blog/upload.svg'
import './Blog.css'

const useStyles = makeStyles({
    chip: {
        padding: "10px",
        color: "black",
        fontSize: "1rem"
    },
    menu: {
        marginTop: "40px",
        marginRight: "50px"
    },
    textarea: props => ({
        resize: "both",
        fontSize: props.fontSize,
        fontFamily: props.fontFamily
    }),
    post_btn: {
        background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
        height: "35px",
        color: 'white',
        marginLeft: "10px",
        width: "80px",
    },
});

const NewBlog = ({values, handleOnChange, handleCoverPicOnSelect}) => {
    const [alignment, setAlignment] = useState('left');
    const [formats, setFormats] = useState(() => ['bold', 'italic']);
    const [checked, setChecked] = useState({
        Font: false,
        Size: false
    })
    const [contentStyle, setContentStyle] = useState({
        fontSize: "18px",
        fontFamily: "Roboto"
    })
    const classes = useStyles(contentStyle);
    const inputFile = useRef(null)

    const checkedInitial = {Font: false, Size: false}
    const font_formats = [
        {title: "Font", menuItems: ["Roboto", "Lato", "Arial", "Rubik"]},
        {title: "Size", menuItems: ["8px", "10px", "12px", "14px", "16px", "18px", "36px"]},
    ]

    const handleFormat = (event, newFormats) => {
        setFormats(newFormats);
    };

    const handleAlignment = (event, newAlignment) => {
      setAlignment(newAlignment);
    };

    const handleFormatOnClick = (title) => {
        setChecked({
            ...checkedInitial,
            [title]: !checked[title]
        })
    }

    const formatItemOnClick = (title, item) => {
        setChecked({checkedInitial})
        switch(title) {
            case "Size" : handleSetContentStyle("fontSize", item)
                          break;
            case "Font" : handleSetContentStyle("fontFamily", item)
                          break;
            default : return
        }
    }

    const handleSetContentStyle = (type, value) => {
        setContentStyle({
            ...contentStyle,
            [type]: value
        })
    }

    const onProfilePicOnClick = () => {
        inputFile.current.click()
    }

    const coverPicOnChange = (e) => {
        const { files } = e.target;
        if (files && files.length) {
            handleCoverPicOnSelect(files[0])
        }
    }

    const renderFontFormat = () => {
        return (
            <div className = "font_format_div">
                {
                    font_formats.map(item => {
                        const { title, menuItems} = item
                        return (
                            <div className = "dropdown">
                                <Chip 
                                    label = {title} 
                                    onClick={() => handleFormatOnClick(title)} 
                                    deleteIcon={<ExpandMore />} 
                                    clickable 
                                    onDelete={() => handleFormatOnClick(title)}
                                    className = {classes.chip}
                                />
                                <Fade in = {checked && checked[title]}>
                                    <div id="myDropdown" className = "dropdown-content">
                                        {
                                            menuItems.map(item => {
                                                return (
                                                    <span onClick = {() => formatItemOnClick(title,item)}>{item}</span>
                                                )
                                            })
                                        }
                                    </div>
                                </Fade>
                            </div>
                        )
                    })
                }
            </div>
        )
    }

    const renderContentAlignment = () => {
        return (
            <ToggleButtonGroup
                value={alignment}
                exclusive
                onChange={handleAlignment}
                aria-label="text alignment"
                size="small"
            >
                <ToggleButton value="left" aria-label="left aligned">
                    <FormatAlignLeftIcon />
                </ToggleButton>
                <ToggleButton value="center" aria-label="centered">
                    <FormatAlignCenterIcon />
                </ToggleButton>
                <ToggleButton value="right" aria-label="right aligned">
                    <FormatAlignRightIcon />
                </ToggleButton>
                <ToggleButton value="justify" aria-label="justified">
                    <FormatAlignJustifyIcon />
                </ToggleButton>
            </ToggleButtonGroup>
        )
    }
    
    const renderContentFormats = () => {
        return (
            <ToggleButtonGroup value={formats} onChange={handleFormat} aria-label="text formatting" size="small">
                <ToggleButton value="bold" aria-label="bold">
                    <FormatBoldIcon />
                </ToggleButton>
                <ToggleButton value="italic" aria-label="italic">
                    <FormatItalicIcon />
                </ToggleButton>
                <ToggleButton value="underlined" aria-label="underlined">
                    <FormatUnderlinedIcon />
                </ToggleButton>
                <ToggleButton value="color" aria-label="color">
                    <FormatColorFillIcon />
                    <ArrowDropDownIcon />
                </ToggleButton>
          </ToggleButtonGroup>
        )
    }

    return (
        <div>
            <div className = "blog_cover_root">
                <h6 className = "new_blog_content_h6"> Cover </h6>
                <div className = "blog_cover">
                    <input 
                        type="file" 
                        autocomplete="off" 
                        tabindex="-1" 
                        style={{display: 'none'}} 
                        ref={inputFile}
                        onChange = {coverPicOnChange}
                    />
                    <img src = {upload} alt = "" className = "upload_img_src" onClick = {onProfilePicOnClick}/>
                    <div className = "blog_cover_text">
                        <h5>Drop or Select file</h5>
                        <p>( Choose you cover picture for your blog)</p>
                    </div>
                </div>
            </div>
            
            <TextField 
                id="outlined-basic" 
                label="Post Title" 
                variant="outlined" 
                fullWidth
                onChange = {handleOnChange}
                value = {values["title"]}
                name = "title"
            />

            <div className = "vertical_seperator"/>

            <TextField
                id="outlined-multiline-static"
                label="Description"
                multiline
                rows={4}
                variant="outlined"
                value = {values["description"]}
                fullWidth
                name = "description"
            />
            
            <div className = "new_blog_content">
                <h6 className = "new_blog_content_h6">Content</h6>
                <div className = "content_conainer">
                    <div className = "content_container_top">
                        <Grid container spacing={4}>
                            <Grid item xs={12} sm={6} md={4}>
                                { renderFontFormat() }
                            </Grid>
                            <Grid item xs={12} sm={6} md={4}>
                                { renderContentAlignment() }
                            </Grid>
                            <Grid item xs={12} sm={6} md={4}>
                                { renderContentFormats() }
                            </Grid>
                        </Grid>
                    </div>
                    <div className = "content_container_main">
                        {/* <TextField
                            multiline
                            rows={6}
                            value = {values["content"]}
                            fullWidth
                            placeholder = "Write something awesome...."
                            inputProps={{ className: classes.textarea }}
                            onChange = {handleOnChange}
                            name = "content"
                        /> */}
                        <div className = "ql-editor_container">
                            <div className = "ql-editor" data-gramm="false" contenteditable="true" data-placeholder="Write something awesome...">
                            <p>
                                <span style={{fontFamily: "Rubik"}}>
                                    <span className="ql-cursor">﻿Write something awesome...</span>
                                </span>
                            </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className = "button_footer">
                <Button variant="outlined">Preview</Button>
                <Button className = {classes.post_btn} type = "submit">Post</Button>
            </div>
        </div>
    )
}

export default NewBlog
