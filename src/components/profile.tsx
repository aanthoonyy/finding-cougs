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

function Profile() {
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
  const gotoHome = async (e) => {
    navigate("/homepage");
  }
  const gotoNet = async (e) => {
    navigate("/network");
  }
  const gotoNotif = async (e) => {
    navigate("/notification")
  }
  const gotoJob = async (e) => {
    navigate("/jobs")
  }
  const gotoProfile = async (e) => {
    navigate("/profile")
  }
  const createPost = async (e) => {
    navigate("/profile/post")
  }

  useEffect(() => {
    if (user) {
      fetchFeed();
    }
  }, [user]);

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container-fluid  p-0 primary">
        <form onSubmit={handleSearch} className="padding10 rightAlign">
          <input
            type="text"
            placeholder="Search"
            value={query}
            onChange={(e) => setQuery(e.target.value)} 
            className="margin10 bodyText"/>
          <button type="submit" className="buttonText">Search</button>
        </form>
        <div className="leftAlign">
          {searchResults.map((result) => (
            <div key={result._id} className="bodyText secondary margin10 padding10">
              {result._id !== user._id &&
                !user.following?.some((f) => f._id === result._id) && (
                  <button onClick={() => handleFollow(result._id)} className="buttonText marginLeft10">
                    Follow
                  </button>
                )}
              <strong>{result.username}</strong> ({result.name})
            </div>
          ))}
        </div>
        <div id="navbar"></div>
        <div className="row navbar">
        <div className="col d-flex rightAlign">
            <div className="navbarContent text bodyText">
                <a onClick={gotoHome} className="navbarConentLink text">Home</a>
            </div>
            <div className="navbarContent text bodyText">
                <a onClick={gotoNet} className="navbarConentLink text">Groups</a>
            </div>
            <div className="navbarContent text bodyText">
                <a onClick={gotoNotif} className="navbarConentLink text">Notifications</a>
            </div>
            <div className="navbarContent text bodyText">
                <a onClick={gotoJob} className="navbarConentLink text">Jobs</a>
            </div>
            <div className="navbarContent text bodyText">
                <a onClick={gotoProfile} className="navbarConentLink text">My Profile</a>
            </div>
        </div>
        </div>
        <div className="row paddingTop20">
            <div className="col border10 margin20 secondary">
                {/* <div className="headPhoto">Head Photo</div> */}
                {/* <div className="circle text-center">Profile photo</div> */}
                <div className="name center margin20">{user.name}</div>
                <div className="bodyText center margin20">Following: {user.following.length} | Followers: {user.followers.length}</div>

                <div className="row center marginTop10 marginBottom10">
                    <div className="col d-flex center grey">
                        <div className="bodyText marginLeft10 marginRight10 text">Posts</div>
                        <div className="bodyText marginLeft10 marginRight10 text">About Me</div>
                        <div className="bodyText marginLeft10 marginRight10 text">Media</div>
                    </div>
                </div>
                <div className="row center marginTop10 marginBottom10">
                    <div className="col d-flex center">
                    <button onClick={createPost} type="submit" className="bodyText">Create Post</button>
                    </div>
                </div>

                <div className="heading center">
                    <div className="feed marginBottom10 center marginTop10">
                        <div className="row">
                        <h3 className="heading text">Your Posts</h3>
                        <ul>
                          {user.posts?.map((p, index) => (
                            <ul key={index} className="grey margin10 padding10 border border-danger">
                              <ul className="post center">{p.text}</ul> 
                              <ul className="postFooter">(Created by: {user.name} | Created: {new Date(p.createdAt).toLocaleString()})</ul>
                            </ul>
                          ))}
                        </ul>
                        </div>
                    </div>
                </div>
            </div>
            </div>

        <div id="footer"></div>
    </div> 
  );
}

export default Profile;
