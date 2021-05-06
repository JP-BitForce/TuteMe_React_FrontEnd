import React, { useState } from 'react';
import { Typography, Divider,Grid,Tooltip,IconButton, Paper, Box} from "@material-ui/core/";
import AddIcon from '@material-ui/icons/Add';
import EditIcon from '@material-ui/icons/Edit';
import AddButtonPopup from "../../../components/Profile/AddButtonPopup";
import EditButtonPopup from "../../../components/Profile/EditButtonPopup";

const data =[
    {
        name :"SUBJECTS",
        Des:"",
        sub1:"Mathematics",
        sub2:"Science",
        avatar:"S",
    },
    {
        name :"TOP SKILLS",
        Des:" Communication skills",
        sub1:"Mathematics",
        sub2:"Science",
        avatar:"TS",       

    },
    {
        name :"TOOLS & TECHNOLOGIES",
        Des:" Android",
        sub1:"Mathematics",
        sub2:"Science",
        avatar:"TT", 
       },
];

function InterestCard () {
  const [openPopup, setOpenPopup] = useState(false)
  const [openEditPopup, setOpenEditPopup] = useState(false)  

   return(
    <> 
      <Paper>
        <Grid container  >
          <Grid item xs={12} style={{marginTop:20, marginLeft:20}}>
            <Box display="flex" justifyContent="space-between" alignItems="center">
              <Box><h5> SKILLS </h5> </Box>
              <Box display='flex' flexDirection='row'>
                <Tooltip title="Add">
                  <IconButton 
                    variant="contained" 
                    onClick={() => { setOpenPopup(true); }}
                    >
                      <AddIcon/>
                  </IconButton>
                </Tooltip>
                <Tooltip title="Edit">
                  <IconButton 
                    variant="contained" 
                    onClick={ () => { setOpenEditPopup(true)}}
                    >
                      <EditIcon/>
                  </IconButton>
                </Tooltip>
              </Box>
            </Box>
          </Grid>                    
        </Grid>
        { data.map((d)=>(
         <Grid  style={{marginTop:15,marginLeft:20, marginRight:20}}> 
          <Grid item container direction="row"> 
            <Grid item xs={12} sm={10}>  
              <Typography variant="caption" display="block"  align="left"  style={{marginTop:5,fontWeight:300, color:"black", fontSize:15}}>
                    {d.name}
              </Typography> 
            </Grid>
          </Grid>
          
        <Divider orientation="horizontal" style={{marginRight:10}}/>
          <Typography variant="caption" display="block" gutterBottom align="left"  style={{color:"gray", fontSize:14,marginTop:10}}>
            <Grid item container direction="row"  spacing={2}>
                <Grid item xs={12}sm={3}>{d.sub1}</Grid>
                <Grid item xs={12}sm={3}>{d.sub2}</Grid>
                <Grid item xs={12}sm={3}>{d.sub1}</Grid>
                <Grid item xs={12}sm={3}>{d.sub2}</Grid>
                <Grid item xs={12}sm={3}>{d.sub2}</Grid>
                <Grid item xs={12}sm={3}>{d.sub1}</Grid>
            </Grid>
          <br/>  
          </Typography>
        </Grid>          
       ))}
      </Paper>
        <AddButtonPopup
          title="Add Skills Form"
          openPopup={openPopup}
          setOpenPopup={setOpenPopup}
          />
        <EditButtonPopup
          title="Edit Skills Form"
          openEditPopup={openEditPopup}
          setOpenEditPopup={setOpenEditPopup}
          />           
    </>
  )     
}
export default InterestCard;
