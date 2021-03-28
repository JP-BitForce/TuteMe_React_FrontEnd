import React from 'react';

import Rating from '@material-ui/lab/Rating';
import Box from '@material-ui/core/Box';

const SimpleRating = ({rate, handleOnChange}) => {
  return (
    <div>
      <Box component="fieldset" mb={3} borderColor="transparent">
        <Rating
          name="simple-controlled"
          value={rate}
          onChange={(event, newValue) => {
            handleOnChange(newValue);
          }}
        />
      </Box>
    </div>
  );
}

export default SimpleRating