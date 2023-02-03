// -------- greeting and soting name of the user and playing drud shrif --------------
document.getElementById("username").innerHTML = localStorage.getItem("Name");
function _play() {
    let btn = document.getElementById("darurd");
    let darud = new Audio('/media/darud-sharif.mp3');
    darud.play()
    document.getElementById("popup").style.display = "none";
}

const userName = localStorage.getItem("Name")
if (userName == undefined || null) {
    localStorage.setItem("Name", prompt("Please enter your Name"));
    document.getElementById("username").innerHTML = localStorage.getItem("Name");
}

// -------- hijri date showing ----------
{ 
function gmod(n, m) {
    return ((n % m) + m) % m;
}

function kuwaiticalendar(adjust) {
    var today = new Date();
    if (adjust) {
        adjustmili = 1000 * 60 * 60 * 24 * adjust;
        todaymili = today.getTime() + adjustmili;
        today = new Date(todaymili);
    }
    day = today.getDate();
    month = today.getMonth();
    year = today.getFullYear();
    m = month + 1;
    y = year;
    if (m < 3) {
        y -= 1;
        m += 12;
    }

    a = Math.floor(y / 100.);
    b = 2 - a + Math.floor(a / 4.);
    if (y < 1583) b = 0;
    if (y == 1582) {
        if (m > 10) b = -10;
        if (m == 10) {
            b = 0;
            if (day > 4) b = -10;
        }
    }

    jd = Math.floor(365.25 * (y + 4716)) + Math.floor(30.6001 * (m + 1)) + day + b - 1524;

    b = 0;
    if (jd > 2299160) {
        a = Math.floor((jd - 1867216.25) / 36524.25);
        b = 1 + a - Math.floor(a / 4.);
    }
    bb = jd + b + 1524;
    cc = Math.floor((bb - 122.1) / 365.25);
    dd = Math.floor(365.25 * cc);
    ee = Math.floor((bb - dd) / 30.6001);
    day = (bb - dd) - Math.floor(30.6001 * ee);
    month = ee - 1;
    if (ee > 13) {
        cc += 1;
        month = ee - 13;
    }
    year = cc - 4716;

    if (adjust) {
        wd = gmod(jd + 1 - adjust, 7) + 1;
    } else {
        wd = gmod(jd + 1, 7) + 1;
    }

    iyear = 10631. / 30.;
    epochastro = 1948084;
    epochcivil = 1948085;

    shift1 = 8.01 / 60.;

    z = jd - epochastro;
    cyc = Math.floor(z / 10631.);
    z = z - 10631 * cyc;
    j = Math.floor((z - shift1) / iyear);
    iy = 30 * cyc + j;
    z = z - Math.floor(j * iyear + shift1);
    im = Math.floor((z + 28.5001) / 29.5);
    if (im == 13) im = 12;
    id = z - Math.floor(29.5001 * im - 29);

    var myRes = new Array(8);

    myRes[0] = day; //calculated day (CE)
    myRes[1] = month - 1; //calculated month (CE)
    myRes[2] = year; //calculated year (CE)
    myRes[3] = jd - 1; //julian day number
    myRes[4] = wd - 1; //weekday number
    myRes[5] = id; //islamic date
    myRes[6] = im - 1; //islamic month
    myRes[7] = iy; //islamic year

    return myRes;
}
function writeIslamicDate(adjustment) {
    var wdNames = new Array("Itwar", "Somwar (Peer)", "Mangal", "Budh", "Jum'arat", "Jumuah", "Sanichar");
    var iMonthNames = new Array("Muharram (1)", "Safar (2)", "Rabi'ul Awwal (3)", "Rabi'ussani (4)",
        "Jumadil Ula (5)", "Jumadissai (6)", "Rajab (7)", "Sha'ban (8)",
        "Ramzan (9)", "Shawwal (10)", "Zeeqa'dah (11)", "Zilhijjah (12)");
    var iDate = kuwaiticalendar(adjustment);
    var outputIslamicDate = wdNames[iDate[4]] + ", "
        + iDate[5] + " " + iMonthNames[iDate[6]] + ", " + iDate[7] + " Hijri";
    return outputIslamicDate;
}

document.getElementById("date").innerHTML = writeIslamicDate((-1));
let now = getDate()
document.getElementById("today").innerHTML = now.getDate();
}
// ----accordian from W3 School----

var acc = document.getElementsByClassName("accordion");
var i;

for (i = 0; i < acc.length; i++) {
    acc[i].addEventListener("click", function () {
        /* Toggle between adding and removing the "active" class,
        to highlight the button that controls the panel */
        this.classList.toggle("active");

        /* Toggle between hiding and showing the active panel */
        var panel = this.nextElementSibling;
        if (panel.style.display === "block") {
            panel.style.display = "none";
        } else {
            panel.style.display = "block";
        }
    });
}

// -------------for WPA--------

if ("serviceWorker" in navigator) {
    navigator.serviceWorker.register("sw.js").then(registration => {
        console.log("sw Registered!");
        // console.log(registration);z
    }).catch(error => {
        console.log("sw Registration Faild")
        console.log(error);
    });
};

let deferredPrompt;
window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    deferredPrompt = e;
});

function install() {
    function trigger() {
        deferredPrompt.prompt();
        deferredPrompt.userChoice.then((choiceResult) => {
            if (choiceResult.outcome === 'accepted') {
                console.log("user accepted the A2HS prompt");
            }
            deferredPrompt = null;
        })
    }
}

// ----------install WPA ----------

window.addEventListener('beforeinstallPrompt', (e) => {
    let btnAdd = document.getElementById("btnAdd")
    deferredPrompt = e;
    btnAdd.style.display = "none";
    showInstallPrompt();
})

let btnAdd = document.getElementById("btnAdd")
btnAdd.addEventListener('click', (e) => {
    deferredPrompt.prompt();
    deferredPrompt.userChoice.then((choiceResult) => {
        if (choiceResult.outcome === 'accepted') {
            btnAdd.style.display = "none";
            console.log('user accepted the A2HS prompt');
        } else {
            console.log('user dismissed the A2HS prompt');
            btnAdd.style.display = "block";
        }
        deferredPrompt = null;
    })
})

function call() {
    // setTimeout(function(){document.getElementById("btnAdd").click()},1000)
}
