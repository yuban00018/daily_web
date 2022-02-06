import axios from "axios";
export function GetRecent(){
    return axios({
        method: "GET",
        url: "/statistic/recent",
        data: {}
    });
}