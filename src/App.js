import './App.css';
import React, {useEffect, useState} from "react";
import {Amplify} from "aws-amplify";
import awsmobile from "./aws-exports";
import ProfileToolbar from "./Composant/ProfileToolbar";
import {withAuthenticator} from "@aws-amplify/ui-react";
import {Auth} from "aws-amplify";
import AddItem from "./Composant/AddItem";
import {Item} from "./models";
import Items from "./Composant/Items";

Amplify.configure(awsmobile)
const App = () => {
    const [currentUser,setCurrentUser] = useState(undefined)

    useEffect(() =>{
      async function getAuthUser() {
          setCurrentUser(await Auth.currentAuthenticatedUser())
      }
      getAuthUser()
    }, [])
/*
    return <div>
        {currentUser && <ProfileToolbar currentUser={currentUser}/>}
    </div>*/
    return currentUser ? <div>
        <ProfileToolbar currentUser={currentUser}/>
        <br/><br/><br/><br/><br/><br/>
        <AddItem currentUser={currentUser}/>
        <Items/>

    </div> : null
}
export default withAuthenticator(App);
