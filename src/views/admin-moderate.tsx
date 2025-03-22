import '../css files/index.css';
import '../css files/main.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function AdminModerate () {
  return (
    <div className="container mt-5">
      <h1 className="mb-4">Moderate Content</h1>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th scope="col">Item ID</th>
            <th scope="col">Content</th>
            <th scope="col">Status</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td>Example content here...</td>
            <td>Pending</td>
            <td>
              <button className="btn btn-success btn-sm">Approve</button>
              <button className="btn btn-danger btn-sm">Reject</button>
            </td>
          </tr>
        </tbody>
      </table>
      <form>
        <div className="mb-3">
          <label htmlFor="moderationComment" className="form-label">
            Moderation Comment</label>
          <textarea
            className="form-control"
            id="moderationComment"
            rows="3"
            placeholder="Enter comments or actions..."
          ></textarea>
        </div>
        <button type="submit" className="btn btn-primary">Submit Moderation</button>
      </form>

      <div className="mt-3">
        <a href="index.html" className="btn btn-secondary">Back to Admin Tasks</a>
      </div>
    </div>
  );
};

export default AdminModerate;
