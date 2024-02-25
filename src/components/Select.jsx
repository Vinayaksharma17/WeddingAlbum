import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useState, useEffect } from 'react';
import { ref, listAll, getDownloadURL } from 'firebase/storage';
import { storage } from '../firebase';
export default function BasicSelect({onSelectCategory}) {
  const [photos, setPhotos] = React.useState('');

  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [images, setImages] = useState([]);

  useEffect(() => {
    // Fetch categories from Firebase Storage
    const fetchCategories = async () => {
      try {
        const rootRef = ref(storage, '');
        const folders = await listAll(rootRef);

        // Extract folder names (categories)
        const categoryNames = folders.prefixes.map((prefix) => prefix.name);
        setCategories(categoryNames);
      } catch (error) {
        console.error('Error fetching categories:', error.message);
      }
    };

    fetchCategories();
  }, []);

  
  const fetchImagesByCategory = async (category) => {
    try {
      const categoryRef = ref(storage, category);
      const items = await listAll(categoryRef);

      const imageUrls = await Promise.all(
        items.items.map(async (item) => {
          const url = await getDownloadURL(item);
          return { url };
        })
      );

      setImages(imageUrls);
    } catch (error) {
      console.error('Error fetching images:', error.message);
    }
  };

  const handleCategoryChange = (event) => {
    const selectedCategory = event.target.value;
    setSelectedCategory(selectedCategory);
    fetchImagesByCategory(selectedCategory);
  };


  // const handleChange = (event) => {
  //   setPhotos(event.target.value)
  //   onSelectCategory(event.target.value)
    // console.log(onSelectCategory);
  // };

  return (
    <>
    <Box sx={{ minWidth: 180, marginY: 1.5}} >
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Select Photos</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={selectedCategory}
          label="Select Photos"
          onChange={handleCategoryChange}
        >
          {categories?.map((name) => (
            <MenuItem value={name} key={name}>{name}</MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
     {/* Display images based on the selected category */}
     {/* <div>
     {images.map((image, index) => (
       <img key={index} src={image.url} alt={`Image ${index}`} />
     ))}
   </div> */}
   </>
  );
}