import React from "react";
import { useState } from "react";
import { Outlet, Link } from "react-router-dom";

import TopBar from "./Topbar"
function FirstComponent()  {
   function clicked(){
console.log('clicked');
    }
    return (
<div>
<TopBar
        logoSrc="logo192.png"
        logoText="Teacher App"
        profilePicSrc="35.50.m.jpg"
        profileName="Satheesan OP"
        ProfileRole = "Teacher"
      />
    <p>Hi Homework</p>
    <button onClick={clicked}><Link to="/page1">Go to Page 1</Link></button>
</div>
    );
}
export default FirstComponent;