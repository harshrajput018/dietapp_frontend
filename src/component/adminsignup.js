import { useState } from "react"
import { json, Link } from "react-router-dom"

export default function AdminSignup() {

    const [signupcreds,set]=useState({first:'',last:'',Adminid:'',password:'',confirmpassword:''})



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
        fetch('http://localhost:8000/adminsignup',{
            method:'POST',
            headers:{
                'Content-Type':'application/json',
            },
            body:JSON.stringify({data:signupcreds})
        }).then(data=>data.json()).then(data=>console.log(data))

    }

    
    return (
        <>
            <form style={{ width: '50%', margin: '0 auto' }}>
                <div style={{fontSize:'3.5rem',textAlign:'center',fontFamily:'sans-serif'}}>Signup</div>
                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label" >First Name</label>
                    <input onChange={handlechange}  name='first' type="text" className="form-control" />
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">Last Name</label>
                    <input onChange={handlechange} name="last" type="text" className="form-control" />
                </div>
                
                <div className="mb-3">
                    <label  className="form-label">User Id</label>
                    <input onChange={handlechange} name="Adminid" type="text" className="form-control" />
                </div>

                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                    <input onChange={handlechange} name='password' type="password" className="form-control" />
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">Confirm Password</label>
                    <input onChange={handlechange} name="confirmpassword" type="password" className="form-control" id="exampleInputPassword1" />
                </div>
                

                <button onClick={handlesubmit} className="btn btn-primary">Submit</button>
                <br/>
                <small >Already a member. <Link style={{fontSize:'1rem',padding:'1px 1rem',marginBottom:'0.5rem'}} to={'/login'} className='btn btn-secondary'>Login</Link></small>
            </form>
        </>
    )
}