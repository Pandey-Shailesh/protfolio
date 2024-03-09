import { message } from 'antd';
import axios from 'axios';
import React from 'react'
import { HideLoading, ShowLoading } from '../../redux/rootSlice';
import { useDispatch } from 'react-redux';

function AdminLogin() {
    const [user,setUser] = React.useState({
        username:"",
        password:""
    });
    const dispatch= useDispatch();
    const login = async ()=>{
        try {
            dispatch(ShowLoading());
            const response = await axios.post("/api/portfolio/admin-login",user);
            dispatch(HideLoading());
            if (response.data.success) {
                message.success(response.data.message);
                localStorage.setItem("token",JSON.stringify(response.data));
                window.location.href ="/admin";
            } else {
                message.error(response.data.message);
                dispatch(HideLoading());
            }
        } catch (error) {
            message.error(error.message);
        }
    }


  return (
   <div className='flex justify-center items-center h-screen bg-primary'>
     <div className='w-96 flex gap-5 p-5 shadow boder border-gray-600 flex-col bg-white'>
        <h1 className='text-2xl'>Portfolio - Admin Login</h1>
        <hr/>
        <input placeholder='Username' type='text' value={user.username} onChange={(e)=> setUser({...user,username:e.target.value})}/>
        <input placeholder='Password' type='text' value={user.password} onChange={(e)=> setUser({...user,password:e.target.value})}/>
        <button className='bg-primary text-white p-2 rounded' onClick={login}>Login</button>
    </div>
   </div>
  )
}

export default AdminLogin