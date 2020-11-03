//neq = notEquals


//The code isn't that hard
//The code:


player = {
    scrap : new Decimal("0"),
    scrapsPerClick : new Decimal("1"),
    scrapsPerSecond : new Decimal("0"),
    factoryCost : new Decimal("10"),
    factoryBought : new Decimal("0"),
    extraFactories : new Decimal("0"),
    scrapBoostCost : new Decimal("100"),
    scrapBoostBought : new Decimal("0"),
    uselessFBaseCost : new Decimal("10"),//
    uselessSBBaseCost : new Decimal("100"),//
    scrapBoostMultiplier : new Decimal("3"),
    goldenScrap : new Decimal("0"),
    timeSpentInThisPrestige : new Decimal("0"),
    stars : {
        bought : new Decimal("0"),
        initialCost : new Decimal("1e4"),
        costScaling : new Decimal("1e15"),
        effect : new Decimal("16"),
    },
    upgrades : {
        isBought : [new Decimal("0"), new Decimal("0"), new Decimal("0"), new Decimal("0"), new Decimal("0")],
        initialCost : [new Decimal("2e3"), new Decimal("1e17"), new Decimal("4e53"), new Decimal("2e65"), new Decimal("2^8192")],
        text : ["", "", "", "", ""],
    }
}
var number_10 = new Decimal(10)

//The End of Decimal territory XD
var interval = 50
var saveInterval = 10000



function hideElement(id) {
    showElement(id, "none");
}
  
function showElement(id, type = "inline-block") {
    let elm = document.getElementById(id);
    if (elm) elm.style.display = type;
}



function format(amount) {
    let power = Decimal.floor(Decimal.log10(amount))
    let mantissa = amount.div(Decimal.pow(10, power))
    if (power.lt(3)) return Decimal.floor(amount)
    if (amount.lte(0)) return amount.toFixed(0)
    return mantissa.toFixed(2) + "e" + power
}

function buyUpgrade(i) {
    if (!player.upgrades.isBought[i].eq(1) && player.goldenScrap.gte(player.upgrades.initialCost[i])) {
        player.goldenScrap = player.goldenScrap.minus(player.upgrades.initialCost[i])
        player.upgrades.isBought[i] = new Decimal("1")
        player.upgrades.text[i] = "" //literally useless 
    }
}

function clickScrap() {
    player.scrap = player.scrap.add(
        Decimal.round(player.scrapsPerClick).times(Decimal.pow(player.scrapBoostMultiplier, player.scrapBoostBought)).times(player.goldenScrap.div(100).plus(1)).times(Decimal.pow(Decimal.log(player.scrap.plus(1.00001), 1.00001), number_10.times(player.upgrades.isBought[3]))).times(((player.factoryBought.plus(player.extraFactories)).times(0.05).times(player.upgrades.isBought[0])).plus(1)).times(((player.factoryBought.plus(player.extraFactories)).times(0.05).times(player.upgrades.isBought[1])).plus(1)).times((Decimal.pow(player.timeSpentInThisPrestige, 5).times(player.upgrades.isBought[2])).plus(1)).times(Decimal.pow(player.stars.effect, player.stars.bought))
    )
};

function idleScrap() {
    player.scrap = player.scrap.add(
        (  (Decimal.round(player.scrapsPerSecond).plus(player.factoryBought).plus(player.extraFactories)).times(Decimal.pow(player.scrapBoostMultiplier, player.scrapBoostBought)).times(player.goldenScrap.div(100).plus(1)).times(Decimal.pow(Decimal.log(player.scrap.plus(1.00001), 1.00001), number_10.times(player.upgrades.isBought[3]))).times(((player.factoryBought.plus(player.extraFactories)).times(0.05).times(player.upgrades.isBought[0])).plus(1)).times(((player.factoryBought.plus(player.extraFactories)).times(0.05).times(player.upgrades.isBought[1])).plus(1)).times((Decimal.pow(player.timeSpentInThisPrestige, 5).times(player.upgrades.isBought[2])).plus(1)).times(Decimal.pow(player.stars.effect, player.stars.bought))  ).div(20)
    )
    player.timeSpentInThisPrestige = player.timeSpentInThisPrestige.add(
        new Decimal(1).div(20)
    )
};

function buyFactory(amount) {
    if (amount == "singles") {
        if (player.scrap.gte(Decimal.pow(1.01, player.factoryBought).times(player.factoryCost))) {
            player.scrap = player.scrap.minus(Decimal.pow(1.01, player.factoryBought).times(player.factoryCost))
            player.factoryBought = player.factoryBought.add(1)
        }
    } else if (amount == "max") {
        while (player.scrap.gte(Decimal.pow(1.01, player.factoryBought).times(player.factoryCost))) {
            let amount1 = Decimal.affordGeometricSeries(player.scrap, player.factoryCost, 1.01, player.factoryBought)
            let price1 = Decimal.sumGeometricSeries(amount1, player.factoryCost, 1.01, player.factoryBought)
            player.factoryBought = player.factoryBought.add(amount1)
            player.scrap = player.scrap.sub(price1)
        }
    }
};

//(1.01^level)*10
//log_1.01(scraps/10+1)

function buyScrapBoost(amount) {
    if (amount == "singles") {
        if (player.scrap.gte(Decimal.pow(4, player.scrapBoostBought).times(player.scrapBoostCost))) {
            player.scrap = player.scrap.minus(Decimal.pow(4, player.scrapBoostBought).times(player.scrapBoostCost));
            player.scrapBoostBought = player.scrapBoostBought.add(1)
        }
    } else if (amount == "max") {
        while (player.scrap.gte(Decimal.pow(4, player.scrapBoostBought).times(player.scrapBoostCost))) {
            let amount2 = Decimal.affordGeometricSeries(player.scrap, player.scrapBoostCost, 4, player.scrapBoostBought)
            let price2 =  Decimal.sumGeometricSeries(amount2, player.scrapBoostCost, 4, player.scrapBoostBought)
            player.scrapBoostBought = player.scrapBoostBought.add(amount2)
            player.scrap = player.scrap.sub(price2)
        }
    }
};

function buyStars(amount) {
    if (amount == "singles") {
        if (player.goldenScrap.gte(Decimal.pow(player.stars.costScaling, player.stars.bought).times(player.stars.initialCost))) {
            player.goldenScrap = player.goldenScrap.minus(Decimal.pow(player.stars.costScaling, player.stars.bought).times(player.stars.initialCost))
            player.stars.bought = player.stars.bought.add(1)
        }
    } else if (amount == "max") {
        while (player.goldenScrap.gte(Decimal.pow(player.stars.costScaling, player.stars.bought).times(player.stars.initialCost))) {
            let amount3 = Decimal.affordGeometricSeries(player.goldenScrap, player.stars.initialCost, player.stars.costScaling, player.stars.bought)
            let price3 = Decimal.sumGeometricSeries(amount3, player.stars.initialCost, player.stars.costScaling, player.stars.bought)
            player.stars.bought = player.stars.bought.add(amount3)
            player.goldenScrap = player.goldenScrap.sub(price3)
        }
    }
}

function goldenScrapPrestige() {
    let pendingGoldenScrap = Decimal.floor(Decimal.pow(player.scrap, 0.15).times((player.factoryBought.plus(player.extraFactories)).times(player.upgrades.isBought[1]).plus(1)))
    if (pendingGoldenScrap.gte(Decimal.round(200))) {
        player.goldenScrap = player.goldenScrap.add(pendingGoldenScrap);
        player.scrap = new Decimal("0")
        player.scrapsPerClick = new Decimal("1"),
        player.scrapsPerSecond = new Decimal("0"),
        player.factoryCost = new Decimal("10"),
        player.factoryBought = new Decimal("0"),
        player.scrapBoostCost = new Decimal("100"),
        player.scrapBoostBought = new Decimal("0"),
        player.uselessFBaseCost = new Decimal("10"),
        player.playeruselessSBBaseCost = new Decimal("100"),
        player.scrapBoostMultiplier = new Decimal("3"),
        player.timeSpentInThisPrestige = new Decimal("0")
    }
}

function showPrestigeTab() {
    if (player.scrap.gte(1e9) || player.goldenScrap.gt(0)) {
        showElement("prestigeTab")
    } else {
        hideElement("prestigeTab")
    }
}

function hardReset() {
    player = {
        scrap : new Decimal("0"),
        scrapsPerClick : new Decimal("1"),
        scrapsPerSecond : new Decimal("0"),
        factoryCost : new Decimal("10"),
        factoryBought : new Decimal("0"),
        scrapBoostCost : new Decimal("100"),
        scrapBoostBought : new Decimal("0"),
        uselessFBaseCost : new Decimal("10"),
        uselessSBBaseCost : new Decimal("100"),
        scrapBoostMultiplier : new Decimal("3"),
        timeSpentInThisPrestige : new Decimal("0"),
        goldenScrap : new Decimal("0"),
        stars : {
            bought : new Decimal("0"),
            initialCost : new Decimal("1e4"),
            costScaling : new Decimal("1e15"),
            effect : new Decimal("16")
        },
        upgrades : {
            isBought : [new Decimal("0"), new Decimal("0"), new Decimal("0"), new Decimal("0"), new Decimal("0")],
            initialCost : [new Decimal("2e3"), new Decimal("1e17"), new Decimal("4e53"), new Decimal("2e65"), new Decimal("2^8192")],
            text : ["", "", "", "", ""],
        }
    }
    save();
    tab("production");
    
    
}

function confirmHardReset() {
    let hardResetWarning = confirm("Are you sure you want to hard reset? Hard reset returns back to where you start (Not prestige).");
    if (hardResetWarning == true) hardReset();
    else alert("You saved your game progress :)")
}

function updateText() {
    document.getElementById("GoldenScrapUpgrade1.1").innerHTML = player.upgrades.text[0]
    document.getElementById("GoldenScrapUpgrade1.2").innerHTML = format(player.upgrades.initialCost[0])
    document.getElementById("GoldenScrapUpgrade2.1").innerHTML = player.upgrades.text[1]
    document.getElementById("GoldenScrapUpgrade2.2").innerHTML = format(player.upgrades.initialCost[1])
    document.getElementById("GoldenScrapUpgrade3.1").innerHTML = player.upgrades.text[2]
    document.getElementById("GoldenScrapUpgrade3.2").innerHTML = format(player.upgrades.initialCost[2])
    document.getElementById("GoldenScrapUpgrade4.1").innerHTML = player.upgrades.text[3]
    document.getElementById("GoldenScrapUpgrade4.2").innerHTML = format(player.upgrades.initialCost[3])
    document.getElementById("GoldenScrapUpgrade5.1").innerHTML = player.upgrades.text[4]
    document.getElementById("GoldenScrapUpgrade5.2").innerHTML = format(player.upgrades.initialCost[4])

    document.getElementById("GoldenScrapUpgradeEffect1").innerHTML = format(((player.factoryBought.plus(player.extraFactories)).times(0.05).times(player.upgrades.isBought[0])).plus(1)) + "x"
    document.getElementById("GoldenScrapUpgradeEffect2.1").innerHTML = format((player.factoryBought.plus(player.extraFactories)).times(player.upgrades.isBought[1]).plus(1)) + "x"
    document.getElementById("GoldenScrapUpgradeEffect2.2").innerHTML = format(((player.factoryBought.plus(player.extraFactories)).times(0.05).times(player.upgrades.isBought[1])).plus(1)) + "x"
    document.getElementById("GoldenScrapUpgradeEffect3").innerHTML = format((Decimal.pow(player.timeSpentInThisPrestige, 5).times(player.upgrades.isBought[2])).plus(1)) + "x"
    document.getElementById("GoldenScrapUpgradeEffect4").innerHTML = format(Decimal.pow(Decimal.log(player.scrap.plus(1.00001), 1.00001), number_10.times(player.upgrades.isBought[3]))) + "x"



    document.getElementById("StarsDisplay").innerHTML = format(player.stars.bought)
    document.getElementById("StarEffect").innerHTML = format(Decimal.pow(player.stars.effect, player.stars.bought)) + "x"
    document.getElementById("BuyStarsDisplay").innerHTML = format(Decimal.pow(player.stars.costScaling, player.stars.bought).times(player.stars.initialCost))



    document.getElementById("FactoryAmount").innerHTML = format(Decimal.round(player.factoryBought))
    document.getElementById("ScrapAmount").innerHTML = format(Decimal.round(player.scrap))
    document.getElementById("ScrapsPerClick").innerHTML = "Gain<br>" + format(Decimal.round(player.scrapsPerClick.times(Decimal.pow(player.scrapBoostMultiplier, Decimal.round(player.scrapBoostBought))).times(player.goldenScrap.div(100).plus(1)).times(Decimal.pow(Decimal.log(player.scrap.plus(1.00001), 1.00001), number_10.times(player.upgrades.isBought[3]))).times(((player.factoryBought.plus(player.extraFactories)).times(0.05).times(player.upgrades.isBought[0])).plus(1)).times(((player.factoryBought.plus(player.extraFactories)).times(0.05).times(player.upgrades.isBought[1])).plus(1)).times((Decimal.pow(player.timeSpentInThisPrestige, 5).times(player.upgrades.isBought[2])).plus(1)).times(Decimal.pow(player.stars.effect, player.stars.bought)))) + " Scraps"
    document.getElementById("ScrapsPerSecond").innerHTML = format(Decimal.round(player.scrapsPerSecond.plus(player.factoryBought).times(Decimal.pow(player.scrapBoostMultiplier, Decimal.round(player.scrapBoostBought))).times(player.goldenScrap.div(100).plus(1)).times(Decimal.pow(Decimal.log(player.scrap.plus(1.00001), 1.00001), number_10.times(player.upgrades.isBought[3]))).times(((player.factoryBought.plus(player.extraFactories)).times(0.05).times(player.upgrades.isBought[0])).plus(1)).times(((player.factoryBought.plus(player.extraFactories)).times(0.05).times(player.upgrades.isBought[1])).plus(1)).times((Decimal.pow(player.timeSpentInThisPrestige, 5).times(player.upgrades.isBought[2])).plus(1)).times(Decimal.pow(player.stars.effect, player.stars.bought))))
    document.getElementById("BuyFactoryDisplay").innerHTML = "Buy Factory<br>" + format(Decimal.round(Decimal.pow(1.01, player.factoryBought).times(player.factoryCost))) + " Scraps"
    document.getElementById("BuyScrapBoostDisplay").innerHTML = "Boost your Scrap income by " + format(Decimal.round(player.scrapBoostMultiplier)) + "x<br>" + format(Decimal.round(Decimal.pow(4, player.scrapBoostBought).times(player.scrapBoostCost))) + " Scraps"
    document.getElementById("GoldenScrapDisplay").innerHTML = format(Decimal.round(player.goldenScrap))
    document.getElementById("GoldenScrapDisplay2").innerHTML = format(Decimal.round(player.goldenScrap)) 
    document.getElementById("PendingGoldenScrapDisplay").innerHTML = format(Decimal.round(Decimal.pow(player.scrap, 0.15)).times((player.factoryBought.plus(player.extraFactories)).times(player.upgrades.isBought[1]).plus(1)))
};

function updateStyle() {
    if (player.upgrades.isBought[0].eq(1)) {
        document.getElementById("GSUpgrade1").className = "buttonUpgrade upgradeIsBought"
    } else {
        document.getElementById("GSUpgrade1").className = "buttonUpgrade upgradeIsNotBought"
    }

    if (player.upgrades.isBought[1].eq(1)) {
        document.getElementById("GSUpgrade2").className = "buttonUpgrade upgradeIsBought"
    } else {
        document.getElementById("GSUpgrade2").className = "buttonUpgrade upgradeIsNotBought"
    }

    if (player.upgrades.isBought[2].eq(1)) {
        document.getElementById("GSUpgrade3").className = "buttonUpgrade upgradeIsBought"
    } else {
        document.getElementById("GSUpgrade3").className = "buttonUpgrade upgradeIsNotBought"
    }

    if (player.upgrades.isBought[3].eq(1)) {
        document.getElementById("GSUpgrade4").className = "buttonUpgrade upgradeIsBought"
    } else {
        document.getElementById("GSUpgrade4").className = "buttonUpgrade upgradeIsNotBought"
    }

    if (player.upgrades.isBought[4].eq(1)) {
        document.getElementById("GSUpgrade5").className = "buttonUpgrade upgradeIsBought"
    } else {
        document.getElementById("GSUpgrade5").className = "buttonUpgrade upgradeIsNotBought"
    }
}


setInterval(save, saveInterval);
setInterval(idleScrap, interval);
setInterval(showPrestigeTab, interval);
setInterval(updateText, interval);
setInterval(updateStyle, interval);
load();
updateText();
tab("production");
subTab1("subPrestige1");
subTab2("subSettings1");
player.upgrades.initialCost = [new Decimal("2e3"), new Decimal("1e17"), new Decimal("4e53"), new Decimal("2e65"), new Decimal("2^8192")];
player.stars.initialCost = new Decimal("1e4");
player.stars.costScaling = new Decimal("1e15")
console.log("Put () after function");
