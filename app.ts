const Wainwright = 1;
const FabricWarehouse = 2;
const SpiceWarehouse = 3;
const FruitWarehouse = 4;
const PostOffice = 5;
const Caravansary = 6;
const Fountain = 7;
const BlackMarket = 8;
const TeaHouse = 9;
const SmallMarket = 10;
const LargeMarket = 11;
const PoliceStation = 12;
const SultansPalace = 13;
const SmallMosque = 14;
const GreatMosque = 15;
const GemstoneDealer = 16;
const RoastingPlant = 17;
const GuildHall = 18;
const Tavern = 19;
const CoffeeHouse = 20;

/**
 * The rules for the fountain placement are:
 *
 * - the fountain (card number 7) has to be in the 4/6 innermost positions
 */
const baseFountainPositions = [5, 6, 9, 10];
const mochaFountainPositions = [6, 7, 8, 11, 12, 13];

const baseColumns = 4;
const mochaColumns = 5;

const baseStartingPosition = [
    7, 2, 3, 4,
    5, 1, 9, 8,
    10, 6, 11, 12,
    13, 14, 15, 16,
];

const mochaStartingPosition = [
    7, 2, 3, 4, 5,
    1, 9, 8, 10, 6,
    11, 12, 13, 14, 15,
    16, 17, 18, 19, 20,
];

const shuffle = (xs) => {
    let currentIndex = xs.length;
    let temporaryValue = 0;
    let randomIndex = 0;
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

const isBaseGame = (): boolean => (document.querySelector(".game:checked") as HTMLInputElement).value === "base";

const legalPositionsForFountain = () => isBaseGame() ? baseFountainPositions : mochaFountainPositions;

const tilePos = (tileIndex, tiles) => tiles.indexOf(tileIndex);

const fountainPlacementIsIncorrect = (tiles) => legalPositionsForFountain().indexOf(tilePos(Fountain, tiles)) === -1;

const columnsPerRow = () => isBaseGame() ? baseColumns : mochaColumns;

/**
 * The rules for the placement of the black market and the tea house are:
 *
 *  - the black market (card number 8) and the tea house (card number 9) have to be at
 *    least 3 spaces apart from each other (Manhattan distance)
 *  - the black market and the tea house may not be in the same row or column
 */
const blackMarketAndTeaHousePlacementIsIncorrect = (tiles: number[]): boolean => {
    const columns = columnsPerRow();
    const blackMarketX = tiles.indexOf(BlackMarket) % columns;
    const blackMarketY = tiles.indexOf(BlackMarket) / columns;
    const teaHouseX = tiles.indexOf(TeaHouse) % columns;
    const teaHouseY = tiles.indexOf(TeaHouse) / columns;
    const distance = Math.abs(blackMarketX - teaHouseX) + Math.abs(blackMarketY - teaHouseY);
    return blackMarketX === teaHouseX
        || blackMarketY === teaHouseY
        || distance < 3;
};

const illegalStartingPosition = () => isBaseGame() ? baseStartingPosition.slice() : mochaStartingPosition.slice();

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
const generate = (): number[] => {
    let tiles = illegalStartingPosition();
    while (fountainPlacementIsIncorrect(tiles) || blackMarketAndTeaHousePlacementIsIncorrect(tiles)) {
        tiles = shuffle(tiles);
    }
    return tiles;
};

const tilesToHtml = (tiles): string => {
    let output = "";
    const columns = columnsPerRow();
    for (let i = 0; i < tiles.length; i += 1) {
        output += `<div class="card card-${tiles[i]}"></div>`;

        if (i % columns === columns - 1) {
            output += '<div class="clear"></div>';
        }
    }
    return output;
};

const generateAndOutputHtml = (): void => {
    document.getElementById("generated-setup").innerHTML = tilesToHtml(generate());
};

generateAndOutputHtml();
document.getElementById("generate").onclick = generateAndOutputHtml;
document.getElementById("game-type").onchange = generateAndOutputHtml;
