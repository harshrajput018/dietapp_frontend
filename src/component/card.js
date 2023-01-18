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


    console.log(props.elem)
    console.log(dates)
    

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
        <div id="ted" style={{ background: 'linear-gradient(to bottom right,skyblue, grey,black' }} >





            <div id={`menu-${props.elem._id}`} style={{ minHeight: '90vh', border: 'solid', marginBottom: '1rem', textAlign: 'center', display: 'none' }}>


                <div style={{ padding: '1rem 0' }}><button onClick={() => { togglediet(prev => !prev); toggleex(prev => { if (prev) return !prev }) }} type="button" className="btn btn-dark">Diet</button>
                    <button style={{ marginLeft: '1rem' }} onClick={() => { toggleex(prev => !prev); togglediet(prev => { if (prev) return !prev }) }} type="button" className="btn btn-dark">Exercise</button></div>

                <div id={`menu-${props.elem._id}-diet`} style={{ width: '80%', display: 'flex', margin: '0 auto', marginBottom: '10rem', display: 'flex', flexDirection: 'column' }}>


                    <div style={{ fontSize: '2.5rem', margin: '1rem 0' }}>Make Diet Plan</div>
                    <form >
                        <div id="whatdate" onChange={(e) => { dc(e.target.value) }} style={{}}><input type="date" /></div>
                        <div className="form-group">
                            <label className="ms-1" htmlFor="formGroupExampleInput">Meal Title</label>
                            <input type="text" onChange={handlechange} name='title' className="form-control" id="formGroupExampleInput" placeholder="Example input" minLength={3} />
                        </div>
                        <div className="form-group">
                            <label className="ms-1" htmlFor="formGroupExampleInput2">Meal Content</label>
                            <input type="text" onChange={handlechange} name="content" className="form-control" id="formGroupExampleInput2" placeholder="Another input" minLength={5} />
                        </div>
                        <button onClick={handlesubmit} type="button" className="btn btn-primary mt-2">Add</button>

                    </form>





                    <div >





                        <div style={{ maxHeight: '250px', width: '100%', overflow: 'auto', paddingTop: '1.5rem' }} >



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

                        <div><br />
                            Same plan for other dates ?
                            select dates

                            <input size={5} type="date" onChange={(e) => cd(prev => {
                                return e.target.value;
                            })} />

                            <button onClick={() => pushDate(prev => {
                                return [...prev, date]
                            })}>push this date</button>



                            <div style={{ background: 'black' }}>
                                {
                                    dates.length !== 0 ? dates.map(elem => {
                                        return (<div style={{ color: 'white' }}>{elem}</div>)
                                    }) : <div style={{ color: 'white' }}>no dates have been selected</div>
                                }
                            </div>
                            <br />
                            <button onClick={() => {

                                dates.forEach(elem => {

                                    

                                    md.forEach(meal => {



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

                                pushDate(prev=>{return []});


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
                        <div className="form-group">
                            <label className="ms-1" htmlFor="formGroupExampleInput2">Set</label>
                            <input type="number" onChange={handlechangeex} name="set" className="form-control" id="formGroupExampleInput2" placeholder="Another input" />
                        </div>
                        <button onClick={handlesubmitex} type="button" className="btn btn-primary mt-2">Add</button>

                    </form>





                    <div className="mt-2 dropdown">
                        <button>
                            All Exercise
                        </button>
                        <ul style={{ maxHeight: '250px', width: '100%', overflow: 'auto' }} >
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


                </div>


            </div>


        </div>
    )
}