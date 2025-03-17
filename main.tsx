import * as React from 'react';
import './main.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function Layout() {
  return (
    <div className="container-fluid p-0">
      <div id="navbar"></div>

      <div className="container-fluid p-0">
        <div className="row back">
          <div className="col-2"></div>
          <div className="col-3 mainArea">
            <div className="col-2"></div>
            <div className="col-3 mainArea">
                <div className="circle text-center">
                    <div>profile picture</div>
                </div>
                <div className="name">Name</div>

                <div className="info">
                    Personal Information
                </div>
            </div>
          </div>
        </div>
          <div className="col mainArea text-center">
            <div className="heading">
                Feed
                <div className="feed marginFeedMain">
                    <div className="row frame">
                        <div className="text-center">post</div>
                        <div className="col d-flex justify-content-center">
                            <div className="postInteractionMenu">Like</div>
                            <div className="postInteractionMenu">Comment</div>
                            <div className="postInteractionMenu">Share</div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="container text-center">
                
            </div>
        </div>
        <div className="col-2"></div>

      <div id="footer"></div>
    </div>
    </div>
  )
};
{/* // Main App component that renders the Layout */}
export default function MyApp() {
  return (
    <div>
      <Layout />
    </div>
  )
}
