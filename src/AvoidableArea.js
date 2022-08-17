import React from 'react';

const Area = ({children}) => (
  <>
    {children}
  </>
);

Object.defineProperty(Area, 'isAvoidable', {
  configurable: false,
  get() {
    return true;
  },
});

export { Area };