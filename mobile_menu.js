var clicked = false;

var clickedMenu = function() {
    let img = document.getElementById("hamburger");
    let mnavdark = document.getElementById("mnavdark");
    if (clicked) {
        img.src = "images/hamburger.png";
        clicked = false;
        mnavdark.style.display = "none";
    } else {
        img.src = "images/hamburger_close.png";
        clicked = true;
        mnavdark.style.display = "block";
    }
}

document.getElementById("hamburger").addEventListener("click", clickedMenu);


function checkMobileMenu(){
    let menu = document.querySelector("nav");
    if (window.innerWidth <= 960 && menu.getAttribute("class") != "mobile"){
        menu.setAttribute("class", "mobile");
        menu.setAttribute("id", "mnavdark");
        menu.style.display = "none";
    } else if (window.innerWidth > 960 && menu.getAttribute("class") == "mobile"){
        menu.setAttribute("class", "");
        menu.setAttribute("id", "");
        menu.style.display = "block";
    }
}

window.onresize = checkMobileMenu;

checkMobileMenu();