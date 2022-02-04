import axios from "axios";
export function Submit(name,password){
    return axios({
        method: "POST",
        url:"/user/login",
        data:{
            password: password,
            name:name
        }
    })
}