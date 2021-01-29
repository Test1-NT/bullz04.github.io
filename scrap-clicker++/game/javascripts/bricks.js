/*
function buyGoldenScrapUpgrade(i) {
    if (!player.goldenScrapUpgrades.isBought[i] && player.goldenScrap.gte(player.goldenScrapUpgrades.cost[i])) {
        player.goldenScrap = player.goldenScrap.minus(player.goldenScrapUpgrades.cost[i])
        player.goldenScrapUpgrades.isBought[i] = true
    }
}
*/

function buyRepeatableBrickUpgrades(amount, i) {
    if (amount == "singles") {
        if ( player.bricks.gte(player.brickUpgrades.repeatable.costFormula[i]() )) {
            player.brickUpgrades.repeatable.level[i] = player.brickUpgrades.repeatable.level[i].add(1)
        }
    } else if (amount == "max") {
        if ( player.bricks.gte(player.brickUpgrades.repeatable.costFormula[i]() )) {
            player.brickUpgrades.repeatable.level[i] = player.brickUpgrades.repeatable.levelGain[i]().plus(1)
        }
    }
}

function maxAllRBUs() {
    for (i = 0; i < 4; i++) {
        buyRepeatableBrickUpgrades("max", i)
    }
}

function buyBrickUpgrade(i) {
    if (!player.brickUpgrades.nonRepeatable.isBought[i] && player.bricks.gte(player.brickUpgrades.nonRepeatable.cost[i])) {
        player.bricks = player.bricks.minus(player.brickUpgrades.nonRepeatable.cost[i])
        player.brickUpgrades.nonRepeatable.isBought[i] = true
    }
}

function getBrickSelfBoostStrength() {
    return (
        Decimal.log(player.wrenches.pow(2).plus(12).max(12), 12).times(1).pow(0.75)
        .pow(player.brickUpgrades.repeatable.level[1].times(0.002).plus(1))
        .pow( 
            Decimal.log(player.goldenScrap.div("1e3000").pow(0.00033).plus(10), 10)
            .pow( (player.goldenScrapUpgrades.isBought[26]) ? 1 : 0)
        )
    )
    .times(
        Decimal.log(
            Decimal.log(
                player.gainedMagnets.times(player.gainedSteelBeams).div(1e165).plus(10)
            , 10).pow(0.25).plus(9)
        , 10).pow( (player.magnetUpgrades.nonRepeatable.isBought[12]) ? 1 : 0 )
    )
    .times( (player.goldenScrapUpgrades.isBought[20]) ? 1.03 : 1 )
}

function getRBUDiscount(i) {
    switch (i+1) {
        case 1:
            return player.wrenches.div(200).plus(1).pow( player.brickUpgrades.nonRepeatable.isBought[1] ? 1.5 : 0  )
        case 2:
            return player.wrenches.div(200).plus(1).pow( player.brickUpgrades.nonRepeatable.isBought[1] ? 1.5 : 0  )
            .times(
                Decimal.pow(10, player.prestigeStat[0].pow(0.85).times( player.brickUpgrades.nonRepeatable.isBought[2] ? 1/5e4 : 0))
            )
        case 3:
            return player.wrenches.div(200).plus(1).pow( player.brickUpgrades.nonRepeatable.isBought[1] ? 1.5 : 0  )
        case 4:
            return player.wrenches.div(200).plus(1).pow( player.brickUpgrades.nonRepeatable.isBought[1] ? 1.5 : 0  )
        default:
            return 1
    }
}

function getBrickSelfBoostFormula() {
    return Decimal.log(player.bricks.plus(10).max(10), 10).pow(2)
    .pow(getBrickSelfBoostStrength())
}

function getBrickBoosts() {
    return getBrickSelfBoostFormula()
    .times(player.wrenches.times(0.02).plus(1))
    .times(
        Decimal.log(player.scrap.plus("1e1000"), "1e1000")
        .pow( player.brickUpgrades.nonRepeatable.isBought[0] ? 3 : 0)
    )
}

function getTotalBricksPerSecond() {
    return new Decimal( player.goldenScrapUpgrades.isBought[17] ? 1 : 0 )
    .times(getBrickBoosts())
}

function getWrenchFormula() {
    return Decimal.log(player.bricks.div(100).plus(1).max(1), 10).pow(3)
}

function getWrenchBoosts() {
    return getWrenchFormula()
    .times(Decimal.pow(
        new Decimal(1.05).plus( (player.goldenScrapUpgrades.isBought[21]) ? player.brickUpgrades.repeatable.level[0].max(100).minus(100).times(0.01) : 0 ),
        player.brickUpgrades.repeatable.level[0]
    ))
    .times(
        player.regenPoints.div(1e9).plus(1)
        .pow( (player.goldenScrapUpgrades.isBought[24]) ? 1.5 : 0 )
    )
    
    .floor()
}

function brickSacrifice() {
    player.wrenches = player.wrenches.add(getWrenchBoosts())
    player.gainedWrenches = player.gainedWrenches.add(getWrenchBoosts())
    player.bricks = player.bricks.times(0)
}

function generateBricks(diff) {
    player.bricks = player.bricks.add(
        getTotalBricksPerSecond().times(diff)
    )

    player.gainedBricks = player.gainedBricks.add(
        getTotalBricksPerSecond().times(diff)
    )
}