import React from 'react';
import {Paper,Typography,Grid} from "@material-ui/core"
import ComboBox from '../../../components/Profile/ComboBox'
import Chip from '../../../components/Profile/Chip'

export default function AddMyInterest(){

    return(
        <Paper style={{maxWidth:800, margin:"auto"}}>
             <Grid item container direction="column" >
                <Grid item container direction="row">
                    <Grid item xs={12} sm={12} align= "left">
                        <Typography style={{marginLeft:15, marginTop:5}}>
                            Add Skills
                        </Typography>
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
            </Grid>
        </Paper>  
    );
}