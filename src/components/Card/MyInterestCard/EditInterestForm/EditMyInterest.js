import React from 'react';
import {Paper,Typography,Button,IconButton,Grid} from "@material-ui/core"
import CloseIcon from '@material-ui/icons/Close';
import ComboBox from './ComboBox'
import Chip from './Chip'

export default function EditMyInterest(){
    
    return(
        <Paper style={{maxWidth:800, margin:"auto"}}>
             <Grid item container direction="column">
                <Grid item container direction="row">
                    <Grid item xs={12} sm={6} align= "left">
                        <Typography style={{marginLeft:15, marginTop:5}}>
                            Add Skills
                        </Typography>
                    </Grid>
                    <Grid item xs={12} sm={6} align="right">
                        <IconButton>
                            <CloseIcon/>
                        </IconButton>
                    </Grid>
                </Grid>
                <Grid item xs={12} sm={12} align= "center">
                  <ComboBox/>
                </Grid>
                <Grid item xs={12} sm={12} align= "left">
                    <Typography style={{marginLeft:15, marginTop:5}}>
                    Suggested skills based off your profile :
                    </Typography>
                </Grid>
                <Grid item xs={12} sm={12} align= "center" style={{margin:10}}>
                    <Chip/>
                </Grid>
                <Grid item xs={12} sm={12} align= "right">
                    <Button style={{color:"white",backgroundColor:"#2578F5", margin:10}}> Save </Button>
                </Grid>
            </Grid>
        </Paper>  
    );
}