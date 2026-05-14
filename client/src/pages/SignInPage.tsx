import { useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import TopBar from "../component/Topbar"
import Footbar from "../component/Footbar"


export function SignInPage() {

    const navigate = useNavigate()
    const [ Username, setUsername ] = useState("")
    const [ Password, setPassword ] = useState("")
    
     
    console.log(Username)
    return (
        <div>
     <TopBar></TopBar>
        <div className="flex justify-center items-center h-screen p-16">

            <div className="">

            <h1 className="text-center font-mono text-3xl mb-5">Sign up</h1>

            <div className="grid rounded-xl bg-teal-50 p-10">
                <div className="mb-4">
                <p className="text-xl p-2 text-left">username :</p>
                <input onChange={(e) => { setUsername(e.target.value) }} className="p-2 bg-transparent text-xl rounded-xl border border-yellow" type="text" placeholder="username" />
                </div>

                <div>
                <p className="text-xl p-2 text-left">password :</p>
                <input onChange={(e) => { setPassword(e.target.value) }} className="p-2 bg-transparent text-xl rounded-xl border border-yellow" type="text" placeholder="password" />
                </div>

             <button type="submit" onClick={async() => {
                const response = await axios.post("http://localhost:3000/api/v2/auth/sign-in", {
                    username: Username,
                    password: Password
                })

                if(response){
                    <div>User has Signed In</div>
                }
            

             }} className="bg-black p-4 mt-4 rounded-xl text-xl">Sumbit</button>

            </div>

            <p className="text-center">Didn't sign up go here <a onClick={() => navigate("/auth/sign-up")} className="hover:underline">sign-in</a></p>
            </div>
            
            </div>
        <Footbar></Footbar>
        </div>
    )
}