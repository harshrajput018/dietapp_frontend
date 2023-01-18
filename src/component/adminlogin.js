import React, { useContext, useEffect, useState } from "react";
import { useNavigate,Link } from "react-router-dom";
import background from './images/bg3.jpg'
import formContext from '../context/form/formcontext';




export default function AdminLogin() {

    
   
    const a=useContext(formContext)

    console.log(a)


    const [logincreds, change] = React.useState({ Adminid: '', password: ''})



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
        fetch('http://localhost:8000/adminlogin', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ data: logincreds })
        }).then(data => data.json()).then(data => {
            if (data.success) {
                localStorage.setItem('auth-token-admin', data.authtoken)

                
                a.inc(prev=>prev+1)
                navigate('/admin')

            }
        })

    }

   

    function handleadmin(e) {

        e.preventDefault()

        change(prev => { return ({ ...prev, admin: true }) })



    }

    




    return (
        <div style={{ backgroundImage: `url(${background})`,height:'100vh',color:'white' }}>
            <form style={{ width: '50%', marginLeft: 'auto', marginRight: 'auto', paddingTop: '80px' }}>
                <div style={{ fontSize: '300%', textAlign: 'center', fontFamily: 'sans-serif' }}>ADMIN LOGIN</div>
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                    <input style={{background:'transparent',border:'solid white 0.15rem',color:'white'}} onChange={handlechange} name='Adminid' type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                    <input style={{background:'transparent',border:'solid white 0.15rem',color:'white'}} onChange={handlechange} name="password" type="password" className="form-control" id="exampleInputPassword1" />
                </div>

                <button onClick={handleclick} className="btn btn-primary">Submit</button>
                

                <br />
                <small >Haven't registered yet. <Link style={{ fontSize: '1rem', padding: '1px 1rem', marginBottom: '0.5rem' }} to={'/signup'} className='btn btn-secondary'>Signup</Link></small>
            </form>


        </div>
    )
}