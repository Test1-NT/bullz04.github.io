function getTotalLevelsOfRepeatableMagnetUpgrade(i) {
    return player.magnetUpgrades.repeatable[i].levelsBought.plus(player.magnetUpgrades.repeatable[i].extraLevels)
}

function getAllLevelsOfRepeatableMagnetUpgrade() {
    var totalLevels = new Decimal(0)
    for (i = 0; i < 4; i++) {
        totalLevels = totalLevels.add(getTotalLevelsOfRepeatableMagnetUpgrade(i))
    }
    return totalLevels
}

function produce_RMU_Levels(diff) {
    player.magnetUpgrades.repeatable[0].extraLevels = player.magnetUpgrades.repeatable[0].extraLevels.add(
        Decimal.max(
            Decimal.log(player.scrap.max(1), "1e1000").pow(3).div(1e4).times( player.magnetUpgrades.nonRepeatable.isBought[2] ? 1 : 0 ).times(diff), 0
        )
        .times(
            Decimal.log(player.goldenScrap.plus(1e50), 1e50)
            .pow( player.magnetUpgrades.nonRepeatable.isBought[3] ? 1.22 : 0)
        )
        .times(
            Decimal.add(getTotalFactories(1), 1)
            .pow( player.magnetUpgrades.nonRepeatable.isBought[5] ? 1 : 0)
        )
    )

    player.magnetUpgrades.repeatable[1].extraLevels = player.magnetUpgrades.repeatable[1].extraLevels.add(
        Decimal.max(
            getTotalFactories(1).pow(1/2).div(10).times( (player.goldenScrapUpgrades.isBought[15]) ? 1 : 0 ).times(diff), 0
        )
        .times(
            Decimal.add(getTotalFactories(1), 1)
            .times(Decimal.log(getTotalFactories(1).plus(2), 2)).pow( (player.magnetUpgrades.nonRepeatable.isBought[13]) ? 1 : 0 )
        )
    )
    
    player.magnetUpgrades.repeatable[2].extraLevels = player.magnetUpgrades.repeatable[2].extraLevels.add(
        Decimal.max(
            getTotalFactories(1).times(0.005).plus(1).pow(3).times( (player.brickUpgrades.nonRepeatable.isBought[3]) ? 1 : 0 ).times(diff), 0
        )
    )

    player.magnetUpgrades.repeatable[3].extraLevels = player.magnetUpgrades.repeatable[3].extraLevels.add(
        Decimal.max(
            getTotalFactories(1).times(0.005).plus(1).pow(3).times( (player.brickUpgrades.nonRepeatable.isBought[3]) ? 1 : 0 ).times(diff), 0
        )
    )
    //
}








function getElectronFormula() {
    return Decimal.log(player.magnets.div(100).plus(1).max(1), 2).pow(2)
}      

function getElectronGain() {
    return getElectronFormula()
    .times((getTotalLevelsOfRepeatableMagnetUpgrade(1).div(5).plus(1).pow(4)).times(getTotalLevelsOfRepeatableMagnetUpgrade(1).plus(1)))
    .times(
        Decimal.log(player.protons.plus(20), 20)
        .pow( player.goldenScrapUpgrades.isBought[8] ? 4/3 : 0)
    )
    .times(
        Decimal.log(player.protons.plus(5), 5)
        .pow( (player.magnetUpgrades.nonRepeatable.isBought[6]) ? 2 : 0)
    )
    .times( (player.achievementsGotten[18]) ? 5 : 1 )
    .times( 
        Decimal.log(player.protons.plus(50), 50)
        .pow( (player.magnetUpgrades.nonRepeatable.isBought[15]) ? 7.5 : 0 )
    )
}

function getMagnetBoosts() {
    return (player.electrons.div(100).plus(1)
        .pow(player.brickUpgrades.repeatable.level[2].times(0.01).plus(1))
        .pow( (player.magnetUpgrades.nonRepeatable.isBought[15]) ? Decimal.log(player.protons.pow(0.01).plus(10), 10) : 1 )
    )
    .times((getTotalLevelsOfRepeatableMagnetUpgrade(0).div(5).plus(1).pow(3)).times(getTotalLevelsOfRepeatableMagnetUpgrade(0).plus(1)))
    .times(Decimal.log(player.steelBeams.plus(10), 10).max(1).pow((player.goldenScrapUpgrades.isBought[6]) ? 2.2 : 0))
    .times(player.prestigeStat[0].plus(1).pow( (player.magnetUpgrades.nonRepeatable.isBought[0]) ? 4/3 : 0))
}

function getMagnetGain() {
    return player.magnetsPerClick
    .times(   (player.goldenScrapUpgrades.isBought[5]) ? 1 : 0      )
    .times(getMagnetBoosts())
}

function magnetSacrifice() {
    player.electrons = player.electrons.add(getElectronGain())
    player.magnets = player.magnets.times(0)
}

function clickMagnet() {
    player.magnets = player.magnets.add(getMagnetGain())
}




function getProtonFormula() {
    return Decimal.log(player.steelBeams.div(100).plus(1).max(1), 2).pow(2)
}

function getProtonGain() {
    return getProtonFormula()
    .times((getTotalLevelsOfRepeatableMagnetUpgrade(1).div(5).plus(1).pow(4)).times(getTotalLevelsOfRepeatableMagnetUpgrade(1).plus(1)))
    .times(
        Decimal.log(player.electrons.plus(20), 20)
        .pow( player.goldenScrapUpgrades.isBought[8] ? 4/3 : 0)
    )
    .times(
        Decimal.log(player.electrons.plus(5), 5)
        .pow( (player.magnetUpgrades.nonRepeatable.isBought[6]) ? 2 : 0)
    )
    .times( (player.achievementsGotten[18]) ? 5 : 1 )
    .times( 
        Decimal.log(player.electrons.plus(50), 50)
        .pow( (player.magnetUpgrades.nonRepeatable.isBought[15]) ? 7.5 : 0 )
    )
}

function getSteelBeamBoosts() {
    return (player.protons.div(100).plus(1)
        .pow(player.brickUpgrades.repeatable.level[2].times(0.01).plus(1))
        .pow( (player.magnetUpgrades.nonRepeatable.isBought[15]) ? Decimal.log(player.electrons.pow(0.01).plus(10), 10) : 1 )
    )
    .times((getTotalLevelsOfRepeatableMagnetUpgrade(0).div(5).plus(1).pow(3)).times(getTotalLevelsOfRepeatableMagnetUpgrade(0).plus(1)))
    .times(Decimal.log(player.magnets.plus(10), 10).max(1).pow((player.goldenScrapUpgrades.isBought[6]) ? 2.2 : 0))
    .times(player.prestigeStat[0].plus(1).pow( (player.magnetUpgrades.nonRepeatable.isBought[0]) ? 4/3 : 0))
}

function getSteelBeamGain() {
    return player.steelBeamsPerClick
    .times(   (player.goldenScrapUpgrades.isBought[5]) ? 1 : 0      )
    .times(getSteelBeamBoosts())
}

function steelBeamSacrifice() {
    player.protons = player.protons.add(getProtonGain())
    player.steelBeams = player.steelBeams.times(0)
}

function clickSteelBeam() {
    player.steelBeams = player.steelBeams.add(getSteelBeamGain())
}



function produceEachOther(diff) {
    player.magnets = player.magnets.add(
        (Decimal.log(player.steelBeams.plus(1), 3).max(0)).pow(1.35).div(2).times(diff).times(getMagnetBoosts())
    )
    player.steelBeams = player.steelBeams.add(
        (Decimal.log(player.magnets.plus(1), 3).max(0)).pow(1.35).div(2).times(diff).times(getSteelBeamBoosts())
    )
    player.magnets = player.magnets.add(
        (Decimal.log(player.steelBeams.plus(1), 3).max(0)).pow(1.35).div(2).times(diff).times(getMagnetBoosts())
    )
    player.steelBeams = player.steelBeams.add(
        (Decimal.log(player.magnets.plus(1), 3).max(0)).pow(1.35).div(2).times(diff).times(getSteelBeamBoosts())
    )



    player.gainedMagnets = player.gainedMagnets.add(
        (Decimal.log(player.steelBeams.plus(1), 3).max(0)).pow(1.35).div(2).times(diff).times(getMagnetBoosts())
    )
    player.gainedSteelBeams = player.gainedSteelBeams.add(
        (Decimal.log(player.magnets.plus(1), 3).max(0)).pow(1.35).div(2).times(diff).times(getSteelBeamBoosts())
    )
    player.gainedMagnets = player.gainedMagnets.add(
        (Decimal.log(player.steelBeams.plus(1), 3).max(0)).pow(1.35).div(2).times(diff).times(getMagnetBoosts())
    )
    player.gainedSteelBeams = player.gainedSteelBeams.add(
        (Decimal.log(player.magnets.plus(1), 3).max(0)).pow(1.35).div(2).times(diff).times(getSteelBeamBoosts())
    )
}


function maxAllRMUs() {
    buyRepeatableMagnetUpgrade('max', 0);
    buyRepeatableMagnetUpgrade('max', 1);
    buyRepeatableMagnetUpgrade('max', 2);
    buyRepeatableMagnetUpgrade('max', 3);
}