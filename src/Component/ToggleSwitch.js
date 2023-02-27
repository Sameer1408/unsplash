import React, { useState } from 'react';
import ReactSwitch from 'react-switch';

function ToggleSwitch({checked,setChecked}) {
//   const [checked, setChecked] = useState(true);

  const handleChange = val => {
    setChecked(val)
  }

  return (
    
      <ReactSwitch
        checked={checked}
        onChange={handleChange}
        height={15}
        width={30}
        handleDiameter={11}
        onColor={'#fff'	}
        offColor={'#343a40'}
        onHandleColor={'#343a40'}
        uncheckedIcon={false}
       />
    
  );
}

export default ToggleSwitch;