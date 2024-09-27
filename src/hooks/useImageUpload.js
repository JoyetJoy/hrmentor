import { useState } from "react";

export default function useImageUpload() {
  const [image, setImage] = useState(null); // URL of the uploaded image
  const [imageFile, setImageFile] = useState(null); // Image file object

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImageFile(file); // Store the file
      const imageUrl = URL.createObjectURL(file); // Create a URL for the image
      setImage(imageUrl); // Set the image URL
    }
  };

  const clearImage = () => {
    setImage(null);
    setImageFile(null);
  };

  return {
    image,
    imageFile,
    handleImageChange,
    clearImage,
  };
}
