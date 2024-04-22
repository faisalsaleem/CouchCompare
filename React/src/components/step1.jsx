import { useState } from 'react';
import axios, { Axios } from 'axios';
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
const Step1 = () => {

    const showAlert = (text, message) => {
        // console.log(message)
        Swal.fire({
            position: "top-center",
            icon: `${text}`,
            title: `${message}`,
            showConfirmButton: false,
            timer: 2000
        });
    };



    const showAlert1 = (message) => {
    Swal.fire({
        icon: "error",
        title: "Something went wrong!",
        text: `Your ${message}`,
       
      });
    }

    const [box1, setbox1] = useState(false)
    const [box2, setbox2] = useState(false)
    const [spinner, setSpinner] = useState(false)

    const navigate = useNavigate();
    const [getData, setGetData] = useState({
        url1: "",
        userName1: "",
        password1: "",
        url2: "",
        userName2: "",
        password2: "",
    })

    const handleChange = (e) => {
        console.log({ ...getData, [e.target.name]: e.target.value })
        setGetData({ ...getData, [e.target.name]: e.target.value });
    }

    const handleBox1 = () => {
        if (box1 == false) {
            setbox1(true)
        }
        else {
            setbox1(false)
        }
    }

    const handleBox2 = () => {
        if (box2 == false) {
            setbox2(true)
        }
        else {
            setbox2(false)
        }
    }

    const cleanFileds = () => {
        setGetData({
            url1: "",
            userName1: "",
            password1: "",
            url2: "",
            userName2: "",
            password2: "",
        })
    }

    const sendData = async () => {
        var message;
        if (getData.url1 && getData.url2 !== "") {

            // console.log(getData.url1, getData.url2)
        }
        else {
            return showAlert("warning", "All fields required");
        }
        setSpinner(true)
        const { data } = await axios.post("http://localhost:4000/data/submit", {
            url1: getData.url1,
            userName1: getData.userName1,
            password1: getData.password1,
            url2: getData.url2,
            userName2: getData.userName2,
            password2: getData.password2,
        }).catch((err)=>{
            setSpinner(false)
                return showAlert("warning", "Server Error");

        });
        if (data.statusCode == 401) {
            if (!data.urlName[0] && !data.urlName[1]) {
                message = "Source URL & Target URL Is Incorrect";
            }
            else {
                if (!data.urlName[0]) {
                    message = "Source URL Is Incorrect";
                }
                if (!data.urlName[1]) {
                    message = "Target URL Is Incorrect";
                }
            }
            if (data.urlName[0] === "unauthorized" && data.urlName[1] === "unauthorized") {
                message = "Source & Target Authorization Is Incorrect ";
            }
            else {

                if (data.urlName[0] === 'unauthorized') {
                    message = "Source Authorization Is Incorrect"
                }
                if (data.urlName[1] === 'unauthorized') {
                    message = "Target Authorization Is Incorrect"
                }
            }

            setSpinner(false)

            return showAlert1(message);
        }
        else{
             // alert("Login Successfully")
             setSpinner(false)
             showAlert("success", "Login Successfully")
             navigate("/step2", { state: { db1: data.dataBase[0], db2: data.dataBase[1], url1: data.url[0], url2: data.url[1] } })
        }
      


    }

    return (
        <div className='w-screen h-screen bg-zinc-100 relative'>
            {spinner ? <div className='bg-gray-100 w-screen h-screen absolute opacity-50 text-4xl flex justify-center items-center'><FontAwesomeIcon icon={faSpinner} spin /></div>
                :
                <null />
            }
            <p className='text-red-700 text-4xl font-semibold py-2 px-2 border-b border-black'>CouchDB</p>
            <div className='flex items-center flex-col '>


                <div className=' w-1/2 border-b border-white pb-4'>
                    <p className='font-bold text-4xl text-red-700 pt-16'>Source</p>
                    <div className=' flex justify-end m-3 items-center'>
                        <label className='text-xl'>URL:</label>
                        <input className='w-1/2 ml-7 mr-48 p-2 text-xl' type='text' name='url1' value={getData.url1} onChange={handleChange} required />
                    </div>
                    <div className=' flex justify-end m-3 items-center'>
                        <label className='text-xl'>Authentication:</label>
                        <select className='w-1/2 ml-7 mr-48 p-2 text-xl' onChange={handleBox1}>
                            <option value="none">None</option>
                            <option value="authValues">Username and Password</option>
                        </select>
                    </div>
                    {box1 == true ?
                        <div>
                            <div className=' flex justify-end m-3 items-center'>
                                <label className='text-xl'>Username:</label>
                                <input className='w-1/2 ml-7 mr-48 p-2 text-xl' type='text' name='userName1' value={getData.userName1} onChange={handleChange} />
                            </div>
                            <div className=' flex justify-end m-3 items-center'>
                                <label className='text-xl'>Password:</label>
                                <input className='w-1/2 ml-7 mr-48 p-2 text-xl' type='password' name='password1' value={getData.password1} onChange={handleChange} />
                            </div>
                        </div> : <null />
                    }
                </div>



                {/* second Url  */}


                <div className=' w-1/2 pt-4'>
                    <p className='font-bold text-4xl text-red-700'>Target</p>
                    <div className=' flex justify-end m-3 items-center'>
                        <label className='text-xl'>URL:</label>
                        <input className='w-1/2 ml-7 mr-48 p-2 text-xl' type='text' name='url2' value={getData.url2} onChange={handleChange} required />
                    </div>
                    <div className=' flex justify-end m-3 items-center'>
                        <label className='text-xl'>Authentication:</label>
                        <select className='w-1/2 ml-7 mr-48 p-2 text-xl' onChange={handleBox2}>
                            <option value="none">None</option>
                            <option value="authValues">Username and Password</option>
                        </select>
                    </div>
                    {box2 == true ?
                        <div>
                            <div className=' flex justify-end m-3 items-center'>
                                <label className='text-xl'>Username:</label>
                                <input className='w-1/2 ml-7 mr-48 p-2 text-xl' type='text' name='userName2' value={getData.userName2} onChange={handleChange} />
                            </div>
                            <div className=' flex justify-end m-3 items-center'>
                                <label className='text-xl'>Password:</label>
                                <input className='w-1/2 ml-7 mr-48 p-2 text-xl' type='password' name='password2' value={getData.password2} onChange={handleChange} />
                            </div>
                        </div> :
                        <null />}
                </div>




                <div className=' w-1/2 flex pl-52 pt-1.5'>
                    <button className=" bg-red-700 font-mono text-xl mr-5 text-white w-32 h-10 rounded-full  hover:border hover:border-black hover:bg-slate-200 hover:text-black"
                        onClick={() => sendData()}
                    >Submit</button>
                    <button className=" bg-red-700 font-mono text-xl text-white w-32 h-10 rounded-full   hover:border hover:border-black hover:bg-slate-200 hover:text-black"
                        onClick={() => cleanFileds()}
                    >Reset</button>
                </div>

            </div>

        </div>
    )
}

export default Step1
