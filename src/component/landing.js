import '../App.css'
import { Link } from 'react-router-dom'


export default function Landing() {







    return (
        <>
            <div id='container' style={{ width: '80%', marginLeft: 'auto', marginRight: 'auto',paddingTop:'5rem'}}>
                <div className="landing-text" style={{ minHeight: '90vh', color: 'white' }}>
                    <div style={{ paddingTop: '2rem' }} >
                        <h1 style={{ fontSize: '4rem', fontFamily: 'cursive' }}>DietX</h1>
                        <h2 style={{ fontFamily: 'serif' }}>No Pain, No Gain</h2>
                        <p style={{ fontFamily: 'serif', color: 'wheat' }}>Get Diet and Workout Plans According to Your Goals</p>
                        {!localStorage.getItem('auth-token') &&
                            <Link to='/signup'><button id='jn' >Join Now</button></Link>
                        }
                        
                    </div>
                </div>
                <div style={{textAlign:'right'}}>
                    <img style={{width:'80%'}} id='piyush' src="./piyush.jpeg" />
                </div>
            </div>

        </>
    )
}