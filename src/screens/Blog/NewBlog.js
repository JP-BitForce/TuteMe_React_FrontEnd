import React, {useRef, useState} from 'react'

import Quill from './Quill'

//Material-UI
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from '@material-ui/core/styles';

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
    post_btn: {
        background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
        height: "35px",
        color: 'white',
        marginLeft: "10px",
        width: "80px",
    },
});

const NewBlog = ({
    values, 
    handleOnChange, 
    handleCoverPicOnSelect, 
    handleQuillOnChange, 
    handleImgRemover,
    handlePreviewOnClick
}) => {
    const classes = useStyles();
    const inputFile = useRef(null)
    const [imgTitle, setImg] = useState(null)

    const coverePicOnClick = () => {
        inputFile.current.click()
    }

    const coverPicOnChange = (e) => {
        const { files } = e.target;
        if (files && files.length) {
            handleCoverPicOnSelect(files[0])
        }
        setImg(files[0].name)
    }

    const imgRemoveOnClick = () => {
        setImg(null)
        handleImgRemover()
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
                    <img src = {upload} alt = "" className = "upload_img_src" onClick = {coverePicOnClick}/>
                    <div className = "blog_cover_text">
                        <h5>Drop or Select file</h5>
                        <p>
                            {
                                imgTitle ? 
                                <div>
                                    selected image: {imgTitle}
                                    <Button variant="outlined" size="small" onClick = {imgRemoveOnClick}>remove</Button>
                                </div>
                                :
                                "( Choose you cover picture for your blog)"
                            }
                            
                        </p>
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
                onChange = {handleOnChange}
                placeholder = "Provide small description about your blog...."
            />
            
            <div className = "new_blog_content">
                <h6 className = "new_blog_content_h6">Content</h6>
                <div className = "content_conainer">
                    <Quill
                        text = {values["content"]}
                        handleChange = {handleQuillOnChange}
                    />
                </div>
            </div>

            <div className = "button_footer">
                {
                    values["addNewBlogLoading"] ? 
                    <div className = "loading_div">
                        <CircularProgress/>
                    </div>
                    :
                    <>
                    <Button variant="outlined" onClick = {handlePreviewOnClick}>Preview</Button>
                    <Button className = {classes.post_btn} type = "submit">Post</Button>
                    </>
                }
            </div>
        </div>
    )
}

export default NewBlog
