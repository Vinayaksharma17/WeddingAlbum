import React, { useState, useEffect } from 'react'
import Navbar from './components/Navbar'
import PhotoGallery from './components/PhotoGallery'
import MyCursiveText from './components/Text'
import { images } from './assets/index'
import ScrollProgressBars from './components/ProgressBar'
import image from './assets/image.jpg'
import Album from './components/Album'
// import { useState, useEffect } from 'react';
import { ref, listAll, getDownloadURL } from 'firebase/storage'
import { storage } from './firebase'
const App = () => {
  const [categories, setCategories] = useState([])
  const [selectedCategory, setSelectedCategory] = useState('')
  const [images, setImages] = useState([])

  useEffect(() => {
    // Fetch categories from Firebase Storage
    const fetchCategories = async () => {
      try {
        const rootRef = ref(storage, '')
        const folders = await listAll(rootRef)

        // Extract folder names (categories)
        const categoryNames = folders.prefixes.map((prefix) => prefix.name)
        setCategories(categoryNames)
      } catch (error) {
        console.error('Error fetching categories:', error.message)
      }
    }

    fetchCategories()
  }, [])

  const fetchImagesByCategory = async (category) => {
    try {
      const categoryRef = ref(storage, category)
      const items = await listAll(categoryRef)

      const imageUrls = await Promise.all(
        items.items.map(async (item) => {
          const url = await getDownloadURL(item)
          return { url }
        })
      )

      setImages(imageUrls)
    } catch (error) {
      console.error('Error fetching images:', error.message)
    }
  }

  const handleCategoryChange = (event) => {
    const selectedCategory = event.target.value
    setSelectedCategory(selectedCategory)
    fetchImagesByCategory(selectedCategory)
  }

  // const [selectedCategory, setSelectedCategory] = useState('All')
  // const [categoryName, setCategoryName] = useState('')
  // const handleCategorySelection = (category) => {
  //   setSelectedCategory(category); // Update the selected category based on user selection
  //   if (category === 'All') {
  //     setCategoryName('');
  //   } else {
  //     setCategoryName(category);
  //   }
  // }
  // Filter images based on the selected category
  {
    /* Display images based on the selected category */
  }
  ;<div>
    {images.map((image, index) => (
      <img key={index} src={image.url} alt={`Image ${index}`} />
    ))}
  </div>

  return (
    <div className="w-full mx-auto text-center">
      {/* <Album /> */}

      <Navbar onSelectCategory={handleCategoryChange} />

      <div style={{ marginTop: '60px' }}>
        <ScrollProgressBars />
        <img
          src={image}
          alt="image"
          style={{
            display: 'block',
            margin: '0 auto',
            maxWidth: '20%', // Adjust the maximum width as needed
            height: 'auto',
          }}
        />
        {/* <MyCursiveText filteredImages={filteredImages}/> */}
      </div>
      {/* {filteredImages.length === 0 ? (
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
      <PhotoGallery images = {}/>
    </div>
  )
}

export default App
