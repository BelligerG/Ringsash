let cookie = document.cookie;
let xhrCookie = new XMLHttpRequest();
let cookieContainer;

let total_time_fade = 1000; //ms
let time_interval_fade = 10; //ms
let interval = (1/total_time_fade) * time_interval_fade;
let opacity = 0;

let getConsent = function(){
    xhrCookie.open('GET', "cookieConsent.html", true);
    xhrCookie.send(null);

    xhrCookie.onload = function(){
        if (xhrCookie.status==200){
            fadeInResponse(xhrCookie.responseText);
        }
    }
}

let fadeInResponse = function(text){
    cookieContainer = document.createElement('div');
    cookieContainer.setAttribute("id", "cookieConsent");

    cookieContainer.innerHTML = text;
    document.getElementById('page').appendChild(cookieContainer);

    let timer = setInterval(function() {
        if (opacity > 1){
            clearInterval(timer);
        }
        cookieContainer.style.opacity = opacity;
        opacity += interval;
    }, time_interval_fade);

    let consent = document.getElementsByClassName("cookieConsentOK");
    consent[0].addEventListener("click", consentGiven, false);
}

let consentGiven = function(){
    cookieContainer.style.display = "none ";
}

var cookieChecker = function(){
    if (cookie.includes("consent=true")){
        // nothing to be done
    } else {
        // once the page has loaded, load in the consent banner
        window.addEventListener('load', getConsent, false);
        document.cookie = "consent=true"
    }
}

cookieChecker();