import '../css files/index.css';
import '../css files/main.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function Notification () {
    return (
        <div className="container-fluid  p-0">
        <div id="navbar"></div>

        <div className="container-fluid  p-0">
            <div className="row back">
                <div className="col-2"></div>
                <div className="col mainArea text-center">
                    <div className="heading">Notifications</div>
                    <div className="notif">
                        <div className="circle1"></div>
                        Notification 1
                    </div>
                    <div className="notif">
                        <div className="circle1"></div>
                        Notification 2
                    </div>
                    <div className="notif">
                        <div className="circle1"></div>
                        Notification 3
                    </div>
                    <div className="notif">
                        <div className="circle1"></div>
                        Notification 4
                    </div>
                </div>
                <div className="col-2"></div>
            </div>
        </div>

        <div id="footer"></div>
    </div>
    );
}
export default Notification;