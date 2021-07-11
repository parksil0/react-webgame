import React, { memo } from 'react';

const Try = memo(({ tryInfo }) => {
  return (
    <li>
      <b>{tryInfo.try}</b> - {tryInfo.result}
    </li>
  )
})

export default Try;