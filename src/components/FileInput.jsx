import React, { useState } from "react";
import classnames from "./FileInput.module.css";

function FileInput({ onFileChange }) {
  const [selectedImage, setSelectedImage] = useState(null);

  const handleImageChange = (file) => {
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result);
      };
      reader.readAsDataURL(file);

      // Trigger the onFileChange callback with the selected file
      onFileChange(file);
    } else {
      setSelectedImage(null);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    handleImageChange(file);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  return (
    <div className="">
      <span>Choose an image</span>
      <div
        className={classnames.dropArea}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
      >
        <label style={{ cursor: "pointer", width: "100%", height: "100%" }}>
          <div className="form-group">
            <input
              type="file"
              hidden
              name="image"
              accept="image/*"
              className="form-control-file"
              onChange={(e) => handleImageChange(e.target.files[0])}
            />
          </div>

          {selectedImage ? (
            <div>
              <p>Click to change tje image </p>
              <img src={selectedImage} alt="Preview" className="img-fluid" />
            </div>
          ) : (
            <div className={` text-center1`}>
              <p>Click to select the image</p>
              <i className="fa fa-camera fa-3x" />
              <br />
              <br />
              <p>Drag and drop your image here</p>
            </div>
          )}
        </label>
      </div>
    </div>
  );
}

export default FileInput;
