//This is for when users first log in.

import { Link, useNavigate } from "react-router-dom";
import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import { LoggedInResponsiveAppBar } from "../common/LoggedInResponsiveAppBar";
import Cookies from "js-cookie";
import { useState } from "react";
import { getAccountbyUsername, logout } from "../../APIFolder/loginApi";
import { useEffect } from "react";

export const HomeView = ({ currUser, setCurrUser, pages, settings}) => {

    const navigate = useNavigate();

    const [account, setAccount] = useState(undefined);

    useEffect(() => {
        if (currUser === undefined) {
            navigate('/');
        }
    }, [currUser]);

    if (!account) {
        setAccount(currUser);
        // getAccountbyUsername(currUser).then(x => setAccount(x));
    }

    console.log(JSON.stringify(currUser));

    localStorage.currUser = JSON.stringify(currUser);

    console.log(JSON.parse(JSON.stringify(localStorage.currUser)));

    const signOut = () => {
        logout().then(() =>setCurrUser(undefined));
    }
    const profileNav = () => {

        navigate(`users/${currUser.username}`);
    }
    const accountNav = () => {

        navigate(`accounts/${currUser.username}`);
    }

    return <div>
        <LoggedInResponsiveAppBar 
            pages={pages} 
            settings={settings} 
            signOut={() => signOut()} 
            username={currUser.username} 
            profileNav={() => profileNav()} 
            account={() => accountNav()} />
        {/* <h1 className="mb-4">Welcome {account.firstName}</h1> */}
    </div>
}
