import React,{useState,useContext}from 'react'
import { Link , useNavigate } from 'react-router-dom';
import { UserContext } from '../../App';
import M from 'materialize-css';
import axios from 'axios'

const Signin = () => {
    const {state,dispatch} = useContext(UserContext)
    const navigate = useNavigate()
    const [password,setPassword] = useState("")
    const [email,setEmail] = useState("")
    // const axios = require('axios');
    const serverUrl = 'https://instagram-server-gzf9.onrender.com/signin';
    const PostData = async () =>{
        if(!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,}$/.test(email)){
            M.toast({html: "Invalid email",classes:"#c62828 red darken-3"})
            return;
        }
        
        // fetch("/signin",{
        //     method:"post",
        //     headers:{
        //         "Content-Type":"application/json"
        //     },
        //     body:JSON.stringify({
        //         password,
        //         email
        //     })
        axios.post(serverUrl,{email,password})
        .then(data=>{
            console.log(data)
            if(data.error){
                M.toast({html: data.error,classes:"#c62828 red darken-3"})
            }else{
                localStorage.setItem("jwt",data.token)
                localStorage.setItem("user",JSON.stringify(data.user))
                dispatch({type:"USER",payload:data.user})
                M.toast({html:"signin success",classes:"#43a047 green darken-1"})
                navigate('/')
            }
        }).catch(err=>{
            console.log(err)
        })
    }
  return (
    <div className='mycard'>
        <div className="card auth-card input-field">
           <h2>Instagram</h2>
           <input 
            type='text'
            placeholder='email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
           />
           <input
            type='password'
            placeholder='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
           />
            <button className="btn waves-effect waves-light #64b5f6 blue darken-1"
            onClick={() => PostData()}>
                Login
            </button> 
            <h5>
                <Link to="/signup">Don't have an account ?</Link>
            </h5>     
        </div>
    </div>
    )
}

export default Signin;
