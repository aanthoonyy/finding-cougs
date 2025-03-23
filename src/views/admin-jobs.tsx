import '../css files/index.css'
import '../css files/main.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function AdminJobs () {
  return (
    <div className="container mt-5">
      <h1 className="mb-4">Edit/Create Jobs</h1>
      <form>
        <div className="mb-3">
          <label htmlFor="jobTitle" className="form-label">Job Title</label>
          <input
            type="text"
            className="form-control"
            id="jobTitle"
            placeholder="Enter job title"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="jobDescription" className="form-label">Job Description</label>
          <textarea
            className="form-control"
            id="jobDescription"
            rows={4}
            placeholder="Enter job description"
          ></textarea>
        </div>
        <button type="submit" className="btn btn-primary">Save Job</button>
      </form>
      <div className="mt-3">
        <a href="index.html" className="btn btn-secondary">Back to Admin Tasks</a>
      </div>
    </div>
  );
};

export default AdminJobs;
