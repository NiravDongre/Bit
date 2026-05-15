import axios from "axios" 
import { useState } from "react"

function Input({onChange}){

    return <input onChange={onChange} className="bg-green-500  border-[3px] border-white w-full pl-5 p-4 text-xl rounded-none font-mono tracking-wider shadow-[4px_4px_0px_white]" type="text" placeholder="Youtube URL"/>
}

export default function MainContext(){

    type Transcript = {
        _id: string,
        start: number,
        text: string
    }

    const [ Url, setUrl ] = useState()
    const [ Mere, setMere ] = useState<Transcript[]>([])
    const [ error, setError ] = useState("")

    const Handler = async () => {

        try{
        setError("")   

        const response = await axios.post("http://localhost:3000/api/v2/youtube-to-transcript/transcript",{ Input: Url })

        setMere(response.data.data);

        } catch(err){
            if(err.response){
            setError(err.response.data.message || "Something went wrong")

            }
        }
    }
    
    return (
      <div>
        <div className="flex justify-center mt-16">
            <div>
              <a href="http://localhost:5173/"><h1 className="text-6xl font-bold p-7 text-red-900">Youtube to Transcript</h1></a>
               <p className="text-2xl p-5 text-red-500">Generate your Transcript for free using Youtube link.</p>
                <div className="p2 flex justify-between">
                 <Input onChange={(e: any) => { setUrl(e.target.value) }}></Input>
                 <button onClick={Handler} type="submit" className="p-5 ml-10 text-xl border  transition delay-50 duration-300 hover:bg-blue-600 rounded-xl bg-transparent">Get it...{">-<"}</button>
               </div>
            </div>
        </div>

        <div className="grid grid-cols-2 p-6 mt-10">
            <div className="col-span-2 shadow-lg shadow-blue-400/50">
              <p className="border border-blue p-7 rounded-xl relative"> 
                {Mere.map((items: Transcript) => (
                    <div className="flex border col-span-12 p-5 rounded-xl gap-4" key={items._id}>
                        <span>[ {items.start}s ]</span>
                        <p>{items.text}</p>
                    </div>
                 ))}{error && (
                    <p className="text-red-500 text-xl m-5">{error}</p>
                )}</p>
            </div>
        </div>

    </div>
    )
}