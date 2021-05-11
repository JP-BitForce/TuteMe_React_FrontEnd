import React from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';


function CustomComboBox(props) {
  const {title} = props
  
  const [value, setValue] = React.useState('');

  const selectSkills = (newValue) => {
   setValue(newValue);
   if (newValue !== null){
     props.selectData(newValue)
   }
  }

  const checkSkills = (title) => {
   
    switch (title) {
        case 'Add Subjects': 
        return subjectArray

        case 'Add Top Skills': 
        return topSkillsArray

        case 'Add Tools & Technologies': 
        return toolsArray

        default: 
        return subjectArray
    }
}
  return (
      <div>
        <Autocomplete
            value={value}
            onChange={(event, newValue) => {
              selectSkills(newValue)
            }}
            id="controllable-states-demo"
            options={checkSkills(title).map((option) => option.title)}
            style={{ width: "90%", margin:10 }}
            renderInput={(params) => <TextField {...params} label="skills" variant="outlined" />}
        />
      </div>
  );
}

export default React.memo(CustomComboBox);

// filter data

const subjectArray = [
  { title: 'Mathematics', key: 0 },
  { title: 'Science', key: 1 },
  { title: 'History', key: 2 },
  { title: 'Physics', key: 3 },
  { title: 'Chemistry', key: 4 },
  { title: "Biology", key: 5 },
];

const topSkillsArray = [
 
  { title: 'leadership',key: 7 },
  { title: 'time management', key: 8 },
  { title: 'communication skill', key: 9 },
 
];

const toolsArray = [
  { title: 'React', key: 9 },
  { title: 'Java', key: 10 },
  { title: 'JavaScript', key: 11 },
  { title: 'Phython', key: 12 },
  { title: 'Machine learning', key: 13 },
];