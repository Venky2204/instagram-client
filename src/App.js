import React,{useEffect,createContext,useReducer,useContext} from "react";
import Navbar from './components/Navbar';
import './App.css'
import { BrowserRouter,Route, Routes,useNavigate } from "react-router-dom";
import Home from "./components/screens/Home";
import Profile from "./components/screens/Profile";
import Signin from "./components/screens/Signin";
import Signup from "./components/screens/Signup";
import CreatePost from "./components/screens/CreatePost";
import {reducer,initialState} from './reducers/userReducer';
import UserProfile from "./components/screens/UserProfile"
import SubscribeUserPosts from './components/screens/SubscribeUserPosts'
export const UserContext = createContext()


const Routing = () => {
  const navigate = useNavigate()
  const {state,dispatch} = useContext(UserContext)
  useEffect(()=>{
    const user = JSON.parse(localStorage.getItem("user"))
    if(user){
      dispatch({type:"USER",payload:user})
      // navigate('/')
    }else{
      navigate('/signin')
    }
  },[])

  return (
    <Routes>
      <Route path="/"  exact element={<Home />} />
      <Route path="/signin" exact element={<Signin />} />
      <Route path="/signup" exact element={<Signup />} />
      <Route path="/profile" exact element={<Profile />} />
      <Route path="/create" exact element={<CreatePost />} />
      <Route path="/profile/:userid" element={<UserProfile />} />
      <Route path="/myfollowingpost" exact element={<SubscribeUserPosts />} />
    </Routes>
  )
}
function App() {
  const [state,dispatch] = useReducer(reducer,initialState)
  return (
    <UserContext.Provider value={{state,dispatch}}>
    <BrowserRouter>
      <Navbar />
      <Routing />

    </BrowserRouter>
    </UserContext.Provider>
  );
}

export default App;
