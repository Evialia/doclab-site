import React from 'react'

const Footer = () => {
  return (
    <footer>
      <div className='container'>
        <div className='row align-items-center footer-container'>
          <div className='col-auto'>
            <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 190' className='footer-logo'>
              <path
                className='gray'
                d='M60,91V60h5V50H35V60h5V91a50,50,0,1,0,20,0ZM50,180a40,40,0,1,1,40-40A40,40,0,0,1,50,180Z'
                transform='translate(0)'
              />
              <path
                className='gray'
                d='M12.25,135.69a38,38,0,0,0,75.4,9.37C62.82,149.07,37.57,132.43,12.25,135.69Z'
                transform='translate(0)'
              />
              <circle className='gray' cx='41' cy='115' r='5'/>
              <circle className='gray' cx='63' cy='132' r='5'/>
              <circle className='gray' cx='43' cy='34' r='7'/>
              <circle className='gray' cx='62' cy='10' r='10'/>
            </svg>
          </div>
          <div className='col footer-content'>
            <h1>DocLab</h1>
            <p className='m-0'>By Evialina Tokts</p>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
