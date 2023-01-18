import React, { useContext, useEffect, useState } from "react";
import { useNavigate,Link } from "react-router-dom";
import background from './images/bg3.jpg'
import formContext from '../context/form/formcontext';




export default function Login() {

    
   
    const a=useContext(formContext)

    console.log(a)


    const [logincreds, change] = React.useState({ userid: '', password: ''})



    const navigate = useNavigate();

    console.log(logincreds)

    function handlechange(e) {

        change(prev => {
            let temp = { ...prev }
            temp[e.target.name] = e.target.value;

            return temp;
        })

    }

    function handleclick(e) {

        e.preventDefault()
        fetch('http://localhost:8000/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ data: logincreds })
        }).then(data => data.json()).then(data => {
            if (data.success) {
                localStorage.setItem('auth-token', data.authtoken)

                
                a.inc(prev=>prev+1)
                navigate('/user')

            }
        })

    }

   

    function handleadmin(e) {

        e.preventDefault()

        change(prev => { return ({ ...prev, admin: true }) })



    }

    




    return (
        <div style={{ minheight:'80vh',height:'100vh',margin:'2rem auto' }}>
            {
                (!localStorage.getItem('auth-token') &&
                <form style={{ minWidth:'380px',background:'linear-gradient(to bottom right, rgb(30,60,80), rgb(39, 39, 60), orange)',color:'white',maxWidth:'25%',borderRadius:'1rem',padding:'5rem 3rem',marginLeft: 'auto', marginRight: 'auto', paddingTop: '80px' }}>
                <div style={{ fontSize: '300%', textAlign: 'center', fontFamily: 'sans-serif',fontWeight:'bolder' }}>LOGIN</div>
                <div className="mb-3">
                    <label style={{fontSize:'0.85rem',padding:'0',marginBottom:'0.5rem'}} htmlFor="exampleInputEmail1" className="form-label">Username</label>
                    <input style={{background:'white',border:'none',borderBottom:'solid',borderBlockColor:'lightgrey',borderRadius:'2 rem',color:'lightgrey',paddingTop:'0', paddingLeft:'0',paddingBottom:'0.5rem'}} placeholder='Type your username' onChange={handlechange} name='userid' type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label style={{fontSize:'0.85rem',padding:'0',marginBottom:'0.5rem'}} htmlFor="exampleInputPassword1" className="form-label">Password</label>
                    <input style={{background:'transparent',border:'none',backgroundColor:"white",borderBottom:'solid',borderBlockColor:'lightgrey',borderRadius:'0',color:'lightgrey',paddingTop:'0', paddingLeft:'0',paddingBottom:'0.5rem'}} placeholder='Type your password' onChange={handlechange} name="password" type="password" className="form-control" id="exampleInputPassword1" />
                </div>

                <button onMouseEnter={(e)=>{
                    e.target.style.background='white';
                    e.target.style.color='black'
                }} onMouseLeave={(e)=>{
                    e.target.style.background='black'
                    e.target.style.color='white'
                }} style={{background:'black',fontWeight:'bolder',border:'none'}} onClick={handleclick} className="btn btn-primary">Submit</button>
                

                <br />
                <small >Haven't registered yet. <Link style={{ fontSize: '1rem', padding: '1px 1rem', marginBottom: '0.5rem' }} to={'/signup'} className='btn btn-secondary'>Signup</Link></small>
            </form>) || <div style={{margin:'10vh 10%',color:'white',fontWeight:'bolder'}}>You have already logged in click <Link style={{color:'white'}} to={'/user'}>here</Link> to go user page or <Link onClick={()=>{localStorage.removeItem('auth-token')}} style={{color:'white'}}>logout</Link> to logout</div>
            }
            


        </div>
    )
}