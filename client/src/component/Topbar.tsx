

function TopBarButton({Bname}){
    return (
        <div className="p-4">
            <button className="text-1xl hover:border border-white rounded p-2">{Bname}</button>
        </div>
    )
}

export default function TopBar(){
    return (
        <div className="flex justify-between">
            <div className="p-5 text-5xl font-bold">Bit</div>

            <div className="flex">
                <a href="https://github.com/NiravDongre/Bit" ><TopBarButton Bname={"Github"}></TopBarButton></a>
                <TopBarButton Bname={"Features"}></TopBarButton>
                <TopBarButton Bname={"About"}></TopBarButton>
                <div className="bg-pink-600 transition delay-150 hover:bg-black  flex ">
                <button className="text-xl p-2">LogIn</button>
                </div>
            </div>
        </div>
    )
}