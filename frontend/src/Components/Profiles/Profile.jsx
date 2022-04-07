import { updateAccountbyId, getAccountbyUsername, logout } from "../../APIFolder/loginApi";
import { TextField } from "../common";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { useLocation, useNavigate } from "react-router-dom";
import LoggedInResponsiveAppBar from "../common/LoggedInResponsiveAppBar";

export const Profile = ({ currUser, setCurrUser, pages, settings }) => {

    const location = useLocation();
    const navigate = useNavigate();
    const [editMode, setEditMode] = useState(false);

    //Doesn't currently know what info to get from the database
    const [account, setAccount] = useState(currUser)
    const [loadedProfile, setLoadedProfile] = useState('')

    // const username = Cookies.get("username");

    useEffect(() => {
        // window.location.reload(false);
        // console.log(loadedProfile.username);
    }, [editMode]);

    if (!loadedProfile) {
        // get the account from the username
        getAccountbyUsername(location.pathname.substring(7, location.pathname.length)).then(response => setLoadedProfile(response))
        return <>Loading...</>
    }
    const startEditing = () => {
        setEditMode(true);


    }
    const doneEditing = () => {
        // updateAccountbyId(account).then(setCurrUser(account));
        setEditMode(false);

    }
    const signOut = () => {
        console.log("Logging out");
        logout().then(() => setCurrUser(''));
    }
    const profileNav = () => {
        navigate(`users/${currUser.username}`);
    }
    const accountNav = () => {
        navigate(`accounts/${currUser.username}`);
    }

    if (!currUser) {
        let username = Cookies.get("username");

    if (username) {
      getAccountbyUsername(username)
        .then(account => {
          if (account) {
            setCurrUser(account);
          }
          else {
            console.log("User is null after request");
            setCurrUser('');
          }
        })
    }
    else {
      setCurrUser('');
      navigate('/');
    }
        
    }


    const changeFirstName = delta => setAccount({ ...account, ...delta });
    const changeLastName = delta => setAccount({ ...account, ...delta });
    const changeEmail = delta => setAccount({ ...account, ...delta });
    // Basically check if user is the same user as the loaded profile.
    // If so then allow them to edit with the edit button at the end (this edit button will update the database once done)
    // If not then display the profile without the edit buttons.

    // NOTE - IN FUTURE ADD BUTTON TO SEND FRIEND REQUEST...ONLY IF FUNCTIONALITY IS IMPLEMENTED

    return <section className="userProfile">
        <LoggedInResponsiveAppBar
            pages={pages}
            settings={settings}
            signOut={() => signOut()}
            username={currUser.username}
            profileNav={() => profileNav()}
            account={() => accountNav()} />

        {/* Viewing own profile (EDITING) */}
        {currUser.username === loadedProfile.username && editMode === true &&
            <div className="container border-0 mt-5">
                <h1>{loadedProfile.username}'s Profile</h1>
                <TextField label="First Name :" value={account.firstName} setValue={x => changeFirstName(x)} />
                <TextField label="Last Name :" value={account.lastName} setValue={x => changeLastName(x)} />
                {/* <TextField label="Email :" value={account.email} setValue={x => changeEmail(x)} /> */}
                <button onClick={() => doneEditing()}>Save</button>
            </div>}

        {/* Viewing own profile (NOT EDITING) */}
        {currUser.username === loadedProfile.username && editMode === false &&
            <div className="container border-0 mt-5 bg-secondary">
                <p className="float-start col-4 fs-2 mt-2">{loadedProfile.username}'s Profile</p>
                <div className="clearfix"></div>
                <div className="row">
                    <img src="https://via.placeholder.com/300x300" className="float-start col-4 m-3" alt="" />
                    
                        <div className="col-3 row">
                            <p className="fs-2">First Name :</p>
                            <p className="fs-3">{loadedProfile.firstName}</p>
                        </div>
                        <div className="col-3 fs-2 row">
                            <p className="fs-2">Last Name :</p>
                            <p className="fs-3">{loadedProfile.lastName}</p>
                        </div>
                    
                </div>
                {/* <h2>Email :</h2>
            <p>{account.email}</p> */}

                <button onClick={() => startEditing()}>Edit Profile</button>
            </div>}

        {/* Viewing profile besides your own */}
        {currUser.username !== loadedProfile.username &&
            <div className="container border-0 mt-5">
                <h1>{loadedProfile.username}'s Profile</h1>
                <h2>First Name :</h2>
                <p>{loadedProfile.firstName}</p>
                <h2>Last Name :</h2>
                <p>{loadedProfile.lastName}</p>
                {/* <h2>Email :</h2>
            <p>{loadedProfile.email}</p> */}
            </div>}
    </section>
}