import React, {useState,useEffect} from 'react';
import{doPost} from './utils/network'
import Login from "./pages/login/Login"
import Home from "./pages/home/Home"
import { useHistory } from "react-router-dom";


const  App = () => {

  const url_path = "/materi-pelajaran"; 
  let history = useHistory();
  const [user, setUser] = useState(null)
  const [dataMapel, setDataMapel] = useState([])
  const [errors, setErrors] = useState([])
  

  useEffect(() => {
    //console.log(user)
    //console.log(dataMapel)
    
  }, [user,dataMapel])
  
  const doLogin = async(params) =>{
    
    const response = await doPost("login/Login/login_elearning",params)
  
    if(response){
      if(response.data.error){
        setErrors(response.data.error)
      }else{        
        setUser({...response.data.user, token:response.data.auth})
        setDataMapel(response.data.data_mapel)
      }
    }      
  }

  const doLogout = () =>{  
      setUser(null)
      history.push(url_path);
  }    

  

  if(user){
    return <Home user={user} dataMapel={dataMapel} doLogout={doLogout}/>
  }else{
    return <Login doLogin={doLogin} errors={errors} />    
  }  
  
}

export default App;
