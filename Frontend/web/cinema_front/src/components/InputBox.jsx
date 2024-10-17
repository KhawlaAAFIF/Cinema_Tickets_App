import React from 'react';

const InputBox = ({ type, placeholder, name, value, onChange, required }) => {
  return (
    <div className="input-box">
      <input
        type={type}
        placeholder={placeholder}
        name={name}
        value={value}
        onChange={onChange}
        required
      />
    </div>
  );
};

export default InputBox;