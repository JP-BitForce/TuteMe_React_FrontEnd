import React from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';

function CustomComboBox(props) {
    const {title} = props;
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


const subjectArray = [
    { title: 'Mathematics', key: 0 },
    { title: 'Science', key: 1 },
    { title: 'History', key: 2 },
    { title: 'Physics', key: 3 },
    { title: 'Chemistry', key: 4 },
    { title: "Biology", key: 5 },
];

const topSkillsArray = [
    { title: 'leadership',key: 0 },
    { title: 'time management', key: 1 },
    { title: 'communication skill', key: 2 },
];

const toolsArray = [
    { title: 'React', key: 0 },
    { title: 'Java', key: 1 },
    { title: 'JavaScript', key: 2 },
    { title: 'Phython', key: 3 },
    { title: 'Machine learning', key: 4 },
];
