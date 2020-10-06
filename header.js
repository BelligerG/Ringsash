let xhrHeader = new XMLHttpRequest();

function get_header() {
    let header = document.querySelector("nav");
    xhrHeader.open('GET', "header.html", true);
    xhrHeader.send(null);

    xhrHeader.onload = function(){
        if (xhrHeader.status==200){
            header.innerHTML = xhrHeader.responseText;
            setActiveMenu();
        }
    }
}

function setActiveMenu(){
    let menu = document.querySelectorAll("nav a");
    for (let i=0; i<menu.length; i++){
        if (menu[i].href == window.location.href){
            menu[i].setAttribute("class", "active");
        }
    }
}

get_header();