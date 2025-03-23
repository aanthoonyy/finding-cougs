/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

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
    <div>
      <h1>Welcome, {user.name || user.email}!</h1>

      <form onSubmit={handleCreatePost}>
        <textarea
          placeholder="What's on your mind?"
          value={postText}
          onChange={(e) => setPostText(e.target.value)}
        />
        <br />
        <button type="submit">Create Post</button>
      </form>

      <hr />

      <h2>Your Posts</h2>
      <ul>
        {user.posts?.map((p, index) => (
          <li key={index}>
            {p.text} (Created: {new Date(p.createdAt).toLocaleString()})
          </li>
        ))}
      </ul>

      <hr />

      <h2>Search for People</h2>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Enter a name or username"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button type="submit">Search</button>
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

      <hr />

      <h2>Following</h2>
      {user.following && user.following.length > 0 ? (
        <ul>
          {user.following.map((followedUser) => (
            <li key={followedUser._id}>
              {followedUser.username} ({followedUser.name})
            </li>
          ))}
        </ul>
      ) : (
        <p>You are not following anyone yet.</p>
      )}

      <hr />

      <h2>Followers</h2>
      {user.followers && user.followers.length > 0 ? (
        <ul>
          {user.followers.map((follower) => (
            <li key={follower._id}>
              {follower.username} ({follower.name})
            </li>
          ))}
        </ul>
      ) : (
        <p>No one is following you yet.</p>
      )}

      <hr />

      <h2>Feed</h2>
      {Array.isArray(feed) &&
        feed.map((u) => (
          <div key={u._id}>
            <h3>
              {u.name} (@{u.username})
            </h3>
            <ul>
              {u.posts?.map((post: any, idx: any) => (
                <li key={idx}>
                  {post.text} - {new Date(post.createdAt).toLocaleString()}
                </li>
              ))}
            </ul>
            <hr />
          </div>
        ))}
    </div>
  );
}

export default Homepage;
