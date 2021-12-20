import react from "react";
import {useState} from 'react'
import axios from 'axios'
import { useNavigate } from "react-router-dom";
import style from './style.css'
function Home () {
    const [any,setAny]=useState()
 
    let navigate = useNavigate();
    const godata = () => {
        const localusername = localStorage.getItem("author");

        console.log(localusername)
        if (any==null){
            alert('PLEASE ENTER SOMETHING')
        }else{ axios.post('http://localhost:8001/posst', {any,username:localusername,time}).then(x => console.log(any))
      
        navigate("/all")}
       

       
    }
    const d = new Date();
    const time = d.toDateString();

    
    return (
        <>



           <div>
           <div className='head' > <h1 class="display-1">CREATE YOUR POST</h1></div>
           <div  class="input-group input-group-lg">
  <input  type="text"  placeholder= 'ENTER YOUR TEXT HERE' onChange={(e)=>setAny(e.target.value)}  name="any"  class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-lg"/>
</div>
            
               
           </div>
           <div  className='make' >

           <button type="button"  onClick={godata}  class="btn btn-info">POST</button>
           </div>
            
        
        </>
    )

}

export default Home ;