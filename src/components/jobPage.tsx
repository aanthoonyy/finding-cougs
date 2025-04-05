import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function JobPage() {
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
    setUser(JSON.parse(storedUser));
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

  return (
    <div>
      <h1>Job Listings</h1>
      
      <div>
        <label htmlFor="jobFilter">Filter by Type: </label>
        <select
          id="jobFilter"
          value={jobTypeFilter}
          onChange={handleFilterChange}
        >
          <option value="all">All</option>
          <option value="internship">Internship</option>
          <option value="part-time">Part-Time</option>
          <option value="full-time">Full-Time</option>
        </select>
      </div>

      {jobs.length === 0 ? (
        <p className="notif">No jobs available at this time.</p>
      ) : (
        <ul>
          {jobs.map((job) => {
            const hasApplied = job.applicants.some(
              (applicant: any) =>
                applicant.toString() === user._id.toString()
            );
            return (
              <li key={job._id}>
                <h3>
                  {job.title} at {job.company}
                </h3>
                <p className="jobDescription">{job.description}</p>
                <p className="qualifications">Type: {job.type}</p>
                <p>Applicants: {job.applicants.length}</p>
                {hasApplied ? (
                  <button disabled>Applied</button>
                ) : (
                  <button onClick={() => handleApply(job._id)}>
                    Apply
                  </button>
                )}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}

export default JobPage;
