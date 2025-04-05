/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import '../design/main.css';
import '../design/colors.css';
import '../design/shapes.css';
import '../design/alignment.css';
import '../design/text.css';
import { Bar } from './script';
import 'bootstrap/dist/css/bootstrap.min.css';

function Network() {
  const [user, setUser] = useState(null);
  const [query, setQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);  
  const [communities, setCommunities] = useState<any[]>([]);

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
  const grabGroup = async (e) => {
    //replace with getting group id and displaying it
    navigate("/network/group")
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
        <div className="row paddingTop20">
          <div className="col border10 margin20 secondary center">
              <h3 className="heading text">Groups</h3>
                {communities.length === 0 ? (
                  <h3 className="name text">No communities available.</h3>
                ) : (
                  <ul className="margin10">
                    {communities.map((community) => {
                      const isMember = community.members.some(
                        (member: any) => member.toString() === user._id.toString()
                      );
                      return (
                        <p key={community._id}>
                          <hr></hr>
                          <h3 className="name text">
                            <a onClick={grabGroup} className="groupLink text">
                              {community.name}
                            </a></h3>
                          <div>Members: {community.members.length}</div>
                          <p className="bodyText">{community.description}</p>
                          {isMember ? (
                            <button onClick={() => handleLeave(community._id)} className="buttonText">
                              Leave
                            </button>
                          ) : (
                            <button onClick={() => handleJoin(community._id)} className="buttonText">
                              Join
                            </button>
                          )}
                        </p>
                      );
                    })}
                  </ul>
                )}
        </div>
        </div>
            {/* 
                    <div className="notif">
                        <div className="circle1"></div>
                        <a onClick={grabGroup} className="groupLink text">Group 1</a>
                    </div>
                    <div className="notif">
                        <div className="circle1"></div>
                        <a onClick={grabGroup} className="groupLink text">Group 2</a>
                    </div>
                    <div className="notif">
                        <div className="circle1"></div>
                        <a onClick={grabGroup} className="groupLink text">Group 3</a>
                    </div>
                    <div className="notif">
                        <div className="circle1"></div>
                        <a onClick={grabGroup} className="groupLink text">Group 4</a>
                    </div>

                    <h3 className="heading text">Recommended Groups</h3>
                    <div className="notif">
                        <div className="circle1"></div>
                        <a onClick={grabGroup} className="groupLink text">Group 1</a>
                    </div>
                    <div className="notif">
                        <div className="circle1"></div>
                        <a onClick={grabGroup} className="groupLink text">Group 2</a>
                    </div>
                    <div className="notif">
                        <div className="circle1"></div>
                        <a onClick={grabGroup} className="groupLink text">Group 3</a>
                    </div>
                    <div className="notif">
                        <div className="circle1"></div>
                        <a onClick={grabGroup} className="groupLink text">Group 4</a>
                    </div>
                 */}
    </div>
  );
}

export default Network;
