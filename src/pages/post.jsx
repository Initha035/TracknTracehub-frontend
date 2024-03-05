import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { API_URL } from "../utils/const";
import { useAuth } from "../components/authcontext";
/**
 {
    "id": 1,
    "title": "Apple iPhone",
    "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    "type": "lost",
    "status": "PENDING",
    "image": "storage/images/5A1JLBuo51PB8B21BDKrkzyvbnjFLbO18KM7uRow.png",
    "user_id": 1,
    "created_at": "2023-10-08T14:50:16.000000Z",
    "updated_at": "2023-10-08T14:50:16.000000Z",
    "user": {
        "id": 1,
        "name": "User 1",
        "email": "user1@example.com",
        "is_volunteer": 0,
        "created_at": "2023-10-08T14:49:13.000000Z",
        "updated_at": "2023-10-08T14:49:13.000000Z"
    },
    "messages": [
      {
    "image": "storage\/images\/k8ufBOCsFqKy5T7FqlPsWV73EDNjnatG00x9rxGT.jpg",
    "body": "76.76.21.21",
    "posting_id": "1",
    "updated_at": "2023-10-08T15:48:32.000000Z",
    "created_at": "2023-10-08T15:48:32.000000Z",
    "id": 2
}
    ]
}
 */
function Post() {
  const { user, token } = useAuth();
  const params = useParams();
  const { id } = params;
  console.log(id);
  const [post, setPost] = useState({});
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await axios.get(API_URL + "/api/postings/" + id);
        setPost(response.data);
        setLoading(false);
        console.log(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchPost();
  }, []);
  if (loading) return <div>Loading...</div>;
  const makeCompleted = async () => {
    const options = {
      method: "POST",
      url: API_URL + "/api/postings/" + id + "/completed",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const resp = confirm(
      "Are you sure you want to mark this post as completed?"
    );
    if (resp) {
      try {
        const { data } = await axios.request(options);
        setPost(data);
      } catch (error) {
        console.error(error);
      }
    }
  };
  const handleCreateSubmit = async (e) => {
    e.preventDefault();
    const form = new FormData();
    form.append("body", e.target.content.value);
    form.append("posting_id", post.id);
    form.append("image", e.target.image.files[0]);
    const options = {
      method: "POST",
      url: API_URL + "/api/postings/" + id + "/messages",
      headers: {
        Authorization: `Bearer ${token}`,
        "content-type": "multipart/form-data",
      },
      data: form,
    };
    try {
      const { data } = await axios.request(options);
      setPost({
        ...post,
        messages: [data, ...post.messages],
      });
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <>
      <div className="row gx-5 my-5">
        <aside className="col-lg-6">
          <div>
            <div className="rounded-4 mb-3 d-flex justify-content-center align-items-center">
              <div className="rounded-4" target="_blank" data-type="image">
                <img
                  width={390}
                  height={350}
                  style={{ margin: "auto" }}
                  className="rounded-4 object-fit-cover"
                  src={API_URL + "/" + post.image}
                />
              </div>
            </div>
          </div>
        </aside>
        <main className="col-lg-6">
          <div className="ps-lg-3">
            <div className="d-flex justify-content-start align-items-center">
              <img
                className="rounded-circle shadow-1-strong me-3"
                src={`https://avatar.vercel.sh/${post.user.name}.svg&size=60`}
                alt="avatar"
                width={60}
                height={60}
              />
              <div>
                <h6 className="fw-bold text-primary mb-1">
                  {post.user.name} {(post.user.is_volunteer && "⭐") || ""}
                </h6>
                <p className="text-muted small mb-0">
                  Posted on {new Date(post.created_at).toLocaleDateString()}
                </p>
              </div>
            </div>
            <hr /> <h4 className="title text-dark">{post.title}</h4>
            <p>{post.description}</p>
            <div className="row">
              <dt className="col-3">Type:</dt>
              <dd className="col-9">
                {post.type === "lost" ? "Lost" : "Found"}
              </dd>
              <dt className="col-3">Status:</dt>
              <dd className="col-9">
                {post.status === "COMPLETED" ? "Completed" : "Pending"}
              </dd>
            </div>
            <hr />{" "}
            {user && user.id === post.user_id && post.status === "PENDING" && (
              <div>
                <button className="btn btn-info" onClick={makeCompleted}>
                  Mark Completed
                </button>
              </div>
            )}
          </div>
        </main>
      </div>
      <hr />
      <div className="row d-flex justify-content-center">
        <div className="col-md-12 col-lg-10 col-xl-8">
          <h4 className="fw-bold mb-4">Discussions</h4>
          <div className="card">
            {post.messages.map((message) => (
              <div className="card-body" key={message.id}>
                <div className="d-flex flex-start align-items-center">
                  <img
                    className="rounded-circle shadow-1-strong me-3"
                    src={`https://avatar.vercel.sh/${message.user.name}?size=60`}
                    alt="avatar"
                    width={60}
                    height={60}
                  />
                  <div>
                    <h6 className="fw-bold text-primary mb-1">
                      {message.user.name}{" "}
                      {(message.user.is_volunteer && "⭐") || ""}
                    </h6>
                    <p className="text-muted small mb-0">
                      Posted on{" "}
                      {new Date(message.created_at).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                <p className="mt-3 mb-4 pb-2">
                  {message.image && (
                    <img
                      src={API_URL + "/" + message.image}
                      className="card-img-top img"
                      alt={message.body}
                      style={{
                        height: "200px",
                        objectFit: "cover",
                      }}
                    />
                  )}
                  {message.body}
                </p>
                <hr />
              </div>
            ))}
            <div
              className="card-footer py-3 border-0"
              style={{ backgroundColor: "#f8f9fa" }}
            >
              <strong className="fw-bold mb-1">Create a Message</strong>
              <form onSubmit={handleCreateSubmit}>
                <div className="mb-3">
                  <label className="form-label" htmlFor="image">
                    Image
                  </label>
                  <input
                    id="image"
                    className="form-control"
                    type="file"
                    name="image"
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="content" className="form-label">
                    Message
                  </label>
                  <textarea
                    className="form-control"
                    type="text"
                    name="content"
                    id="content"
                  ></textarea>
                </div>
                <button className="btn btn-warning float-end" type="submit">
                  Create Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Post;
