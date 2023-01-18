import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import Card from "./card"
import '../App.css'

export default function Admin() {

    const [allUsers, set] = useState([])

    const [user,change]= useState();

    console.log(allUsers)

    useEffect(() => {
        fetch('http://localhost:8000/admin').then(data => data.json()).then(data => set(data.allUsers))
    }, [])

    console.log(user)


    return (
        <div style={{minHeight:'90vh'}}>{localStorage.getItem('auth-token-admin')  &&
            <div style={{ width: '100%', margin: '0 auto' }} onClick={(e)=>{
                if(user){
                    change(null)
                }
            }}>



                <div style={{ display: 'flex',flexDirection:'column',width:'80%',margin:'auto'}}>
                <div style={{fontSize:'2rem',fontWeight:'bolder',color:'white',padding:'2rem 0'}}>Users</div>

                    <table style={{borderRadius:'1rem'}}>
                        <tbody>
                            <tr><th>User Name</th>
                                <th>Userid</th>
                                </tr>
                                </tbody>
                                <tbody>
                            {
                                allUsers.length && allUsers.map((user,index) => (
                                    <tr key={user._id}><td><div id="link" onClick={()=>{
                                        change(()=>{
                                            return user;
                                        })
                                    }} >{user.first} {user.last}</div></td><td>{user.userid}</td>
                                    
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>



                </div>





            </div> || (!localStorage.getItem('auth-token-admin') && <div>Admin needs to login first <Link className="btn btn-primary" to={'/adminlogin'}>Login</Link></div>)}

            {  <div id="card" style={{position:'absolute',display:!user && 'none',top:'10vh',left:'10%',right:'10%',width:'80%'}}>{ user && <Card elem={user} />}</div>}
        </div>
    )
}