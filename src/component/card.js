import { useEffect, useState } from "react"

export default function Card(props) {

    const [torf, toggle] = useState(true);
    const [torfdiet, togglediet] = useState(false);
    const [torfex, toggleex] = useState(false);
    const [input, change] = useState({ title: '', content: '' })
    const [inputex, changeex] = useState({ exname: '', set: '' })
    const [meals, set] = useState([])
    const [exercises, setex] = useState([])
    const [d, dc] = useState();
    const [dex, dcex] = useState();


    const [date, cd] = useState();

    const [dates, pushDate] = useState([]);
    const [datex, pushDatex] = useState([]);

    const [md, setmd] = useState([]);
    const [ed, seted] = useState([]);



    useEffect(() => {
        if (dates.length == 1) {
            setmd(prev => {
                let temp = [];
                meals.map(elem => {
                    temp.push(elem.allmeals);
                })

                return temp;
            })
        }

    }, [dates])

    useEffect(() => {
        if (datex.length == 1) {
            seted(prev => {
                let temp = [];
                exercises.map(elem => {
                    temp.push(elem.allexercises);
                })

                return temp;
            })
        }

    }, [datex])


    console.log(props.elem)
    console.log(exercises)


    useEffect(() => {
        if (torf) {
            document.getElementById(`menu-${props.elem._id}`).style.display = 'block'
        }
        else {
            document.getElementById(`menu-${props.elem._id}`).style.display = 'none'
        }
    }, [torf])

    useEffect(() => {
        if (torfdiet) {
            document.getElementById(`menu-${props.elem._id}-diet`).style.display = 'block'
        }
        else {
            document.getElementById(`menu-${props.elem._id}-diet`).style.display = 'none'
        }
    }, [torfdiet])

    useEffect(() => {
        if (torfex) {
            document.getElementById(`menu-${props.elem._id}-ex`).style.display = 'block'
        }
        else {
            document.getElementById(`menu-${props.elem._id}-ex`).style.display = 'none'
        }
    }, [torfex])



    function handlechange(e) {
        e.preventDefault()
        change(prev => {
            let temp = { ...prev };

            temp[e.target.name] = e.target.value;

            return temp;
        })
    }

    function handlechangeex(e) {
        e.preventDefault()
        changeex(prev => {
            let temp = { ...prev };

            temp[e.target.name] = e.target.value;

            return temp;
        })
    }

    function handlesubmit(e) {



        e.preventDefault()
        fetch('http://localhost:8000/addmeals', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ data: input, userid: props.elem._id, mealdate: d, dates: dates })
        }).then(data => data.json()).then(data => {
            if (data.success)
                fetchdata();

        })
    }


    function handlesubmitex(e) {

        e.preventDefault()
        fetch('http://localhost:8000/addexercise', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ data: inputex, userid: props.elem._id, mealdate: dex })
        }).then(data => data.json()).then(data => {
            if (data.success)
                fetchdataex();
        })

    }




    useEffect(() => {
        fetchdata();
        fetchdataex();
    }, [])




    useEffect(() => {

        fetch('http://localhost:8000/admin/getmeals', {

            headers: {
                'id': props.elem._id,
                'Content-Type': 'application/json',
                'mealdate': d
            }
        }).then(data => data.json()).then((data) => set(data)).then(console.log('data fetched'))

    }, [d])

    useEffect(() => {
        fetch('http://localhost:8000/admin/getex', {

            headers: {
                'id': props.elem._id,
                'Content-Type': 'application/json',
                'exdate': dex
            }
        }).then(data => data.json()).then((data) => setex(data))
    }, [dex])

    function fetchdata() {
        fetch('http://localhost:8000/admin/getmeals', {

            headers: {
                'id': props.elem._id,
                'Content-Type': 'application/json',
                'mealdate': d
            }
        }).then(data => data.json()).then((data) => set(data)).then(console.log('data fetched'))

    }

    function fetchdataex() {
        fetch('http://localhost:8000/admin/getex', {

            headers: {
                'id': props.elem._id,
                'Content-Type': 'application/json',
                'exdate': dex
            }
        }).then(data => data.json()).then((data) => setex(data))

    }








    return (
        <div id="ted" style={{ background: 'white',height:'80vh',overflow:'scroll' }} >





            <div id={`menu-${props.elem._id}`} style={{ minHeight: '90vh', border: 'solid', marginBottom: '1rem', display: 'none' }}>

                <div style={{ background: "linear-gradient(to Right,black,gold)" }}> <div style={{ padding: '1rem 0', textAlign: 'center' }}><button onClick={() => { togglediet(prev => !prev); toggleex(prev => { if (prev) return !prev }) }} type="button" className="btn btn-dark">Diet</button>
                    <button style={{ marginLeft: '1rem' }} onClick={() => { toggleex(prev => !prev); togglediet(prev => { if (prev) return !prev }) }} type="button" className="btn btn-dark">Exercise</button></div></div>


                <div id={`menu-${props.elem._id}-diet`} style={{ padding:'0 10%', display: 'flex', margin: '0 auto', marginBottom: '10rem', display: 'flex', flexDirection: 'column' }}>


                    <div style={{ fontSize: '1.5rem', margin: '1rem 0', fontFamily: 'sans-serif', fontWeight: 'bolder' }}>Make Diet Plan</div>
                    <form >
                        <label htmlFor="whatdate">Select Date</label>
                        <div id="whatdate" onChange={(e) => { dc(e.target.value) }} style={{}}><input type="date" style={{ fontSize: '1.25rem' }} /></div>
                        <br />
                        <div className="form-group">
                            <label className="ms-1" htmlFor="formGroupExampleInput">Meal Time</label>
                            <input type="text" onChange={handlechange} name='title' className="form-control" id="formGroupExampleInput" placeholder="Example input" minLength={3} />
                        </div>
                        <br />
                        <div className="form-group">
                            <label className="ms-1" htmlFor="formGroupExampleInput2">Meal Content</label>
                            <input type="text" onChange={handlechange} name="content" className="form-control" id="formGroupExampleInput2" placeholder="Another input" minLength={5} />
                        </div>
                        <br />
                        <button onClick={handlesubmit} type="button" className="btn btn-primary mt-2">Add</button>

                    </form>





                    <div >





                        <div style={{ maxHeight: '250px', width: '100%', overflow: 'auto', paddingTop: '1.5rem',marginBottom:'1rem' }} >



                            <ol style={{ position: 'relative' }} className="list-group list-group-numbered">



                                {!meals.length ? <div className="alert alert-primary" role="alert">no meal has been added</div> : meals.map((elem, index) => <li key={index} className="list-group-item d-flex  align-items-start">
                                    <div style={{ display: 'flex', width: '100%', justifyContent: 'space-between' }}>
                                        <div style={{ width: '100%', textAlign: 'start' }} className="ms-2 me-auto">
                                            <div className="fw-bold">{elem.allmeals.title}</div>
                                            <div ><div >{elem.allmeals.content}</div>

                                            </div></div>
                                        <div onClick={() => {
                                            fetch('http://localhost:8000/deletemeal', {
                                                method: 'POST',
                                                headers: {
                                                    'Content-Type': 'application/json',
                                                },
                                                body: JSON.stringify({ id: elem._id })
                                            }).then(data => data.json()).then(data => { if (data.success) fetchdata() })
                                        }} style={{ marginTop: '1rem' }} >&#128465;</div></div>

                                </li>
                                )
                                }
                            </ol>

                        </div>

                        <div ><br />
                            Same plan for other dates ?
                            select dates

                            <br />
                            <div style={{marginBottom:'1rem'}}>
                                <input style={{ marginRight: '2rem' }} size={5} type="date" onChange={(e) => cd(prev => {
                                    return e.target.value;
                                })} />
                                {`   `}
                                <button onClick={() => pushDate(prev => {
                                    return [...prev, date]
                                })}>push this date</button>

                            </div>







                            <div style={{ background: 'white',width:'fit-content',padding:'0 1rem',border:'solid', display: 'flex', flexDirection: 'column' }}>
                                {
                                    dates.length !== 0 ? dates.map(elem => {
                                        return (<div style={{  display: 'inline-block' }}>{elem}</div>)
                                    }) : <div >no dates have been selected</div>
                                }
                            </div>
                            <br />
                            <button onClick={() => {

                                dates.forEach(elem => {



                                    md.forEach(meal => {

                                        console.log(meal)

                                        fetch('http://localhost:8000/addmeals', {
                                            method: 'POST',
                                            headers: {
                                                'Content-Type': 'application/json',
                                            },
                                            body: JSON.stringify({ data: meal, userid: props.elem._id, mealdate: elem })
                                        }).then(data => data.json()).then(data => {
                                            if (data.success)
                                                fetchdata();

                                        })




                                    })


                                })

                                pushDate(prev => { return [] });


                            }} className="btn btn-primary">copy meals</button>

                        </div>

                    </div>


                </div>
                <div id={`menu-${props.elem._id}-ex`} style={{ width: '80%', display: 'flex', margin: '0 auto', marginBottom: '10rem', display: 'flex', flexDirection: 'column' }}>

                    <div style={{ fontSize: '2.5rem', margin: '1rem 0' }}>Make Exercise Plan</div>

                    <form >
                        <div id="whatdate" onChange={(e) => { dcex(e.target.value) }} style={{}}><input type="date" /></div>
                        <div className="form-group">
                            <label className="ms-1" htmlFor="formGroupExampleInput">Exercise Name</label>
                            <input type="text" onChange={handlechangeex} name='exname' className="form-control" id="formGroupExampleInput" placeholder="Example input" />
                        </div>
                        <br />
                        <div className="form-group">
                            <label className="ms-1" htmlFor="formGroupExampleInput2">Set</label>
                            <input type="number" onChange={handlechangeex} name="set" className="form-control" id="formGroupExampleInput2" placeholder="Another input" />
                        </div>
                        <br />
                        <button  onClick={handlesubmitex} type="button" className="btn btn-primary mt-2 mb-2">Add</button>
                        

                    </form>





                    <div className="mt-2 dropdown">
                        
                        <ul style={{ paddingLeft:'0',maxHeight: '250px', width: '100%', overflow: 'auto' }} >
                            <ol className="list-group list-group-numbered">



                                {exercises.length && exercises.map((elem, index) => <li key={index} className="list-group-item d-flex justify-content-between align-items-start">
                                    <div className="ms-2 me-auto">
                                        <div className="fw-bold">{elem.allexercises.exname}</div>
                                        <div >{elem.allexercises.set} sets</div>
                                    </div>

                                </li>
                                )
                                }
                            </ol>
                        </ul>
                    </div>
                    <div ><br />
                            Same plan for other dates ?
                            select dates

                            <br />
                            <div style={{marginBottom:'1rem'}}>
                                <input style={{ marginRight: '2rem' }} size={5} type="date" onChange={(e) => cd(prev => {
                                    return e.target.value;
                                })} />
                                
                                <button onClick={() => pushDatex(prev => {
                                    return [...prev, date]
                                })}>push this date</button>

                            </div>







                            <div style={{ background: 'white',width:'fit-content',padding:'0 1rem',border:'solid', display: 'flex', flexDirection: 'column' }}>
                                {
                                    datex.length !== 0 ? datex.map(elem => {
                                        return (<div style={{  display: 'inline-block' }}>{elem}</div>)
                                    }) : <div >no dates have been selected</div>
                                }
                            </div>
                            <br />
                            <button onClick={() => {

                                datex.forEach(elem => {



                                    ed.forEach(meal => {

                                        console.log(meal)

                                        fetch('http://localhost:8000/addexercise', {
                                            method: 'POST',
                                            headers: {
                                                'Content-Type': 'application/json',
                                            },
                                            body: JSON.stringify({ data: meal, userid: props.elem._id, mealdate: elem })
                                        }).then(data => data.json())




                                    })


                                })

                                pushDatex(prev => { return [] });


                            }} className="btn btn-primary">copy exercises</button>

                        </div>


                </div>


            </div>


        </div>
    )
}