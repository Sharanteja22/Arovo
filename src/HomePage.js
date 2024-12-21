import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

function HomePage() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [description, setDescription] = useState("");

  const callMLModel = async (file) => {
    try {
      const apiUrl = "http://localhost:5000/upload";

      const formData = new FormData();
      formData.append('image', file);

      const response = await fetch(apiUrl, {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        const result = await response.json();
        setDescription(result.description);
      } else {
        setDescription("Failed to get description. Please try again.");
      }
    } catch (error) {
      console.error("Error while calling the ML model:", error);
      setDescription("An error occurred. Please try again.");
    }
  };

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (selectedFile) {
      callMLModel(selectedFile);
    } else {
      alert("Please select an image file first.");
    }
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center text-primary mb-4">Welcome to Image Description App</h1>
      <div className="card p-4 shadow-lg">
        <div className="mb-3">
          <label htmlFor="fileUpload" className="form-label">Upload an Image</label>
          <input
            type="file"
            className="form-control"
            id="fileUpload"
            onChange={handleFileChange}
          />
        </div>
        <button
          className="btn btn-primary w-100"
          onClick={handleSubmit}
        >
          Upload Photo
        </button>
      </div>
      {description && (
        <div className="mt-4 p-3 bg-light border rounded">
          <h2 className="text-success">Generated Description:</h2>
          <p className="text-dark">{description}</p>
        </div>
      )}
    </div>
  );
}

export default HomePage;
