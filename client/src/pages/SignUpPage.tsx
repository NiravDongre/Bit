import { useState } from "react"
import axios from "axios"



export function SingUpPage() {

    const [ Username, setUsername ] = useState("")
    const [ Email, setEmail ] = useState("")
    const [ Password, setPassword ] = useState("")
    
     
    console.log(Username)
    return (
        <div className="flex justify-center items-center h-screen p-16">

            <div className="">

            <h1 className="text-center font-mono text-3xl mb-5">Sign up</h1>


            <div className="grid rounded-xl bg-teal-50 p-10">
                <div>
                <p className="text-xl p-2 text-left">username :</p>
                <input onChange={(e) => { setUsername(e.target.value) }} className="p-2 bg-transparent text-xl rounded-xl border border-yellow" type="text" placeholder="username" />
                </div>

                <div className="mt-4 mb-4">
                    <p className="text-xl p-2 text-left">email :</p>
                    <input onChange={(e) => { setEmail(e.target.value) }} className="p-2 bg-transparent text-xl rounded-xl border border-yellow" type="text" placeholder="email" />
                </div>

                <div>
                <p className="text-xl p-2 text-left">password :</p>
                <input onChange={(e) => { setPassword(e.target.value) }} className="p-2 bg-transparent text-xl rounded-xl border border-yellow" type="text" placeholder="password" />
                </div>

             <button type="submit" onClick={async() => {
                const response = await axios.post("http://localhost:3000/api/v2/auth/sign-up", {
                    username: Username,
                    email: Email,
                    password: Password
                })

                console.log(response)
             }} className="bg-black p-4 mt-4 rounded-xl text-xl">Sumbit</button>

            </div>


            </div>

        </div>
    )
}