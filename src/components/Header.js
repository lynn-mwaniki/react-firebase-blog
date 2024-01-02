import React from 'react'
import {  signOut } from "firebase/auth";
import {auth} from '../firebase/firebase';
import { useNavigate, Link } from 'react-router-dom';

const Header = ({isAuth, setIsAuth}) => {
  const navigate = useNavigate();

const handleLogout = (e) =>{
  e.preventDefault();
   signOut(auth).then(() => {
        // Sign-out successful.
        localStorage.clear();
        setIsAuth(false)
            navigate("/");
            console.log("Signed out successfully")
        }).catch((error) => {
        // An error happened.
        });
}
  return (
    <div className='header'>
     
   <h3 className='headerBrand' onClick={(()=> navigate('/'))}>
    Blogs</h3> 
   <div className='headerText'>
    <Link to="/">
    <p>Home</p>
    </Link>
  {
    isAuth ? <>
    <Link to="/createBlog">
      <p>create post</p>
      </Link>
      <p onClick={handleLogout}>logout</p>
      <p> Hey, @{auth.currentUser?.email}</p>
    </> :

     <Link to="/login">
      <p style={{marginRight:'20px'}}>Login</p> </Link>
  }
       
      

   </div>
    </div>
  )
}

export default Header