var Wainwright = 1;
var FabricWarehouse = 2;
var SpiceWarehouse = 3;
var FruitWarehouse = 4;
var PostOffice = 5;
var Caravansary = 6;
var Fountain = 7;
var BlackMarket = 8;
var TeaHouse = 9;
var SmallMarket = 10;
var LargeMarket = 11;
var PoliceStation = 12;
var SultansPalace = 13;
var SmallMosque = 14;
var GreatMosque = 15;
var GemstoneDealer = 16;
var RoastingPlant = 17;
var GuildHall = 18;
var Tavern = 19;
var CoffeeHouse = 20;
/**
 * The rules for the fountain placement are:
 *
 * - the fountain (card number 7) has to be in the 4/6 innermost positions
 */
var baseFountainPositions = [5, 6, 9, 10];
var mochaFountainPositions = [6, 7, 8, 11, 12, 13];
var baseColumns = 4;
var mochaColumns = 5;
var baseStartingPosition = [
    7, 2, 3, 4,
    5, 1, 9, 8,
    10, 6, 11, 12,
    13, 14, 15, 16,
];
var mochaStartingPosition = [
    7, 2, 3, 4, 5,
    1, 9, 8, 10, 6,
    11, 12, 13, 14, 15,
    16, 17, 18, 19, 20,
];
var shuffle = function (xs) {
    var currentIndex = xs.length;
    var temporaryValue = 0;
    var randomIndex = 0;
    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        // And swap it with the current element.
        temporaryValue = xs[currentIndex];
        xs[currentIndex] = xs[randomIndex];
        xs[randomIndex] = temporaryValue;
    }
    return xs;
};
var isBaseGame = function () { return document.querySelector(".game:checked").value === "base"; };
var legalPositionsForFountain = function () { return isBaseGame() ? baseFountainPositions : mochaFountainPositions; };
var tilePos = function (tileIndex, tiles) { return tiles.indexOf(tileIndex); };
var fountainPlacementIsIncorrect = function (tiles) { return legalPositionsForFountain().indexOf(tilePos(Fountain, tiles)) === -1; };
var columnsPerRow = function () { return isBaseGame() ? baseColumns : mochaColumns; };
/**
 * The rules for the placement of the black market and the tea house are:
 *
 *  - the black market (card number 8) and the tea house (card number 9) have to be at
 *    least 3 spaces apart from each other (Manhattan distance)
 *  - the black market and the tea house may not be in the same row or column
 */
var blackMarketAndTeaHousePlacementIsIncorrect = function (tiles) {
    var columns = columnsPerRow();
    var blackMarketX = tiles.indexOf(BlackMarket) % columns;
    var blackMarketY = tiles.indexOf(BlackMarket) / columns;
    var teaHouseX = tiles.indexOf(TeaHouse) % columns;
    var teaHouseY = tiles.indexOf(TeaHouse) / columns;
    var distance = Math.abs(blackMarketX - teaHouseX) + Math.abs(blackMarketY - teaHouseY);
    return blackMarketX === teaHouseX
        || blackMarketY === teaHouseY
        || distance < 3;
};
var illegalStartingPosition = function () { return isBaseGame() ? baseStartingPosition.slice() : mochaStartingPosition.slice(); };
/**
 * Generates a random setup for Istanbul (with or without Bakshish and Mokka)
 *
 * The rules for random generation are:
 *
 *  - the fountain (card number 7) has to be in the center
 *  - the black market (card number 8) and the tea house (card number 9) have to be at
 *    least 3 spaces apart from each other (Manhattan distance)
 *  - the black market and the tea house may not be in the same row or column
 */
var generate = function () {
    var tiles = illegalStartingPosition();
    while (fountainPlacementIsIncorrect(tiles) || blackMarketAndTeaHousePlacementIsIncorrect(tiles)) {
        tiles = shuffle(tiles);
    }
    return tiles;
};
var tilesToHtml = function (tiles) {
    var output = "";
    var columns = columnsPerRow();
    for (var i = 0; i < tiles.length; i += 1) {
        output += "<div class=\"card card-" + tiles[i] + "\"></div>";
        if (i % columns === columns - 1) {
            output += '<div class="clear"></div>';
        }
    }
    return output;
};
var generateAndOutputHtml = function () {
    document.getElementById("generated-setup").innerHTML = tilesToHtml(generate());
};
generateAndOutputHtml();
document.getElementById("generate").onclick = generateAndOutputHtml;
document.getElementById("game-type").onchange = generateAndOutputHtml;
