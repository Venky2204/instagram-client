import React,{useEffect, useState} from 'react'
import M from 'materialize-css';
import { useNavigate } from 'react-router-dom';

const CreatePost = () => {
    const [title,setTitle] = useState("")
    const [body,setBody] = useState("")
    const [image,setImage] = useState("")
    const [url,setUrl] = useState("")
    const navigate = useNavigate();

    useEffect(()=>{
        if(url){
            fetch("/createpost",{
                method:"post",
                headers:{
                    "Content-Type":"application/json",
                    "Authorization":"Bearer "+localStorage.getItem("jwt")
                },
                body:JSON.stringify({
                    title,
                    body,
                    pic:url
                    // pic:localStorage.getItem("url")
                })
            }).then(res => res.json())
            .then(data=>{
                if(data.error){
                    M.toast({html: data.error,classes:"#c62828 red darken-3"})
                }else{
                    M.toast({html:"created post successfully",classes:"#43a047 green darken-1"})
                    navigate('/')
                }
            }).catch(err=>{
                console.log(err)
            })
        }
    },[url])
    const postDetails = () => {
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

  return (
    <div className='card input-filed'
    style={{
        margin:"30px auto",
        maxWidth:"500px",
        padding:"20px",
        textAlign:"center"
    }}>
        <input type='text' placeholder='title' 
            value={title} onChange={(e)=>setTitle(e.target.value)}/>
        <input type='text' placeholder='body'
            value={body} onChange={(e)=>setBody(e.target.value)}/>

        <div className="file-field input-field">
        <div className="btn #64b5f6 blue darken-1">
            <span>Upload image</span>
            <input type="file" onChange={(e)=>setImage(e.target.files[0])}/>
        </div>
        <div className="file-path-wrapper">
            <input className="file-path validate" type="text" />
        </div>
        </div>
        <button className="btn waves-effect waves-light #64b5f6 blue darken-1"
        onClick={()=>postDetails()}>
            Submit post
        </button> 
    </div>
  )
}

export default CreatePost