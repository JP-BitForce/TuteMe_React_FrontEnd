import React from 'react';
import {Paper,Typography,Grid} from "@material-ui/core"
import Chip from "@material-ui/core/Chip";
import DoneIcon from '@material-ui/icons/Done';
import CustomChip from "../../../components/Profile/CustomChip";
import CustomComboBox from "../../../components/Profile/CustomComboBox";


export default function AddMyInterest(props){

    const {selectdata,setselectdata} = props

    const handleSelect = (select)=> {
        if(selectdata.findIndex(e => e === select) === -1){
            setselectdata([...selectdata,select])
        }
        else{
            alert("already selected");
            }
        }

    const handleDelete = (select)=> {
        setselectdata(selectdata.filter((i)=>(i !== select)));
    }

    return(
        <Paper style={{maxWidth:800,minWidth:600, margin:"auto"}}>
            <Grid item container direction="column" >
                <Grid item xs={12} sm={12} align= "center">
                    <CustomComboBox selectData={handleSelect}/>
                </Grid>
                <Grid>
                    {selectdata && selectdata.map((data) => {
                        return(
                            <Chip
                                label={data}
                                style={{backgroundColor: '#00875a', color: '#fff', marginLeft:15, marginTop:15}}
                                onDelete={true}
                                onClick={() => handleDelete(data)}
                                deleteIcon={<DoneIcon style={{color:'#fff'}} />}
                            />
                        );
                    })}

                </Grid>
                <Grid item xs={12} sm={12} align= "left">
                    <Typography style={{marginLeft:15, marginTop:20}}>
                        Suggested skills based off your profile :
                    </Typography>
                </Grid>
                <Grid item xs={12} sm={12} align= "center" style={{margin:10}}>
                    <CustomChip selectData={handleSelect}/>
                </Grid>
            </Grid>
        </Paper>
    );
}