import { useState } from "react"
import { json, Link } from "react-router-dom"

export default function Signup() {

    const [signupcreds,set]=useState({first:'',last:'',userid:'',password:'',confirmpassword:''})



    function handlechange(e){
        e.preventDefault()
        set(prev=>{
            let temp={...prev}
            temp[e.target.name]=e.target.value;
            return temp;
        })

    }

    function handlesubmit(e){
        e.preventDefault()
        fetch('http://localhost:8000/signup',{
            method:'POST',
            headers:{
                'Content-Type':'application/json',
            },
            body:JSON.stringify({data:signupcreds})
        }).then(data=>data.json()).then(data=>console.log(data))

    }

    
    return (
        <div style={{minheight:'80vh',height:'100vh',margin:'2rem 0'}}>
            <form style={{ minWidth:'380px',maxWidth:'30%',borderRadius:'1rem',background:'white',padding:'3rem 3rem',marginLeft: 'auto', marginRight: 'auto', paddingTop: '80px' }}>
                <div style={{fontSize:'2.5rem',textAlign:'center',fontFamily:'sans-serif'}}>Signup</div>
                <div className="mb-3">
                    <label style={{fontSize:'0.75rem'}} htmlFor="exampleInputPassword1" className="form-label" >First Name</label>
                    <input style={{fontSize:'0.5rem'}} onChange={handlechange}  name='first' type="text" className="form-control" />
                </div>
                <div className="mb-3">
                    <label style={{fontSize:'0.75rem'}} htmlFor="exampleInputPassword1" className="form-label">Last Name</label>
                    <input style={{fontSize:'0.75rem'}} onChange={handlechange} name="last" type="text" className="form-control" />
                </div>
                
                <div className="mb-3">
                    <label  style={{fontSize:'0.75rem'}} className="form-label">User Id</label>
                    <input style={{fontSize:'0.75rem'}} onChange={handlechange} name="userid" type="text" className="form-control" />
                </div>

                <div className="mb-3">
                    <label style={{fontSize:'0.75rem'}} htmlFor="exampleInputPassword1" className="form-label">Password</label>
                    <input style={{fontSize:'0.75rem'}} onChange={handlechange} name='password' type="password" className="form-control" />
                </div>
                <div className="mb-3">
                    <label style={{fontSize:'0.75rem'}} htmlFor="exampleInputPassword1" className="form-label">Confirm Password</label>
                    <input style={{fontSize:'0.75rem'}} onChange={handlechange} name="confirmpassword" type="password" className="form-control" id="exampleInputPassword1" />
                </div>
                

                <button onClick={handlesubmit} className="btn btn-primary">Submit</button>
                <br/>
                <small >Already a member. <Link style={{fontSize:'1rem',padding:'1px 1rem',marginBottom:'0.5rem'}} to={'/login'} className='btn btn-secondary'>Login</Link></small>
            </form>
        </div>
    )
}