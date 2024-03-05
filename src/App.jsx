import { useState } from "react";
import { Routes } from "react-router-dom";
import { Route } from "react-router-dom";
import Home from "./pages/home";
import Post from "./pages/post";
import Register from "./pages/register";
import Login from "./pages/login";
import NotFound from "./pages/notfound";
import CreatePost from "./pages/create-post";

function App() {
  return (
    <>
      <Routes>
        <Route path="/register" Component={Register} />
        <Route path="/login" Component={Login} />
        <Route path="*" element={<Content />} />
      </Routes>
    </>
  );
}

export default App;

function Content() {
  return (
    <main className="container pt-5">
      <Routes>
        <Route path="/create-post" Component={CreatePost} />
        <Route path="/post/:id" Component={Post} />
        <Route path="/" Component={Home} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </main>
  );
}
