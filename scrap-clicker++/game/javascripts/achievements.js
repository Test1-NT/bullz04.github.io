var achTitle = "Hover over the achievements to see details";
var achDesc = "<br>";
var achReward = "<br>";

function normalizeAchThings() {
    achTitle = "Hover over the achievements to see details";
    achDesc = "<br>";
    achReward = "<br>";
}

function getAchievementMultiplier() {
    var multiplier = new Decimal("1")
    for(i = 0; i < 24; i++) {
        var completed = true
        if (!player.achievementsGotten[i]) completed = false
        if (completed) {
            multiplier = multiplier.times(1.3)
        }
    }
    return multiplier
}

function giveAchievement(poop) {
    player.achievementsGotten[poop] = true
}

function removeAchievement(poop) {
    player.achievementsGotten[poop] = false
}


function achievementCheck() {
    if (player.scrap.gte(1e6)) {
        giveAchievement(0)
    }

    if (player.scrap.gte(1e9)) {
        giveAchievement(1)
    }

    if (player.scrap.gte(1e12)) {
        giveAchievement(2)
    }

    if (player.prestigeStat[0].gte(1)) {
        giveAchievement(3)
    }

    if (player.goldenScrap.gte(1e20)) {
        giveAchievement(4)
    }

    if (player.stars.bought.gte(1)) {
        giveAchievement(5)
    }

    if (player.goldenScrapUpgrades.isBought[0]) {
        giveAchievement(6)
    }

    if (player.scrap.gte(Number.MAX_VALUE)) {
        giveAchievement(7)
    }

    if (player.goldenScrap.gte(1e100)) {
        giveAchievement(8)
    }

    if (player.goldenScrapUpgrades.isBought[5]) {
        giveAchievement(9)
    }

    if (player.goldenScrapUpgrades.isBought[2]) {
        giveAchievement(10)
    }

    if (getAllLevelsOfRepeatableMagnetUpgrade().gte(1e3)) {
        giveAchievement(11)
    }

    if (player.steelBeams.gte(1e10)) {
        giveAchievement(12)
    }

    if (player.magnets.gte(1e20)) {
        giveAchievement(13)
    }

    if (player.magnetUpgrades.nonRepeatable.isBought[3]) {
        giveAchievement(14)
    }

    if (player.scrapClicks.gte(500)) {
        giveAchievement(15)//Achievement 16-1
    }

    if (player.prestigeStat[0].gte(3000)) {
        giveAchievement(16)
    }

    if (player.goldenScrap.gte(Number.MAX_VALUE)) {
        giveAchievement(17)
    }

    if (player.electrons.gte(1e15) && player.protons.gte(1e15)) {
        giveAchievement(18)
    }

    if (player.goldenScrapUpgrades.isBought[17]) {
        giveAchievement(19)
    }

    if (getBrickSelfBoostStrength().gte(3)) {
        giveAchievement(20)
    }

    if (getBrickSelfBoostStrength().gte(10)) {
        giveAchievement(21)
    }

    if (player.goldenScrapUpgrades.isBought[11]) {
        giveAchievement(22)
    }

    if (player.factory[0].extra.gte(1e12)) {
        giveAchievement(23)
    }
}




function updateAchStyles() {
    for(i = 0; i < 24; i++) {
        if (player.achievementsGotten[i]) {
            document.getElementById("Achievement" + (i + 1)).className = "achievementUnlocked"
        } else {
            document.getElementById("Achievement" + (i + 1)).className = "achievementLocked"
        }
    }
}

function changeAchThings(x) {
    switch (x+1) {
        case 1:
            achTitle = "Millionaire";
            achDesc = "Have over " + format(1e6) +" Scraps";
            break;
        case 2:
            achTitle = "Billionaire";
            achDesc = "Have over " + format(1e9) +" Scraps";
            break;
        case 3:
            achTitle = "Trillionaire";
            achDesc = "Have over " + format(1e12) +" Scraps";
            break;
        case 4:
            achTitle = "\"Thank you, I'll say goodbye soon\" - Every Scrap";
            achDesc = "Prestige for the first time";
            break;
        case 5:
            achTitle = "Used to fix Zimbabwean Dollar inflations!";
            achDesc = "Have over " + format(1e20) +" Golden Scraps";
            break;
        case 6:
            achTitle = "Sexdecuplers";
            achDesc = "Buy a star";
            break;
        case 7:
            achTitle = "Renewable boost";
            achDesc = "Buy a golden scrap upgrade";
            break;
        case 8:
            achTitle = "WE ARE <del>DEMI</del>GODS!";
            achDesc = "Have over" + format(Number.MAX_VALUE) + " Scraps";
            break;
        case 9:
            achTitle = "Googologily BOOSTS!";
            achDesc = "Have over" + format(1e100) + " Golden Scraps";
            break;
        case 10:
            achTitle = "Synergism";
            achDesc = "Unlock Magnets";
            break;
        case 11:
            achTitle = "Constant gaining is boring";
            achDesc = "Buy 3rd Golden Scrap Upgrade";
            break;
        case 12:
            achTitle = "The only game that has huge numbers of levels";
            achDesc = "Have " + format(1e3) + " total levels of all RMU";
            break;
        case 13:
            achTitle = "You must be cheating";
            achDesc = "Have " + format(1e10) + " Steel Beams";
            break;
        case 14:
            achTitle = "YOU CAN BEAT BRICKMAN!?";
            achDesc = "Have " + format(1e20) + " Magnets";
            break;
        case 15:
            achTitle = "That's not possible";
            achDesc = "Buy 3rd Normal Magnet Upgrade";
            break;
        case 16:
            achTitle = "You love to grind, don't you?";
            achDesc = "Have over " + format(500) + " Scrap Clicks. Reward: Scrap gain is boosted by your manual scrap clicks";
            break;
        case 17:
            achTitle = "Prestigious";
            achDesc = "Have over " + format(3000) + " Prestiges. Reward: Golden scrap gain is multiplied by " + format(200, 3, 2);
            break;
        case 18:
            achTitle = "A LOT OF BOOSTS YEAYY!!";
            achDesc = "Have over " + format(Number.MAX_VALUE) + " Golden Scraps";
            break;
        case 19:
            achTitle = "No idea what to name it";
            achDesc = "Have over " + format(1e15) + " Protons and Electrons. Reward: Electron and proton gain is multiplied by " + format(5, 3, 2);
            break;
        case 20:
            achTitle = "Clay ≠ Scrap";
            achDesc = "Unlock Bricks";
            break;
        case 21:
            achTitle = "Self-boost that boosts itself that boosts itself that boosts itself...";
            achDesc = "Have over " + format(300, 3, 2) + "% strength of brick self-boost";
            break;
        case 22:
            achTitle = "Thicc potion → Thicc boost";
            achDesc = "Have over " + format(1000, 3, 2) + "% strength of brick self-boost";
            break;
        case 23:
            achTitle = "Scrap dimensions, I guess?";
            achDesc = "Unlock Super Factories";
            break;
        case 24:
            achTitle = "Definitely Scrap Dimensions";
            achDesc = "Have over " + format(1e12, 3, 3) + " extra scrap factories";
            break;
        default:
            achTitle = "Coming Soon"
            achDesc = "To be added on next update"
    }
}

function updateAchievements() {
    document.getElementById("achievementTitle").innerHTML = achTitle
    document.getElementById("achievementDescription").innerHTML = achDesc
    document.getElementById("AchievementMultiplier").innerHTML = format(getAchievementMultiplier(), 3, 2)
}

setInterval(() => {
    updateAchievements()
    updateAchStyles()
    achievementCheck()
}, 30)
