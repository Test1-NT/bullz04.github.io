function buyFactory(amount, i) {
    if (i == 0) {
        if (amount == "singles") {
            if (player.scrap.gte(Decimal.pow(player.factory[0].costScaling, player.factory[0].bought).times(player.factory[0].cost))) {
                player.scrap = player.scrap.minus(Decimal.pow(player.factory[0].costScaling, player.factory[0].bought).times(player.factory[0].cost))
                player.factory[0].bought = player.factory[0].bought.add(1)
            }
        } else if (amount == "max") {
            while (player.scrap.gte(Decimal.pow(player.factory[0].costScaling, player.factory[0].bought).times(player.factory[0].cost))) {
                let amount1 = Decimal.affordGeometricSeries(player.scrap, player.factory[0].cost, player.factory[0].costScaling, player.factory[0].bought)
                let price1 = Decimal.sumGeometricSeries(amount1, player.factory[0].cost, player.factory[0].costScaling, player.factory[0].bought)
                player.factory[0].bought = player.factory[0].bought.add(amount1)
                player.scrap = player.scrap.sub(price1)
            }
        }
    }

    if (i == 1) {
        if (amount == "singles") {
            if (player.goldenScrap.gte(Decimal.pow(player.factory[1].costScaling, player.factory[1].bought).times(player.factory[1].cost))) {
                player.goldenScrap = player.goldenScrap.minus(Decimal.pow(player.factory[1].costScaling, player.factory[1].bought).times(player.factory[1].cost))
                player.factory[1].bought = player.factory[1].bought.add(1)
            }
        } else if (amount == "max") {
            while (player.goldenScrap.gte(Decimal.pow(player.factory[1].costScaling, player.factory[1].bought).times(player.factory[1].cost))) {
                let amount1 = Decimal.affordGeometricSeries(player.goldenScrap, player.factory[1].cost, player.factory[1].costScaling, player.factory[1].bought)
                let price1 = Decimal.sumGeometricSeries(amount1, player.factory[1].cost, player.factory[1].costScaling, player.factory[1].bought)
                player.factory[1].bought = player.factory[1].bought.add(amount1)
                player.goldenScrap = player.goldenScrap.sub(price1)
            }
        }
    }
};

function getFactoryGainBoost(i) {
    switch (i+1) {
        case 1:
            return new Decimal(0.02)
            .times(
                Decimal.add(getTotalFactories(1).times(0.1), 1)
                .pow( (player.magnetUpgrades.nonRepeatable.isBought[4]) ? 1 : 0)
            )
            .times(
                Decimal.add(getTotalFactories(1).times(0.03), 1)
                .pow( (player.goldenScrapUpgrades.isBought[12]) ? 1 : 0)
            )
            .times(
                Decimal.add(getTotalFactories(1).times(0.01), 1)
                .pow( (player.goldenScrapUpgrades.isBought[13]) ? 3 : 0)
            )
            .times(
                Decimal.add(getTotalFactories(1).times(0.005), 1)
                .pow( (player.brickUpgrades.nonRepeatable.isBought[6]) ? 5 : 0  )
            )
        default:
            return 1
    }
}

function getTotalFactories(i) {
    return player.factory[i].bought.plus(player.factory[i].extra)
}

function produceLowerFactoryTier(diff) {
    for (let i = 1; i > 0; i--) {
        let gain = getTotalFactories(i).times(getFactoryGainBoost(i-1)).times(diff)
        player.factory[i - 1].extra = player.factory[i - 1].extra.add(gain)
    }
}