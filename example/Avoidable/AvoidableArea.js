import React from 'react';

const Area = ({children}) => (
  <>
    {children}
  </>
);

Object.defineProperty(Area, 'isAvoidable', {
  value: true,
  writable: false,
  configurable: false,
  get() {
    return true;
  },
});

export { Area };