import React from 'react';
import {Card, Typography, Divider} from "@material-ui/core/";
const data =[
    {
        name :"Mathematics",
        Des:" i love this subject.when i solve problems  i got happiness"
    },{
        name :"Kotlin",
        Des:" i love this subject.when i solve problems  i got happiness"
    },
];

export default function Interest() {
    return(<Card>
        { data.map((d)=>(
        <Typography componenet="h3">
            {d.name}
       
   
            {d.Des}
            <Divider orientation="horizontal"/>
             </Typography>
   ))}
    </Card>);
}
