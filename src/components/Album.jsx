import { useState, useEffect } from 'react';
import { ref, listAll, getDownloadURL } from 'firebase/storage';
import { storage } from '../firebase';
import Navbar from './Navbar';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import CircularProgress from '@mui/material/CircularProgress'; // Import CircularProgress component

const Album = () => {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false); // Add loading state

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
      setLoading(true); // Set loading to true while fetching images
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
    } finally {
      setLoading(false); // Set loading to false after fetching images
    }
  };

  const handleCategoryChange = (event) => {
    const selectedCategory = event.target.value;
    setSelectedCategory(selectedCategory);
    fetchImagesByCategory(selectedCategory);
  };

  return (
    <div>
      <Navbar onSelectCategory={handleCategoryChange} />
      <Box sx={{ width: 150, marginY: 1.5, marginX: 'auto' }}>
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

      {loading ? ( // Render CircularProgress while loading is true
        <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: 10 }}>
          <CircularProgress />
          <p>Loading Images...</p>
        </Box>
      ) : (
        <div className="container mx-auto px-5 py-2 lg:px-32 lg:pt-24">
          <div className="-m-1 flex flex-wrap md:-m-2 justify-center">
            {images.map((image, index) => (
              <div key={index} className="w-[700px] p-1 md:p-2">
                <img className="block h-full w-full rounded-lg object-cover object-center shadow-3xl hover:scale-100 transition-transform ease-in-out duration-300" src={image.url} alt={`Image ${index}`} />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Album;
