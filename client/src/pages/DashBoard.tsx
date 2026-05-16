import { useState } from "react"
import axios from "axios";

function Input({onChange}){

    return <input onChange={onChange} className="bg-green-500  border-[3px] border-white w-full pl-5 p-4 text-xl rounded-none font-mono tracking-wider shadow-[4px_4px_0px_white]" type="text" placeholder="Youtube URL"/>
}


export function DashBoard(){

    const [ Url, setUrl ] = useState()
    const [ Mere, setMere ] = useState('')

    
    const Handler = async () => {

        const response = await axios.post("http://localhost:3000/api/v2/youtube-to-transcript/summary",{
            Input: Url
        },{
            withCredentials: true
        }
    )

        setMere(response.data.data.Summary);
    }

    return (
        <>
        <div className="flex justify-center mt-16">
            <div>
             <a href="http://localhost:5173/"><h1 className="text-6xl font-bold p-7 text-red-900">Youtube to Transcript</h1></a>
             <p className="text-2xl p-5 text-red-500">Generate your Transcript for free using Youtube link.</p>
                <div className="p2 flex justify-between">
                 <Input onChange={(e: any) => {
                     setUrl(e.target.value)
                     }}></Input>
                 <button onClick={Handler} type="submit" className="p-5 ml-10 text-xl border  transition delay-50 duration-300 hover:bg-blue-600 rounded-xl bg-transparent">Summary</button>
               </div>
            </div>
        </div>

        <div>
            <h1></h1>
        </div>
        <div className="flex justify-center mt-16 p-10">
            <div className=" border rounded-xl grid-cols-12 p-10 gap-4 w-full max-w-6xl">
                {Mere}
            </div>
        </div>
        </>
    )
}

