//taken from SuperSpruce and soul147

function tab(tabToGo) { //main tabs
    document.getElementById("production").style.display = "none"
    document.getElementById("prestige").style.display = "none"
    document.getElementById("boosters").style.display = "none"
    document.getElementById("settings").style.display = "none"
    document.getElementById("achievements").style.display = "none"

    document.getElementById(tabToGo).style.display = "inline"
}

function subTab1(subTabToGo1) { //used for sub prestige tabs
    document.getElementById("subPrestige2").style.display = "none"
    document.getElementById("subPrestige3").style.display = "none"
    document.getElementById("subPrestige4").style.display = "none"
    document.getElementById("subPrestige5").style.display = "none"

    document.getElementById(subTabToGo1).style.display = "inline"
}

function subTab2(subTabToGo2) { //used for sub settings tabs
    document.getElementById("subSettings1").style.display = "none"
    document.getElementById("subSettings2").style.display = "none"
    document.getElementById("subSettings3").style.display = "none"
    document.getElementById("subSettings4").style.display = "none"
    document.getElementById("subSettings5").style.display = "none"

    document.getElementById(subTabToGo2).style.display = "inline"
}

function subTab3(subTabToGo3) { //production
    document.getElementById("subProduction1").style.display = "none"
    document.getElementById("subProduction2").style.display = "none"
    document.getElementById("subProduction3").style.display = "none"
    document.getElementById("subProduction4").style.display = "none"

    document.getElementById(subTabToGo3).style.display = "inline"
}

function subTab4(subTabToGo4) {
    document.getElementById("subAchievements1").style.display = "none"
    document.getElementById("subAchievements2").style.display = "none"

    document.getElementById(subTabToGo4).style.display = "inline"
}