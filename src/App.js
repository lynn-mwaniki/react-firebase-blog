
import './App.css';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Blogs from './components/Blogs';
import Login from './pages/Login';
import SignIn from './pages/SignIn';
import { onAuthStateChanged } from "firebase/auth";
import { auth } from './firebase/firebase';
import { useEffect, useState } from 'react';
import Header from './components/Header';
import CreatePost from './pages/CreatePost';
import Blog from './pages/Blog';

function App() {

  const [isAuth, setIsAuth] = useState(localStorage.getItem("isAuth"))
  // Check if user is authenticated and update the state accordingly
      useEffect(()=>{
        onAuthStateChanged(auth, (user) => {
            if (user) {
             
              const uid = user.uid;
              const userEmail = user.email;
              console.log("uid", uid, userEmail)
            } else {
              // User is signed out
              console.log("user is logged out")
            }
          });
         
    }, [])
  return (
    <div className="App">
     
     <Router>
      <Header isAuth={isAuth} setIsAuth={setIsAuth}/>
      <Routes>
        <Route path='/' element={<Blogs isAuth={isAuth} />}/>
        <Route path="/login" element={<Login setIsAuth={setIsAuth}/>}/>
        <Route path='/signIn' element={<SignIn setIsAuth={setIsAuth}/>}/>
        <Route path='/createBlog' element={<CreatePost isAuth={isAuth}/>}/>
        <Route path='/blog/:id' element={<Blog isAuth={isAuth}/>}/>
      </Routes>
     </Router>
    </div>
  );
}

export default App;
