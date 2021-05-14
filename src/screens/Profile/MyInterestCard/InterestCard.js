import React, { useState, useEffect } from 'react';
import {Typography, Divider,Grid,Tooltip,IconButton, Paper, Box} from "@material-ui/core/";
import AddIcon from '@material-ui/icons/Add';
import EditIcon from '@material-ui/icons/Edit';
import AddButtonPopup from "../../../components/Profile/AddButtonPopup";
import EditButtonPopup from "../../../components/Profile/EditButtonPopup";
import CustomButton from "../../../components/Button/CustomButton";
import { addSkills,getUserSkills } from '../../../api/skills';


function CustomInterestCard () {
    const [openSubjectPopup, setSubjectPopup] = useState(false);
    const [openTopSkillsPopup, setTopSkillsPopup] = useState(false);
    const [openToolsPopup, setToolsPopup] = useState(false);
    const [openEditSubjectPopup, setEditSubjectPopup] = useState(false);
    const [openEditTopSkillsPopup, setEditTopSkillsPopup] = useState(false);
    const [openEditToolsPopup, setEditToolsPopup] = useState(false);
    const [subjectData, setSubjectData] = useState([]);
    const [topSkillData, setTopSkillData] = useState([]);
    const [toolsTechSkillData, setToolsTechSkillData] = useState([]);

    useEffect(()=>{
       getUserSkillsDetails();
    },[]);

    const handleAddSubject = (data) => {
          setSubjectData([...subjectData,...data])
    }

    const handleAddTopSkill = (data) => {
        setTopSkillData([...topSkillData,...data])
    }

    const handleAddToolsAndTechnologies = (data) => {
        setToolsTechSkillData([...toolsTechSkillData,...data])
    }

    const getUserSkillsDetails = async () =>{
        const auth = JSON.parse(localStorage.getItem('LOGIN_RESPONSE'))
        getUserSkills(auth.accessToken, auth.userId).then(response => {
            setSubjectData(response.subjectSkills)
            setTopSkillData(response.topSkills)
            setToolsTechSkillData(response.techSkills)
        }).catch(err => {
            
        })
    }

    const handleSave = async () => {
        const auth = JSON.parse(localStorage.getItem('LOGIN_RESPONSE'))
        const request = {
            userId: auth.userId,
            subjectSkills: subjectData,
            topSkills: topSkillData,
            techSkills: toolsTechSkillData
             
        }
        await addSkills(auth.accessToken, request).then(response => {
            
        }).catch(err => {
            
        })
    }

    return(
        <>
            <Paper style={{boxShadow:'none'}}>
                <Grid container  >
                    <Grid item xs={12} style={{marginTop:20, marginLeft:20}}>
                        <Box display="flex" justifyContent="space-between" alignItems="center">
                            <Box><h5> SKILLS </h5> </Box>
                        </Box>
                    </Grid>
                </Grid>
                <Grid  style={{marginTop:15,marginLeft:20, marginRight:20}}>
                    <Grid item container direction="row">
                        <Grid item xs={12} >
                            <Box display="flex" justifyContent="space-between" alignItems="center">
                                <Typography variant="caption" display="block"  align="left"  style={{marginTop:5,fontWeight:300, color:"black", fontSize:15}}>
                                    SUBJECTS
                                </Typography>
                                <Box display='flex' flexDirection='row' marginRight= '20px'>
                                    <Tooltip title="Add">
                                        <IconButton
                                            variant="contained"
                                            onClick={() => { setSubjectPopup(true); }}
                                        >
                                            <AddIcon/>
                                        </IconButton>
                                    </Tooltip>
                                    <Tooltip title="Edit">
                                        <IconButton
                                            variant="contained"
                                            onClick={ () => { setEditSubjectPopup(true)}}
                                        >
                                            <EditIcon/>
                                        </IconButton>
                                    </Tooltip>
                                </Box>
                            </Box>
                        </Grid>
                    </Grid>

                    <Divider orientation="horizontal" style={{marginRight:10}}/>
                    <Typography variant="caption" display="block" gutterBottom align="left"  style={{color:"gray", fontSize:14,marginTop:10}}>
                        <Grid item container direction="row"  spacing={2}>
                            {subjectData.map((Sd)=>(
                                <Grid item xs={12} sm={3}>  {Sd} </Grid>
                            ))}
                        </Grid>
                        <br/>
                    </Typography>
                </Grid>
                <Grid  style={{marginTop:15,marginLeft:20, marginRight:20}}>
                    <Grid item container direction="row">
                        <Grid item xs={12} >
                            <Box display="flex" justifyContent="space-between" alignItems="center">
                                <Typography variant="caption" display="block"  align="left"  style={{marginTop:5,fontWeight:300, color:"black", fontSize:15}}>
                                    TOP SKILLS
                                </Typography>
                                <Box display='flex' flexDirection='row' marginRight= '20px'>
                                    <Tooltip title="Add">
                                        <IconButton
                                            variant="contained"
                                            onClick={() => { setTopSkillsPopup(true); }}
                                        >
                                            <AddIcon/>
                                        </IconButton>
                                    </Tooltip>
                                    <Tooltip title="Edit">
                                        <IconButton
                                            variant="contained"
                                            onClick={ () => { setEditTopSkillsPopup(true)}}
                                        >
                                            <EditIcon/>
                                        </IconButton>
                                    </Tooltip>
                                </Box>
                            </Box>
                        </Grid>
                    </Grid>

                    <Divider orientation="horizontal" style={{marginRight:10}}/>
                    <Typography variant="caption" display="block" gutterBottom align="left"  style={{color:"gray", fontSize:14,marginTop:10}}>
                        <Grid item container direction="row"  spacing={2}>
                            {topSkillData.map((Td)=>(
                                <Grid item xs={12} sm={3}>  {Td} </Grid>
                            ))}
                        </Grid>
                        <br/>
                    </Typography>
                </Grid>
                <Grid  style={{marginTop:15,marginLeft:20, marginRight:20}}>
                    <Grid item container direction="row">
                        <Grid item xs={12} >
                            <Box display="flex" justifyContent="space-between" alignItems="center">
                                <Typography variant="caption" display="block"  align="left"  style={{marginTop:5,fontWeight:300, color:"black", fontSize:15}}>
                                    TOOLS & TECHNOLOGIES
                                </Typography>
                                <Box display='flex' flexDirection='row' marginRight= '20px'>
                                    <Tooltip title="Add">
                                        <IconButton
                                            variant="contained"
                                            onClick={() => { setToolsPopup(true); }}
                                        >
                                            <AddIcon/>
                                        </IconButton>
                                    </Tooltip>
                                    <Tooltip title="Edit">
                                        <IconButton
                                            variant="contained"
                                            onClick={ () => { setEditToolsPopup(true)}}
                                        >
                                            <EditIcon/>
                                        </IconButton>
                                    </Tooltip>
                                </Box>
                            </Box>
                        </Grid>
                    </Grid>

                    <Divider orientation="horizontal" style={{marginRight:10}}/>
                    <Typography variant="caption" display="block" gutterBottom align="left"  style={{color:"gray", fontSize:14,marginTop:10}}>
                        <Grid item container direction="row"  spacing={2}>
                            {toolsTechSkillData.map((TTd)=>(
                                <Grid item xs={12} sm={3}>  {TTd} </Grid>
                            ))}
                        </Grid>
                        <br/>
                    </Typography>
                </Grid>
                <div style={{float:'right', marginBottom:10, marginRight:10}}>
                    <CustomButton label="Save" type='submit' onClick={handleSave}/>
                </div>
            </Paper>
            <AddButtonPopup
                title="Add Subjects"
                openPopup={openSubjectPopup}
                setOpenPopup={setSubjectPopup}
                addData={handleAddSubject}
            />
            <AddButtonPopup
                title="Add Top Skills"
                openPopup={openTopSkillsPopup}
                setOpenPopup={setTopSkillsPopup}
                addData={handleAddTopSkill}
            />
            <AddButtonPopup
                title="Add Tools & Technologies"
                openPopup={openToolsPopup}
                setOpenPopup={setToolsPopup}
                addData={handleAddToolsAndTechnologies}
            />
            <EditButtonPopup
                title="Edit Subjects"
                openEditPopup={openEditSubjectPopup}
                setOpenEditPopup={setEditSubjectPopup}
                editData={subjectData}
                setSubjectData = {setSubjectData}
            />
            <EditButtonPopup
                title="Edit Top Skills"
                openEditPopup={openEditTopSkillsPopup}
                setOpenEditPopup={setEditTopSkillsPopup}
                editData={topSkillData}
                setTopSkillData={setTopSkillData}
            />
            <EditButtonPopup
                title="Edit Tools & Technologies"
                openEditPopup={openEditToolsPopup}
                setOpenEditPopup={setEditToolsPopup}
                editData={toolsTechSkillData}
                setToolsTechSkillData={setToolsTechSkillData}
            />
        </>
    )
}

export default CustomInterestCard;
