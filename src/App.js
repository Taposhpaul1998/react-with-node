import { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [users, setUsers]=useState([]);
  useEffect(()=>{
fetch('http://localhost:5000/users')
.then(res=>res.json())
.then(data=>setUsers(data))
  },[])

  const handelSubmit=(e)=>{
    e.preventDefault();
    const name = e.target.name.value;
    const email = e.target.email.value;
    const user = {name,email};

    // post data to server

    fetch('http://localhost:5000/users',{
      method:"post", //or 'PUT'
      headers:{
        'content-type':'application/json',
      },
      body:JSON.stringify(user),
    })
    .then(res=>res.json())
    .then(data=>{
      const newUsers=[...users,data]
      setUsers(newUsers);
    })



  }
  return (
    <div className="App">
     <h2>My users {users.length}</h2>
     <form onSubmit={handelSubmit}>
       <input type="text" name='name' placeholder='name'  required/>
       <input type="text" name='email' placeholder='email'  required/>
       <input type="submit" value="Add user" />
     </form>
     <ul>
       {
         users.map(user=> <li key={user.id}>Id:{user.id} Name: {user.name}, Email:{user.email} </li>)
       }
     </ul>
    </div>
  );
}

export default App;
