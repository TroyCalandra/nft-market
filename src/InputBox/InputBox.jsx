import React, {useState} from 'react';
import './InputBox.css';

const InputBox = ({name, placeholder, onChange}) => {
  const [value, updateValue] = useState({});

  return(
    <div className="w-full">
      <input 
      className="w-full rounded-lg max-w-md p-4 border-t mr-0 border-b border-l text-gray-800 border-gray-200 bg-white" 
      placeholder={placeholder}
      onChange={(e) => onChange(name, e.target.value)}
      />
    </div>
  )
}

export default InputBox;