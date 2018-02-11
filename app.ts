export enum Tile {
    Wainwright = 1,
    FabricWarehouse = 2,
    SpiceWarehouse = 3,
    FruitWarehouse = 4,
    PostOffice = 5,
    Caravansary = 6,
    Fountain = 7,
    BlackMarket = 8,
    TeaHouse = 9,
    SmallMarket = 10,
    LargeMarket = 11,
    PoliceStation = 12,
    SultansPalace = 13,
    SmallMosque = 14,
    GreatMosque = 15,
    GemstoneDealer = 16,
    RoastingPlant = 17,
    GuildHall = 18,
    Tavern = 19,
    CoffeeHouse = 20,
    Embassy = 21,
    Kiosk = 22,
    AuctionHouse = 23,
    SecretSociety = 24,
    Catacombs = 25,
}

type Tiles = Tile[];

const shuffle = (xs: number[]) => {
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
const fountainPos4x4 = [5, 6, 9, 10];
const fountainPos5x4 = [6, 7, 8, 11, 12, 13];
const fountainPos5x5 = [12];
const tileCount4x4 = 16;
const tileCount5x4 = 20;
const tileCount5x5 = 25;

const validFountain = (tileCount: Tile, validPos: Tiles) => (tiles: Tiles) => {
    return tiles.length === tileCount && validPos.indexOf(tilePos(Tile.Fountain, tiles)) !== -1;
};

export const validFountain4x4 = validFountain(tileCount4x4, fountainPos4x4);
export const validFountain5x4 = validFountain(tileCount5x4, fountainPos5x4);
export const validFountain5x5 = validFountain(tileCount5x5, fountainPos5x5);

const columnCount = (tiles: Tiles) => tiles.length === 16 ? 4 : 5;

const row = (tile: Tile, tiles: Tiles) => Math.floor(tilePos(tile, tiles) / columnCount(tiles));

const column = (tile: Tile, tiles: Tiles) => Math.floor(tilePos(tile, tiles) % columnCount(tiles));

export const blackMarketTeaHouseDifferentRows = (tiles: Tiles) => {
    return row(Tile.BlackMarket, tiles) !== row(Tile.TeaHouse, tiles);
};

export const blackMarketTeaHouseDifferentColumns = (tiles: Tiles) => {
    return column(Tile.BlackMarket, tiles) !== column(Tile.TeaHouse, tiles);
};

export const blackMarketTeaHouseDistanceGreaterThan3 = (tiles: Tiles) => {
    return Math.abs(row(Tile.BlackMarket, tiles) - row(Tile.TeaHouse, tiles))
        + Math.abs(column(Tile.BlackMarket, tiles) - column(Tile.TeaHouse, tiles)) > 3;
};

const $ = (cssSelector: string): HTMLElement[] => [].slice.call(document.querySelectorAll(cssSelector));
const selectedGameType = () => $(".game:checked").map((el) => (el as HTMLInputElement).value);

const determineGameType = (): GameType => {
    const selected = selectedGameType();

    if (selected.length === 0) {
        return GameType.Base;
    }

    if (selected.length === 2) {
        return GameType.Both;
    }

    return selected.pop() as GameType;
};

const tilePos = (tileIndex: number, tiles: Tiles) => tiles.indexOf(tileIndex);

type Rule = (tiles: Tiles) => boolean;

export const generate = (tiles: Tiles, rules: Rule): Tiles => {
    return rules(tiles) ? tiles : generate(shuffle(tiles.slice()), rules);
};

export const renderTilesAsHtml = (tiles: Tiles): string => {
    let output = "";
    const columns = columnCount(tiles);
    for (let i = 0; i < tiles.length; i += 1) {
        output += `<div class="card card-${tiles[i]}"></div>`;

        if (i % columns === columns - 1) {
            output += '<div class="clear"></div>';
        }
    }
    return output;
};

export enum GameType {
    Base = "Base",
    MochaBaksheesh = "MochaBaksheesh",
    LettersSeals = "LettersSeals",
    Both = "Both",
}

const generateArray = (n: number) => Array.apply(null, {length: n}).map((value: number, index: number) => index + 1);

export const generateStartTiles = (gameType: GameType): Tiles => {
    switch (gameType) {
        case GameType.Base:
            return generateArray(16);
        case GameType.MochaBaksheesh:
            return generateArray(20);
        case GameType.LettersSeals:
            return generateArray(16).concat([21, 22, 23, 24]);
        case GameType.Both:
            return generateArray(25);
    }
};

export const composeRules = (gameType: GameType) => (tiles: Tiles): boolean => {
    if (gameType === GameType.Base) {
        return validFountain4x4(tiles) && blackMarketTeaHouseDistanceGreaterThan3(tiles);
    }

    return gameType === GameType.Both ? validFountain5x5(tiles) : validFountain5x4(tiles)
        && blackMarketTeaHouseDifferentColumns(tiles)
        && blackMarketTeaHouseDifferentRows(tiles)
        && blackMarketTeaHouseDistanceGreaterThan3(tiles);
};

const randomizeStartSetup = (tiles: Tiles) => {
    for (let i = 0; i < Math.random() * 10; i += 1) {
        tiles = shuffle(tiles);
    }
    return tiles;
};

const generateAndOutputHtml = (element: HTMLElement) => () => element.innerHTML = renderTilesAsHtml(
    generate(randomizeStartSetup(generateStartTiles(determineGameType())), composeRules(determineGameType())),
);

window.addEventListener("load", () => {
    const target = document.getElementById("generated-setup");
    const generateButton = document.getElementById("generate");
    const gameTypeForm = document.getElementById("game-type");

    if (target && generateButton && gameTypeForm) {
        generateAndOutputHtml(target);
        generateButton.onclick = generateAndOutputHtml(target);
        gameTypeForm.onchange = generateAndOutputHtml(target);
    } else {
        console.error("damn");
    }
}, false);
