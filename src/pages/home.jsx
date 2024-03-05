import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import { useAuth } from "../components/authcontext";
import { API_URL } from "../utils/const";
import { Link } from "react-router-dom";
function Home() {
  const [postings, setPostings] = useState([]);
  const [loading, setLoading] = useState(true);
  // filter postings by type
  const [filters, setFilters] = useState({
    type: "",
    status: "",
    search: "",
  });
  const [searchQuery, setSearchQuery] = useState(filters.search);
  const { user } = useAuth();
  useEffect(() => {
    // use axios to fetch data from the API
    const fetchPostings = async () => {
      try {
        const response = await axios.get(API_URL + "/api/postings");
        setPostings(response.data);
        setLoading(false);
      } catch (error) {
        console.error(error);
      }
    };
    fetchPostings();
  }, []);
  useEffect(() => {
    const fetchPostings = async () => {
      try {
        const response = await axios.get(API_URL + "/api/postings", {
          params: filters,
        });
        setPostings(response.data);
        setLoading(false);
      } catch (error) {
        console.error(error);
      }
    };
    fetchPostings();
  }, [filters]);
  return (
    <>
      {user && (
        <div className="d-flex align-items-center justify-content-between my-4">
          <h3>
            Welcome, {user.name} {user.is_volunteer ? "⭐" : ""}
          </h3>
          <Link className="btn btn-outline-secondary" to="/create-post">
            Create Post
          </Link>
        </div>
      )}
      <div className="d-flex flex-column-reverse justify-content-between align-items-center my-4 flex-md-row">
        <div className="d-flex justify-content-between align-items-center ">
          <select
            className="form-select"
            name="type"
            value={filters.type}
            onChange={(e) => setFilters({ ...filters, type: e.target.value })}
          >
            <option value="">Type</option>
            <option value="lost">Lost</option>
            <option value="found">Found</option>
          </select>
          <select
            className="form-select"
            name="status"
            value={filters.status}
            onChange={(e) => setFilters({ ...filters, status: e.target.value })}
          >
            <option value="">Status</option>
            <option value="PENDING">Pending</option>
            <option value="COMPLETED">Completed</option>
          </select>
        </div>
        <div>
          <form
            className="d-flex justify-content-center gap-2"
            role="search"
            onSubmit={(e) => {
              e.preventDefault();
              setFilters({ ...filters, search: searchQuery, type: "" });
            }}
          >
            <input
              className="form-control"
              type="text"
              placeholder="Search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button className="btn btn-warning" type="submit">
              Search
            </button>
          </form>
        </div>
      </div>

      {loading ? (
        <div>Loading...</div>
      ) : (
        <>
          {postings.length ? (
            <p>Listing {postings.length} posts</p>
          ) : (
            <div>No results found</div>
          )}
          {/* responsive grid */}
          <div className="row">
            {postings.map((posting) => (
              <div className="col-md-4 col-12 gy-md-4" key={posting.id}>
                <div className="card">
                  <img
                    src={API_URL + "/" + posting.image}
                    className="card-img-top img"
                    alt={posting.title}
                    style={{
                      height: "200px",
                      objectFit: "cover",
                      objectPosition: "center",
                    }}
                  />
                  <div className="card-body">
                    <h5
                      className="card-title d-flex align-items-center gap-2"
                      style={{ fontFamily: "Acme, sans-serif" }}
                    >
                      {posting.title}
                      {posting.status == "COMPLETED" && (
                        <i
                          className="fa fa-check-circle"
                          aria-hidden="true"
                          style={{
                            color:
                              posting.status === "COMPLETED" ? "green" : "red",
                          }}
                        ></i>
                      )}
                    </h5>
                    <span className="d-flex gap-1 align-items-center">
                      <i className="fa-solid fa-location-dot"></i>
                      Chennai
                    </span>

                    <br />
                    <span className="d-flex gap-1 align-items-center">
                      <i className="fa-regular fa-calendar"></i>
                      {new Date(posting.created_at).toLocaleDateString()}
                    </span>
                  </div>

                  <Link
                    to={`/post/${posting.id}`}
                    className="card-body"
                    style={{
                      backgroundColor: "white",
                    }}
                  >
                    <div className="btn btn-primary">View Details</div>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </>
  );
}

export default Home;
