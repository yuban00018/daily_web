import axios from "axios";
import router from "@/router";
import {store} from "@/api/commonVar";

axios.interceptors.request.use(function(config)
{
    const token = window.localStorage.getItem('TokenKey');
    if(token){
        config.headers.Authorization = localStorage.getItem('TokenKey');
    }
    return config;
},(error)=>{
    router.push('/').then(res => {console.log(res)});
    if(error.response){
        store.setMessage(error.response.data.message);
    }
    localStorage.clear();
    return Promise.reject(error);
})

axios.interceptors.response.use((res) => {
    return res;
},(error)=>{
    //console.log(Object.assign({},error));
    router.push('/').then(res => {console.log(res)});
    if(error.response){
        store.setMessage(error.response.data.message);
    }
    localStorage.clear();
    return Promise.reject(error);
})