/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import '../design/main.css';
import '../design/colors.css';
import '../design/shapes.css';
import '../design/alignment.css';
import '../design/text.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function Job() {
  const [query, setQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [jobs, setJobs] = useState<any[]>([]);
  const [user, setUser] = useState<any>(null);
  const [jobTypeFilter, setJobTypeFilter] = useState("all");

  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (!storedUser) {
      navigate("/login");
      return;
    }
    const parsedUser = JSON.parse(storedUser);
    setUser(parsedUser);
    fetchJobs();
  }, [navigate]);

  const fetchJobs = async () => {
    try {
      let url = "http://localhost:5000/jobs";
      if (jobTypeFilter !== "all") {
        url += `?type=${encodeURIComponent(jobTypeFilter)}`;
      }
      const response = await fetch(url);
      const data = await response.json();
      setJobs(data);
    } catch (err) {
      console.error("Error fetching jobs:", err);
    }
  };
  

 const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
     setJobTypeFilter(e.target.value);
   };
 
   useEffect(() => {
     fetchJobs();
   }, [jobTypeFilter]);
 
   const handleApply = async (jobId: string) => {
     if (!user) return;
     try {
       const response = await fetch(
         `http://localhost:5000/jobs/${jobId}/apply`,
         {
           method: "POST",
           headers: { "Content-Type": "application/json" },
           body: JSON.stringify({ userId: user._id }),
         }
       );
       const data = await response.json();
       if (data.success) {
         alert("Applied successfully!");
         fetchJobs();
       } else {
         alert(data.error || "Failed to apply for job");
       }
     } catch (err) {
       console.error("Error applying for job:", err);
       alert("Failed to apply for job");
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

  useEffect(() => {
    if (user) {
      fetchJobs();
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
            <div className="border10 margin20 secondary text-center">
                <h3 className="heading">Recommended Jobs</h3>
                <div>
                  <label htmlFor="jobFilter">Filter by Type: </label>
                  <select
                    id="jobFilter"
                    value={jobTypeFilter}
                    onChange={handleFilterChange}
                    className="margin10"
                  >
                    <option value="all">All</option>
                    <option value="internship">Internship</option>
                    <option value="part-time">Part-Time</option>
                    <option value="full-time">Full-Time</option>
                  </select>
                </div>
                {jobs.length === 0 ? (
                  <h3 className="name text">No jobs available at this time.</h3>
                ) : (
                  <ul className="margin20">
                    {jobs.map((job) => {
                      const hasApplied = job.applicants.some(
                        (applicant: any) =>
                          applicant.toString() === user._id.toString()
                      );
                      return (
                        <p key={job._id}>
                          <hr></hr>
                          <div className="row">
                          <div className="col center">
                          <h3 className="name text">
                            {job.title} at {job.company}
                          </h3>
                          {hasApplied ? (
                            <button disabled className="buttonText">Applied</button>
                          ) : (
                            <button onClick={() => handleApply(job._id)} className="buttonText">
                              Apply
                            </button>
                          )}
                          </div>
                          <div className="col">
                          <div className="jobDescription">{job.description}</div>
                          <div className="postFooter center margin10">Type: {job.type}</div>
                          <div className="postFooter center margin10">Applicants: {job.applicants.length}</div>
                          </div>
                          </div>
                        </p>
                      );
                    })}
                  </ul>
                )}
        </div>
    </div>
  );
}

export default Job;
