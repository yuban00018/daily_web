import axios from "axios";
export function GetRecent(){
    return axios({
        // 获取当前失败完成日期信息
        method: "GET",
        url: "/statistic/recent",
        data: {}
    });
}