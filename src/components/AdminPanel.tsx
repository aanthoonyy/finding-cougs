import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function AdminPanel() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [company, setCompany] = useState("");
  const [jobType, setJobType] = useState("full-time");
  
  const [jobs, setJobs] = useState<any[]>([]);
  
  const navigate = useNavigate();

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      const response = await fetch("http://localhost:5000/jobs");
      const data = await response.json();
      setJobs(data);
    } catch (err) {
      console.error("Error fetching jobs:", err);
    }
  };

  const handleAddJob = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/jobs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title,
          description,
          company,
          type: jobType,
        }),
      });
      const data = await response.json();
      if (data._id) {
        alert("Job added successfully!");
        setTitle("");
        setDescription("");
        setCompany("");
        setJobType("full-time");
        fetchJobs();
      } else {
        alert("Failed to add job");
      }
    } catch (err) {
      console.error("Error adding job:", err);
      alert("Error adding job");
    }
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h1>Admin Panel - Manage Jobs</h1>

      <h2>Add a New Job</h2>
      <form onSubmit={handleAddJob}>
        <div style={{ marginBottom: "1rem" }}>
          <label>
            Job Title:
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              style={{ marginLeft: "1rem" }}
            />
          </label>
        </div>
        <div style={{ marginBottom: "1rem" }}>
          <label>
            Description:
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              style={{ marginLeft: "1rem", verticalAlign: "top" }}
            />
          </label>
        </div>
        <div style={{ marginBottom: "1rem" }}>
          <label>
            Company:
            <input
              type="text"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              required
              style={{ marginLeft: "1rem" }}
            />
          </label>
        </div>
        <div style={{ marginBottom: "1rem" }}>
          <label>
            Job Type:
            <select
              value={jobType}
              onChange={(e) => setJobType(e.target.value)}
              required
              style={{ marginLeft: "1rem" }}
            >
              <option value="internship">Internship</option>
              <option value="part-time">Part-Time</option>
              <option value="full-time">Full-Time</option>
            </select>
          </label>
        </div>
        <button type="submit">Add Job</button>
      </form>

      <hr />

      <h2>Current Job Listings</h2>
      {jobs.length === 0 ? (
        <p>No jobs available at this time.</p>
      ) : (
        <ul>
          {jobs.map((job) => (
            <li
              key={job._id}
              style={{
                border: "1px solid #ccc",
                marginBottom: "1rem",
                padding: "1rem",
              }}
            >
              <h3>
                {job.title} at {job.company}
              </h3>
              <p>{job.description}</p>
              <p>Type: {job.type}</p>
              <p>Applicants: {job.applicants.length}</p>
              {job.applicants.length > 0 && (
                <ul>
                  {job.applicants.map((applicant: any) => (
                    <li key={applicant._id}>
                      {applicant.name} ({applicant.username})
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default AdminPanel;
