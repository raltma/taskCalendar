import React, { useState } from 'react';

export const TaskCalendar = () => {
  const [state] = useState('hello world');

  return <>{state}</>;
};
