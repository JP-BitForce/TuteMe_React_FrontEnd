import React from "react";
import { Typography,Grid,Paper,Avatar } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";


const InterestCard = (props) => {
  const { name,Des, avatar} = props;
  const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    paper: {
      padding: theme.spacing(2),
      margin: "auto",
      maxWidth: 1600,
      evolution:3,
    backgroundColor: "#f5f5f5"
    },

    
  }));
  const classes = useStyles();
  
  return (
    <div data-aos="zoom-in">
      <div className={classes.root}>
        <Paper className={classes.paper}>
          <Grid container spacing={2}>
           
            <Grid item xs={12} sm container>
              <Grid item xs container direction="column" spacing={2}>
                <Grid item xs>
               
                 <Typography component="h7" variant="h5">
                 <Avatar>{avatar}</Avatar>    {name}
                  </Typography>
                
<br/>
                  <Typography variant="body2" gutterBottom>
                    <div className={classes.status}> {Des}</div>
                  </Typography>
                </Grid>
                
              </Grid>
              
<br/>
              
            </Grid>
          </Grid>
        </Paper>
      </div>
    </div>
  );
};

export default InterestCard;