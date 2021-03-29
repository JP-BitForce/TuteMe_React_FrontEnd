import React from "react";
import InterestCard from "./Card";
import { Grid } from "@material-ui/core";
import InterestList from "./Json";

const Content = () => {
  const getInterestCard = InterestObj => {
    return (
      <Grid item xs={12} sm={12}>
        <InterestCard {...InterestObj} />
      </Grid>
    );
  };

  return (<div>
    
    <Grid container spacing={1}>
      {InterestList.map(InterestObj => getInterestCard(InterestObj))}
    </Grid></div>
  );
};

export default Content;
