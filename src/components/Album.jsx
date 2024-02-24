import { useState, useEffect } from 'react';
import { ref, listAll, getDownloadURL } from 'firebase/storage';
import { storage } from '../firebase';

const Album = () => {
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

  return (
    <div>
      <h1>Photo Album</h1>

      {/* Category selection dropdown */}
      <label htmlFor="category">Select Category: </label>
      <select id="category" value={selectedCategory} onChange={handleCategoryChange}>
        <option value="">-- Select Category --</option>
        {categories.map((category, index) => (
          <option key={index} value={category}>
            {category}
          </option>
        ))}
      </select>

      {/* Display images based on the selected category */}
      <div>
        {images.map((image, index) => (
          <img key={index} src={image.url} alt={`Image ${index}`} />
        ))}
      </div>
    </div>
  );
};

export default Album;