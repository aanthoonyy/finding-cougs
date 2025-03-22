import '../css files/index.css';
import '../css files/main.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function Group() {
    return (
        <div className="container-fluid  p-0">
        <div id="navbar"></div>

        <div className="container-fluid  p-0">
            <div className="row back">
                <div className="col-2"></div>
                <div className="col mainArea text-center">
                    <div className="headPhoto">Head Photo</div>
                    <div className="name">Group Name</div>

                    <div className="row frame">
                        <div className="col d-flex justify-content-center align-items-center">
                            <div className="menu">Posts</div>
                            <div className="menu">People</div>
                            <div className="menu">Media</div>
                        </div>
                    </div>
                    <div className="row frame">
                        <div className="col d-flex justify-content-center align-items-center">
                            <div className="menu">Make a Post Button</div>
                        </div>
                    </div>

                    <div className="heading">
                        Feed
                        <div className="feed marginFeedGroup">
                            <div className="row frame">
                                <div className="text-center">post</div>
                                <div className="col d-flex justify-content-center">
                                    <div className="postInteraction">Like</div>
                                    <div className="postInteraction">Comment</div>
                                    <div className="postInteraction">Share</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="container text-center">
                        
                    </div>
                </div>
                <div className="col-2"></div>
            </div>
        </div>

        <div id="footer"></div>
    </div>
    );
};
export default Group;