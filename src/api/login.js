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
export function Register(form){
    return axios({
        method: "POST",
        url:"/user/register",
        data:{
            name:form.name,
            password:form.password,
            email:form.email
        }
    })
}