window.addEventListener("resize",setRem,false);
setRem();
function setRem(){
    const layout = 750;
    const html = document.documentElement;
    const width = document.documentElement.clientWidth || window.innerWidth;
    html.style.fontSize = (100 * width / layout) + 'px';
}