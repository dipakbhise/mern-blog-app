import React from 'react';
import Regis from './Regis'
import Login from './Login'
import Home from './Home'
import All from './All'
import Navbar from './Navbar'
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import Edit from './Edit';

function App() {
  
  return (

    <BrowserRouter>
    <div className="App">

    <Navbar/>

   

    <Routes>
    <Route exact path="/" element={<Login />}/>
    <Route exact path="/Regis" element={<Regis />}/>
    <Route exact path="/home" element={<Home />}/>
    <Route exact path="/all" element={<All />}/>
    <Route exact path="/edit/:id" element={<Edit />}/>

    </Routes>

    
    </div>
    </BrowserRouter>
  );
}

export default App;
