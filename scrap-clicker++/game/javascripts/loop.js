function gameLoop() {
    let now = Date.now();
    let diff = (now - player.lastUpdate) / 1000;
    if (diff < 0) diff = 0
    
    generateRP(diff)
    decayGrowthTick(diff)
    generateBricks(diff)
    produceLowerFactoryTier(diff)
    increaseAutoDids(diff)
    produceEachOther(diff)
    produce_RMU_Levels(diff)

    player.electrons = player.electrons.add(
        getElectronGain()
        .times(player.brickUpgrades.repeatable.level[3].times(0.020))
        .times(diff)
    )

    player.protons = player.protons.add(
        getProtonGain()
        .times(player.brickUpgrades.repeatable.level[3].times(0.020))
        .times(diff)
    )
    
    player.goldenScrap = player.goldenScrap.add(getGoldenScrapProduction().times(diff))
    if (player.bestScraps.lte(player.scrap)) {
        player.bestScraps = player.scrap
    }

    player.prestigeStat[0] = player.prestigeStat[0].add(
        Decimal.log(player.goldenScrap.plus(1), 10).pow(1.25).div(300)
        .times( (player.goldenScrapUpgrades.isBought[10]) ? 1 : 0 )
        .times(
            Decimal.log(player.bricks.plus(1e9), 1e9)
            .pow( (player.goldenScrapUpgrades.isBought[19]) ? 1.4 : 0 )
            .pow( (player.goldenScrapUpgrades.isBought[22]) ? 1.5 : 1 )
        )
        .times(diff)
    )
    
    player.timeSpentInThisPrestige = player.timeSpentInThisPrestige.add(
        Decimal.times(1, diff)
    )

    player.scrap = player.scrap.add(
        Decimal.round(getTotalScrapsPerSecond()).times(getScrapGain()).times(diff)
    )
    
    
    
    player.lastUpdate = now
};