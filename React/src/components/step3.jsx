import { useState } from "react";
import axios from 'axios';
import {useLocation,useNavigate} from "react-router-dom";
const Step3=()=> {
  const navigate = useNavigate();

    const getDb = useLocation();
    const [map,setMap] = useState(
        {
          map1:getDb.state.map1,
          map2:getDb.state.map2,
         }
      )
      console.log(map)


      const renderDifferences = () => {
        const maxLength = Math.max(map.map1.length, map.map2.length);
        const differences = [];
    
        for (let i = 0; i < maxLength; i++) {
          const char1 = map.map2[i] || "" ;
          const char2 = map.map1[i]  || "";
    
          const style = char1 !== char2 ? { color: 'red' } : {};
          differences.push(<span key={i} style={style}>{char1}</span>);
        }
    
        console.log(differences)
        return differences;
      };

  return (
    <div className='w-screen h-screen flex bg-zinc-100'>
<div className='w-1/2 h-5/6  border border-zinc-800 bg-slate-200 overflow-auto' >
<p className='text-xl font-bold font-mono px-3 py-4 text-red-700 underline underline-offset-4 text-center'>Source Database</p>
         <pre  className="mx-32 my-5">{map.map1}</pre>
    </div>

<div className='w-1/2 h-5/6  border border-zinc-800 bg-slate-200 overflow-auto ' >
<p className='text-xl font-bold font-mono px-3 py-4 text-red-700 underline underline-offset-4 text-center'>Target Database</p>

    <pre  className="mx-32 my-5">{renderDifferences()}</pre>
    
         <div>
    
    </div>
         
</div>
<button onClick={()=>navigate(-1)} className="absolute bg-red-700 font-mono text-xl text-white w-40 h-12 rounded-full z-10 left-[720px] bottom-10 hover:border hover:border-black hover:bg-slate-200 hover:text-black" >Back</button>

    </div>
  )
}

export default Step3
