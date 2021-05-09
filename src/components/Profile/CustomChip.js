import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Chip from '@material-ui/core/Chip';
import DoneIcon from '@material-ui/icons/Add';


const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
    '& > *': {
      margin: theme.spacing(0.5),
    },
  },
}));

function CustomChip(props) {
  const classes = useStyles();
  const skillData = [
    { key: 0, title: 'Angular' },
    { key: 1, title: 'jQuery' },
    { key: 2, title: 'Polymer' },
    { key: 3, title: 'React' },
    { key: 4, title: 'Vue.js' },
  ];

  return (
      <div className={classes.root}>
        {skillData.map((data) => {
          return(
              <Chip
                  label={data.title}
                  clickable
                  onDelete={true}
                  onClick={() => props.selectData(data.title)}
                  deleteIcon={<DoneIcon style={{color : '#000'}}/>}
              />
          );
        })}
      </div>
  );
}

export default React.memo(CustomChip);