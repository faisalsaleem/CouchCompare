import List from './list';
const Step4 = () => {

    const Data = [
        {   
            name: "abc",
            email: "abc@gmail.com",
            sub: {
                subName: "sub-abc",
                subEmail: "sub-abc@gmail.com",
                sub1: {
                    sub1Name: "sub1-abc",
                    sub1Email: "sub1-abc@gmail.com"
                }
            }
        },
        {
            name: "xyz",
            email: "xyz@gmail.com",
            sub: {
                subName: "sub-xyz",
                subEmail: "sub-xyz@gmail.com",
                sub1: {
                    sub1Name: "sub1-xyz",
                    sub1Email: "sub1-xyz@gmail.com"
                }
            }
        },
        {
            name: "fgh",
            email: "fgh@gmail.com",
            sub: {
                subName: "sub-fgh",
                subEmail: "sub-fgh@gmail.com",
                sub1: {
                    sub1Name: "sub1-fgh",
                    sub1Email: "sub1-fgh@gmail.com"
                }
            }
        },
    ];
   
    return (
        <div className='w-screen h-screen  bg-zinc-100 '>
            {Data.map((item) => {
                return (
                    <List data1={item.name} data2={item.email} data3={item.sub.subName} data4={item.sub.subEmail} data5={item.sub.sub1.sub1Name} data6={item.sub.sub1.sub1Email} />
                )
            })}
        </div>
    )
}

export default Step4