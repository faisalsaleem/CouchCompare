import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const Box = () => {
  const getDb = useLocation();


  const [dbValues, setDbValues] = useState(
    {
      db1: getDb.state.url1,
      db2: getDb.state.url2,

    }
  )
  console.log(dbValues)

  return (
    <div className='w-screen h-screen  flex justify-center items-center '>
      <div className='w-8/12 h-4/6 bg-slate-500 '>

        <h1>hioh</h1>
      </div>
    </div>
  )
}

export default Box
