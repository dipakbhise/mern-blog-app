import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router'

const Edit = () => {

    const {id} = useParams()
    let navigate = useNavigate();
 
    const [state, setstate] = useState("")


    useEffect(() => {

        getdatabyid()
        
        
    }, [])

    const getdatabyid = ()=>{
        axios.get(`http://localhost:8001/userpostbyid/${id}`).then(response=>{

        setstate(response.data[0].any)

        console.log(response.data)


        })
    }

    const postdata = ()=>{
        axios.put(`http://localhost:8001/edituserpost/${id}`,{any:state});
        navigate("/all")
    }


    const handler = (event)=>{

        setstate(event.target.value)

        console.log(state)

    }
    



    return (
        <>
           
           <div>
           <div className='head' > <h1 class="display-1">UPDATE</h1></div>
           <div  class="input-group input-group-lg">
  <input  type="text"  placeholder= 'ENTER YOUR TEXT HERE'  value={state} onChange={(event)=>handler(event)}  name="any"  class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-lg"/>
</div>
            
               
           </div>
           <div  className='make' >

           <button type="button"  onClick={postdata}  class="btn btn-info">POST</button>
           </div>
            
        
        
   
            
        </>
    )
}

export default Edit
