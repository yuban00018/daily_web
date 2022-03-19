import axios from "axios";
export function GetRecommend(){
    return axios({
        method: "POST",
        url:"/group/groupRecommend",
        data:{}
    })
}


export function GetGroupInfoById(id){
    // console.log("/group/groupInfoById?id=" + id);
    return axios({
        method: "GET",
        url:"/group/groupInfoById?id=" + id,
        data: {}
    })
}



export function GetGroupInfoByKind(kind){
    // console.log("kind: " + kind)
    return axios({
        method: "GET",
        url:"/group/groupInfoByKind?kind=" + kind,
        data: {}
    })
}



export function GetGroupInfoByGroupId(groupId){
    // console.log("/group/groupInfoByGroupId?groupId=" + groupId);
    return axios({
        method: "GET",
        url:"/group/groupInfoByGroupId?groupId=" + groupId,
        data: {}
    })
}


export function GetGroupPlanByGroupId(groupId){
    // console.log("/group/groupPlanByGroupId?groupId=" + groupId);
    return axios({
        method: "GET",
        url:"/group/groupPlanByGroupId?groupId=" + groupId,
        data: {}
    })
}



export function UserJoinGroup(userId, groupId){
    // console.log("/group/userJoinGroup?userId=" + userId + "&groupId=" + groupId);
    return axios({
        method: "GET",
        url:"/group/userJoinGroup?userId=" + userId + "&groupId=" + groupId,
        data: {}
    })
}


export function UserExitGroup(userId, groupId){
    // console.log("/group/UserExitGroup?userId=" + userId + "&groupId=" + groupId);
    return axios({
        method: "GET",
        url:"/group/userExitGroup?userId=" + userId + "&groupId=" + groupId,
        data: {}
    })
}


export function UserDoGroupPlan(userId, planId){
    // console.log("/group/userDoGroupPlan?userId=" + userId + "&planId=" + planId);
    return axios({
        method: "GET",
        url:"/group/userDoGroupPlan?userId=" + userId + "&planId=" + planId,
        data: {}
    })
}



export function UserFailGroupPlan(userId, planId){
    // console.log("/group/userFailGroupPlan?userId=" + userId + "&planId=" + planId);
    return axios({
        method: "GET",
        url:"/group/userFailGroupPlan?userId=" + userId + "&planId=" + planId,
        data: {}
    })
}