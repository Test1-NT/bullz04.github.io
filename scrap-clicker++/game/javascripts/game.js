//neq = notEquals


//This is a place where random functions and codes live


let player = {
    lastUpdate : Date.now(),
    scrap : new Decimal("0"),
    bestScraps : new Decimal("0"),
    scrapsPerClick : new Decimal("1"),
    scrapsPerSecond : new Decimal("0"),
    scrapClicks : new Decimal("0"),
    unmanualScrapClicks : new Decimal("0"),
    factory : [
        {
            cost : new Decimal("10"),
            costScaling : new Decimal("1.01"),
            bought : new Decimal("0"),
            extra : new Decimal("0"),
        },

        {
            cost : new Decimal("1e510"),
            costScaling : new Decimal("100"),
            bought : new Decimal("0"),
            extra : new Decimal("0"),
        }
    ],
    multiplicatorCost : new Decimal("100"),
    multiplicatorBought : new Decimal("0"),
    multiplicatorMultiplierBase : new Decimal("3"),
    multiplicatorCostScaling : new Decimal("4"),
    goldenScrap : new Decimal("0"),
    prestigeStat : [
        new Decimal("0")
    ],
    timeSpentInThisPrestige : new Decimal("0"),
    magnets : new Decimal("0"),
    magnetsPerClick : new Decimal("1"),
    gainedMagnets: new Decimal("0"),
    steelBeams : new Decimal("0"),
    steelBeamsPerClick : new Decimal("1"),
    gainedSteelBeams : new Decimal("0"),
    electrons : new Decimal("0"),
    protons : new Decimal("0"),
    stars : {
        bought : new Decimal("0"),
        cost : new Decimal("1e4"),
        costScaling : new Decimal("1e15"),
        multiplierBase : new Decimal("16"),
    },
    goldenScrapUpgrades : {
        isBought : [
            false, false, false, false,
            false, false, false, false,
            false, false, false, false,
            false, false, false, false,
            false, false, false, false,
            false, false, false, false,
            false, false, false, false
            
        ],
        cost : [
            new Decimal("400"), new Decimal("1e13"), new Decimal("4e50"), new Decimal("2e63"),
            new Decimal("1e117"), new Decimal("2e186"), new Decimal("1e210"), new Decimal("1e220"),
            new Decimal("2^1024"), new Decimal("1e350"), new Decimal("1e495"), new Decimal("1e525"),
            new Decimal("1e552"), new Decimal("2e558"), new Decimal("5e645"), new Decimal("2^2330"),
            new Decimal("1e1000"), new Decimal("1e1150"), new Decimal("1e1250"), new Decimal("1e1450"),
            new Decimal("1e1850"), new Decimal("2^6646"), new Decimal("1e2650"), new Decimal("3.2e3200"),
            new Decimal("1e3320"), new Decimal("1e3380"), new Decimal("1e3450"), new Decimal("1e3500")
            
        ],
    },
    automator : [
        {
            cost: new Decimal("1e15"),
            costScaling: new Decimal("1000"),
            level: new Decimal("0"),
            maxLevel: new Decimal("eeee40"),
            dids: new Decimal("0"),
            baseSpeed: new Decimal("1"),
            speedPerLevel: new Decimal("1.03"),
            isActive: false,
        },

        {
            cost: new Decimal("1e20"),
            costScaling: new Decimal("1e20"),
            level: new Decimal("0"),
            maxLevel: new Decimal("10"),
            dids: new Decimal("0"),
            baseSpeed: new Decimal("1"),
            speedPerLevel: new Decimal("1.5"),
            isActive: false
        }
    ],
    magnetUpgrades : {
        repeatable : [
            {
                levelsBought : new Decimal("0"),
                extraLevels : new Decimal("0"),
                cost : new Decimal("1e4"),
                costScaling : new Decimal("1.5"),
                requirement : () => {
                    return player.magnets.gte(
                        Decimal.pow(player.magnetUpgrades.repeatable[0].costScaling, player.magnetUpgrades.repeatable[0].levelsBought)
                        .times(player.magnetUpgrades.repeatable[0].cost)
                    ) && player.steelBeams.gte(
                        Decimal.pow(player.magnetUpgrades.repeatable[0].costScaling, player.magnetUpgrades.repeatable[0].levelsBought)
                        .times(player.magnetUpgrades.repeatable[0].cost)
                    )
                },
                buySingles : () => {
                    player.magnets = player.magnets.minus(
                        Decimal.pow(player.magnetUpgrades.repeatable[0].costScaling, player.magnetUpgrades.repeatable[0].levelsBought)
                        .times(player.magnetUpgrades.repeatable[0].cost)
                    )
                    player.steelBeams = player.steelBeams.minus(
                        Decimal.pow(player.magnetUpgrades.repeatable[0].costScaling, player.magnetUpgrades.repeatable[0].levelsBought)
                        .times(player.magnetUpgrades.repeatable[0].cost)
                    )

                    player.magnetUpgrades.repeatable[0].levelsBought = player.magnetUpgrades.repeatable[0].levelsBought.add(1)
                },
                buyMax : () => {
                    let determineLowest = function() {
                        if (player.magnets.lte(player.steelBeams)) {
                            return player.magnets
                        } else {
                            return player.steelBeams
                        }
                    }
                    let amounty = Decimal.affordGeometricSeries(determineLowest(), player.magnetUpgrades.repeatable[0].cost, player.magnetUpgrades.repeatable[0].costScaling, player.magnetUpgrades.repeatable[0].levelsBought)
                    let pricey = Decimal.sumGeometricSeries(amounty, player.magnetUpgrades.repeatable[0].cost, player.magnetUpgrades.repeatable[0].costScaling, player.magnetUpgrades.repeatable[0].levelsBought)
                    player.magnetUpgrades.repeatable[0].levelsBought = player.magnetUpgrades.repeatable[0].levelsBought.add(amounty)

                    player.magnets = player.magnets.minus(pricey)
                    player.steelBeams = player.steelBeams.minus(pricey)

                    
                },
                
            },


            {
                levelsBought : new Decimal("0"),
                extraLevels : new Decimal("0"),
                cost : new Decimal("2e3"),
                costScaling : new Decimal("1.15"),
                requirement : () => {
                    return player.protons.gte(
                        Decimal.pow(player.magnetUpgrades.repeatable[1].costScaling, player.magnetUpgrades.repeatable[1].levelsBought)
                        .times(player.magnetUpgrades.repeatable[1].cost)
                    ) && player.electrons.gte(
                        Decimal.pow(player.magnetUpgrades.repeatable[1].costScaling, player.magnetUpgrades.repeatable[1].levelsBought)
                        .times(player.magnetUpgrades.repeatable[1].cost)
                    )
                },
                buySingles : () => {
                    player.protons = player.protons.minus(
                        Decimal.pow(player.magnetUpgrades.repeatable[1].costScaling, player.magnetUpgrades.repeatable[1].levelsBought)
                        .times(player.magnetUpgrades.repeatable[1].cost)
                    )
                    player.electrons = player.electrons.minus(
                        Decimal.pow(player.magnetUpgrades.repeatable[1].costScaling, player.magnetUpgrades.repeatable[1].levelsBought)
                        .times(player.magnetUpgrades.repeatable[1].cost)
                    )

                    player.magnetUpgrades.repeatable[1].levelsBought = player.magnetUpgrades.repeatable[1].levelsBought.add(1)
                },
                buyMax : () => {
                    let determineLowest = function() {
                        if (player.protons.lte(player.electrons)) {
                            return player.protons
                        } else {
                            return player.electrons
                        }
                    }
                    let amounty = Decimal.affordGeometricSeries(determineLowest(), player.magnetUpgrades.repeatable[1].cost, player.magnetUpgrades.repeatable[1].costScaling, player.magnetUpgrades.repeatable[1].levelsBought)
                    let pricey = Decimal.sumGeometricSeries(amounty, player.magnetUpgrades.repeatable[1].cost, player.magnetUpgrades.repeatable[1].costScaling, player.magnetUpgrades.repeatable[1].levelsBought)
                    player.magnetUpgrades.repeatable[1].levelsBought = player.magnetUpgrades.repeatable[1].levelsBought.add(amounty)
                    
                    player.protons = player.protons.minus(pricey)
                    player.electrons = player.electrons.minus(pricey)

                    
                },
                
            },

            {
                levelsBought : new Decimal("0"),
                extraLevels : new Decimal("0"),
                cost : new Decimal("2.923892e11"),
                costScaling : new Decimal("1.15"),
                requirement : () => {
                    return player.magnets.gte(
                        Decimal.pow(player.magnetUpgrades.repeatable[2].costScaling, player.magnetUpgrades.repeatable[2].levelsBought)
                        .times(player.magnetUpgrades.repeatable[2].cost)

                    ) && player.protons.gte(
                        Decimal.pow(player.magnetUpgrades.repeatable[2].costScaling, player.magnetUpgrades.repeatable[2].levelsBought)
                        .times(player.magnetUpgrades.repeatable[2].cost)
                        
                    )
                },
                buySingles : () => {
                    player.magnets = player.magnets.minus(
                        Decimal.pow(player.magnetUpgrades.repeatable[2].costScaling, player.magnetUpgrades.repeatable[2].levelsBought)
                        .times(player.magnetUpgrades.repeatable[2].cost)
                    )
                    player.protons = player.protons.minus(
                        Decimal.pow(player.magnetUpgrades.repeatable[2].costScaling, player.magnetUpgrades.repeatable[2].levelsBought)
                        .times(player.magnetUpgrades.repeatable[2].cost)
                        
                    )

                    player.magnetUpgrades.repeatable[2].levelsBought = player.magnetUpgrades.repeatable[2].levelsBought.add(1)
                },
                buyMax : () => {
                    let determineLowest = function() {
                        if (player.protons.lte(player.magnets)) {
                            return player.protons
                        } else {
                            return player.magnets
                        }
                    }
                    let amounty = Decimal.affordGeometricSeries(determineLowest(), player.magnetUpgrades.repeatable[2].cost, player.magnetUpgrades.repeatable[2].costScaling, player.magnetUpgrades.repeatable[2].levelsBought)
                    let pricey = Decimal.sumGeometricSeries(amounty, player.magnetUpgrades.repeatable[2].cost, player.magnetUpgrades.repeatable[2].costScaling, player.magnetUpgrades.repeatable[2].levelsBought)
                    player.magnetUpgrades.repeatable[2].levelsBought = player.magnetUpgrades.repeatable[2].levelsBought.add(amounty)

                    player.magnets = player.magnets.minus(pricey)
                    player.protons = player.protons.minus(pricey)

                    
                },
                
            },

            {
                levelsBought : new Decimal("0"),
                extraLevels : new Decimal("0"),
                cost : new Decimal("1e10"),
                costScaling : new Decimal("1.15"),
                requirement : () => {
                    return player.steelBeams.gte(
                        Decimal.pow(player.magnetUpgrades.repeatable[3].costScaling, player.magnetUpgrades.repeatable[3].levelsBought)
                        .times(player.magnetUpgrades.repeatable[3].cost)

                    ) && player.electrons.gte(
                        Decimal.pow(player.magnetUpgrades.repeatable[3].costScaling, player.magnetUpgrades.repeatable[3].levelsBought)
                        .times(player.magnetUpgrades.repeatable[3].cost)
                        
                    )
                },
                buySingles : () => {
                    player.steelBeams = player.steelBeams.minus(
                        Decimal.pow(player.magnetUpgrades.repeatable[3].costScaling, player.magnetUpgrades.repeatable[3].levelsBought)
                        .times(player.magnetUpgrades.repeatable[3].cost)
                        
                    )
                    player.electrons = player.electrons.minus(
                        Decimal.pow(player.magnetUpgrades.repeatable[3].costScaling, player.magnetUpgrades.repeatable[3].levelsBought)
                        .times(player.magnetUpgrades.repeatable[3].cost)
                        
                    )

                    player.magnetUpgrades.repeatable[3].levelsBought = player.magnetUpgrades.repeatable[3].levelsBought.add(1)
                },
                buyMax : () => {
                    let determineLowest = function() {
                        if (player.electrons.lte(player.steelBeams)) {
                            return player.electrons
                        } else {
                            return player.steelBeams
                        }
                    }
                    let amounty = Decimal.affordGeometricSeries(determineLowest(), player.magnetUpgrades.repeatable[3].cost, player.magnetUpgrades.repeatable[3].costScaling, player.magnetUpgrades.repeatable[3].levelsBought)
                    let pricey = Decimal.sumGeometricSeries(amounty, player.magnetUpgrades.repeatable[3].cost, player.magnetUpgrades.repeatable[3].costScaling, player.magnetUpgrades.repeatable[3].levelsBought)
                    player.magnetUpgrades.repeatable[3].levelsBought = player.magnetUpgrades.repeatable[3].levelsBought.add(amounty)

                    player.steelBeams = player.steelBeams.minus(pricey)
                    player.electrons = player.electrons.minus(pricey)

                    
                },
                
            },

            

            
        ],
        nonRepeatable : {
            requirement : (type) => {
                switch (type+1) {
                    case 1:
                        return player.magnets.gte(1e4);
                    case 2:
                        return player.steelBeams.gte(1e22);
                    case 3:
                        return player.electrons.gte(3e15)
                    case 4:
                        return player.protons.gte(1e16)
                    case 5:
                        return player.magnets.gte(5e39)
                    case 6:
                        return player.steelBeams.gte(1e42)
                    case 7:
                        return player.electrons.gte(1.2e18)
                    case 8:
                        return player.protons.gte(1.7976931348623157e23)
                    case 9:
                        return player.magnets.gte(9.124e50)
                    case 10:
                        return player.steelBeams.gte(1e63)
                    case 11:
                        return player.electrons.gte(2e25)
                    case 12:
                        return player.protons.gte(1e28)
                    case 13:
                        return player.magnets.gte(8.585e85)
                    case 14:
                        return player.steelBeams.gte("2^350")
                    case 15:
                        return player.electrons.gte(1e35)
                    case 16:
                        return player.protons.gte(1e42)
                }
            },

            buy : (type) => {
                switch (type+1) {
                    case 1:
                        return player.magnets = player.magnets.minus(1e4);
                    case 2:
                        return player.steelBeams = player.steelBeams.minus(1e22);
                    case 3:
                        return player.electrons = player.electrons.minus(3e15)
                    case 4:
                        return player.protons = player.protons.minus(1e16)
                    case 5:
                        return player.magnets = player.magnets.minus(5e39);
                    case 6:
                        return player.steelBeams = player.steelBeams.minus(1e42);
                    case 7:
                        return player.electrons = player.electrons.minus(1.2e18)
                    case 8:
                        return player.protons = player.protons.minus(1.7976931348623157e23)
                    case 9:
                        return player.magnets = player.magnets.minus(9.124e50);
                    case 10:
                        return player.steelBeams = player.steelBeams.minus(1e63);
                    case 11:
                        return player.electrons = player.electrons.minus(2e25)
                    case 12:
                        return player.protons = player.protons.minus(1e28)
                    case 13:
                        return player.magnets = player.magnets.minus(8.585e85);
                    case 14:
                        return player.steelBeams = player.steelBeams.minus("2^350");
                    case 15:
                        return player.electrons = player.electrons.minus(2e25)
                    case 16:
                        return player.protons = player.protons.minus(1e28)
                }
            },

            isBought : [
                false, false, false, false,
                false, false, false, false,
                false, false, false, false,
                false, false, false, false
            ],
        }

    },
    bricks : new Decimal("0"),
    gainedBricks : new Decimal("0"),
    wrenches : new Decimal("0"),
    gainedWrenches : new Decimal("0"),
    brickUpgrades : {
        repeatable : {
            level : [
                new Decimal("0"),
                new Decimal("0"),
                new Decimal("0"),
                new Decimal("0")
            ],

            costFormula : [
                () => Decimal.pow(10, Decimal.pow(1.04, player.brickUpgrades.repeatable.level[0])).times(1e6).div(getRBUDiscount(0)),
                () => Decimal.pow(10, Decimal.pow(1.0075, player.brickUpgrades.repeatable.level[1].plus(5).pow(2) )).times(1e14).div(getRBUDiscount(1)),
                () => Decimal.pow(10, Decimal.pow(1.01, player.brickUpgrades.repeatable.level[2].plus(240).pow(1.05))).times(1e17).div(getRBUDiscount(2)),
                () => Decimal.pow(10, player.brickUpgrades.repeatable.level[3].plus(3).pow(1.5)).times(1e7).div(getRBUDiscount(3))
            ],

            levelGain : [
                () => Decimal.log(Decimal.log(player.bricks.div(1e6).times(getRBUDiscount(0)), 10), 1.04).floor(),
                () => ((Decimal.log(Decimal.log(player.bricks.div(1e14).times(getRBUDiscount(1)), 10), 1.0075)).pow(1/2)).minus(5).floor(),
                () => Decimal.log(Decimal.log(player.bricks.div(1e17).times(getRBUDiscount(2)), 10), 1.01).pow(1/1.05).minus(240).floor(),
                () => (Decimal.log(player.bricks.div(1e7).times(getRBUDiscount(3)), 10).pow(1/1.5)).minus(3).floor()
            ]
        },

        nonRepeatable : {
            isBought : [
                false, false, false, false,
                false, false, false, false
            ],

            cost : [
                new Decimal("1e12"), new Decimal("1e35"), new Decimal("1e45"), new Decimal("2e90"),
                new Decimal("1e100"), new Decimal("2e110"), new Decimal("4e120"), new Decimal("8e130")
            ]
        }
    },
    regenerators : new Decimal("0"),
    regenPoints : new Decimal("0"),
    decay : {
        amount : new Decimal("1"),
        isInDecayverse : false
    },
    options : {
        notation : "scientific",
        confirmations : {
            prestige : true
        }
    },

    achievementsGotten : [
        false,false,false,false,false,false,false,
        false,false,false,false,false,false,false,
        false,false,false,false,false,false,false,
        false,false,false
    ]

}

player.magnetUpgrades.repeatable[0].cost = new Decimal("1e4")
player.magnetUpgrades.repeatable[0].costScaling = new Decimal("1.5")
player.magnetUpgrades.repeatable[1].cost = new Decimal("2e3")
player.magnetUpgrades.repeatable[1].costScaling = new Decimal("1.15")
player.magnetUpgrades.repeatable[2].cost = new Decimal("2.923892e11")
player.magnetUpgrades.repeatable[2].costScaling = new Decimal("1.15")
player.magnetUpgrades.repeatable[3].cost = new Decimal("1e10")
player.magnetUpgrades.repeatable[3].costScaling = new Decimal("1.15")

player.automator[0].maxLevel = new Decimal("eeee40")




var number_10 = new Decimal(10)

//The End of Decimal territory XD
var interval = 30
var saveInterval = 10000






















function hideElement(id) {
    showElement(id, "none");
}

function showElement(id, type = "inline") {
    let elm = document.getElementById(id);
    if (elm) elm.style.display = type;
}

function buyMagnetUpgrade(i) {
    if (!player.magnetUpgrades.nonRepeatable.isBought[i] && player.magnetUpgrades.nonRepeatable.requirement(i)) {
        player.magnetUpgrades.nonRepeatable.buy(i)
        player.magnetUpgrades.nonRepeatable.isBought[i] = true
    }
}

function buyRepeatableMagnetUpgrade(amount, i) {
    if (amount == "singles") {
        if (player.magnetUpgrades.repeatable[i].requirement()) {
            player.magnetUpgrades.repeatable[i].buySingles()
        }
    } else if (amount == "max") {
        while (player.magnetUpgrades.repeatable[i].requirement()) {
            player.magnetUpgrades.repeatable[i].buyMax()
        }
    }
}

function buyGoldenScrapUpgrade(i) {
    if (!player.goldenScrapUpgrades.isBought[i] && player.goldenScrap.gte(player.goldenScrapUpgrades.cost[i])) {
        player.goldenScrap = player.goldenScrap.minus(player.goldenScrapUpgrades.cost[i])
        player.goldenScrapUpgrades.isBought[i] = true
    }
}



function getGSGainSlowdown() {
    return "1e20000"
}

//Welcome to return dimension
function getGoldenScrapFormula() {
    return Decimal.pow(player.scrap.min(getGSGainSlowdown()).div(1e16), 0.15).times(200)
    .times(Decimal.log(player.scrap.max(getGSGainSlowdown()).minus(getGSGainSlowdown()).div(getGSGainSlowdown()).plus(10), 10).pow(3))
    .times(
        (getTotalFactories(0).times((player.goldenScrapUpgrades.isBought[1]) ? 1 : 0)).plus(1)
    )
    .times(Decimal.pow((getTotalFactories(0).times(   (player.goldenScrapUpgrades.isBought[4]) ? 1 : 0  )).plus(1), 3))
    .times((getTotalLevelsOfRepeatableMagnetUpgrade(3).times(2).plus(1).pow(0.5)).max(1))
    .times( (player.achievementsGotten[16]) ? 200 : 1)
    .times(
        getTotalFactories(1).plus(1)
        .pow( (player.goldenScrapUpgrades.isBought[14]) ? 3 : 0 )
    )
    .times(
        getTotalFactories(0).plus(1)
        .pow( (player.magnetUpgrades.nonRepeatable.isBought[9]) ? 1.25 : 0 )
    )
    .times(
        getTotalFactories(0).plus(1)
        .pow( (player.magnetUpgrades.nonRepeatable.isBought[11]) ? 1.25 : 0 )
    )
    .times(
        player.gainedBricks.plus(1)
        .pow( (player.brickUpgrades.nonRepeatable.isBought[4]) ? 0.25 : 0 )
    )
    .times(
        getTotalFactories(0).div(1e5).plus(1)
        .pow( (player.brickUpgrades.nonRepeatable.isBought[7]) ? 8 : 0 )
    )
    .times(
        getRegenPointEffect("Golden Scrap")
    )
    .times(
        (player.decay.isInDecayverse) ? 0 : 1
    )
    
}

function getGoldenScrapProduction() {
    return getGoldenScrapFormula().div(100).times((getTotalLevelsOfRepeatableMagnetUpgrade(2).pow(0.5)).max(0))
}

function getScrapGain() {
    return Decimal.times(1, Decimal.pow(player.multiplicatorMultiplierBase, player.multiplicatorBought))
    .times(
        (player.goldenScrap.div(100)).plus(1)
        .pow( (player.magnetUpgrades.nonRepeatable.isBought[1]) ? 1.05 : 1 )
        .pow( (player.brickUpgrades.nonRepeatable.isBought[5]) ? 1.03 : 1 )
        .pow( (player.magnetUpgrades.nonRepeatable.isBought[14]) ? Decimal.log(player.gainedMagnets.times(player.gainedSteelBeams).div("1e380").pow(0.01).plus(10), 10) : 1 )
        .pow( (player.decay.isInDecayverse) ? 0 : 1 )
    )
    .times(
        Decimal.pow(Decimal.log(player.scrap.plus(2), 2).max(1), (player.goldenScrapUpgrades.isBought[3]) ? 3 : 0)
        .pow( player.goldenScrapUpgrades.isBought[16] ? 3 : 1 )
    )
    .times(
        (getTotalFactories(0).times(0.01).times(     (player.goldenScrapUpgrades.isBought[0]) ? 1 : 0        )).plus(1)
    )
    .times(
        (getTotalFactories(0).times(0.01).times(             (player.goldenScrapUpgrades.isBought[1]) ? 1 : 0           ).plus(1)).pow(1.4)
    )
    
    .times(
        (Decimal.pow(player.timeSpentInThisPrestige.plus(1), (player.goldenScrapUpgrades.isBought[2]) ? 4 : 0)).max(1)
    )
    .times(Decimal.pow(player.stars.multiplierBase.add(  player.goldenScrapUpgrades.isBought[18] ? 6 : 0  ), player.stars.bought))
    .times(
        player.gainedMagnets.div(1e25)
        .times(player.gainedSteelBeams.div(1e25))
        .plus(1).pow(    (player.goldenScrapUpgrades.isBought[7]) ? 0.75 : 0)
        .pow( player.goldenScrapUpgrades.isBought[16] ? 1.5 : 1 )
    )
    .times(getAchievementMultiplier())
    .times(
        player.scrapClicks.min(5000).div(100).plus(1).pow(4)
        .times(player.scrapClicks.max(5000).minus(5000).div(6666).plus(1).pow(20))
        .pow( (player.achievementsGotten[15]) ? 1 : 0 )
    )
    .times(getTotalFactories(0).plus(1).pow( (player.goldenScrapUpgrades.isBought[9]) ? 5 : 0))
    .times(
        getTotalFactories(0).plus(1)
        .pow( (player.magnetUpgrades.nonRepeatable.isBought[8]) ? 1 : 0)
    )
    .times(
        getTotalFactories(0).plus(1)
        .pow( (player.magnetUpgrades.nonRepeatable.isBought[10]) ? 1 : 0)
    )
    .times(
        player.gainedBricks.div(1e12).plus(1)
        .pow( player.brickUpgrades.nonRepeatable.isBought[0] ? 1.2 : 0 )
    )
    .times(
        getRegenPointEffect("Scrap")
    )
    .div(getDecayDivision())
    .div( (player.decay.isInDecayverse) ? "1e800" : 1 )
}

function getTotalScrapsPerSecond() {
    return player.scrapsPerSecond.plus(getTotalFactories(0))
}








//lolololololololololololol

function clickScrap() {
    player.scrap = player.scrap.add(
        Decimal.round(player.scrapsPerClick).times(getScrapGain())
    )
    player.scrapClicks = player.scrapClicks.add(1)
    player.unmanualScrapClicks = player.unmanualScrapClicks.add(1)
};

function buyMultiplicator(amount) {
    if (amount == "singles") {
        if (player.scrap.gte(Decimal.pow(player.multiplicatorCostScaling, player.multiplicatorBought).times(player.multiplicatorCost))) {
            player.scrap = player.scrap.minus(Decimal.pow(player.multiplicatorCostScaling, player.multiplicatorBought).times(player.multiplicatorCost))
            player.multiplicatorBought = player.multiplicatorBought.add(1)
        }
    } else if (amount == "max") {
        while (player.scrap.gte(Decimal.pow(player.multiplicatorCostScaling, player.multiplicatorBought).times(player.multiplicatorCost))) {
            let amount2 = Decimal.affordGeometricSeries(player.scrap, player.multiplicatorCost, player.multiplicatorCostScaling, player.multiplicatorBought)
            let price2 =  Decimal.sumGeometricSeries(amount2, player.multiplicatorCost, player.multiplicatorCostScaling, player.multiplicatorBought)
            player.multiplicatorBought = player.multiplicatorBought.add(amount2)
            player.scrap = player.scrap.sub(price2)
        }
    }
};

function buyStars(amount) {
    if (amount == "singles") {
        if (player.goldenScrap.gte(Decimal.pow(player.stars.costScaling, player.stars.bought).times(player.stars.cost))) {
            player.goldenScrap = player.goldenScrap.minus(Decimal.pow(player.stars.costScaling, player.stars.bought).times(player.stars.cost))
            player.stars.bought = player.stars.bought.add(1)
        }
    } else if (amount == "max") {
        while (player.goldenScrap.gte(Decimal.pow(player.stars.costScaling, player.stars.bought).times(player.stars.cost))) {
            let amount3 = Decimal.affordGeometricSeries(player.goldenScrap, player.stars.cost, player.stars.costScaling, player.stars.bought)
            let price3 = Decimal.sumGeometricSeries(amount3, player.stars.cost, player.stars.costScaling, player.stars.bought)
            player.stars.bought = player.stars.bought.add(amount3)
            player.goldenScrap = player.goldenScrap.sub(price3)
        }
    }
}

function showPrestigeTab() {
    if (player.bestScraps.gte(1e9) || player.goldenScrap.gt(0)) {
        showElement("prestigeTab")
    } else {
        hideElement("prestigeTab")
    }
}

function unlockFactoryListsSubTab() {
    if (player.goldenScrapUpgrades.isBought[11]) {
        hideElement("factoryListLockedText")
        showElement("factoryListScreen")
    } else {
        showElement("factoryListLockedText")
        hideElement("factoryListScreen")
    }
}

function showFactoryListsSubTab() {
    if (player.goldenScrapUpgrades.isBought[11] || player.goldenScrapUpgrades.isBought[10]) {
        showElement("factorySubTab")
    } else {
        hideElement("factorySubTab")
    }
}

function showMoreNMUpgrades() {
    for (i = 0; i < 8; i++) {
        if (player.goldenScrapUpgrades.isBought[11]) {
            document.querySelectorAll("tr td#MoreNMUpgrades1")[i].style.visibility = "visible"
        } else {
            document.querySelectorAll("tr td#MoreNMUpgrades1")[i].style.visibility = "hidden"
        }
    }

    for (i = 0; i < 4; i++) {
        if (player.goldenScrapUpgrades.isBought[17]) {
            document.querySelectorAll("tr td#MoreNMUpgrades2")[i].style.visibility = "visible"
        } else {
            document.querySelectorAll("tr td#MoreNMUpgrades2")[i].style.visibility = "hidden"
        }
    }

    if (player.goldenScrapUpgrades.isBought[11]) {
        document.getElementById("NMURow2").style.display = "inline"
        document.getElementById("NMURow3").style.display = "inline"
        document.getElementById("newLine1.2").style.display = "inline"
        
    } else {
        document.getElementById("NMURow2").style.display = "none"
        document.getElementById("NMURow3").style.display = "none"
        document.getElementById("newLine1.2").style.display = "none"
        
    }

    if (player.goldenScrapUpgrades.isBought[17]) {
        document.getElementById("NMURow4").style.display = "inline"
        document.getElementById("newLine2.2").style.display = "inline"
    } else {
        document.getElementById("NMURow4").style.display = "none"
        document.getElementById("newLine2.2").style.display = "none"
    }

    
}

function showMoreGSUpgrades() {
    for (i = 0; i < 6; i++) {
        if (player.goldenScrapUpgrades.isBought[5]) {
            document.querySelectorAll("tr td#MoreGSUpgrades1")[i].style.visibility = "visible"
        } else {
            document.querySelectorAll("tr td#MoreGSUpgrades1")[i].style.visibility = "hidden"
        } 
    }

    if (player.goldenScrapUpgrades.isBought[5]) {
        document.getElementById("GSURow3").style.display = "inline"
    } else {
        document.getElementById("GSURow3").style.display = "none"
    }

    

    
}

function showMoreGSUpgrades2() {
    for (i = 0; i < 6; i++) {
        if (player.goldenScrapUpgrades.isBought[11]) {
            document.querySelectorAll("tr td#MoreGSUpgrades2")[i].style.visibility = "visible"
        } else {
            document.querySelectorAll("tr td#MoreGSUpgrades2")[i].style.visibility = "hidden"
        } 
    }

    for (i = 0; i < 5; i++) {
        if (player.goldenScrapUpgrades.isBought[17]) {
            document.querySelectorAll("tr td#MoreGSUpgrades3")[i].style.visibility = "visible"
        } else {
            document.querySelectorAll("tr td#MoreGSUpgrades3")[i].style.visibility = "hidden"
        } 
    }

    for (i = 0; i < 4; i++) {
        if (player.goldenScrapUpgrades.isBought[23]) {
            document.querySelectorAll("tr td#MoreGSUpgrades4")[i].style.visibility = "visible"
        } else {
            document.querySelectorAll("tr td#MoreGSUpgrades4")[i].style.visibility = "hidden"
        } 
    }
    

    if (player.goldenScrapUpgrades.isBought[11]) {
        document.getElementById("GSURow4").style.display = "inline"
        document.getElementById("newLine1.1").style.display = "inline"
    } else {
        document.getElementById("GSURow4").style.display = "none"
        document.getElementById("newLine1.1").style.display = "none"
    }

    if (player.goldenScrapUpgrades.isBought[15]) {
        document.getElementById("GSURow5").style.display = "inline"
        document.getElementById("newLine2.1").style.display = "inline"
    } else {
        document.getElementById("GSURow5").style.display = "none"
        document.getElementById("newLine2.1").style.display = "none"
    }

    if (player.goldenScrapUpgrades.isBought[17]) {
        document.getElementById("GSURow6").style.display = "inline"
        document.getElementById("newLine3.1").style.display = "inline"
    } else {
        document.getElementById("GSURow6").style.display = "none"
        document.getElementById("newLine3.1").style.display = "none"
    }

    if (player.goldenScrapUpgrades.isBought[23]) {
        document.getElementById("GSURow7").style.display = "inline"
        document.getElementById("newLine4.1").style.display = "inline"
    } else {
        document.getElementById("GSURow7").style.display = "none"
        document.getElementById("newLine4.1").style.display = "none"
    }
}

function showMagnetsSubTab() {
    if (player.goldenScrapUpgrades.isBought[4] || player.goldenScrapUpgrades.isBought[5]) {
        showElement("magnetsSubTab")
    } else {
        hideElement("magnetsSubTab")
    }
}

function unlockMagnetsSubTab() {
    if (player.goldenScrapUpgrades.isBought[5]) {
        hideElement("magnetsLockedText")
        showElement("magnetsScreen")
    } else {
        showElement("magnetsLockedText")
        hideElement("magnetsScreen")
    }
}

function showBricksSubTab() {
    if (player.goldenScrapUpgrades.isBought[16] || player.goldenScrapUpgrades.isBought[17]) {
        showElement("bricksSubTab")
    } else {
        hideElement("bricksSubTab")
    }
}

function unlockBricksSubTab() {
    if (player.goldenScrapUpgrades.isBought[17]) {
        hideElement("bricksLockedText")
        showElement("bricksScreen")
    } else {
        showElement("bricksLockedText")
        hideElement("bricksScreen")
    }
}

function showDecaySubTab() {
    if (player.goldenScrapUpgrades.isBought[22] || player.goldenScrapUpgrades.isBought[23]) {
        showElement("decaySubTab")
    } else {
        hideElement("decaySubTab")
    }
}

function unlockDecaySubTab() {
    if (player.goldenScrapUpgrades.isBought[23]) {
        hideElement("decayLockedText")
        showElement("decayScreen")
    } else {
        showElement("decayLockedText")
        hideElement("decayScreen")
    }
}

function showBoostersTab() {
    if (player.goldenScrapUpgrades.isBought[26] || player.goldenScrapUpgrades.isBought[27]) {
        showElement("boostersTab")
    } else {
        hideElement("boostersTab")
    }
}

function unlockBoostersTab() {
    if (player.goldenScrapUpgrades.isBought[27]) {
        hideElement("boostersLockedText")
        showElement("boostersScreen")
    } else {
        showElement("boostersLockedText")
        hideElement("boostersScreen")
    }
}

function hardReset() {
    player = {
        lastUpdate : Date.now(),
        scrap : new Decimal("0"),
        bestScraps : new Decimal("0"),
        scrapsPerClick : new Decimal("1"),
        scrapsPerSecond : new Decimal("0"),
        scrapClicks : new Decimal("0"),
        unmanualScrapClicks : new Decimal("0"),
        factory : [
            {
                cost : new Decimal("10"),
                costScaling : new Decimal("1.01"),
                bought : new Decimal("0"),
                extra : new Decimal("0"),
            },
    
            {
                cost : new Decimal("1e510"),
                costScaling : new Decimal("100"),
                bought : new Decimal("0"),
                extra : new Decimal("0"),
            }
        ],
        multiplicatorCost : new Decimal("100"),
        multiplicatorBought : new Decimal("0"),
        multiplicatorMultiplierBase : new Decimal("3"),
        multiplicatorCostScaling : new Decimal("4"),
        goldenScrap : new Decimal("0"),
        prestigeStat : [
            new Decimal("0")
        ],
        timeSpentInThisPrestige : new Decimal("0"),
        magnets : new Decimal("0"),
        magnetsPerClick : new Decimal("1"),
        gainedMagnets: new Decimal("0"),
        steelBeams : new Decimal("0"),
        steelBeamsPerClick : new Decimal("1"),
        gainedSteelBeams : new Decimal("0"),
        electrons : new Decimal("0"),
        protons : new Decimal("0"),
        stars : {
            bought : new Decimal("0"),
            cost : new Decimal("1e4"),
            costScaling : new Decimal("1e15"),
            multiplierBase : new Decimal("16"),
        },
        goldenScrapUpgrades : {
            isBought : [
                false, false, false, false,
                false, false, false, false,
                false, false, false, false,
                false, false, false, false,
                false, false, false, false,
                false, false, false, false,
                false, false, false, false
                
            ],
            cost : [
                new Decimal("400"), new Decimal("1e13"), new Decimal("4e50"), new Decimal("2e63"),
                new Decimal("1e117"), new Decimal("2e186"), new Decimal("1e210"), new Decimal("1e220"),
                new Decimal("2^1024"), new Decimal("1e350"), new Decimal("1e495"), new Decimal("1e525"),
                new Decimal("1e552"), new Decimal("2e558"), new Decimal("5e645"), new Decimal("2^2330"),
                new Decimal("1e1000"), new Decimal("1e1150"), new Decimal("1e1250"), new Decimal("1e1450"),
                new Decimal("1e1850"), new Decimal("2^6646"), new Decimal("1e2650"), new Decimal("3.2e3200"),
                new Decimal("1e3320"), new Decimal("1e3380"), new Decimal("1e3450"), new Decimal("1e3500")
                
            ],
        },
        automator : [
            {
                cost: new Decimal("1e15"),
                costScaling: new Decimal("1000"),
                level: new Decimal("0"),
                maxLevel: new Decimal("eeee40"),
                dids: new Decimal("0"),
                baseSpeed: new Decimal("1"),
                speedPerLevel: new Decimal("1.03"),
                isActive: false,
            },
    
            {
                cost: new Decimal("1e20"),
                costScaling: new Decimal("1e20"),
                level: new Decimal("0"),
                maxLevel: new Decimal("10"),
                dids: new Decimal("0"),
                baseSpeed: new Decimal("1"),
                speedPerLevel: new Decimal("1.5"),
                isActive: false
            }
        ],
        magnetUpgrades : {
            repeatable : [
                {
                    levelsBought : new Decimal("0"),
                    extraLevels : new Decimal("0"),
                    cost : new Decimal("1e4"),
                    costScaling : new Decimal("1.5"),
                    requirement : () => {
                        return player.magnets.gte(
                            Decimal.pow(player.magnetUpgrades.repeatable[0].costScaling, player.magnetUpgrades.repeatable[0].levelsBought)
                            .times(player.magnetUpgrades.repeatable[0].cost)
                        ) && player.steelBeams.gte(
                            Decimal.pow(player.magnetUpgrades.repeatable[0].costScaling, player.magnetUpgrades.repeatable[0].levelsBought)
                            .times(player.magnetUpgrades.repeatable[0].cost)
                        )
                    },
                    buySingles : () => {
                        player.magnets = player.magnets.minus(
                            Decimal.pow(player.magnetUpgrades.repeatable[0].costScaling, player.magnetUpgrades.repeatable[0].levelsBought)
                            .times(player.magnetUpgrades.repeatable[0].cost)
                        )
                        player.steelBeams = player.steelBeams.minus(
                            Decimal.pow(player.magnetUpgrades.repeatable[0].costScaling, player.magnetUpgrades.repeatable[0].levelsBought)
                            .times(player.magnetUpgrades.repeatable[0].cost)
                        )
    
                        player.magnetUpgrades.repeatable[0].levelsBought = player.magnetUpgrades.repeatable[0].levelsBought.add(1)
                    },
                    buyMax : () => {
                        let determineLowest = function() {
                            if (player.magnets.lte(player.steelBeams)) {
                                return player.magnets
                            } else {
                                return player.steelBeams
                            }
                        }
                        let amounty = Decimal.affordGeometricSeries(determineLowest(), player.magnetUpgrades.repeatable[0].cost, player.magnetUpgrades.repeatable[0].costScaling, player.magnetUpgrades.repeatable[0].levelsBought)
                        let pricey = Decimal.sumGeometricSeries(amounty, player.magnetUpgrades.repeatable[0].cost, player.magnetUpgrades.repeatable[0].costScaling, player.magnetUpgrades.repeatable[0].levelsBought)
                        player.magnetUpgrades.repeatable[0].levelsBought = player.magnetUpgrades.repeatable[0].levelsBought.add(amounty)
    
                        player.magnets = player.magnets.minus(pricey)
                        player.steelBeams = player.steelBeams.minus(pricey)
    
                        
                    },
                    
                },
    
    
                {
                    levelsBought : new Decimal("0"),
                    extraLevels : new Decimal("0"),
                    cost : new Decimal("2e3"),
                    costScaling : new Decimal("1.15"),
                    requirement : () => {
                        return player.protons.gte(
                            Decimal.pow(player.magnetUpgrades.repeatable[1].costScaling, player.magnetUpgrades.repeatable[1].levelsBought)
                            .times(player.magnetUpgrades.repeatable[1].cost)
                        ) && player.electrons.gte(
                            Decimal.pow(player.magnetUpgrades.repeatable[1].costScaling, player.magnetUpgrades.repeatable[1].levelsBought)
                            .times(player.magnetUpgrades.repeatable[1].cost)
                        )
                    },
                    buySingles : () => {
                        player.protons = player.protons.minus(
                            Decimal.pow(player.magnetUpgrades.repeatable[1].costScaling, player.magnetUpgrades.repeatable[1].levelsBought)
                            .times(player.magnetUpgrades.repeatable[1].cost)
                        )
                        player.electrons = player.electrons.minus(
                            Decimal.pow(player.magnetUpgrades.repeatable[1].costScaling, player.magnetUpgrades.repeatable[1].levelsBought)
                            .times(player.magnetUpgrades.repeatable[1].cost)
                        )
    
                        player.magnetUpgrades.repeatable[1].levelsBought = player.magnetUpgrades.repeatable[1].levelsBought.add(1)
                    },
                    buyMax : () => {
                        let determineLowest = function() {
                            if (player.protons.lte(player.electrons)) {
                                return player.protons
                            } else {
                                return player.electrons
                            }
                        }
                        let amounty = Decimal.affordGeometricSeries(determineLowest(), player.magnetUpgrades.repeatable[1].cost, player.magnetUpgrades.repeatable[1].costScaling, player.magnetUpgrades.repeatable[1].levelsBought)
                        let pricey = Decimal.sumGeometricSeries(amounty, player.magnetUpgrades.repeatable[1].cost, player.magnetUpgrades.repeatable[1].costScaling, player.magnetUpgrades.repeatable[1].levelsBought)
                        player.magnetUpgrades.repeatable[1].levelsBought = player.magnetUpgrades.repeatable[1].levelsBought.add(amounty)
                        
                        player.protons = player.protons.minus(pricey)
                        player.electrons = player.electrons.minus(pricey)
    
                        
                    },
                    
                },
    
                {
                    levelsBought : new Decimal("0"),
                    extraLevels : new Decimal("0"),
                    cost : new Decimal("2.923892e11"),
                    costScaling : new Decimal("1.15"),
                    requirement : () => {
                        return player.magnets.gte(
                            Decimal.pow(player.magnetUpgrades.repeatable[2].costScaling, player.magnetUpgrades.repeatable[2].levelsBought)
                            .times(player.magnetUpgrades.repeatable[2].cost)
    
                        ) && player.protons.gte(
                            Decimal.pow(player.magnetUpgrades.repeatable[2].costScaling, player.magnetUpgrades.repeatable[2].levelsBought)
                            .times(player.magnetUpgrades.repeatable[2].cost)
                            
                        )
                    },
                    buySingles : () => {
                        player.magnets = player.magnets.minus(
                            Decimal.pow(player.magnetUpgrades.repeatable[2].costScaling, player.magnetUpgrades.repeatable[2].levelsBought)
                            .times(player.magnetUpgrades.repeatable[2].cost)
                        )
                        player.protons = player.protons.minus(
                            Decimal.pow(player.magnetUpgrades.repeatable[2].costScaling, player.magnetUpgrades.repeatable[2].levelsBought)
                            .times(player.magnetUpgrades.repeatable[2].cost)
                            
                        )
    
                        player.magnetUpgrades.repeatable[2].levelsBought = player.magnetUpgrades.repeatable[2].levelsBought.add(1)
                    },
                    buyMax : () => {
                        let determineLowest = function() {
                            if (player.protons.lte(player.magnets)) {
                                return player.protons
                            } else {
                                return player.magnets
                            }
                        }
                        let amounty = Decimal.affordGeometricSeries(determineLowest(), player.magnetUpgrades.repeatable[2].cost, player.magnetUpgrades.repeatable[2].costScaling, player.magnetUpgrades.repeatable[2].levelsBought)
                        let pricey = Decimal.sumGeometricSeries(amounty, player.magnetUpgrades.repeatable[2].cost, player.magnetUpgrades.repeatable[2].costScaling, player.magnetUpgrades.repeatable[2].levelsBought)
                        player.magnetUpgrades.repeatable[2].levelsBought = player.magnetUpgrades.repeatable[2].levelsBought.add(amounty)
    
                        player.magnets = player.magnets.minus(pricey)
                        player.protons = player.protons.minus(pricey)
    
                        
                    },
                    
                },
    
                {
                    levelsBought : new Decimal("0"),
                    extraLevels : new Decimal("0"),
                    cost : new Decimal("1e10"),
                    costScaling : new Decimal("1.15"),
                    requirement : () => {
                        return player.steelBeams.gte(
                            Decimal.pow(player.magnetUpgrades.repeatable[3].costScaling, player.magnetUpgrades.repeatable[3].levelsBought)
                            .times(player.magnetUpgrades.repeatable[3].cost)
    
                        ) && player.electrons.gte(
                            Decimal.pow(player.magnetUpgrades.repeatable[3].costScaling, player.magnetUpgrades.repeatable[3].levelsBought)
                            .times(player.magnetUpgrades.repeatable[3].cost)
                            
                        )
                    },
                    buySingles : () => {
                        player.steelBeams = player.steelBeams.minus(
                            Decimal.pow(player.magnetUpgrades.repeatable[3].costScaling, player.magnetUpgrades.repeatable[3].levelsBought)
                            .times(player.magnetUpgrades.repeatable[3].cost)
                            
                        )
                        player.electrons = player.electrons.minus(
                            Decimal.pow(player.magnetUpgrades.repeatable[3].costScaling, player.magnetUpgrades.repeatable[3].levelsBought)
                            .times(player.magnetUpgrades.repeatable[3].cost)
                            
                        )
    
                        player.magnetUpgrades.repeatable[3].levelsBought = player.magnetUpgrades.repeatable[3].levelsBought.add(1)
                    },
                    buyMax : () => {
                        let determineLowest = function() {
                            if (player.electrons.lte(player.steelBeams)) {
                                return player.electrons
                            } else {
                                return player.steelBeams
                            }
                        }
                        let amounty = Decimal.affordGeometricSeries(determineLowest(), player.magnetUpgrades.repeatable[3].cost, player.magnetUpgrades.repeatable[3].costScaling, player.magnetUpgrades.repeatable[3].levelsBought)
                        let pricey = Decimal.sumGeometricSeries(amounty, player.magnetUpgrades.repeatable[3].cost, player.magnetUpgrades.repeatable[3].costScaling, player.magnetUpgrades.repeatable[3].levelsBought)
                        player.magnetUpgrades.repeatable[3].levelsBought = player.magnetUpgrades.repeatable[3].levelsBought.add(amounty)
    
                        player.steelBeams = player.steelBeams.minus(pricey)
                        player.electrons = player.electrons.minus(pricey)
    
                        
                    },
                    
                },
    
                
    
                
            ],
            nonRepeatable : {
                requirement : (type) => {
                    switch (type+1) {
                        case 1:
                            return player.magnets.gte(1e4);
                        case 2:
                            return player.steelBeams.gte(1e22);
                        case 3:
                            return player.electrons.gte(3e15)
                        case 4:
                            return player.protons.gte(1e16)
                        case 5:
                            return player.magnets.gte(5e39)
                        case 6:
                            return player.steelBeams.gte(1e42)
                        case 7:
                            return player.electrons.gte(1.2e18)
                        case 8:
                            return player.protons.gte(1.7976931348623157e23)
                        case 9:
                            return player.magnets.gte(9.124e50)
                        case 10:
                            return player.steelBeams.gte(1e63)
                        case 11:
                            return player.electrons.gte(2e25)
                        case 12:
                            return player.protons.gte(1e28)
                        case 13:
                            return player.magnets.gte(8.585e85)
                        case 14:
                            return player.steelBeams.gte("2^350")
                        case 15:
                            return player.electrons.gte(1e35)
                        case 16:
                            return player.protons.gte(1e42)
                    }
                },
    
                buy : (type) => {
                    switch (type+1) {
                        case 1:
                            return player.magnets = player.magnets.minus(1e4);
                        case 2:
                            return player.steelBeams = player.steelBeams.minus(1e22);
                        case 3:
                            return player.electrons = player.electrons.minus(3e15)
                        case 4:
                            return player.protons = player.protons.minus(1e16)
                        case 5:
                            return player.magnets = player.magnets.minus(5e39);
                        case 6:
                            return player.steelBeams = player.steelBeams.minus(1e42);
                        case 7:
                            return player.electrons = player.electrons.minus(1.2e18)
                        case 8:
                            return player.protons = player.protons.minus(1.7976931348623157e23)
                        case 9:
                            return player.magnets = player.magnets.minus(9.124e50);
                        case 10:
                            return player.steelBeams = player.steelBeams.minus(1e63);
                        case 11:
                            return player.electrons = player.electrons.minus(2e25)
                        case 12:
                            return player.protons = player.protons.minus(1e28)
                        case 13:
                            return player.magnets = player.magnets.minus(8.585e85);
                        case 14:
                            return player.steelBeams = player.steelBeams.minus("2^350");
                        case 15:
                            return player.electrons = player.electrons.minus(2e25)
                        case 16:
                            return player.protons = player.protons.minus(1e28)
                    }
                },
    
                isBought : [
                    false, false, false, false,
                    false, false, false, false,
                    false, false, false, false,
                    false, false, false, false
                ],
            }
    
        },
        bricks : new Decimal("0"),
        gainedBricks : new Decimal("0"),
        wrenches : new Decimal("0"),
        gainedWrenches : new Decimal("0"),
        brickUpgrades : {
            repeatable : {
                level : [
                    new Decimal("0"),
                    new Decimal("0"),
                    new Decimal("0"),
                    new Decimal("0")
                ],
    
                costFormula : [
                    () => Decimal.pow(10, Decimal.pow(1.04, player.brickUpgrades.repeatable.level[0])).times(1e6).div(getRBUDiscount(0)),
                    () => Decimal.pow(10, Decimal.pow(1.0075, player.brickUpgrades.repeatable.level[1].plus(5).pow(2) )).times(1e14).div(getRBUDiscount(1)),
                    () => Decimal.pow(10, Decimal.pow(1.01, player.brickUpgrades.repeatable.level[2].plus(240).pow(1.05))).times(1e17).div(getRBUDiscount(2)),
                    () => Decimal.pow(10, player.brickUpgrades.repeatable.level[3].plus(3).pow(1.5)).times(1e7).div(getRBUDiscount(3))
                ],
    
                levelGain : [
                    () => Decimal.log(Decimal.log(player.bricks.div(1e6).times(getRBUDiscount(0)), 10), 1.04).floor(),
                    () => ((Decimal.log(Decimal.log(player.bricks.div(1e14).times(getRBUDiscount(1)), 10), 1.0075)).pow(1/2)).minus(5).floor(),
                    () => Decimal.log(Decimal.log(player.bricks.div(1e17).times(getRBUDiscount(2)), 10), 1.01).pow(1/1.05).minus(240).floor(),
                    () => (Decimal.log(player.bricks.div(1e7).times(getRBUDiscount(3)), 10).pow(1/1.5)).minus(3).floor()
                ]
            },
    
            nonRepeatable : {
                isBought : [
                    false, false, false, false,
                    false, false, false, false
                ],
    
                cost : [
                    new Decimal("1e12"), new Decimal("1e35"), new Decimal("1e45"), new Decimal("2e90"),
                    new Decimal("1e100"), new Decimal("2e110"), new Decimal("4e120"), new Decimal("8e130")
                ]
            }
        },
        regenerators : new Decimal("0"),
        regenPoints : new Decimal("0"),
        decay : {
            amount : new Decimal("1"),
            isInDecayverse : false
        },
        options : {
            notation : "scientific",
            confirmations : {
                prestige : true
            }
        },
    
        achievementsGotten : [
            false,false,false,false,false,false,false,
            false,false,false,false,false,false,false,
            false,false,false,false,false,false,false,
            false,false,false
        ]
    
    }
    save();
    load();
    tab("production");
    subTab1("subPrestige2");
    subTab2("subSettings1");
    subTab3("subProduction1");
    location.reload()


}

function confirmHardReset() {
    if (confirm("Are you sure you want to hard reset? Hard reset returns back to where you start (Not prestige).")) {
        superConfirmHardReset();
    } else {
        alert("You saved your progress :D");
    }
}

function superConfirmHardReset() {
    if (confirm("ARE YOU REALLY SURE YOU WANT TO DO THAT??? YOU\'LL KILL YOUR PROGRESS!! THIS IS YOUR LAST CHANCE")) {
        hardReset();
    } else {
        alert("Pheww. I thought You want to kill your game :O");
    }
}

function updateText() {
    document.getElementById("GoldenScrapUpgradeCost1").innerHTML = format(player.goldenScrapUpgrades.cost[0])
    document.getElementById("GoldenScrapUpgradeCost2").innerHTML = format(player.goldenScrapUpgrades.cost[1])
    document.getElementById("GoldenScrapUpgradeCost3").innerHTML = format(player.goldenScrapUpgrades.cost[2])
    document.getElementById("GoldenScrapUpgradeCost4").innerHTML = format(player.goldenScrapUpgrades.cost[3])
    document.getElementById("GoldenScrapUpgradeCost5").innerHTML = format(player.goldenScrapUpgrades.cost[4])
    document.getElementById("GoldenScrapUpgradeCost6").innerHTML = format(player.goldenScrapUpgrades.cost[5])
    document.getElementById("GoldenScrapUpgradeCost7").innerHTML = format(player.goldenScrapUpgrades.cost[6])
    document.getElementById("GoldenScrapUpgradeCost8").innerHTML = format(player.goldenScrapUpgrades.cost[7])
    document.getElementById("GoldenScrapUpgradeCost9").innerHTML = format(player.goldenScrapUpgrades.cost[8])
    document.getElementById("GoldenScrapUpgradeCost10").innerHTML = format(player.goldenScrapUpgrades.cost[9])
    document.getElementById("GoldenScrapUpgradeCost11").innerHTML = format(player.goldenScrapUpgrades.cost[10])
    document.getElementById("GoldenScrapUpgradeCost12").innerHTML = format(player.goldenScrapUpgrades.cost[11])
    document.getElementById("GoldenScrapUpgradeCost13").innerHTML = format(player.goldenScrapUpgrades.cost[12])
    document.getElementById("GoldenScrapUpgradeCost14").innerHTML = format(player.goldenScrapUpgrades.cost[13])
    document.getElementById("GoldenScrapUpgradeCost15").innerHTML = format(player.goldenScrapUpgrades.cost[14])
    document.getElementById("GoldenScrapUpgradeCost16").innerHTML = format(player.goldenScrapUpgrades.cost[15])
    document.getElementById("GoldenScrapUpgradeCost17").innerHTML = format(player.goldenScrapUpgrades.cost[16])
    document.getElementById("GoldenScrapUpgradeCost18").innerHTML = format(player.goldenScrapUpgrades.cost[17])
    document.getElementById("GoldenScrapUpgradeCost19").innerHTML = format(player.goldenScrapUpgrades.cost[18])
    document.getElementById("GoldenScrapUpgradeCost20").innerHTML = format(player.goldenScrapUpgrades.cost[19])
    document.getElementById("GoldenScrapUpgradeCost21").innerHTML = format(player.goldenScrapUpgrades.cost[20])
    document.getElementById("GoldenScrapUpgradeCost22").innerHTML = format(player.goldenScrapUpgrades.cost[21])
    document.getElementById("GoldenScrapUpgradeCost23").innerHTML = format(player.goldenScrapUpgrades.cost[22])
    document.getElementById("GoldenScrapUpgradeCost24").innerHTML = format(player.goldenScrapUpgrades.cost[23])
    document.getElementById("GoldenScrapUpgradeCost25").innerHTML = format(player.goldenScrapUpgrades.cost[24])
    document.getElementById("GoldenScrapUpgradeCost26").innerHTML = format(player.goldenScrapUpgrades.cost[25])
    document.getElementById("GoldenScrapUpgradeCost27").innerHTML = format(player.goldenScrapUpgrades.cost[26])
    document.getElementById("GoldenScrapUpgradeCost28").innerHTML = format(player.goldenScrapUpgrades.cost[27])

    document.getElementById("RepeatableMagnetUpgradeCost1").innerHTML = format(Decimal.pow(player.magnetUpgrades.repeatable[0].costScaling, player.magnetUpgrades.repeatable[0].levelsBought).times(player.magnetUpgrades.repeatable[0].cost))
    document.getElementById("RepeatableMagnetUpgradeCost2").innerHTML = format(Decimal.pow(player.magnetUpgrades.repeatable[1].costScaling, player.magnetUpgrades.repeatable[1].levelsBought).times(player.magnetUpgrades.repeatable[1].cost))
    document.getElementById("RepeatableMagnetUpgradeCost3").innerHTML = format(Decimal.pow(player.magnetUpgrades.repeatable[2].costScaling, player.magnetUpgrades.repeatable[2].levelsBought).times(player.magnetUpgrades.repeatable[2].cost))
    document.getElementById("RepeatableMagnetUpgradeCost4").innerHTML = format(Decimal.pow(player.magnetUpgrades.repeatable[2].costScaling, player.magnetUpgrades.repeatable[3].levelsBought).times(player.magnetUpgrades.repeatable[3].cost))

    document.getElementById("RepeatableMagnetUpgradeLevel1").innerHTML = format(player.magnetUpgrades.repeatable[0].levelsBought, 3, 0) + " (+" + ((player.magnetUpgrades.repeatable[0].extraLevels.lt(1e9)) ? player.magnetUpgrades.repeatable[0].extraLevels.floor().toNumber().toLocaleString("en-US") : format(player.magnetUpgrades.repeatable[0].extraLevels, 3, 0)) + ")"
    document.getElementById("RepeatableMagnetUpgradeLevel2").innerHTML = format(player.magnetUpgrades.repeatable[1].levelsBought, 3, 0) + " (+" + ((player.magnetUpgrades.repeatable[1].extraLevels.lt(1e9)) ? player.magnetUpgrades.repeatable[1].extraLevels.floor().toNumber().toLocaleString("en-US") : format(player.magnetUpgrades.repeatable[1].extraLevels, 3, 0)) + ")"
    document.getElementById("RepeatableMagnetUpgradeLevel3").innerHTML = format(player.magnetUpgrades.repeatable[2].levelsBought, 3, 0) + " (+" + ((player.magnetUpgrades.repeatable[2].extraLevels.lt(1e9)) ? player.magnetUpgrades.repeatable[2].extraLevels.floor().toNumber().toLocaleString("en-US") : format(player.magnetUpgrades.repeatable[2].extraLevels, 3, 0)) + ")"
    document.getElementById("RepeatableMagnetUpgradeLevel4").innerHTML = format(player.magnetUpgrades.repeatable[3].levelsBought, 3, 0) + " (+" + ((player.magnetUpgrades.repeatable[3].extraLevels.lt(1e9)) ? player.magnetUpgrades.repeatable[3].extraLevels.floor().toNumber().toLocaleString("en-US") : format(player.magnetUpgrades.repeatable[3].extraLevels, 3, 0)) + ")"

    document.getElementById("RepeatableMagnetUpgradeEffect1").innerHTML = format((getTotalLevelsOfRepeatableMagnetUpgrade(0).div(5).plus(1).pow(3)).times(getTotalLevelsOfRepeatableMagnetUpgrade(0).plus(1)))
    document.getElementById("RepeatableMagnetUpgradeEffect2").innerHTML = format((getTotalLevelsOfRepeatableMagnetUpgrade(1).div(5).plus(1).pow(4)).times(getTotalLevelsOfRepeatableMagnetUpgrade(1).plus(1)))
    document.getElementById("RepeatableMagnetUpgradeEffect3").innerHTML = format((getTotalLevelsOfRepeatableMagnetUpgrade(2).pow(0.5)).max(0), 3, 3)
    document.getElementById("RepeatableMagnetUpgradeEffect4").innerHTML = format((getTotalLevelsOfRepeatableMagnetUpgrade(3).times(2).plus(1).pow(0.5)).max(1))

    document.getElementById("NormalMagnetUpgradeEffect1").innerHTML = format(player.prestigeStat[0].plus(1).pow(4/3))
    document.getElementById("NormalMagnetUpgradeEffect2").innerHTML = "^" + format(1, null, 2) + " → ^" + format(1.05, null, 2)
    document.getElementById("NormalMagnetUpgradeEffect3").innerHTML = "+" + format(Decimal.log(player.scrap.max(1), "1e1000").pow(3).div(1e4).max(0), 5, 5) + "/s"
    document.getElementById("NormalMagnetUpgradeEffect4").innerHTML = format(Decimal.log(player.goldenScrap.plus(1e50), 1e50).pow(1.22), 3, 3)
    document.getElementById("NormalMagnetUpgradeEffect5").innerHTML = format(Decimal.add(getTotalFactories(1).times(0.1), 1), 3, 2)
    document.getElementById("NormalMagnetUpgradeEffect6").innerHTML = format(Decimal.add(getTotalFactories(1), 1), 3, 2)
    //document.getElementById("NormalMagnetUpgradeEffect7").innerHTML doesn't exist
    //document.getElementById("NormalMagnetUpgradeEffect8").innerHTML doesn't exist
    document.getElementById("NormalMagnetUpgradeEffect9").innerHTML = format(getTotalFactories(0).plus(1).pow(1))
    document.getElementById("NormalMagnetUpgradeEffect10").innerHTML = format(getTotalFactories(0).plus(1).pow(1.25))
    document.getElementById("NormalMagnetUpgradeEffect11").innerHTML = format(getTotalFactories(0).plus(1).pow(1))
    document.getElementById("NormalMagnetUpgradeEffect12").innerHTML = format(getTotalFactories(0).plus(1).pow(1.25))
    document.getElementById("NormalMagnetUpgradeEffect13").innerHTML = format(Decimal.log(Decimal.log(player.gainedMagnets.times(player.gainedSteelBeams).div(1e165).plus(10), 10).pow(0.25).plus(9), 10), 3, 3)
    document.getElementById("NormalMagnetUpgradeEffect14").innerHTML = format(Decimal.add(getTotalFactories(1), 1).times(Decimal.log(getTotalFactories(1).plus(2), 2)), 3, 2)
    document.getElementById("NormalMagnetUpgradeEffect15").innerHTML = format(Decimal.log(player.gainedMagnets.times(player.gainedSteelBeams).div("1e380").pow(0.01).plus(10), 10), 4, 5)
    document.getElementById("NormalMagnetUpgradeEffect16").innerHTML = "To Electron effect: ^" + format(Decimal.log(player.protons.pow(0.01).plus(10), 10), 3, 5) + "<br>To Proton effect: ^" + format(Decimal.log(player.electrons.pow(0.01).plus(10), 10), 3, 5)
    

    document.getElementById("NormalMagnetUpgradeCost1").innerHTML = format(1e4)
    document.getElementById("NormalMagnetUpgradeCost2").innerHTML = format(1e22)
    document.getElementById("NormalMagnetUpgradeCost3").innerHTML = format(3e15)
    document.getElementById("NormalMagnetUpgradeCost4").innerHTML = format(1e16)
    document.getElementById("NormalMagnetUpgradeCost5").innerHTML = format(5e39)
    document.getElementById("NormalMagnetUpgradeCost6").innerHTML = format(1e42)
    document.getElementById("NormalMagnetUpgradeCost7").innerHTML = format(1.2e18)
    document.getElementById("NormalMagnetUpgradeCost8").innerHTML = format(1.7976931348623157e23)
    document.getElementById("NormalMagnetUpgradeCost9").innerHTML = format(9.124e50)
    document.getElementById("NormalMagnetUpgradeCost10").innerHTML = format(1e63)
    document.getElementById("NormalMagnetUpgradeCost11").innerHTML = format(2e25)
    document.getElementById("NormalMagnetUpgradeCost12").innerHTML = format(1e28)
    document.getElementById("NormalMagnetUpgradeCost13").innerHTML = format(8.585e85)
    document.getElementById("NormalMagnetUpgradeCost14").innerHTML = format("2^350")
    document.getElementById("NormalMagnetUpgradeCost15").innerHTML = format(1e35)
    document.getElementById("NormalMagnetUpgradeCost16").innerHTML = format(1e42)

    document.getElementById("GoldenScrapUpgradeEffect1").innerHTML = format(((getTotalFactories(0)).times(0.01)).plus(1), 3, 2) + "x"
    document.getElementById("GoldenScrapUpgradeEffect2.1").innerHTML = format(getTotalFactories(0).plus(1)) + "x"
    document.getElementById("GoldenScrapUpgradeEffect2.2").innerHTML = format(((getTotalFactories(0)).times(0.01).plus(1)).pow(1.4)) + "x"
    document.getElementById("GoldenScrapUpgradeEffect3").innerHTML = format(Decimal.pow(player.timeSpentInThisPrestige, 4).plus(1).plus((player.goldenScrapUpgrades.isBought[11]) ? 1e12 : 0)) + "x"
    document.getElementById("GoldenScrapUpgradeEffect4").innerHTML = format(      Decimal.pow(Decimal.log(player.scrap.plus(2), 2), 3).pow( player.goldenScrapUpgrades.isBought[16] ? 3 : 1 )       ,3 ,2) + "x"
    document.getElementById("GoldenScrapUpgradeEffect5").innerHTML = format(Decimal.pow(getTotalFactories(0).plus(1), 3)) + "x"
    //document.getElementById("GoldenScrapUpgradeEffect6").innerHTML doesn't exist
    //document.getElementById("GoldenScrapUpgradeEffect7").innerHTML doesn't exist
    document.getElementById("GoldenScrapUpgradeEffect8").innerHTML = format(player.gainedMagnets.div(1e25).times(player.gainedSteelBeams.div(1e25)).plus(1).pow(0.75).pow( player.goldenScrapUpgrades.isBought[16] ? 1.5 : 1 )) + "x"
    //document.getElementById("GoldenScrapUpgradeEffect9").innerHTML doesn't exist
    document.getElementById("GoldenScrapUpgradeEffect10").innerHTML = format(getTotalFactories(0).plus(1).pow(5)) + "x"
    document.getElementById("GoldenScrapUpgradeEffect11").innerHTML = "+" + format(Decimal.log(player.goldenScrap.plus(1), 10).pow(1.25).div(300), 3, 2) + "/s"
    document.getElementById("GoldenScrapUpgradeEffect12").innerHTML = format(60, 3, 0)
    document.getElementById("GoldenScrapUpgradeEffect13").innerHTML = format(Decimal.add(getTotalFactories(1).times(0.03), 1), 3, 2) + "x"
    document.getElementById("GoldenScrapUpgradeEffect14").innerHTML = format(Decimal.add(getTotalFactories(1).times(0.01), 1).pow(3), 3, 2) + "x"
    document.getElementById("GoldenScrapUpgradeEffect15").innerHTML = format(getTotalFactories(1).plus(1).pow(3), 3, 2) + "x"
    document.getElementById("GoldenScrapUpgradeEffect16").innerHTML = "+" + format(getTotalFactories(1).pow(1/2).div(10), 3, 3) + "/s"
    document.getElementById("GoldenScrapUpgradeEffect17").innerHTML = "To 4th: ^" + format(1, 3, 2) + " → ^" + format(3, 3, 2) + "<br>To 8th: ^" + format(1, 3, 2) +" → ^" + format(1.5, 3, 2)
    //document.getElementById("GoldenScrapUpgradeEffect18").innerHTML doesn't exist
    document.getElementById("GoldenScrapUpgradeEffect19").innerHTML = format(6, 3, 1)
    document.getElementById("GoldenScrapUpgradeEffect20").innerHTML = format(Decimal.log(player.bricks.plus(1e9), 1e9).pow(1.4).pow( (player.goldenScrapUpgrades.isBought[22]) ? 1.5 : 1 ), 3, 1) + "x"
    document.getElementById("GoldenScrapUpgradeEffect21").innerHTML = format(1.03, 3, 2)
    document.getElementById("GoldenScrapUpgradeEffect22").innerHTML = format(player.brickUpgrades.repeatable.level[0].max(100).minus(100).times(0.01), 3, 2) + " extra wrench multiplier base"
    document.getElementById("GoldenScrapUpgradeEffect23").innerHTML = "^" + format(1, 3, 2) + " → ^" + format(1.5, 3, 2)
    //document.getElementById("GoldenScrapUpgradeEffect24").innerHTML doesn't exist
    //document.getElementById("GoldenScrapUpgradeEffect25").innerHTML doesn't exist
    document.getElementById("GoldenScrapUpgradeEffect26").innerHTML = "RP base gain: ^" + format(1, 3, 2) + " → ^" + format(1.25, 3, 2)
    document.getElementById("GoldenScrapUpgradeEffect27").innerHTML = "^" + format(
        Decimal.log(player.goldenScrap.div("1e3000").pow(0.00033).plus(10), 10)
    , 3, 5)

    document.getElementById("MagnetAmount").innerHTML = format(player.magnets, 3, 0)
    document.getElementById("SteelBeamAmount").innerHTML = format(player.steelBeams, 3, 0)
    document.getElementById("ElectronAmount").innerHTML = format(player.electrons)
    document.getElementById("ProtonAmount").innerHTML = format(player.protons)
    document.getElementById("MagnetsPerClick").innerHTML = format(getMagnetGain())
    document.getElementById("SteelBeamsPerClick").innerHTML = format(getSteelBeamGain())
    document.getElementById("PendingElectrons").innerHTML = format(getElectronGain())
    document.getElementById("PendingProtons").innerHTML = format(getProtonGain())
    document.getElementById("ElectronEffect").innerHTML = format(player.electrons.div(100).plus(1).pow(player.brickUpgrades.repeatable.level[2].times(0.01).plus(1)), 3, 2)
    document.getElementById("ProtonEffect").innerHTML = format(player.protons.div(100).plus(1).pow(player.brickUpgrades.repeatable.level[2].times(0.01).plus(1)), 3, 2)



    document.getElementById("StarsDisplay").innerHTML = format(player.stars.bought, 3, 0)
    document.getElementById("StarEffect").innerHTML = format(Decimal.pow(player.stars.multiplierBase.add(  player.goldenScrapUpgrades.isBought[18] ? 6 : 0  ), player.stars.bought)) + "x"
    document.getElementById("BuyStarsDisplay").innerHTML = format(Decimal.pow(player.stars.costScaling, player.stars.bought).times(player.stars.cost))



    document.getElementById("BrickAmount").innerHTML = format(player.bricks, 3, 0)
    document.getElementById("BricksPerSecond").innerHTML = format(getTotalBricksPerSecond(), 3, 2)
    document.getElementById("BrickSelfBoost").innerHTML = format(getBrickSelfBoostFormula(), 3, 2)
    document.getElementById("BrickSelfBoostStrength").innerHTML = format(getBrickSelfBoostStrength().times(100), 3, 2)
    document.getElementById("WrenchAmount").innerHTML = format(player.wrenches, 3, 0)
    document.getElementById("PendingWrenches").innerHTML = format(getWrenchBoosts().floor(), 3, 0)
    document.getElementById("WrenchEffect").innerHTML = "Multiplying your brick gain by " + format(player.wrenches.times(0.02).plus(1), 3, 3) + "x<br>and multiplying your brick self-boost strength by " + format(Decimal.log(player.wrenches.pow(2).plus(12).max(12), 12).times(1).pow(0.75)     .pow(player.brickUpgrades.repeatable.level[1].times(0.002).plus(1)), 3, 4) + "x"

    document.getElementById("RepeatableBrickUpgradeCost1").innerHTML = format(player.brickUpgrades.repeatable.costFormula[0](), 3, 0)
    document.getElementById("RepeatableBrickUpgradeCost2").innerHTML = format(player.brickUpgrades.repeatable.costFormula[1](), 3, 0)
    document.getElementById("RepeatableBrickUpgradeCost3").innerHTML = format(player.brickUpgrades.repeatable.costFormula[2](), 3, 0)
    document.getElementById("RepeatableBrickUpgradeCost4").innerHTML = format(player.brickUpgrades.repeatable.costFormula[3](), 3, 0)

    document.getElementById("RepeatableBrickUpgradeLevel1").innerHTML = format(player.brickUpgrades.repeatable.level[0], 3, 0)
    document.getElementById("RepeatableBrickUpgradeLevel2").innerHTML = format(player.brickUpgrades.repeatable.level[1], 3, 0)
    document.getElementById("RepeatableBrickUpgradeLevel3").innerHTML = format(player.brickUpgrades.repeatable.level[2], 3, 0)
    document.getElementById("RepeatableBrickUpgradeLevel4").innerHTML = format(player.brickUpgrades.repeatable.level[3], 3, 0)

    document.getElementById("RepeatableBrickUpgradeEffect1.1").innerHTML = format(Decimal.pow(new Decimal(1.05).plus( (player.goldenScrapUpgrades.isBought[21]) ? player.brickUpgrades.repeatable.level[0].max(100).minus(100).times(0.01) : 0 ), player.brickUpgrades.repeatable.level[0]), 3, 3)
    document.getElementById("RepeatableBrickUpgradeEffect1.2").innerHTML = format(new Decimal(1.05).plus( (player.goldenScrapUpgrades.isBought[21]) ? player.brickUpgrades.repeatable.level[0].max(100).minus(100).times(0.01) : 0 ), 3, 2)
    document.getElementById("RepeatableBrickUpgradeEffect2").innerHTML = format(player.brickUpgrades.repeatable.level[1].times(0.002).plus(1), 3, 3)
    document.getElementById("RepeatableBrickUpgradeEffect3").innerHTML = format(player.brickUpgrades.repeatable.level[2].times(0.01).plus(1), 3, 3)
    document.getElementById("RepeatableBrickUpgradeEffect4").innerHTML = format(player.brickUpgrades.repeatable.level[3].times(0.020).times(100), 3, 3)


    document.getElementById("NormalBrickUpgradeCost1").innerHTML = format(player.brickUpgrades.nonRepeatable.cost[0])
    document.getElementById("NormalBrickUpgradeCost2").innerHTML = format(player.brickUpgrades.nonRepeatable.cost[1])
    document.getElementById("NormalBrickUpgradeCost3").innerHTML = format(player.brickUpgrades.nonRepeatable.cost[2])
    document.getElementById("NormalBrickUpgradeCost4").innerHTML = format(player.brickUpgrades.nonRepeatable.cost[3])
    document.getElementById("NormalBrickUpgradeCost5").innerHTML = format(player.brickUpgrades.nonRepeatable.cost[4])
    document.getElementById("NormalBrickUpgradeCost6").innerHTML = format(player.brickUpgrades.nonRepeatable.cost[5])
    document.getElementById("NormalBrickUpgradeCost7").innerHTML = format(player.brickUpgrades.nonRepeatable.cost[6])
    document.getElementById("NormalBrickUpgradeCost8").innerHTML = format(player.brickUpgrades.nonRepeatable.cost[7])

    //document.getElementById("NormalBrickUpgradeEffect1").innerHTML doesn't exist
    document.getElementById("NormalBrickUpgradeEffect2").innerHTML = format(player.wrenches.div(200).plus(1).pow(1.5), 3, 3)
    document.getElementById("NormalBrickUpgradeEffect3").innerHTML = format(Decimal.pow(10, player.prestigeStat[0].pow(0.85).times(1/5e4)), 3, 3)
    document.getElementById("NormalBrickUpgradeEffect4").innerHTML = format(getTotalFactories(1).times(0.005).plus(1).pow(3), 3, 1)
    document.getElementById("NormalBrickUpgradeEffect5").innerHTML = format(player.gainedBricks.plus(1).pow(0.25), 3, 1)
    document.getElementById("NormalBrickUpgradeEffect6").innerHTML = "^" + format(1, 3, 2) + " → ^" + format(1.03, 3, 2)
    document.getElementById("NormalBrickUpgradeEffect7").innerHTML = format(Decimal.add(getTotalFactories(1).times(0.005), 1).pow(5), 3, 2)
    document.getElementById("NormalBrickUpgradeEffect8").innerHTML = format(getTotalFactories(0).div(1e5).plus(1).pow(8), 3, 2)



    document.getElementById("RegeneratorAmount").innerHTML = ( (player.regenerators.gte(1e6)) ? format(player.regenerators, 3, 0) : player.regenerators.floor().toNumber().toLocaleString("en-US"))
    document.getElementById("RegeneratorEffect").innerHTML = format(player.regenerators.pow(1.25).pow( (player.goldenScrapUpgrades.isBought[25]) ? 1.25 : 1 ), 3, 1)
    document.getElementById("RegeneratorEffect2").innerHTML = format(Decimal.log(player.regenerators.plus(100), 100), 4, 4)
    document.getElementById("InDecayverse").innerHTML = ( (player.decay.isInDecayverse) ? "You are in decayverse" : "<br>" )
    document.getElementById("Decay").style.display = ( (player.decay.isInDecayverse) ? "inline" : "none" )
    document.getElementById("DecayAmount").innerHTML = format(player.decay.amount, 3, 1)
    document.getElementById("DecayEffect").innerHTML = format(getDecayDivision(), 3, 3)
    document.getElementById("DecayResistance").innerHTML = format(getDecayResistance().times(100), 3, 2)
    document.getElementById("NextRegenerator").innerHTML = format(getNextRegenerator(), 3, 0)
    document.getElementById("EnterDecayverseButton").innerHTML = ( (player.decay.isInDecayverse) ? "Exit Decayverse<br>for " + format(getRegeneratorGain(), 3, 0) + " Regenerators" : "Enter<br>Decayverse")
    document.getElementById("RegenPoints").innerHTML = format(player.regenPoints, 3, 1)
    document.getElementById("RPPerSecond").innerHTML = format(getRegenPointGain(), 3, 1)
    document.getElementById("RPEffect1").innerHTML = format(getRegenPointEffect("Golden Scrap"), 3, 2)
    document.getElementById("RPEffect2").innerHTML = format(getRegenPointEffect("Scrap"), 3, 2)



    document.getElementById("ScrapFactoryAmount").innerHTML = format(player.factory[0].bought, 3, 0)
    document.getElementById("MultiplicatorAmount").innerHTML = player.multiplicatorBought.floor().toNumber().toLocaleString("en-US")
    document.getElementById("ScrapAmount").innerHTML = format(player.scrap, 3, 1)
    document.getElementById("ScrapsPerClick").innerHTML = "Click to gain<br>" + format((player.scrapsPerClick).times(getScrapGain())) + " Scraps"
    document.getElementById("ScrapsPerSecond").innerHTML = format((getTotalScrapsPerSecond()).times(getScrapGain()))
    document.getElementById("BuyFactoryDisplay").innerHTML = "Buy Factory<br>Cost: " + format(Decimal.pow(1.01, player.factory[0].bought).times(player.factory[0].cost)) + " Scraps"
    document.getElementById("BuyScrapBoostDisplay").innerHTML = "Buy Multiplicator<br>Cost: " + format(Decimal.pow(4, player.multiplicatorBought).times(player.multiplicatorCost)) + " Scraps"
    document.getElementById("GoldenScrapDisplay").innerHTML = format(player.goldenScrap)
    document.getElementById("GoldenScrapDisplay2").innerHTML = format(
        (player.goldenScrap.div(100)).plus(1)
        .pow( (player.magnetUpgrades.nonRepeatable.isBought[1]) ? 1.05 : 1)
        .pow( (player.brickUpgrades.nonRepeatable.isBought[5]) ? 1.03 : 1 )
        .pow( (player.magnetUpgrades.nonRepeatable.isBought[14]) ? Decimal.log(player.gainedMagnets.times(player.gainedSteelBeams).div("1e380").pow(0.01).plus(10), 10) : 1 )
        .pow( (player.decay.isInDecayverse) ? 0 : 1 )
    , 3, 2)
    document.getElementById("PendingGoldenScrapDisplay").innerHTML = format(getGoldenScrapFormula())
    document.getElementById("GSSlowdown").innerHTML = (  (Decimal.times(player.scrap, "1e2000").gte(getGSGainSlowdown())) ? "Golden scrap gain starts to slowdown at "+ format(getGSGainSlowdown()) +" scraps!!" : "<br>"  )

    document.getElementById("ScrapClicks").innerHTML = ((player.scrapClicks.lt(1e15)) ? player.scrapClicks.floor().toNumber().toLocaleString("en-US") : format(player.scrapClicks, 3, 0))
    document.getElementById("PrestigeTime").innerHTML = player.timeSpentInThisPrestige.toNumber().toLocaleString("en-US", {minimumFractionDigits: 1, maximumFractionDigits: 1})


    document.getElementById("AchRewardEffect1").innerHTML = format(5, 3, 2)
    document.getElementById("AchRewardEffect2").innerHTML = format(
        player.scrapClicks.min(5000).div(100).plus(1).pow(4)
        .times(player.scrapClicks.max(5000).minus(5000).div(6666).plus(1).pow(20))
    ) + "x"
    document.getElementById("AchRewardEffect3").innerHTML = format(200, 3, 2)

    for (i = 0; i < 2; i++) {
        document.querySelectorAll("#PrestigeStats")[i].innerHTML = ((player.prestigeStat[0].lt(1e15)) ? player.prestigeStat[0].floor().toNumber().toLocaleString("en-US") : format(player.prestigeStat[0], 3, 0))
    }

    for (i = 0; i < 2; i++) {
        document.getElementById("AutomatorLevel" + (i + 1)).innerHTML = player.automator[i].level.toNumber().toLocaleString("en-US", {minimumFractionDigits: 0, maximumFractionDigits: 0})
        document.getElementById("AutomatorSpeed" + (i + 1)).innerHTML = format(player.automator[i].baseSpeed.times( Decimal.pow(player.automator[i].speedPerLevel, player.automator[i].level) )      , 3, 2)
        document.getElementById("AutomatorCost" + (i + 1)).innerHTML = format(player.automator[i].cost.times( Decimal.pow(player.automator[i].costScaling, player.automator[i].level) ), 2, null)
    }

    for (i = 0; i < 2; i++) {
        document.getElementById("FactoryAmount" + (i + 1)).innerHTML = format(player.factory[i].bought, 3, 0) + " (+" + format(player.factory[i].extra) + ")"
        document.getElementById("FactoryCost" + (i + 1)).innerHTML = "Cost: " + format(player.factory[i].cost.times(Decimal.pow(player.factory[i].costScaling, player.factory[i].bought)))
    }

};

function updateStyle() {
    for (i = 0; i < 28; i++) {//Golden Scrap Upgrades
        if (player.goldenScrapUpgrades.isBought[i]) {
            document.getElementById("GSUpgrade" + (i + 1)).className = "goldenScrapUpgrade goldenScrapUpgradeIsBought"
        } else {
            document.getElementById("GSUpgrade" + (i + 1)).className = "goldenScrapUpgrade goldenScrapUpgradeIsNotBought"
        }

        if (!player.goldenScrapUpgrades.isBought[i] && player.goldenScrap.gte(player.goldenScrapUpgrades.cost[i])) {
            document.getElementById("GSUpgrade" + (i + 1)).className = "goldenScrapUpgrade goldenScrapUpgradeIsAffordable"
        }
    }
    

    for (i = 0; i < 4; i++) {//Repeatable Magnet Upgrades
        if (player.magnetUpgrades.repeatable[i].requirement()) {
            document.getElementById("RepeatableMagnetUpgrade" + (i + 1)).className = "repeatableMagnetUpgrade repeatableMagnetUpgradeIsAffordable"
        } else {
            document.getElementById("RepeatableMagnetUpgrade" + (i + 1)).className = "repeatableMagnetUpgrade repeatableMagnetUpgradeIsNotAffordable"
        }
    }


    for (i = 0; i < 16; i++) {//Normal Magnet Upgrades
        if (player.magnetUpgrades.nonRepeatable.isBought[i]) {
            document.getElementById("MagnetUpgrade" + (i + 1)).className = "magnetUpgrade magnetUpgradeIsBought"
        } else {
            document.getElementById("MagnetUpgrade" + (i + 1)).className = "magnetUpgrade magnetUpgradeIsNotBought"
        }

        if (!player.magnetUpgrades.nonRepeatable.isBought[i] && player.magnetUpgrades.nonRepeatable.requirement(i)) {
            document.getElementById("MagnetUpgrade" + (i + 1)).className = "magnetUpgrade magnetUpgradeIsAffordable"
        }
    }

    for (i = 0; i < 4; i++) {//Repeatable Brick Upgrades
        if (player.bricks.gte(   player.brickUpgrades.repeatable.costFormula[i]()   )) {
            document.getElementById("RepeatableBrickUpgrade" + (i + 1)).className = "repeatableBrickUpgrade repeatableBrickUpgradeIsAffordable"
        } else {
            document.getElementById("RepeatableBrickUpgrade" + (i + 1)).className = "repeatableBrickUpgrade repeatableBrickUpgradeIsNotAffordable"
        }
    }
    
    for (i = 0; i < 8; i++) {//Normal Brick Upgrades
        if (player.brickUpgrades.nonRepeatable.isBought[i]) {
            document.getElementById("BrickUpgrade" + (i + 1)).className = "brickUpgrade brickUpgradeIsBought"
        } else {
            document.getElementById("BrickUpgrade" + (i + 1)).className = "brickUpgrade brickUpgradeIsNotBought"
        }

        if (!player.brickUpgrades.nonRepeatable.isBought[i] && player.bricks.gte(player.brickUpgrades.nonRepeatable.cost[i])) {
            document.getElementById("BrickUpgrade" + (i + 1)).className = "brickUpgrade brickUpgradeIsAffordable"
        }
    }












































    if (player.achievementsGotten[18]) {
        document.getElementById("AchRewardDisplay1").style.display = "block"
    } else {
        document.getElementById("AchRewardDisplay1").style.display = "none"
    }

    if (player.achievementsGotten[15]) {
        document.getElementById("AchRewardDisplay2").style.display = "block"
    } else {
        document.getElementById("AchRewardDisplay2").style.display = "none"
    }

    if (player.achievementsGotten[16]) {
        document.getElementById("AchRewardDisplay3").style.display = "block"
    } else {
        document.getElementById("AchRewardDisplay3").style.display = "none"
    }

}


setInterval(save, saveInterval);
setInterval(() => {
    showMagnetsSubTab();
    unlockMagnetsSubTab();
    showBoostersTab();
    unlockBoostersTab();
    updateStyle();
    updateText();
    showPrestigeTab();
    gameLoop();
    showMoreGSUpgrades();
    showMoreGSUpgrades2();
    showFactoryListsSubTab();
    unlockFactoryListsSubTab();
    showMoreNMUpgrades();
    showBricksSubTab();
    unlockBricksSubTab();
    showDecaySubTab();
    unlockDecaySubTab();
}, interval);
load();
updateText();
tab("production");
subTab1("subPrestige2");
subTab2("subSettings1");
subTab3("subProduction1");
subTab4("subAchievements1");
player.goldenScrapUpgrades.cost = [
    new Decimal("400"), new Decimal("1e13"), new Decimal("4e50"), new Decimal("2e63"),
    new Decimal("1e117"), new Decimal("2e186"), new Decimal("1e210"), new Decimal("1e220"),
    new Decimal("2^1024"), new Decimal("1e350"), new Decimal("1e495"), new Decimal("1e525"),
    new Decimal("1e552"), new Decimal("2e558"), new Decimal("5e645"), new Decimal("2^2330"),
    new Decimal("1e1000"), new Decimal("1e1150"), new Decimal("1e1250"), new Decimal("1e1450"),
    new Decimal("1e1850"), new Decimal("2^6646"), new Decimal("1e2650"), new Decimal("3.2e3200"),
    new Decimal("1e3320"), new Decimal("1e3380"), new Decimal("1e3450"), new Decimal("1e3500")
   
];

player.brickUpgrades.nonRepeatable.cost = [
    new Decimal("1e12"), new Decimal("1e35"), new Decimal("1e45"), new Decimal("2e90"),
    new Decimal("1e100"), new Decimal("2e110"), new Decimal("4e120"), new Decimal("8e130")
]

player.stars.cost = new Decimal("1e4");
player.stars.costScaling = new Decimal("1e15");

player.automator[0].cost = new Decimal("1e15")
player.automator[0].costScaling = new Decimal("1000")
player.automator[0].speedPerLevel = new Decimal("1.03")

player.magnetUpgrades.nonRepeatable.requirement = (type) => {
    switch (type+1) {
        case 1:
            return player.magnets.gte(1e4);
        case 2:
            return player.steelBeams.gte(1e22);
        case 3:
            return player.electrons.gte(3e15)
        case 4:
            return player.protons.gte(1e16)
        case 5:
            return player.magnets.gte(5e39)
        case 6:
            return player.steelBeams.gte(1e42)
        case 7:
            return player.electrons.gte(1.2e18)
        case 8:
            return player.protons.gte(1.7976931348623157e23)
        case 9:
            return player.magnets.gte(9.124e50)
        case 10:
            return player.steelBeams.gte(1e63)
        case 11:
            return player.electrons.gte(2e25)
        case 12:
            return player.protons.gte(1e28)
        case 13:
            return player.magnets.gte(8.585e85)
        case 14:
            return player.steelBeams.gte("2^350")
        case 15:
            return player.electrons.gte(1e35)
        case 16:
            return player.protons.gte(1e42)
    }
},

player.magnetUpgrades.nonRepeatable.buy = (type) => {
    switch (type+1) {
        case 1:
            return player.magnets = player.magnets.minus(1e4);
        case 2:
            return player.steelBeams = player.steelBeams.minus(1e22);
        case 3:
            return player.electrons = player.electrons.minus(3e15)
        case 4:
            return player.protons = player.protons.minus(1e16)
        case 5:
            return player.magnets = player.magnets.minus(5e39);
        case 6:
            return player.steelBeams = player.steelBeams.minus(1e42);
        case 7:
            return player.electrons = player.electrons.minus(1.2e18)
        case 8:
            return player.protons = player.protons.minus(1.7976931348623157e23)
        case 9:
            return player.magnets = player.magnets.minus(9.124e50);
        case 10:
            return player.steelBeams = player.steelBeams.minus(1e63);
        case 11:
            return player.electrons = player.electrons.minus(2e25)
        case 12:
            return player.protons = player.protons.minus(1e28)
        case 13:
            return player.magnets = player.magnets.minus(8.585e85);
        case 14:
            return player.steelBeams = player.steelBeams.minus("2^350");
        case 15:
            return player.electrons = player.electrons.minus(2e25)
        case 16:
            return player.protons = player.protons.minus(1e28)
    }
},

document.getElementById("notationSelect").value = player.options.notation

document.getElementById('AutomatorActivation1').checked = player.automator[0].isActive
document.getElementById('AutomatorActivation2').checked = player.automator[1].isActive
document.getElementById('PresigeConfirmation').checked = player.options.confirmations.prestige