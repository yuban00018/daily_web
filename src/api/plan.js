import axios from "axios";
export function Check(id,done){
    return axios({
        method: "POST",
        url:"/plan/check",
        data:{
            id:id,
            done:done
        }
    })
}
export function GetList(){
    return axios({
        method: "GET",
        url:"/plan/list?id="+localStorage.getItem("id"),
        data:{}
    })
}