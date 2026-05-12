import TopBar from "../component/Topbar";
import MainContext from "../component/MainContext";
import { DetailedContext } from "../component/DetailedContext";
import Footbar from "../component/Footbar"

export default function Website(){
    return <div>
        <TopBar></TopBar>
        <MainContext></MainContext>
        <DetailedContext></DetailedContext>
        <Footbar></Footbar>
    </div>
}

