/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import '../design/main.css';
import '../design/colors.css';
import '../design/shapes.css';
import '../design/alignment.css';
import '../design/text.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function Profile() {
  const [user, setUser] = useState(null);
  const [aboutMeText, setAboutMeText] = useState("");
  const [query, setQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [feed, setFeed] = useState([]);
  const [majorText, setMajorText] = useState("");
  const [ageText, setAgeText] = useState("");
  const [ethnicityText, setEthnicityText] = useState("");


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
  const handleCreateAboutMe = async (e) => {
    e.preventDefault();
    if (!user) return;

    try {
      const response = await fetch(
        `http://localhost:5000/users/${user._id}/aboutme`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ aboutMe: aboutMeText, 
            major: majorText, 
            age: ageText, 
            ethnicity: ethnicityText }),
        }
      );
      const updatedUser = await response.json();

      localStorage.setItem("user", JSON.stringify(updatedUser));
      setUser(updatedUser);

      setAboutMeText("");
      setMajorText("");
      setAgeText("");
      setEthnicityText("");
      alert("Information created successfully!");
    } catch (err) {
      console.error("Error adding information:", err);
      alert("Failed to add information");
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
  const gotoAboutMe = async (e) => {
    navigate("/profile/aboutMe") 
  }
  const gotoPosts = async (e) => {
    navigate("/profile") 
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
                <div className="name center margin20">{user.name}</div>
                <div className="bodyText center margin20">Following: {user.following.length} | Followers: {user.followers.length}</div>

                <div className="row center marginTop10 marginBottom10">
                    <div className="col d-flex center grey">
                    <a onClick={gotoPosts} className="text bodyText marginLeft10 marginRight10 center">Posts</a>
                    <a onClick={gotoAboutMe} className="text bodyText marginLeft10 marginRight10 center">About Me</a>
                    </div>
                </div>

                <div className="heading center">
                    <div>
                      <div className="row heading marginTop20">
                        <div className="col">Major: {user.major}</div>
                        <div className="col">Age: {user.age}</div>
                        <div className="col">Ethnicity: {user.ethnicity}</div>
                      </div>
                      
                      <h3 className="heading">About Me</h3>
                      <p className="bodyText text">{user.aboutMe}</p>
                    </div>
                    <form onSubmit={handleCreateAboutMe}>
                      <div className="row paddingTop20">
                          <div className="col border10 margin20">
                              <div className="margin10">
                                  <input 
                                  type="text" 
                                  className="form-control bodyText text" 
                                  id="major" 
                                  name="major" 
                                  placeholder="Your Major"
                                  value={majorText}
                                  onChange={(e) => setMajorText(e.target.value)}/>
                              </div>
                              <div className="margin10">
                                  <input 
                                  type="text" 
                                  className="form-control bodyText text" 
                                  id="age" 
                                  name="age" 
                                  placeholder="Your Age"
                                  value={ageText}
                                  onChange={(e) => setAgeText(e.target.value)}/>
                              </div>
                              <div className="margin10">
                                  <input 
                                  type="text" 
                                  className="form-control bodyText text" 
                                  id="ethnicity" 
                                  name="ethnicity" 
                                  placeholder="Ethnicity"
                                  value={ethnicityText}
                                  onChange={(e) => setEthnicityText(e.target.value)}/>
                              </div>
                              <div className="margin10">
                                  <input 
                                  type="text" 
                                  className="form-control bodyText text" 
                                  id="aboutMe" 
                                  name="aboutMe" 
                                  placeholder="About Me"
                                  value={aboutMeText}
                                  onChange={(e) => setAboutMeText(e.target.value)}/>
                              </div>
                              <button type="submit" className="btn btn-primary center buttonText">Submit</button>
                          </div>
                          </div>
                  </form>
                </div>
            </div>
            </div>
    </div> 
  );
}

export default Profile;
