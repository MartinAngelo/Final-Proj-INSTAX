import React from 'react'
import Nav from "../components/Nav";
import notif from "../images/notif.gif";

export default function Favorite() {
    return (
        <div>
            <Nav />
            <div id="noNotif">
                <h1 id="no">No Notification</h1>
                <h1 id="no">Right Now</h1>
                <img id="gifNotif" src={notif} alt="no notification..." />
            </div>
        </div>
    )
}
