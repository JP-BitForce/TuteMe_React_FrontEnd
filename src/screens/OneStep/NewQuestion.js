import React from 'react'

import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; 

//Material-UI
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Chip from '@material-ui/core/Chip';

import './OneStep.css'

const NewQuestion = ({values, handleOnChange, handleContentOnChange, handleTagsChange, handleCancel, handlePost}) => {
    const modules = {
        toolbar: [
          [{ 'header': [1, 2, false] }],
          ['bold', 'italic', 'underline','strike', 'blockquote'],
          [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
          ['link', 'image'],
          ['clean']
        ],
    }
     
    const formats = [
        'header',
        'bold', 'italic', 'underline', 'strike', 'blockquote',
        'list', 'bullet', 'indent',
        'link', 'image'
    ]

    const renderTagSelector = () => {
        return (
            <FormControl fullWidth variant="outlined">
                <InputLabel id="demo-mutiple-chip-label">Choose atleast one tag (max: 5)</InputLabel>
                <Select
                    labelId="demo-mutiple-chip-label"
                    id="demo-mutiple-chip"
                    multiple
                    value={values["tags"]}
                    onChange={handleTagsChange}
                    input={<Input id="select-multiple-chip" />}
                    renderValue={(selected) => (
                        <div>
                            {selected.map((value) => (
                                <Chip key={value} label={value}/>
                            ))}
                        </div>
                    )}
                    fullWidth
                >
                {
                    values["tagList"].map((item) => (
                        <MenuItem key={item.id} value={item.title}>{item.title}</MenuItem>
                    ))
                }
                </Select>
            </FormControl>
        )
    }

    return (
        <div className = "onestep_newQ">
            <div className = "onestep_newQ_header">
                <h4>Ask your question</h4>
            </div>

            <div className = "onestep_newQ_main">
                <TextField 
                    id="outlined-basic" 
                    label="Title" 
                    variant="outlined" 
                    fullWidth
                    onChange = {handleOnChange}
                    value = {values["title"]}
                    name = "title"
                    size = "small"
                    placeholder = "provide a suitable title..."
                />

                <div className = "vertical_seperator"/>

                <ReactQuill 
                    value={values["content"]}
                    onChange={handleContentOnChange}
                    modules={modules}
                    formats={formats}
                    placeholder = "Ask something awesome....."
                />

                <div className = "vertical_seperator"/>

                { renderTagSelector() }

                <div className = "vertical_seperator"/>

                <div className = "button_footer">
                {
                    values["addNewLoading"] ? 
                    <div className = "loading_div">
                        <CircularProgress/>
                    </div>
                    :
                    <>
                    <Button variant="outlined" onClick = {handleCancel}>Cancel</Button>
                    <Button  type = "submit" onClick = {handlePost}>Post</Button>
                    </>
                }
                </div>
            </div>
        </div>
    )
}

export default NewQuestion
