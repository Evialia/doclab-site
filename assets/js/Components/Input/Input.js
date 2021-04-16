import React, { useState } from 'react'
import Badge from '../Badge'

const Input = ({ onSubmit, props }) => {
  const [value, setValue] = useState('');

  return (
    <div className='form-control'>
      <div className='row align-items-center'>
        <div className='col'>
          <input { ...props } value={value} onKeyPress={e => {
            if (e.key === 'Enter') {
              onSubmit(e.target.value)
            }
          }} onChange={e => {
            setValue(e.target.value)
          }} />
        </div>
        <div className='col-auto'>
          {value.length > 0 && <Badge onClick={() => {
            onSubmit(value)
          }}>
            &#9166;
          </Badge>}
        </div>
      </div>
    </div>
  )
}

export default Input
