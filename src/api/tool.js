export function Reload(){
    var {search,href} = window.location;
    href = href.replace(/&?t_reload=(\d+)/g,'')
    window.location.href = href+(search?'&':'?')+"t_reload="+new Date().getTime()
}