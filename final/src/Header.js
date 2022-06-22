
import React from 'react';
//import {useEffect, useState ,useContext} from 'react';
import {Link} from 'react-router-dom';
import{Menu,Search} from'semantic-ui-react'
import firebase from'./utils/firebase';
import 'firebase/compat/auth';
function Header(){
    const [user,setUser]=React.useState(null);
    React.useEffect(() =>{
        const unsubscribe=firebase.auth().onAuthStateChanged((currentuser)=>{
            setUser(currentuser);
        });
        return () => unsubscribe();
    },[]);
    return<Menu>
        <Menu.Item as={Link} to="/">kube socialmedia</Menu.Item>
        <Menu.Item>
            <Search></Search>
        </Menu.Item>
        <Menu.Menu position="right">
            {user ? 
            <>
                <Menu.Item as={Link} to="/new-post">
                發表文章
                </Menu.Item>
                <Menu.Item as={Link} to="/my">
                會員
                </Menu.Item>
                <Menu.Item onClick={()=>firebase.auth().signOut()}>
                登出
                </Menu.Item>
            </>:(
                <Menu.Item as={Link} to="/signin">
                註冊/登入
            </Menu.Item>    
            )}
        </Menu.Menu>
        </Menu>;
}
export default Header;