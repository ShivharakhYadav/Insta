import React, { useEffect } from 'react';
import './App.css';
import io from 'socket.io-client'
import { Routes, Route, useNavigate } from 'react-router-dom';
import Login from './common/Login';
import Register from './common/Register';
import Homepage from './common/Homepage';
import Header from './common/Header';
// import Userprofile from './Profiles/Userprofile';
// import NewPost from './common/NewPost';
import actions from './store/actions/actionTypes';
import { useDispatch, useSelector } from 'react-redux';
// import SingleUserProfile from './common/SingleUserProfile';
// import EditProfile from './Profiles/EditProfile';
// import { getUserDetails } from './API_Call';
import SnackbarInformation from './common/SnackbarInformation';

function App() {
  let dispatch = useDispatch();
  let navigate = useNavigate();
  const user = useSelector((state: any) => state?.user);
  const { pathname } = window.location;

  useEffect(() => {
    let ss: any = JSON.stringify({
      test: "name"
    });
    // console.log("socket io called")
    //localStorage.setItem("instaUser", ss);
    const socket = io(`http://localhost:4100`);
    socket.on("testevent", (response: any) => {
      console.log("response", response)
    })
  }, [])

  useEffect(() => {
    console.log("App component useEffect called")
    const jsonData: any = localStorage.getItem("instaUser");
    console.log("jsonData", jsonData);
    if (jsonData !== "undefined" && jsonData !== null) {
      const details = JSON.parse(jsonData);
      // getUserDetails(details.username).then((result: any) => {
      //   localStorage.setItem("instaUser", JSON.stringify(result.data))
      //   dispatch({ type: actions.SAVE_USER, payload: result.data })
      // })
      dispatch({ type: actions.SAVE_USER, payload: details })
    }
    else {
      console.log("else called")
      if (pathname === "/register") {
        navigate('/register');
      } else {
        navigate('/');
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname])

  return (
    <div className='example'>
      {user.name && <Header />}
      <SnackbarInformation />
      <Routes>
        {/* Final */}
        <Route element={<Login />} path="/" />
        <Route element={<Register />} path="/register" />
        {/*remaining for review */}
        <Route element={<Homepage />} path='/homepage' />
        {/* <Route element={<Userprofile />} path='/profile' />
        <Route element={<NewPost />} path='/post' />
        <Route element={<SingleUserProfile />} path="/:username" />
        <Route element={<EditProfile />} path='/accounts/edit' /> */}
        <Route element={<h1>Page Not Found</h1>} path='*' />
      </Routes>
    </div>
  );
}

export default App;
