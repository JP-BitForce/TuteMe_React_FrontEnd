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
  const {title} = props;

  const subjectData = [
    { title: 'Mathematics', key: 0 },
    { title: 'Science', key: 1 },
    { title: 'History', key: 2 },
    { title: 'Physics', key: 3 },
    { title: 'Chemistry', key: 4 },
  ];

  const topSkillsData = [
    { title: 'leadership',key: 7 },
    { title: 'time management', key: 8 },
    { title: 'communication skill', key: 9 },
  ];

  const toolsData = [
    { key: 0, title: 'Angular' },
    { key: 1, title: 'jQuery' },
    { key: 2, title: 'Polymer' },
    { key: 3, title: 'React' },
    { key: 4, title: 'Vue.js' },
  ];

  const checkSkills = (title) => {
   
    switch (title) {
        case 'Add Subjects': 
        return subjectData

        case 'Add Top Skills': 
        return topSkillsData

        case 'Add Tools & Technologies': 
        return toolsData

        default: 
        return subjectData
    }
}
  return (
      <div className={classes.root}>
        {checkSkills(title).map((data) => {
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