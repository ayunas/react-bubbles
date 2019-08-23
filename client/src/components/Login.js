import React from "react";
import axios from 'axios';


const Login = (props) => {
  // make a post request to retrieve a token from the api
  // when you have handled the token, navigate to the BubblePage route
  const [creds, setCreds] = React.useState({username : null, password: null})
  console.log(props);
  function handleSubmit(e) {
    e.preventDefault();
    console.log(creds, 'creds');
    axios.post('http://localhost:5000/api/login', creds)
      .then(res => {
        console.log('response from login api: ', res)
        localStorage.setItem('token', res.data.payload);
        props.history.push('/');
      })
      .catch(err => console.log(err.response));
  }

  function handleChange(e) {
    console.log('handle Change triggered');
    setCreds({...creds, [e.target.name] : e.target.value})
  }

  return (
      <form onSubmit={handleSubmit}>
        <input name="username" onChange={handleChange} placeholder="username"/>
        <input name="password" onChange={handleChange} type="password" placeholder="password"/>
        <button>Submit</button>
      </form>
  );
};

export default Login;
