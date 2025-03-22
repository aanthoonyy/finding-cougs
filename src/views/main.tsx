// import { StrictMode } from 'react'
// import { createRoot } from 'react-dom/client'
import '../css files/index.css'
// import App from './css files/App.css'
import '../css files/main.css';
import 'bootstrap/dist/css/bootstrap.min.css';

// createRoot(document.getElementById('root')!).render(
//   <StrictMode>
//     <App />
//   </StrictMode>,
// )


function homePage() {
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
export default homePage;
