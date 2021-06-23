import React from 'react';

const Button = ({content, onClick}) => {
  return (
    <button 
      className="w-full px-8 rounded-lg max-w-md bg-yellow-400  text-gray-800 font-bold p-4 uppercase border-yellow-500 border-t border-b border-r"
      onClick={() => onClick()}
    >
      {content}
    </button>
  )
}

export default Button;