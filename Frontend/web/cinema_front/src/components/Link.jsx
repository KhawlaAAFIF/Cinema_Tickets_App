import React from 'react';

const Link = ({ children, onClick }) => {
  return (
    <a href="#" onClick={onClick}>
      {children}
    </a>
  );
};

export default Link;