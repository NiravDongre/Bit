import { useNavigate } from "react-router-dom"

export function TopBarButton({Bname, className}){
    return (
        <div className={className}>
            <button className="text-1xl hover:border border-white rounded p-2">{Bname}</button>
        </div>
    )
}

export default function TopBar(){

    const navigate = useNavigate();

    return (
        <div className="flex justify-between">
            <div className="p-5 text-5xl font-bold">Bit</div>

            <div className="flex">
                <a href="https://github.com/NiravDongre/Bit" ><TopBarButton className={"p-4"} Bname={"Github"}></TopBarButton></a>
                <a href="http://localhost:5173/auth/sign-in"><TopBarButton className={"p-4"} Bname={"Features"}></TopBarButton></a>
                <a href="http://localhost:5173/"><TopBarButton className={"p-4"} Bname={"About"}></TopBarButton></a>
                <div className="bg-pink-600 transition delay-150 hover:bg-black  flex ">
                <button onClick={() => {
                    navigate("/auth/sign-up")
                }} className="text-xl p-2">LogIn</button>
                </div>
            </div>
        </div>
    )
}