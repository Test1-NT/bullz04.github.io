function enterExitDecayverse() {
    if (player.decay.isInDecayverse == true) {
        player.decay.isInDecayverse = false

        player.regenerators = player.regenerators.add(getRegeneratorGain())
        player.scrap = new Decimal("0")
        player.multiplicatorBought = new Decimal("0")
        player.factory[0].bought = new Decimal("0")
        player.decay.amount = new Decimal("1")
    } else {
        player.decay.isInDecayverse = true
        
        player.scrap = new Decimal("0")
        player.multiplicatorBought = new Decimal("0")
        player.factory[0].bought = new Decimal("0")
        player.decay.amount = new Decimal("1")
    }
}

function getRegenPointGain() {
    return player.regenerators.pow(1.25)
    .pow( (player.goldenScrapUpgrades.isBought[25]) ? 1.25 : 1 )
    .times(
        Decimal.log(player.gainedWrenches.plus(1e3), 1e3)
        .pow( (player.goldenScrapUpgrades.isBought[24]) ? 5 : 0 )
    )
}

function getRegenPointEffect(type) {
    switch (type) {
        case "Golden Scrap":
            return player.regenPoints.plus(1)
            .pow(10);
        case "Scrap":
            return player.regenPoints.plus(1)
            .pow(50)
    }
}

function getRegeneratorGain() {
    return Decimal.log(player.scrap.div("1e1425").plus(1), 1e75).pow(2)
    .times(
        Decimal.log(player.regenerators.plus(10), 10)
        .pow( (player.goldenScrapUpgrades.isBought[25]) ? 1 : 0 )
    )
    .floor()
    .minus(player.regenerators)
    .max(0)
}

function getNextRegenerator() {
    return Decimal.pow(
        1e75,

        player.regenerators.plus( (player.decay.isInDecayverse) ? getRegeneratorGain() : 0 )
        .plus(1).max(1)//+1 because finding the next
        .div(
            Decimal.log(player.regenerators.plus(10), 10)
            .pow( (player.goldenScrapUpgrades.isBought[25]) ? 1 : 0 )
        ).pow(1/2)) 
    .times("1e1425")
    //complication :(
}

function getDecayResistance() {
    return new Decimal(1)
    .times(Decimal.log(player.regenerators.plus(100), 100))
}

function getDecayDivision() {
    return player.decay.amount
    .pow(getDecayResistance().pow(-1))
    .pow( (player.decay.isInDecayverse) ? 1 : 0 )
    .max(1)
}

function getDecayGrowthRate() {
    return Decimal.pow(1.001, ( (player.decay.isInDecayverse) ? Decimal.log(player.scrap.plus(1), 100) : 0))
}

function generateRP(diff) {
    player.regenPoints = player.regenPoints.add(
        getRegenPointGain()
        .times(diff)
    )
}

function decayGrowthTick(diff) {
    player.decay.amount = player.decay.amount.times(
        getDecayGrowthRate()
        .pow(diff)
    )
}