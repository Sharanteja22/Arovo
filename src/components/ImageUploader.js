import React, { useState } from "react";

function ImageUploader() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [description, setDescription] = useState("");

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      alert("Please select an image!");
      return;
    }

    const formData = new FormData();
    formData.append("image", selectedFile);

    try {
      const response = await fetch("http://127.0.0.1:5000/upload", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        setDescription(data.description || "No description found");
      } else {
        const data = await response.json();
        setDescription(data.error || "Error uploading image!");
      }
    } catch (error) {
      setDescription("Error uploading image!");
      console.error(error);
    }
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">Image Upload and Description</h1>
      <div className="card shadow p-4">
        <div className="form-group mb-3">
          <label htmlFor="fileInput" className="form-label">
            Select an Image
          </label>
          <input
            type="file"
            id="fileInput"
            className="form-control"
            onChange={handleFileChange}
          />
        </div>
        <button className="btn btn-primary w-100" onClick={handleUpload}>
          Upload
        </button>
      </div>
      {description && (
        <div className="alert alert-info mt-4">
          <strong>Description:</strong> {description}
        </div>
      )}
    </div>
  );
}

export default ImageUploader;
