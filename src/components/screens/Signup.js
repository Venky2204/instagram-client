import React, { useEffect } from 'react'
import { Link, useNavigate} from 'react-router-dom';
import { useState} from 'react';
import M from 'materialize-css';

const Signup = () => {
    const navigate = useNavigate()
    const [name,setName] = useState("")
    const [password,setPassword] = useState("")
    const [email,setEmail] = useState("")
    const [image,setImage] = useState("")
    const [url,setUrl] = useState(undefined)

    useEffect(()=>{
        if(url){
            uploadFields();
        }
    },[url])
    const uploadPic = () =>{
        const data = new FormData()
        data.append("file",image)
        data.append("upload_preset","insta-clone")
        data.append("cloud_name","vs2204cloud")
        fetch("https://api.cloudinary.com/v1_1/vs2204cloud/image/upload",{
            method:"post",
            body:data
        })
        .then(res=>res.json())
        .then(data=>{
            setUrl(data.url)
           // localStorage.setItem("url",data.url)
        })
        .catch(err=>{
            console.log(err)
        })

    }
    const uploadFields = () =>{
        if(!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,}$/.test(email)){
            M.toast({html: "Invalid email",classes:"#c62828 red darken-3"})
            return;
        }
        fetch("/signup",{
            method:"post",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                name,
                password,
                email,
                pic:url
            })
        }).then(res => res.json())
        .then(data=>{
            if(data.error){
                M.toast({html: data.error,classes:"#c62828 red darken-3"})
            }else{
                M.toast({html:"signup successfully",classes:"#43a047 green darken-1"})
                navigate('/signin')
            }
        }).catch(err=>{
            console.log(err)
        })
    }
    const PostData = () =>{
        if(image){
            uploadPic();
        }else{
            uploadFields();
        }
        
    }

  return (
    <div className='mycard'>
        <div className="card auth-card input-field">
           <h2>Instagram</h2>
           <input 
            type='text'
            placeholder='name'
            value={name}
            onChange={(e) => setName(e.target.value)}
           />
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
           <div className="file-field input-field">
            <div className="btn #64b5f6 blue darken-1">
                <span>Upload pic</span>
                <input type="file" onChange={(e)=>setImage(e.target.files[0])}/>
            </div>
            <div className="file-path-wrapper">
                <input className="file-path validate" type="text" />
            </div>
            </div>
            <button className="btn waves-effect waves-light #64b5f6 blue darken-1"
             onClick={() => PostData()}>
                Signup
            </button> 
            <h5>
                <Link to="/signin">Already have an account ?</Link>
            </h5>     
        </div>
    </div>
    )
}

export default Signup;