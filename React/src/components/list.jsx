import { useState } from 'react'
const List = ({ data1, data2, data3, data4 ,data5, data6 }) => {
    const [divOne, setDivOne] = useState(false);
    const [subDivOne, setSubDivOne] = useState(false);
    const [sub1DivOne, setSub1DivOne] = useState(false);



    const handleDivOne = () => {
        if (divOne == false) {
            setDivOne(true)
        }
        else {
            setDivOne(false)
            setSubDivOne(false)
            setSub1DivOne(false)

        }


    }

    const handleSubDivOne = () => {
        if (subDivOne == false) {
            setSubDivOne(true)
        }
        else {
            setSubDivOne(false)
            setSub1DivOne(false)

        }


    }

    const handleSub1DivOne = () => {
        if (sub1DivOne == false) {
            setSub1DivOne(true)
        }
        else {
            setSub1DivOne(false)

        }


    }
    return (

        <div className="w-1/2 m-4 flex flex-col    border  border-black">
            <div className='flex justify-between items-center  border-b border-white'>
                <p>{data1}</p>
                <p>{data2}</p>
                <button className="p-2 bg-emerald-600" onClick={() => handleDivOne()}>click</button>
            </div>
            {divOne && <div>
                <p>{data3}</p>
                <p>{data4}</p>
                <button className="p-2 bg-emerald-600" onClick={() => handleSubDivOne()}>click</button>
            </div>
            }
            {subDivOne && <div>
                <p>{data5}</p>
                <p>{data6}</p>
                <button className="p-2 bg-emerald-600" onClick={() => handleSub1DivOne()}>click</button>
            </div>
            }
{sub1DivOne && <div>
               hello
            </div>
            }
        </div>
    )
}

export default List
