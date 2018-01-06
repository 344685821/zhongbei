window.onload=function () {

    var videoBox=document.querySelector(".video-box");
    var controls=document.querySelector(".controls");
    videoBox.onmouseover=function () {
        controls.style.display="block";
    }
    videoBox.onmouseout=function () {
        controls.style.display="none";
    }
}