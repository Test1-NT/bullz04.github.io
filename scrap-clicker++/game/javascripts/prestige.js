function prestigeButtonDoes() {
    if (getGoldenScrapFormula().gte(200)) {
        if (player.options.confirmations.prestige) {
            document.getElementById("prestigeConfirmation").className = "popup shown"
        } else {
            prestige()
        }
    }
}

function prestige() {
    let pendingGoldenScrap = getGoldenScrapFormula()
    if (pendingGoldenScrap.gte(Decimal.round(200))) {
        player.goldenScrap = player.goldenScrap.add(pendingGoldenScrap);
        player.scrap = new Decimal("0")
        player.scrapsPerClick = new Decimal("1")
        player.scrapsPerSecond = new Decimal("0")
        player.multiplicatorCost = new Decimal("100")
        player.multiplicatorBought = new Decimal("0")
        player.multiplicatorMultiplierBase = new Decimal("3")
        player.factory[0].bought = new Decimal("0");
        if (!player.magnetUpgrades.nonRepeatable.isBought[7]) {
            player.factory[0].extra = new Decimal(0)
        }
        player.prestigeStat[0] = player.prestigeStat[0].add(1)
        if (player.goldenScrapUpgrades.isBought[11]) {
            player.timeSpentInThisPrestige = player.timeSpentInThisPrestige.minus(Decimal.min(player.timeSpentInThisPrestige, 60) )
        } else {
            player.timeSpentInThisPrestige = new Decimal(0)
        }


    }
}