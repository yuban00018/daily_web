import axios from "axios";
export function GetList(){
    return axios({
        method: "GET",
        url:"/plan/list?id="+localStorage.getItem("id"),
        data:{}
    })
}
export function AddPlan(content,frequency){
    return axios({
        method:"POST",
        url:"/plan/add",
        data:{
            content:content,
            frequency:frequency
        }
    })
}
export function UpdatePlan(todo){
    return axios({
        method:"POST",
        url:"/plan/update",
        data:{
            planId:todo.planId,
            type:todo.type,
            frequency:todo.frequency,
            done:todo.done
        }
    })
}
export function DeletePlan(id){
    return axios({
        method:'GET',
        url:"/plan/delete?planId="+id,
    })
}