import { useState, useEffect } from "react";
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faHouse ,faCircleCheck,faCircleXmark} from '@fortawesome/free-solid-svg-icons';
import { useLocation, useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';
import Box from "./box";

const Step2 = () => {
 
  const navigate = useNavigate();
  const getDb = useLocation();
  const [query1, setQuery1] = useState("");
  const [boxState, setBoxState] = useState(false);

  const [urlValue, setUrlValue] = useState(
    {
      url1: getDb.state.url1,
      url2: getDb.state.url2,

    }
  )

  const getDataBaseNames = async () => {
    const { data } = await axios.post("http://localhost:4000/data/getDBS", {
      url1: urlValue.url1,
      url2: urlValue.url2,
    });
    
    
      handleUrl1(data.dataBase[0]);
      handleUrl2(data.dataBase[1]);
    
   
  }
 

  
  useEffect(() => {
    getDataBaseNames();
  }, []);



  // dataBase 1

  const [change1, setChange1] = useState(false)
  const [change1Data, setChange1Data] = useState(null)
  const [dbTest, setDbTest] = useState("")



  const handleUrl1 = async (db1) => {
    let arr = [];
    await Promise.all(
     db1.map(async (item) => {

        const { data } = await axios.post("http://localhost:4000/data/test", {
          url: urlValue.url1,
          db: item
        });
        arr.push(data)

      })
    )
    setDbTest(arr)
  }



  const [activeDropdown, setActiveDropdown] = useState(null);
  const [activeDropdown1, setActiveDropdown1] = useState(null);


  const handlePClick = async (dropdownId, item, dbUrl) => {
    setActiveDropdown(dropdownId);
  };




  const handleClick = async (dropdownId, designView,dbName) => {
    // console.log(dbName);
    setActiveDropdown1(dropdownId);
    for (let i = 0; i < dbTest1.length; i++) {
      // console.log(dbTest1[i].dbName)
      if(dbName === dbTest1[i].dbName){
        // console.log(dbTest1[i].views.view1)
      for (let j = 0; j < dbTest1[i].views.view1.length; j++) {
        if (dbTest1[i].views.view1[j].views !== undefined) {
          // console.log("tar val",dbTest1[i].views.view1[j]._id)
          if (designView._id === dbTest1[i].views.view1[j]._id) {
            // console.log(designView);

            Object.keys(designView.views).map(db1View => {

              Object.keys(dbTest1[i].views.view1[j].views).map(db2View => {
                let found = false;
               

               if(!found){
                if (db1View === db2View ) {
                  // console.log("db1View",db1View === db2View);
                  // console.log("db2View",db2View);
                  const result = renderDifferences(designView.views[db1View].map, dbTest1[i].views.view1[j].views[db2View].map);
                   designView.views[db1View].status = result;
                   found = true;
                  
                }
               }
                else {
                  designView.views[db1View].status = "red";
                }

              })

            })

          }
        }

      }
      }
      

    }
    // console.log("TEST", designView.views)
  };



  const renderDifferences = (string1, string2) => {
    string1 = JSON.stringify(string1);
    string2 = JSON.stringify(string2);
    if (string1.length === string2.length) {
      return 'green'
    } else {
      return 'yellow'
    }
  };




const handleSearch=(e)=>{
  setQuery1(e.target.value);
};
















  const handleStep3 = (designView, viewData) => {
    const keyToFind = viewData;
    const value = designView.views[keyToFind];
    // console.log(value.map)
    setChange1(true)
    setChange1Data(value.map);
  }

  const handleButton1 = () => {
    setChange1(false);
    setChange1Data(null);

  }







  // DataBase 2


  const [change2, setChange2] = useState(false)
  const [change2Data, setChange2Data] = useState(null)
  const [first3, setFirst3] = useState("")
  const [dbTest1, setDbTest1] = useState("")
  const [query2, setQuery2] = useState("");


  const [activeDropdown2, setActiveDropdown2] = useState(null);
  const [activeDropdown3, setActiveDropdown3] = useState(null);


  const handleUrl2 = async (db2) => {
    let arr = []
    await Promise.all(db2.map(async (item) => {

      const { data } = await axios.post("http://localhost:4000/data/test", {
        url: urlValue.url2,
        db: item
      });
      arr.push(data)


    }))
    setDbTest1(arr)
  }

  const handlePClick1 = async (dropdownId, item, dbUrl) => {
    setActiveDropdown2(dropdownId);
  };
  const handleClick1 = async (dropdownId, designView, index) => {
    setFirst3(Object.keys(designView.views))
    // console.log(Object.keys(designView.views))
    setActiveDropdown3(dropdownId)
  };
  const handleStep4 = (designView, viewData) => {
    const keyToFind = viewData;
    const value = designView.views[keyToFind];

    // console.log(value.map)
    setChange2(true)
    setChange2Data(value.map);
  }
  const handleSearch1=(e)=>{
    setQuery2(e.target.value);
  };
  

  const handleButton2 = () => {
    setChange2(false);
    setChange2Data(null);

  }


  // compare button 

  const handlecompare = (string1, string2) => {
    const str1 = string1;
    const str2 = string2;
    navigate("/step3", { state: { map1: str1, map2: str2 } })
  }





  const showAlert = (dbName,designView,viewData,text) => {
    Swal.fire({
      title: `${text}
      DataBase : ${dbName}.
      `,
      text: `${dbName}/${designView}/${viewData}.`,
      icon: 'success',
      confirmButtonText: 'OK'
    })
    .then((result) => {
    window.location.reload();
      
    })
  };

// Update view

  const handleUrlAndDb = async (dbName, designView, viewData,mapData ,text) => {
    console.log(dbName)
    console.log(designView)
    console.log(viewData[0])
    console.log(mapData)
    const changeMapData = {map:mapData}

    const { data } = await axios.post("http://localhost:4000/data/updateView", {
      url: urlValue.url2,
      db: dbName,
      designView: designView,
      view: viewData[0],
      mapData: changeMapData

    });
    if(data){
      getDataBaseNames();
      showAlert(dbName,designView,viewData,text);
    }
   
    // console.log(data)
  }

  // compare

  const checkDB = () => {


    for (let i = 0; i < dbTest.length; i++) {
      // console.log(dbTest[i].dbName)
      for (let j = 0; j < dbTest1.length; j++) {
        if (dbTest[i].dbName === dbTest1[j].dbName) {
          dbTest[i].status = 'green';
          break;
        }
        else {
          dbTest[i].status = 'red';
        }
      }

    }
  }
  checkDB();


  const checkDV = async () => {
    for (let i = 0; i < dbTest.length; i++) {
      // console.log(dbTest[i].views.view1)
      for (let j = 0; j < dbTest1.length; j++) {
        if (dbTest[i].dbName === dbTest1[j].dbName) {
          for (let n = 0; n < dbTest[i].views.view1.length; n++) {
            // console.log(dbTest[i].views.view1[n])
            for (let m = 0; m < dbTest1[j].views.view1.length; m++) {
              // console.log(dbTest1[j].views.view1[m])
              if (dbTest[i].views.view1[n]._id === dbTest1[j].views.view1[m]._id) {
                // console.log(dbTest[i].views.view1[n].views )
                dbTest[i].views.view1[n].status = "green";
                break;
              }
              else {
                dbTest[i].views.view1[n].status = "red";
              }


            }
          }

        }
      }

    }
  };
  checkDV();



  return (
    <div className='w-screen h-screen flex bg-zinc-100 relative flex-col'>

      <div className="flex items-cente py-5 px-5">
        <FontAwesomeIcon icon={faHouse} className="text-2xl text-red-700" /><h1 className=" px-3  text-2xl font-semibold text-red-700 cursor-pointer" onClick={() => navigate(-1)}>Home</h1>
      </div>
      <div className="w-full h-4/5 flex " >

        {change1 == false ? <div className='w-1/2 h-full  border border-zinc-800 bg-slate-200 overflow-auto ' >

<div className="flex justify-center items-center">
          <span className='text-xl font-bold font-mono px-3 py-4 text-red-700 underline underline-offset-4 text-center'>Source Database</span>
          <div className="ml-2 border-b border-red-500 px-2 flex justify-center items-center"
          onClick={()=>setBoxState(true)}
          > <FontAwesomeIcon className="text-red-500 text-lg" icon={faCircleXmark} /><span className="text-red-500 ml-1">{dbTest.length-dbTest1.length}</span>
          </div>

         { boxState  &&  <div className="absolute top-0 left-0 ">
            <Box db1Url={urlValue.url1} db1Ur2={urlValue.url2}/>
            </div>}
</div>
         <div className="w-full flex justify-center items-center mb-2">
         <input 
          className="w-3/4 h-10 pl-2"
        type="text" 
        placeholder="Search..." 
        value={query1} 
        onChange={(e)=>handleSearch(e)}
      />
         </div>

          <div className="w-full flex flex-col justify-center items-center">

            {dbTest && dbTest.filter((user)=>user.dbName.toLowerCase().includes(query1.toLowerCase())).map((item, index) => (
              <div key={index} className=" mb-2 border border-black w-3/4">

                <div className=" w-full h-10 flex border-b border-white justify-between items-center">
                  <div><span className=" text-lg font-semibold font-mono px-2 ">{item.dbName}{`--(${item.views.view1.length})`}</span>{item.status==="red" ? <FontAwesomeIcon className="  rounded-full" style={{color:item.status}} icon={faCircleXmark} size="xl"/> :<FontAwesomeIcon className="  rounded-full" style={{color:item.status}} icon={faCircleCheck} size="xl"/> }</div>
                  {activeDropdown == `dropdown${index}` ? <button onClick={() => setActiveDropdown(null)} className=" w-16 font-mono rounded-full text-white bg-red-700 mx-2 hover:bg-white hover:border hover:border-black hover:text-black" >Close</button>
                    : <button onClick={() => handlePClick(`dropdown${index}`, item, urlValue.url1)} className=" w-16 font-mono rounded-full text-white bg-slate-300 mx-2 hover:bg-white hover:border hover:border-black hover:text-black">Open</button>
                  }
                </div>
                {activeDropdown === `dropdown${index}` && (
                  <div  >
                    {item.views.view1.map((designView, index) => (
                      <>
                        <div  className="flex items-center  ml-14 ">
                          <FontAwesomeIcon icon={faChevronDown} rotation={270} onClick={() => handleClick(`dropdown${index}`, designView,item.dbName)} className="cursor-pointer" />

                          <div className="py-2" ><span className="pr-3">{index + 1}.{designView._id}{`--(${Object.keys(designView.views).length})`}</span>{!designView.status ?<FontAwesomeIcon className="  rounded-full"  style={{color:"red"}} icon={faCircleXmark} size="lg"/>: designView.status==="green" ? <FontAwesomeIcon className="  rounded-full"  style={{color:designView.status}} icon={faCircleCheck} size="lg"/>: <FontAwesomeIcon className="  rounded-full"  style={{color:designView.status}} icon={faCircleXmark} size="lg"/>}</div>

                        </div>
                        {activeDropdown1 == `dropdown${index}` && (
                          <div>
                            {Object.keys(designView.views).map(key => (
                                 <div className=" flex items-center justify-between ml-28 my-2">
                                  <div> <span onClick={() => handleStep3(designView, [key])} className="cursor-pointer mr-2">{key}</span>{!designView.views[key].status ? <FontAwesomeIcon className="  rounded-full" style={{color:"red"}} icon={faCircleXmark} size="xs"/> : designView.views[key].status=== "green" || "yellow" ? <FontAwesomeIcon className="  rounded-full" style={{color:designView.views[key].status}} icon={faCircleCheck} size="xs"/>: <FontAwesomeIcon className="  rounded-full" style={{color:designView.views[key].status}} icon={faCircleXmark} size="xs"/>}</div>
                                  {!designView.views[key].status ? 
                                  
                                  <button className="bg-slate-300 text-md px-2 mr-2 rounded-full"
                                  onClick={()=>handleUrlAndDb(item.dbName,designView._id,[key],designView.views[key].map,"Transfer")}
                                  >Transfer</button>

                                  :
                                  
                                  designView.views[key].status === "green" ?
                                <null/>
                                  :
                                  <button className="bg-slate-300 text-md px-2 mr-2 rounded-full"
                                  onClick={()=>handleUrlAndDb(item.dbName,designView._id,[key],designView.views[key].map,"Update")}
                                  >Update</button>
                                  
                                  }
                               </div>
                                  ))}
                          </div>  
                        )}
                      </>
                    )
                    )}
                  </div>
                )}
              </div>
            ))
            }


          </div>
        </div>
          :
          <div className='w-1/2 h-full  border border-zinc-800 bg-slate-200 overflow-auto '>
            <button onClick={() => handleButton1()} className=" w-28 h-10 font-mono rounded-full text-white bg-red-700  border border-red-700 hover:bg-white hover:border hover:border-black hover:text-black fixed top-20 left-5" >Back</button>
            <p className='text-xl font-bold font-mono px-3 py-4 text-red-700 underline underline-offset-4 text-center'>Source Database</p>
             <pre className="mx-32 my-5">{change1Data}</pre>
          </div>
        }


































        {/* // DataBase 2  // DataBase 2  // DataBase 2  // DataBase 2  // DataBase 2  // DataBase 2  // DataBase 2  // DataBase 2  // DataBase 2       */}

        {change2 == false ? <div className='w-1/2 h-full  border border-zinc-800 bg-slate-200 overflow-auto' >
          <p className='text-xl font-bold font-mono px-3 py-4 text-red-700 underline underline-offset-4 text-center'>Target Database</p>
          <div className="w-full flex justify-center items-center mb-2">
         <input 
          className="w-3/4 h-10 pl-2"
        type="text" 
        placeholder="Search..." 
        value={query2} 
        onChange={(e)=>handleSearch1(e)}
      />
         </div>
          <div className="w-full flex flex-col justify-center items-center">

            {/* Map over an array of items to render multiple paragraphs */}
            {dbTest1 && dbTest1.filter((user)=>user.dbName.toLowerCase().includes(query2.toLowerCase())).map((item, index) => (
              <div key={index} className=" mb-2 border border-black w-3/4">

                <div className=" w-full h-10 flex border-b border-white justify-between items-center">
                  <p className=" text-lg font-semibold font-mono px-2">{item.dbName}{`--(${item.views.view1.length})`}</p>
                  {activeDropdown2 == `dropdown${index}` ? <button onClick={() => setActiveDropdown2(null)} className=" w-16 font-mono rounded-full text-white bg-red-700 mx-2 hover:bg-white hover:border hover:border-black hover:text-black" >Close</button>
                    : <button onClick={() => handlePClick1(`dropdown${index}`, item, urlValue.url2)} className=" w-16 font-mono rounded-full text-white bg-slate-300 mx-2 hover:bg-white hover:border hover:border-black hover:text-black">Open</button>
                  }
                </div>
                {activeDropdown2 === `dropdown${index}` && (
                  <div >
                    {/* <p className="font-mono border border-black w-24 text-center m-1">Length--{first2.view1.length}</p> */}
                    {item.views.view1.map((designView, index) => (
                      <>
                        <div className="flex items-center  ml-14">
                          <FontAwesomeIcon icon={faChevronDown} rotation={270} onClick={() => handleClick1(`dropdown${index}`, designView, index)} className="cursor-pointer" />

                          <p className=" py-1">{index + 1}.{designView._id}{`--(${Object.keys(designView.views).length})`}</p>

                        </div>
                        {activeDropdown3 == `dropdown${index}` && (
                          <div>
                            {first3.map((viewData, indexValue) => {
                              return (
                                <div className=" flex items-center ml-28 ">
                                  {/* <FontAwesomeIcon icon={faChevronDown} className="text-xs" rotation={270}  /> */}
                                  <p onClick={() => handleStep4(designView, viewData)} className="cursor-pointer">{viewData}</p>

                                </div>)
                            })}
                          </div>
                        )}
                      </>
                    )
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
          :
          <div className='w-1/2 h-full  border border-zinc-800 bg-slate-200 overflow-auto relative'>
            <button onClick={() => handleButton2()} className=" w-28 h-10 font-mono rounded-full text-white bg-red-700  border border-red-700 hover:bg-white hover:border hover:border-black hover:text-black fixed top-20 right-5" >Back</button>
            <p className='text-xl font-bold font-mono px-3 py-4 text-red-700 underline underline-offset-4 text-center'>Target Database</p>

                <pre className="mx-32 my-5">{change2Data}</pre>

          </div>
        }
        {(change1Data && change2Data) ? <button onClick={() => handlecompare(change1Data, change2Data)} className="absolute bg-red-700 font-mono text-xl text-white w-40 h-12 rounded-full z-10 left-[720px] bottom-6 hover:border hover:border-black hover:bg-slate-200 hover:text-black" >compare</button> : ''}

      </div>
    </div>
  )
}

export default Step2
