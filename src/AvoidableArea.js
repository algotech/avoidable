import React from 'react';

const Area = ({children}) => {
  if (!children && __DEV__) {
    throw new Error('Please add at least one element between the Avoidable.Area tags.');
  }

  return (
    <>
      {children}
    </>
  )
};

Object.defineProperty(Area, 'isAvoidable', {
  configurable: false,
  get() {
    return true;
  },
});

export { Area };