import TopBar from "../component/Topbar";
import MainContext from "../component/MainContext";
import { DetailedContext } from "../component/DetailedContext";


export default function Website(){
    return <div>
        <TopBar></TopBar>
        <MainContext></MainContext>
        <DetailedContext></DetailedContext>
    </div>
}

