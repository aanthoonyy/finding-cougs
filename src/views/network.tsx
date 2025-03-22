import '../css files/index.css';
import '../css files/main.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function Network () {
    return (
        <div className="container-fluid  p-0">
        <div id="navbar"></div>

        <div className="container-fluid  p-0">
            <div className="row back">
                <div className="col-2"></div>
                <div className="col mainArea text-center">
                    <div className="heading">My Groups</div>
                    <div className="notif">
                        <div className="circle1"></div>
                        <a href="group.html" className="groupLink">Group 1</a>
                    </div>
                    <div className="notif">
                        <div className="circle1"></div>
                        <a href="group.html" className="groupLink">Group 2</a>
                    </div>
                    <div className="notif">
                        <div className="circle1"></div>
                        <a href="group.html" className="groupLink">Group 3</a>
                    </div>
                    <div className="notif">
                        <div className="circle1"></div>
                        <a href="group.html" className="groupLink">Group 4</a>
                    </div>

                    <div className="heading">Recommended Groups</div>
                    <div className="notif">
                        <div className="circle1"></div>
                        <a href="group.html" className="groupLink">Group 1</a>
                    </div>
                    <div className="notif">
                        <div className="circle1"></div>
                        <a href="group.html" className="groupLink">Group 2</a>
                    </div>
                    <div className="notif">
                        <div className="circle1"></div>
                        <a href="group.html" className="groupLink">Group 3</a>
                    </div>
                    <div className="notif">
                        <div className="circle1"></div>
                        <a href="group.html" className="groupLink">Group 4</a>
                    </div>
                </div>
                <div className="col-2"></div>
            </div>
        </div>

        <div id="footer"></div>
    </div>
    );
};

export default Network;
