import React, { useState } from 'react'
import Navbar from './components/Navbar'
import PhotoGallery from './components/PhotoGallery'
import MyCursiveText from './components/Text'
import { images } from './assets/index'
import ScrollProgressBars from './components/ProgressBar'
import image from './assets/image.jpg'
import Album from './components/Album'
const App = () => {

    const [selectedCategory, setSelectedCategory] = useState('All')
    const [categoryName, setCategoryName] = useState('')
    const handleCategorySelection = (category) => {
      setSelectedCategory(category); // Update the selected category based on user selection
      if (category === 'All') {
        setCategoryName('');
      } else {
        setCategoryName(category);
      }
    }
    // Filter images based on the selected category
  const filteredImages = selectedCategory === "All" ? images :
   images.filter((image) => image.category === selectedCategory)
  
  return (
    <div className='w-full mx-auto text-center'>
      <Album />

      {/* <Navbar onSelectCategory={handleCategorySelection} />
      
      <div style={{ marginTop: '60px' }}>
      <ScrollProgressBars />
      <img 
      src={image} 
      alt='image' 
      style={{
        display: 'block',
        margin: '0 auto',
        maxWidth: '20%', // Adjust the maximum width as needed
        height: 'auto',
      }}/>
        <MyCursiveText filteredImages={filteredImages}/>
      </div>
      {filteredImages.length === 0 ? (
        <div className="h-screen flex flex-col justify-center items-center">
          <div className="flex items-center justify-center">
            <img
              src="https://img.freepik.com/free-vector/hand-drawn-no-data-concept_52683-127823.jpg?w=300" // Adjust the width as needed
              height="auto" // Maintain aspect ratio
              alt="No Data"
            />
          </div>
          <p> 
            Oops! no photos found. Please add photos in {categoryName}{' '}
          </p>
        </div>
      ) : (
        <PhotoGallery images={filteredImages} />
      )} */}
    </div>
  )
}

export default App
