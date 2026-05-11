 


function Input(){
    return <input onChange={(e) => {
        const url = e.target.value
        console.log(url)
    }} className="bg-green-500  border-[3px] border-white w-full pl-5 p-4 text-xl rounded-none font-mono tracking-wider shadow-[4px_4px_0px_white]" type="text" placeholder="Youtube URL"/>
}

export default function MainContext(){



    return (
        <div className="flex justify-center mt-16">
            <div>
             <h1 className="text-6xl font-bold p-7 text-red-900">Youtube to Transcript</h1>
             <p className="text-2xl p-5 text-red-500">Generate your Transcript for free using Youtube link.</p>
               <div className="p2 flex justify-between">
                <Input></Input>
                <button onClick={() => {
                    axios
                }} type="submit" className="p-5 ml-10 text-xl border  transition delay-50 duration-300 hover:bg-blue-600 rounded-xl bg-transparent">Get it...{">-<"}</button>
               </div>
            </div>
        </div>
    )
}