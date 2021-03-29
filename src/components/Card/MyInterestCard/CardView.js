import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { Grid, } from "@material-ui/core";
import Content from "./ObjectConvert";


function  App()
{
 
AOS.init();
  return (
    <div>      <br />

            <Grid container direction="column">
        <Grid item></Grid>
        <Grid item container>
          <Grid item xs={false} sm={1} />
          <Grid item xs={12} sm={10} align="justify">
          
            <Content/>
            
          </Grid>
          <Grid item xs={false} sm={1} />
        </Grid>
      </Grid>
      </div>);}
      export default App;