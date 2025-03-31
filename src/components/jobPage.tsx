import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function JobPage() {
  const [jobs, setJobs] = useState<any[]>([]);
  const [user, setUser] = useState<any>(null);
  const navigate = useNavigate();

  // Load logged-in user from localStorage and fetch jobs on mount
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (!storedUser) {
      navigate("/login");
      return;
    }
    setUser(JSON.parse(storedUser));
    fetchJobs();
  }, [navigate]);

  // Fetch all available jobs
  const fetchJobs = async () => {
    try {
      const response = await fetch("http://localhost:5000/jobs");
      const data = await response.json();
      setJobs(data);
    } catch (err) {
      console.error("Error fetching jobs:", err);
    }
  };

  // Handle applying for a job
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
        fetchJobs(); // Refresh the jobs list
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
      {jobs.length === 0 ? (
        <p>No jobs available at this time.</p>
      ) : (
        <ul>
          {jobs.map((job) => {
            const hasApplied = job.applicants.some(
              (applicant: any) => applicant.toString() === user._id.toString()
            );
            return (
              <li key={job._id}>
                <h3>
                  {job.title} at {job.company}
                </h3>
                <p>{job.description}</p>
                <p>Applicants: {job.applicants.length}</p>
                {hasApplied ? (
                  <button disabled>Applied</button>
                ) : (
                  <button onClick={() => handleApply(job._id)}>Apply</button>
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
