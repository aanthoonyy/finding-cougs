/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import '../design/main.css';
import '../design/colors.css';
import '../design/shapes.css';
import '../design/alignment.css';
import '../design/text.css';
import { Bar } from './script';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useLocation } from "react-router";

function Group() {
  const [user, setUser] = useState(null);
  const [postText, setPostText] = useState("");
  const [query, setQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [feed, setFeed] = useState([]);
  const [communities, setCommunities] = useState<any[]>([]);
  // const { community } = useParams();
  const {state} = useLocation();
  

  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (!storedUser) {
      navigate("/login");
      return;
    }
    const parsedUser = JSON.parse(storedUser);
    setUser(parsedUser);
    fetchCommunities();
  }, [navigate]);

  // const checkCommunity = async () => {
  //   if (!community) {
  //     console.error("Community was not passed");
  //   }
  // }
  const fetchCommunities = async () => {
    try {
      const response = await fetch("http://localhost:5000/network");
      const data = await response.json();
      setCommunities(data);
    } catch (err) {
      console.error("Error fetching communities:", err);
    }
  };
  const handleJoin = async (communityId: string) => {
    if (!user) return;
    try {
      const response = await fetch(
        `http://localhost:5000/network/${communityId}/join`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ userId: user._id }),
        }
      );
      const data = await response.json();
      if (data.success) {
        alert("Joined community successfully!");
        fetchCommunities();
      } else {
        alert(data.error || "Failed to join community");
      }
    } catch (err) {
      console.error("Error joining community:", err);
      alert("Failed to join community");
    }
  };

  const handleLeave = async (communityId: string) => {
    if (!user) return;
    try {
      const response = await fetch(
        `http://localhost:5000/network/${communityId}/leave`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ userId: user._id }),
        }
      );
      const data = await response.json();
      console.log("Leave response:", data);
      if (data.success) {
        alert("Left community successfully!");
        fetchCommunities();
      } else {
        alert(data.error || "Failed to leave community");
      }
    } catch (err) {
      console.error("Error leaving community:", err);
      alert("Failed to leave community");
    }
  };
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
  const gotoPeople = async (e) => {
    navigate("/network/group/people") 
  }
  const gotoPosts = async (e) => {
    navigate("/network/group") 
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
  console.log(state.community)
  if (state.community) {
    return (
      <div className="primary">
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
          <div className="row paddingTop20 center">
                  <div className="col border10 margin20 secondary text-center">
                      <div className="name margin10">{state.community.name}</div>
                      <div className="row center marginTop10 marginBottom10 grey">
                            <div className="col d-flex center">
                              <a onClick={gotoPosts} className="text bodyText marginLeft10 marginRight10 center">Posts</a>
                              <a onClick={gotoPeople} className="text bodyText marginLeft10 marginRight10 center">People</a>
                            </div>
                          </div><div className="row center marginTop10 marginBottom10">
                              <div className="col d-flex center">
                                <button onClick={createPost} type="submit" className="bodyText">Create Post</button>
                              </div>
                            </div><h3 className="heading center">Feed</h3>
                      {Array.isArray(feed) &&
                        feed.map((u) => (
                          <div key={u._id}>
                            <ul className="bodyText">
                              {u.posts?.map((post: any, idx: any) => (
                                <ul key={idx} className="grey margin10 padding10 border border-danger">
                                  <ul className="post">{post.text}</ul>
                                  <ul className="postFooter">(Created by: {u.name} | Created: {new Date(post.createdAt).toLocaleString()})</ul>
                                </ul>
                              ))}
                            </ul>
                          </div>
                        ))}
                  </div>
                </div>
      </div> 
    );
  } else {
    return gotoNet()
  }
}

export default Group;