import React from "react";
import Toolbar from "@material-ui/core/Toolbar";
import AppBar from "@material-ui/core/AppBar";
import Avatar from "@material-ui/core/Avatar";
import {AmplifySignOut} from "@aws-amplify/ui-react";

const ProfileToolbar = ({currentUser}) =>
    <AppBar position="fixed">
        <Toolbar>
            <Avatar/>
            <div>Bonjour <b>{currentUser.attributes.email}</b></div>
        </Toolbar>
        <AmplifySignOut/>
    </AppBar>

export default ProfileToolbar;