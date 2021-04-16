import React from 'react'

const Badge = ({ children, onClick }) => <button className='badge' onClick={onClick}>
  {children}
</button>

export default Badge
