import react from "react";
import axios from 'axios'
import { useState, useEffect } from 'react'
import { useNavigate } from "react-router-dom";
import style from './style.css'


function All() {
  var Link = require('react-router-dom').Link
  function gothere() {
    navigate("/home")
  }

  let navigate = useNavigate();
  const [name, setname] = useState([])
  const [userPost, setuserPost] = useState([])
  const username = localStorage.getItem("author");
  const Up = username.toUpperCase()
  useEffect(() => {
    axios.get('http://localhost:8001/come').then(x => setname(x.data));
    axios.get(`http://localhost:8001/userpost/${username}`).then(x => setuserPost(x.data))

  }, [])

  // useEffect(() => {
  //   axios.get(`http://localhost:8001/userpost/${username}`).then(x => setuserPost(x.data))

  // }, [])

  const deletepost = (id) => {

    axios.delete(`http://localhost:8001/deletepost/${id}`).then( axios.get('http://localhost:8001/come').then(x => setname(x.data)))
    axios.get(`http://localhost:8001/userpost/${username}`).then(x => setuserPost(x.data))


  }
  function last(){
    localStorage.clear();
    navigate('/')
  }




  return (<div>
    <div class="container">

      <div className='head' > <h1 class="display-1">WELCOME {Up}</h1><button type="button" class="btn btn-primary active" data-bs-toggle="button" autocomplete="off" aria-pressed="true" onClick={gothere} >CREATE NEW POST</button><div> <button onClick={last} type="button" class="btn btn-danger">LOGOUT</button></div> </div>
      <div className='bead' class="row">
        <div class="col">

          {userPost.map((i) => { return <div className='postt' > <figure >
            
            <blockquote class="blockquote">
              <p>{i.time}</p>
            </blockquote>
         
          </figure><figure class="text-center">
            
            <blockquote class="blockquote">
              <p>{i.any}</p>
            </blockquote>
         
          </figure><figure>
            
            <blockquote class="blockquote">
            
            <Link href="#" id='link' to={`/edit/${i._id}`} class="btn btn-secondary btn-lg " tabindex="-1" role="button" aria-disabled="true">EDIT</Link>
            
            </blockquote>
         
          </figure><figure class="text-end">
            
            <blockquote class="blockquote">
            <button onClick={() => deletepost(i._id)} type="button" class="btn btn-danger">DELETE</button>
           
            </blockquote>
         
          </figure></div> })}
        </div>
        <div class="col"> 
        {name.map((i) => { return <div className='post' ><figure class="text-center">
           <blockquote class="blockquote">
              <p>{i.any}</p>
            </blockquote>
         
          </figure>
          <figure class="text-end">
            <blockquote >
              <p>{i.time}</p>
            </blockquote>
           
            <figcaption class="blockquote-footer">
              posted by <cite title="Source Title">{i.username}</cite>
            </figcaption>
          </figure></div>
        })}

        </div>
      </div>
    </div>




  </div>)
}

export default All;