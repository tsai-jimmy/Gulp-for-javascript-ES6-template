/* 
* 獲取html元素在面上的座標
* 
* top - offsetTop
* left - offsetLeft
* 搭配 animated-scroll-to 使用
* 
*/
function GetOffset(el) {
    const box = el.getBoundingClientRect();
    return {
        top: box.top + window.pageYOffset - document.documentElement.clientTop,
        left: box.left + window.pageXOffset - document.documentElement.clientLeft
    }
}


export default {
    GetOffset: GetOffset
}