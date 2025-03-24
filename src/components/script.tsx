
export class Bar {
    navbar = `
    <div class="row navbar">
        <div class="col d-flex rightAlign">
            <div class="navbarContent text bodyText">
                <a href="main.html" class="navbarConentLink text">Home</a>
            </div>
            <div class="navbarContent text bodyText">
                <a href="network.html" class="navbarConentLink text">Groups</a>
            </div>
            <div class="navbarContent text bodyText">
                <a href="notification.html" class="navbarConentLink text">Notifications</a>
            </div>
            <div class="navbarContent text bodyText">
                <a href="job.html" class="navbarConentLink text">Jobs</a>
            </div>
            <div class="navbarContent text bodyText">
                <a href="profile.html" class="navbarConentLink text">My Profile</a>
            </div>
            <div class="navbarContent text ">
                <a href="login.html" class="navbarConentLink text">Login</a>
            </div>
        </div>
    </div>
    `;
    footer = `
    <div class="row footer">
    </div>
    `;
  static navbar: any;
    // window.onload = function(){
    //     document.getElementById("navbar").innerHTML = navbar;
    //     document.getElementById("footer").innerHTML = footer;
    // };
}