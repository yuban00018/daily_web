import Cookies from 'js-cookie'

const TokenKey = 'default key'

export function GetToken(){
    return Cookies.get(TokenKey)
}

export function SetToken(token){
    return Cookies.set(TokenKey,token)
}

export function RemoveToken(){
    return Cookies.remove(TokenKey)
}
