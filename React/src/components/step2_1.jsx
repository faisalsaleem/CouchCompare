import { useState } from "react";
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faHouse } from '@fortawesome/free-solid-svg-icons';
import { useLocation, useNavigate } from "react-router-dom";

const Step2_1 = () => {



  return (
    <>
    {change1 == false ? <div className='w-1/2 h-full  border border-zinc-800 bg-slate-200 overflow-auto ' >

          <p className='text-xl font-bold font-mono px-3 py-4 text-red-700 underline underline-offset-4'>First DataBase</p>
          <div className="w-full flex flex-col justify-center items-center">

          { db.db1.map((item, index) => (
              <div key={index} className=" mb-2 border border-black w-3/4">

                <div className=" w-full h-10 flex border-b border-white justify-between items-center">
                  <p className=" text-lg font-semibold font-mono px-2">{item}</p>
                  {activeDropdown == `dropdown${index}` ? <button onClick={() => setActiveDropdown(null)} className=" w-16 font-mono rounded-full text-white bg-red-700 mx-2 hover:bg-white hover:border hover:border-black hover:text-black" >Close</button>
                    : <button onClick={() => handlePClick(`dropdown${index}`, item, db.url1)} className=" w-16 font-mono rounded-full text-white bg-slate-300 mx-2 hover:bg-white hover:border hover:border-black hover:text-black">Click</button>
                  }
                </div>
             
              </div>
            ))
          }


          </div>
        </div>
          :
          // <div className='w-1/2 h-full  border border-zinc-800 bg-slate-200 overflow-auto '>
          //   <button onClick={() => handleButton1()} className=" w-28 h-10 font-mono rounded-full text-white bg-red-700  border border-red-700 hover:bg-white hover:border hover:border-black hover:text-black fixed bottom-24 left-5" >Back</button>
          //   <p className='text-xl font-bold font-mono px-3 py-4 text-red-700 underline underline-offset-4'>First DataBase</p>


          //   {Object.entries(change1Data).map(([key, value]) => {
          //     if (value) {
          //       // console.log(key)
          //     }
          //     return (
          //       <pre key={key} className="mx-32 my-5">{value}</pre>
          //     )

          //   })}

          // </div>
          "heelo"
        }
        </>
  )
}

export default Step2_1
