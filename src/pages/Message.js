import React from 'react'
import Nav from "../components/Nav";
// import Chat from "../components/Chat";
import m from "../images/m.png";

export default function Message() {
    return (
        <div>
            <Nav />
            {/* <Chat /> */}
            <div id="noMess">
            <h1 id="no">No Conversation</h1>
            <h1 id="no">Right Now</h1>
            <img id="iconMess" src={m} alt="no Message..." />
            </div>
        </div>
    )
}
