import React, { useEffect, useState } from 'react'
import anime from 'animejs/lib/anime.es.js'

const Logo = ({ showSearch }) => {
  const [animations, setAnimations] = useState({
    flask: null,
    liquid: null,
    drain: null
  })

  useEffect(() => {
    const flask = anime({
      targets: '.logo .flask',
      rotate: 140,
      easing: 'easeInOutElastic',
      duration: 2000,
      autoplay: false
    })
    const liquid = anime({
      targets: '.logo .liquid',
      rotate: -15,
      easing: 'easeInOutQuad',
      duration: 1000,
      direction: 'alternate',
      loop: true,
      autoplay: true,
    })
    const drain = anime({
      targets: '.logo .liquid-clip',
      translateY: 45,
      easing: 'easeInOutQuad',
      duration: 5000,
      autoplay: false,
      loop: false,
      delay: 400
    })
    const flow = anime({
      targets: '.logo .flow-clip',
      translateY: 400,
      easing: 'easeOutQuad',
      duration: 6000,
      autoplay: true,
      loop: false,
      delay: 1300
    })
    const bubble = anime({
      targets: '.logo .bubble',
      keyframes: [
        {
          translateY: () => anime.random(-5, 5),
          translateX: () => anime.random(-5, 5),
          duration: () => anime.random(500, 2000)
        },
        {
          translateY: 0,
          translateX: 0,
          duration: () => anime.random(500, 2000)
        }
      ],
      easing: 'easeOutQuad',
      loop: true,
    })
    const pop = anime({
      targets: '.logo .bubble',
      scale: 1.05,
      opacity: 0,
      translateY: 0,
      translateX: 0,
      easing: 'linear',
      duration: () => 150,
      autoplay: false,
      loop: false,
      delay: () => anime.random(300, 700)
    })

    setAnimations({ flask, drain, pop, flow })
  }, [])

  if (showSearch) {
    Object.values(animations).forEach(animation => animation.play())
  } else {
    if (!!animations.drain) {
      Object.values(animations).forEach(animation => {
        animation.reset()
      })
    }
  }

  return <div className='logo'>
    <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 150 250'>
      <defs>
        <clipPath id='liquid-clip'>
          <path
            className='liquid-clip'
            d='M10.26,135.46a40,40,0,0,0,79.38,9.87C63.5,149.55,36.92,132,10.26,135.46Z'
            transform='translate(0)'
          />
          {/*<rect className='flow-clip' x='90' y='-20' width='100' height='200' />*/}

          <path
            className='flow-clip'
            d="M90-202.24V161h60V21h0C150-97,90-67.67,90-202.24Z"
            fill='red'
          />
          {/*<path className='flow-clip' d="M0-.23V371H100V145.8C100,109.36,0,68.16,0-.23Z" x='90' y='-20' />*/}
        </clipPath>
      </defs>

      <path
        className='flask'
        d='M60,91V60h5V50H35V60h5V91a50,50,0,1,0,20,0ZM50,180a40,40,0,1,1,40-40A40,40,0,0,1,50,180Z'
        transform='translate(0)'
      />
      <path
        className='liquid colour-liquid'
        d='M50,180a40,40,0,1,1,40-40A40,40,0,0,1,50,180Z'
        transform='translate(0)'
        clipPath='url(#liquid-clip)'
      />

      <g clipPath='url(#liquid-clip)'>
        <path
          className='colour-liquid'
          d='M4.32,13.4C15,37,11,57,0,63v9.62H61.46v-12C40,48,37.34,22.17,19.67.59'
          transform='translate(95.5 202)'
          // clipPath='url(#liquid-clip)'
        />
      </g>

      <circle className='bubble bubble-light' cx='41' cy='115' r='5'/>
      <circle className='bubble bubble-dark' cx='63' cy='132' r='5'/>
      <circle className='bubble bubble-dark' cx='43' cy='34' r='7'/>
      <circle className='bubble bubble-light' cx='62' cy='20' r='10'/>
    </svg>

  </div>
}

export default Logo
