//taken from SuperSpruce and soul147

function tab(tabToGo) { //main tabs
    document.getElementById("production").style.display = "none"
    document.getElementById("prestige").style.display = "none"
    document.getElementById("settings").style.display = "none"

    document.getElementById(tabToGo).style.display = "inline-block"
}

function subTab1(subTabToGo1) { //used for sub prestige tabs
    document.getElementById("subPrestige1").style.display = "none"
    document.getElementById("subPrestige2").style.display = "none"
    document.getElementById("subPrestige3").style.display = "none"
    document.getElementById("subPrestige4").style.display = "none"

    document.getElementById(subTabToGo1).style.display = "inline-block"
}

function subTab2(subTabToGo2) { //used for sub more tabs
    document.getElementById("subSettings1").style.display = "none"
    document.getElementById("subSettings2").style.display = "none"
    document.getElementById("subSettings3").style.display = "none"

    document.getElementById(subTabToGo2).style.display = "inline-block"
}