import React, { useState } from 'react';
import { Typography, Divider,Grid,Tooltip,IconButton, Paper} from "@material-ui/core/";
import AddIcon from '@material-ui/icons/Add';
import EditIcon from '@material-ui/icons/Edit';
import Popup from "../../../components/Profile/Popup";
import AddMyInterest from './AddMyInterestForm';

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

   return(
    <> 
      <Paper>
        { data.map((d)=>(
         <Grid  style={{marginTop:15,marginLeft:20, marginRight:20}}> 
          <Grid item container direction="row"> 
            <Grid item xs={12} sm={10}>  
              <Typography variant="caption" display="block"  align="left"  style={{marginTop:20,fontWeight:300, color:"black", fontSize:15}}>
                    {d.name}
              </Typography> 
            </Grid>
            <Grid item  xs={12} sm={2} style={{display:'flex'}} >
              <div>
                <Tooltip title="Edit">
                  <IconButton 
                  variant="contained" 
                  onClick={() => { setOpenPopup(true); }}>
                    <AddIcon/>
                  </IconButton>
                </Tooltip>
              </div>         
              <div>
                <Tooltip title="Edit">
                  <IconButton 
                  variant="contained" 
                  onClick={() => { setOpenPopup(true); }}>
                    <EditIcon/>
                  </IconButton>
                </Tooltip>
              </div>        
            </Grid>
          </Grid>
          
        <Divider orientation="horizontal" style={{marginRight:10}}/>
          <Typography variant="caption" display="block" gutterBottom align="left"  style={{color:"gray", fontSize:14,marginTop:10}}>
            <Grid item container direction="row"  spacing={2}>
                <Grid item xs={12}sm={3}>{d.sub1}</Grid>
                <Grid item xs={12}sm={3}>{d.sub1}</Grid>
                <Grid item xs={12}sm={3}>{d.sub1}</Grid>
                <Grid item xs={12}sm={3}>{d.sub1}</Grid>
                <Grid item xs={12}sm={3}>{d.sub1}</Grid>
                <Grid item xs={12}sm={3}>{d.sub1}</Grid>
            </Grid>
          <br/>  
          </Typography>
        </Grid>          
       ))}
      </Paper>
        <Popup
          title="Add Skills Form"
          openPopup={openPopup}
          setOpenPopup={setOpenPopup}
          >
            <AddMyInterest />
        </Popup>
    </>
  )     
}
export default InterestCard;
