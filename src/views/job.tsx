import '../css files/index.css';
import '../css files/main.css';
import 'bootstrap/dist/css/bootstrap.min.css';
function Job() {
    return (
        <div className="container-fluid  p-0">
        <div id="navbar"></div>

        <div className="container-fluid  p-0">
            <div className="row back">
                <div className="col-2"></div>
                <div className="col-3 mainArea text-center">
                    <div className="heading">Recommended Jobs</div>
                    <div className="notif">
                        <div className="circle1"></div>
                        Job 1
                    </div>
                    <div className="notif">
                        <div className="circle1"></div>
                        Job 2
                    </div>
                    <div className="notif">
                        <div className="circle1"></div>
                        Job 3
                    </div>
                    <div className="notif">
                        <div className="circle1"></div>
                        Job 4
                    </div>
                </div>
                <div className="col mainArea text-center">
                    <div className="heading">
                        Job Title
                    </div>
                    <div className="container qualifications">
                        <div className="row align-items-start">
                        <div className="col">
                            Qualification 1
                        </div>
                        <div className="col">
                            Qualification 2
                        </div>
                        <div className="col">
                            Qualification 3
                        </div>
                        <div className="col">
                            Qualification 4
                        </div>
                        </div>
                    </div>
                    <div className="jobDescription">
                        This is a lot of text which will be used for the job description section.
                    </div>
                </div>
                <div className="col-2"></div>
            </div>
        </div>

        <div id="footer"></div>
    </div>
    );
};
export default Job;