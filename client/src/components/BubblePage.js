import React, { useState, useEffect } from "react";
import axios from "axios";
import axiosAuth from '../axiosAuth';
import {Link} from 'react-router-dom';


import Bubbles from "./Bubbles";
import ColorList from "./ColorList";

const BubblePage = (props) => {
  const [colorList, setColorList] = useState([]);
  // fetch your colors data from the server when the component mounts
  // set that data to the colorList state property
  useEffect(()=>{
    axiosAuth().get('http://localhost:5000/api/colors')
      .then(res => {
        setColorList(res.data)
      })
      .catch(err => console.log(err.response))
  },[colorList])

  function logout() {
    localStorage.removeItem('token');
    // props.history.push('/login');  //no history.push() needed since Link redirecting to /login
  }

  return (
    <>
      <ColorList colors={colorList} updateColors={setColorList} />
      <Bubbles colors={colorList} />
      <Link onClick={logout} to="/login">Logout</Link>
    </>
  );
};

export default BubblePage;
