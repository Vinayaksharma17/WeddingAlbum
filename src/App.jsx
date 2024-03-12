import React, { useState, useEffect } from 'react'
import Navbar from './components/Navbar'
import MyCursiveText from './components/Text'
import ScrollProgressBars from './components/ProgressBar'
import image from './assets/image.jpg'
import Album from './components/Album'

const App = () => {
  return (
    <div className="w-full h-full flex flex-col justify-center items-center text-center">
      <Navbar />
      <div style={{ marginTop: '60px' }}>
      <div className="flex flex-col justify-center items-center">
        <ScrollProgressBars />
        <img
          src={image}
          alt="image"
          className="max-w-full max-h-full"
          style={{ width: '50%', height: 'auto' }}
        />
        <MyCursiveText />
        </div>
      </div>
      <Album />
    </div>
  )
}

export default App
