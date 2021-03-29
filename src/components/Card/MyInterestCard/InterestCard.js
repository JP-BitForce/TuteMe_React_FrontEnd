import React from 'react';
import { Typography, Divider,Grid} from "@material-ui/core/";
import IconButton from '@material-ui/core/IconButton';
import AddIcon from './AddIcon'
import EditIcon from './EditIcon'
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

export default function Interest() {
    return(
  <Grid>
    { data.map((d)=>(
     <Grid  style={{marginTop:15,marginLeft:20, marginRight:20}}> 
      <Grid item container direction="row"> 
        <Grid item xs={12} sm={10}>  
          <Typography variant="caption" display="block"  align="left"  style={{marginTop:20,fontWeight:300, color:"black", fontSize:15}}>
                {d.name}
          </Typography> 
        </Grid>
        <Grid item  xs={12} sm={2} align="right"> 
          <IconButton aria-label="delete">
            <AddIcon />
          </IconButton>
          <IconButton aria-label="delete"  >
            <EditIcon />
          </IconButton>
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
  </Grid>
  );
}
