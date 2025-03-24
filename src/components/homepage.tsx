/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import '../design/main.css';
import '../design/colors.css';
import '../design/shapes.css';
import '../design/alignment.css';
import '../design/text.css';
import { Bar } from './script';
import 'bootstrap/dist/css/bootstrap.min.css';

function Homepage() {
  const [user, setUser] = useState(null);
  const [postText, setPostText] = useState("");
  const [query, setQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [feed, setFeed] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (!storedUser) {
      navigate("/login");
      return;
    }

    const parsedUser = JSON.parse(storedUser);
    fetchFullUser(parsedUser._id);
  }, [navigate]);

  const fetchFullUser = async (userId: any) => {
    try {
      const response = await fetch(`http://localhost:5000/users/${userId}`);
      const data = await response.json();
      if (data.error) {
        alert(data.error);
        navigate("/login");
      } else {
        localStorage.setItem("user", JSON.stringify(data));
        setUser(data);
      }
    } catch (err) {
      console.error("Error fetching user:", err);
      navigate("/login");
    }
  };

  const handleCreatePost = async (e) => {
    e.preventDefault();
    if (!user) return;

    try {
      const response = await fetch(
        `http://localhost:5000/users/${user._id}/posts`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ text: postText }),
        }
      );
      const updatedUser = await response.json();

      localStorage.setItem("user", JSON.stringify(updatedUser));
      setUser(updatedUser);

      setPostText("");
      alert("Post created successfully!");
    } catch (err) {
      console.error("Error creating post:", err);
      alert("Failed to create post");
    }
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!query) return;

    try {
      const response = await fetch(
        `http://localhost:5000/search?query=${encodeURIComponent(query)}`
      );
      const data = await response.json();
      setSearchResults(data);
    } catch (err) {
      console.error("Error searching users:", err);
      alert("Failed to search users");
    }
  };

  const handleFollow = async (targetId) => {
    if (!user) return;

    try {
      const response = await fetch(
        `http://localhost:5000/users/${user._id}/follow/${targetId}`,
        { method: "POST" }
      );
      const data = await response.json();

      if (data.success) {
        alert("Followed successfully!");
        if (data.user) {
          localStorage.setItem("user", JSON.stringify(data.user));
          setUser(data.user);
        }
      } else {
        alert(data.error || "Something went wrong");
      }
    } catch (err) {
      console.error("Error following user:", err);
      alert("Failed to follow user");
    }
  };

  const fetchFeed = async () => {
    if (!user) return;

    try {
      const response = await fetch(
        `http://localhost:5000/users/${user._id}/feed`
      );
      const data = await response.json();
      setFeed(data);
    } catch (err) {
      console.error("Error fetching feed:", err);
    }
  };

  useEffect(() => {
    if (user) {
      fetchFeed();
    }
  }, [user]);

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container-fluid p-0 primary">
        <form onSubmit={handleSearch} className="padding10">
          <input
            type="text"
            placeholder="Search"
            value={query}
            onChange={(e) => setQuery(e.target.value)} 
            className="margin10 bodyText"/>
          <button type="submit" className="buttonText">Search</button>
        </form>
        <div>
          {searchResults.map((result) => (
            <div key={result._id}>
              <strong>{result.username}</strong> ({result.name})
              {result._id !== user._id &&
                !user.following?.some((f) => f._id === result._id) && (
                  <button onClick={() => handleFollow(result._id)}>
                    Follow
                  </button>
                )}
            </div>
          ))}
        </div>
      <div id="navbar"></div>
      {/* <h1>{{ navbar }}</h1> */}
      {/* < Bar.navbar /> */}
        <div className="row paddingTop20">
          <div className="col-5 border10 margin20 secondary">
            <div className="circle text-center">
              <div>profile picture</div>
            </div>
            <div className="name">{user.name || user.email}</div>

            <div className="bodyText marginLeft10 marginTop20">
              Personal Information
            </div>
            <div className="bodyText marginLeft10 marginTop20">
              Email: {user.email}
            </div>
          </div>
          <div className="col margin20 secondary center">
            <div className="heading">
            <form onSubmit={handleCreatePost}>
              <textarea
                placeholder="What's on your mind?"
                value={postText}
                onChange={(e) => setPostText(e.target.value)} 
                className="bodyText"/>
              <br />
              <button type="submit" className="buttonText">Create Post</button>
            </form>
              <div className="feed marginBottom10 center marginTop10">
                <div className="row">
                <h2 className="heading text">Your Posts</h2>
                  <ul>
                    {user.posts?.map((p, index) => (
                      <li key={index}>
                        {p.text} (Created: {new Date(p.createdAt).toLocaleString()})
                      </li>
                    ))}
                  </ul>
                  </div>
              </div>
              <h2 className="heading">Feed</h2>
                    {Array.isArray(feed) &&
                      feed.map((u) => (
                        <div key={u._id}>
                          <h3 className="bodyText">
                            {u.name} (@{u.username})
                          </h3>
                          <ul className="bodyText">
                            {u.posts?.map((post: any, idx: any) => (
                              <li key={idx}>
                                {post.text} - {new Date(post.createdAt).toLocaleString()}
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
            </div>
          </div>
        </div>

      <div id="footer"></div>
    </div>
  );
}

export default Homepage;
