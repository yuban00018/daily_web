import axios from "axios";
export function GetRecommend(){
    return axios({
        method: "POST",
        url:"/group/groupRecommend",
        data:{}
    })
}


export function getGroupInfoById(id){
    // console.log("/group/groupInfoById?id=" + id);
    return axios({
        method: "GET",
        url:"/group/groupInfoById?id=" + id,
        data: {}
    })
}
