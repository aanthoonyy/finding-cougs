import '../css files/index.css';
import '../css files/main.css';
import 'bootstrap/dist/css/bootstrap.min.css';
    
function Admin () {
  return (
    <div className="container-fluid p-0">
      <div className="row back">
        // Remove unnecessary empty columns
        <div className="col-md-6 offset-md-3 mainArea text-center">
          <div className="heading">Admin Tasks</div>
          <div className="notif">
            <div className="circle1"></div>
            Edit/Create Jobs
          </div>

          <div className="notif">
            <div className="circle1"></div>
            Moderate
          </div>
        </div>
      </div>
    </div>
  );
};
export default Admin;