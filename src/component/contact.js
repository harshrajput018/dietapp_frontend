export default function Landing() {







    return (
        <div style={{ color: 'white', height: '90vh' }}>

            <div style={{textAlign:'center',paddingTop:'2rem',background:'white',color:'black'}}><div style={{ fontSize: '3rem',fontWeight:'bolder' }}>Let's Talk</div>
            <div>Have any questions? Talk to us.</div></div>
            <div style={{ textAlign: 'center', display: 'flex', justifyContent: 'space-evenly', paddingTop: '4rem', paddingBottom: '8rem', color: 'black', fontWeight: 'bolder', fontSize: '1.25rem', background: 'white' }}>

                <div id="whatsapp" style={{ paddingRight: '2rem', textAlign: 'center' }}>
                    <img src="./whatsapp.webp" width={'50px'} />
                    <p>7827960243</p>
                </div>
                <div id="instagram" style={{ paddingRight: '2rem', textAlign: 'center' }}>
                    instagram.com
                </div>
                <div id="Email">
                    <p>harshrajput18@gmail.com</p>
                </div>
            </div>



        </div>
    )
}