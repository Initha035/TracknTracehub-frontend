import React from "react";
import { useAuth } from "../components/authcontext";
import { useEffect } from "react";
import { useState } from "react";
import { API_URL } from "../utils/const";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import FileInput from "../components/FileInput";
export default function CreatePost() {
  const { user, token } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    type: "lost",
    status: "PENDING",
    image: "",
    location: "",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const form = new FormData();
    for (const key in formData) {
      form.append(key, formData[key]);
    }

    const options = {
      method: "POST",
      url: API_URL + "/api/postings",
      headers: {
        Authorization: `Bearer ${token}`,
        "content-type": "multipart/form-data",
      },
      data: form,
    };

    try {
      const { data } = await axios.request(options);
      console.log(data);
      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };
  if (!user) {
    return <div>You are not logged in</div>;
  }
  return (
    <div>
      <h2 className="mt-4">Create New Post</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="title" className="form-label">
            Title:
          </label>
          <input
            type="text"
            className="form-control"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="description" className="form-label">
            Description:
          </label>
          <textarea
            className="form-control"
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
          ></textarea>
        </div>

        {/* <div className="mb-3">
          <label htmlFor="image" className="form-label">
            Image:
          </label>
          <input
            type="file"
            className="form-control"
            id="image"
            name="image"
            onChange={(e) =>
              setFormData({ ...formData, image: e.target.files[0] })
            }
          />
        </div> */}
        <FileInput
          onFileChange={(file) => setFormData({ ...formData, image: file })}
        />
        <div className="mb-3">
          <label htmlFor="type" className="form-label">
            Type:
          </label>
          <select
            className="form-control"
            id="type"
            name="type"
            onChange={handleChange}
          >
            <option value="lost">Lost</option>
            <option value="found">Found</option>
          </select>
        </div>

        <div className="mb-3">
          <label htmlFor="location" className="form-label">
            Location:
          </label>
          <input
            type="text"
            className="form-control"
            id="location"
            name="location"
            value={formData.location}
            onChange={handleChange}
          />
        </div>

        <button type="submit" className="btn btn-dark">
          Submit
        </button>
      </form>
    </div>
  );
}
