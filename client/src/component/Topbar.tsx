

function TopBarButton({Bname}){
    return (
        <div className="p-4">
            <button className="text-1xl border border-white rounded p-2">{Bname}</button>
        </div>
    )
}

export default function TopBar(){
    return (
        <div className="flex justify-between">
            <div className="p-5 text-5xl font-bold">Bit</div>

            <div className="flex">
                <TopBarButton Bname={"Github"}></TopBarButton>
                <TopBarButton Bname={"Features"}></TopBarButton>
                <TopBarButton Bname={"About"}></TopBarButton>
                <div className="bg-pink-600 flex ">
                <button className="text-xl p-2">LogIn</button>
                </div>
            </div>
        </div>
    )
}