import {
    blackMarketTeaHouseDifferentColumns,
    blackMarketTeaHouseDifferentRows,
    blackMarketTeaHouseDistanceGreaterThan3, composeRules, GameType, generate, generateStartTiles, renderTilesAsHtml,
    Tile,
    validFountain4x4,
    validFountain5x4,
    validFountain5x5,
} from "../app";

test("Fountain rules exclude illegal board setups", () => {
    expect(validFountain5x5([])).toBeFalsy();

    expect(validFountain5x5([7])).toBeFalsy();

    expect(validFountain5x5([0, 1, 2, 3, 4, 5, 6, 7])).toBeFalsy();

    expect(validFountain4x4([])).toBeFalsy();

    expect(validFountain4x4([7])).toBeFalsy();

    expect(validFountain4x4([0, 1, 2, 3, 4, 5, 6, 7])).toBeFalsy();

    expect(validFountain5x4([])).toBeFalsy();

    expect(validFountain5x4([7])).toBeFalsy();

    expect(validFountain5x4([0, 1, 2, 3, 4, 5, 6, 7])).toBeFalsy();
});

test("Invalid if fountain not in the center place for 5x5", () => {
    expect(validFountain5x5([
        0, 1, 2, 3, 4,
        5, 6, 7, 9, 0,
        1, 2, 3, 4, 5,
        6, 7, 9, 0, 1,
        2, 3, 4, 5, 6,
    ])).toBeFalsy();
});

test("Valid if fountain not in the center place for 5x5", () => {
    expect(validFountain5x5([
        0, 1, 2, 3, 4,
        5, 6, 0, 9, 0,
        1, 2, 7, 4, 5,
        6, 0, 9, 0, 1,
        2, 3, 4, 5, 6,
    ])).toBeTruthy();
});

test("Valid if fountain in innermost 4 spaces for 4x4", () => {
    expect(validFountain4x4([
        0, 1, 2, 3,
        5, 6, 0, 9,
        1, 2, 7, 4,
        6, 0, 9, 0,
    ])).toBeTruthy();

    expect(validFountain4x4([
        0, 1, 2, 3,
        5, 7, 0, 9,
        1, 2, 1, 4,
        6, 0, 9, 0,
    ])).toBeTruthy();
});

test("Invalid if fountain not in innermost 6 spaces for 5x4", () => {
    expect(validFountain5x4([
        5, 6, 7, 9, 0,
        1, 2, 3, 4, 5,
        6, 7, 9, 0, 1,
        2, 3, 4, 5, 6,
    ])).toBeFalsy();
});

test("Valid if fountain in innermost 6 spaces for 5x4", () => {
    expect(validFountain5x4([
        0, 1, 2, 3, 4,
        5, 6, 0, 9, 0,
        1, 2, 7, 4, 5,
        6, 0, 9, 0, 1,
    ])).toBeTruthy();

    expect(validFountain5x4([
        0, 1, 2, 3, 4,
        5, 7, 0, 9, 0,
        1, 2, 0, 4, 5,
        6, 0, 9, 0, 1,
    ])).toBeTruthy();

    expect(validFountain5x4([
        0, 1, 2, 3, 4,
        5, 6, 0, 7, 0,
        1, 2, 0, 4, 5,
        6, 0, 9, 0, 1,
    ])).toBeTruthy();
});

test("Invalid if if black market and tea house in the same row", () => {
    expect(blackMarketTeaHouseDifferentRows([
        5, 6, 8, 9, 0,
        1, 2, 3, 4, 5,
        6, 7, 9, 0, 1,
        2, 3, 4, 5, 6,
    ])).toBeFalsy();

    expect(blackMarketTeaHouseDifferentRows([
        8, 6, 0, 1, 9,
        1, 2, 3, 4, 5,
        6, 7, 9, 0, 1,
        2, 3, 4, 5, 6,
    ])).toBeFalsy();
});

test("Valid if if black market and tea house in the same row", () => {
    expect(blackMarketTeaHouseDifferentRows([
        0, 6, 0, 1, 9,
        8, 2, 3, 4, 5,
        6, 7, 9, 0, 1,
        2, 3, 4, 5, 6,
    ])).toBeTruthy();
});

test("Invalid if if black market and tea house in the same column", () => {
    expect(blackMarketTeaHouseDifferentColumns([
        0, 8, 0, 0, 0,
        0, 0, 0, 0, 0,
        0, 0, 0, 0, 0,
        0, 9, 0, 0, 0,
    ])).toBeFalsy();

    expect(blackMarketTeaHouseDifferentColumns([
        9, 0, 0, 0, 0,
        0, 0, 0, 0, 0,
        0, 0, 0, 0, 0,
        0, 0, 0, 0, 0,
        8, 0, 0, 0, 0,
    ])).toBeFalsy();
});

test("Valid if if black market and tea house in the same column", () => {
    expect(blackMarketTeaHouseDifferentColumns([
        0, 8, 0, 0, 0,
        0, 0, 0, 0, 0,
        0, 0, 0, 0, 0,
        9, 0, 0, 0, 0,
    ])).toBeTruthy();

    expect(blackMarketTeaHouseDifferentColumns([
        0, 0, 0, 0, 8,
        0, 0, 0, 0, 0,
        0, 0, 0, 0, 0,
        0, 0, 0, 0, 0,
        9, 0, 0, 0, 0,
    ])).toBeTruthy();
});

test("Invalid if black market and tea house distance less than 3 for 4x4", () => {
    expect(blackMarketTeaHouseDistanceGreaterThan3([
        0, 0, 0, 0,
        0, 0, 0, 0,
        0, 0, 0, 0,
        0, 0, 0, 0,
    ])).toBeFalsy();
});

test("Valid if black market and tea house distance less than 3 for 4x4", () => {
    expect(blackMarketTeaHouseDistanceGreaterThan3([
        8, 0, 0, 0,
        0, 0, 0, 9,
        0, 0, 0, 0,
        0, 0, 0, 0,
    ])).toBeTruthy();
});

test("Invalid if black market and tea house distance less than 3 for 5x4", () => {
    expect(blackMarketTeaHouseDistanceGreaterThan3([
        0, 0, 0, 0, 0,
        0, 0, 0, 0, 0,
        0, 0, 0, 0, 0,
        0, 0, 0, 0, 0,
    ])).toBeFalsy();
});

test("Valid if black market and tea house distance less than 3 for 5x4", () => {
    expect(blackMarketTeaHouseDistanceGreaterThan3([
        8, 0, 0, 0, 0,
        0, 0, 0, 9, 0,
        0, 0, 0, 0, 0,
        0, 0, 0, 0, 0,
    ])).toBeTruthy();
});

test("Invalid if black market and tea house distance less than 3 for 5x5", () => {
    expect(blackMarketTeaHouseDistanceGreaterThan3([
        0, 0, 0, 0, 0,
        0, 0, 0, 0, 0,
        0, 0, 0, 0, 0,
        0, 0, 0, 0, 0,
        0, 0, 0, 0, 0,
    ])).toBeFalsy();
});

test("Valid if black market and tea house distance less than 3 for 5x5", () => {
    expect(blackMarketTeaHouseDistanceGreaterThan3([
        8, 0, 0, 0, 0,
        0, 0, 0, 9, 0,
        0, 0, 0, 0, 0,
        0, 0, 0, 0, 0,
        0, 0, 0, 0, 0,
    ])).toBeTruthy();
});

test(
    "Generate start tiles for base game",
    () => expect(generateStartTiles(GameType.Base).length).toBe(16),
);

test(
    "Generate start tiles for Mocha & Baksheesh",
    () => expect(generateStartTiles(GameType.MochaBaksheesh).length).toBe(20),
);

test(
    "Generate start tiles for Letters & Seals",
    () => expect(generateStartTiles(GameType.LettersSeals).length).toBe(20),
);

test(
    "Generate start tiles for Great Bazaar",
    () => expect(generateStartTiles(GameType.Both).length).toBe(25),
);

test("Start setup for Letters & Seals contains the correct tiles", () => {
    expect(generateStartTiles(GameType.LettersSeals)).toEqual([
        Tile.Wainwright,
        Tile.FabricWarehouse,
        Tile.SpiceWarehouse,
        Tile.FruitWarehouse,
        Tile.PostOffice,
        Tile.Caravansary,
        Tile.Fountain,
        Tile.BlackMarket,
        Tile.TeaHouse,
        Tile.SmallMarket,
        Tile.LargeMarket,
        Tile.PoliceStation,
        Tile.SultansPalace,
        Tile.SmallMosque,
        Tile.GreatMosque,
        Tile.GemstoneDealer,
        Tile.Embassy,
        Tile.Kiosk,
        Tile.AuctionHouse,
        Tile.SecretSociety,
    ]);
});

test("Start setup for Great Bazaar should contain all tiles", () => {
    expect(generateStartTiles(GameType.Both)).toEqual([
        Tile.Wainwright,
        Tile.FabricWarehouse,
        Tile.SpiceWarehouse,
        Tile.FruitWarehouse,
        Tile.PostOffice,
        Tile.Caravansary,
        Tile.Fountain,
        Tile.BlackMarket,
        Tile.TeaHouse,
        Tile.SmallMarket,
        Tile.LargeMarket,
        Tile.PoliceStation,
        Tile.SultansPalace,
        Tile.SmallMosque,
        Tile.GreatMosque,
        Tile.GemstoneDealer,
        Tile.RoastingPlant,
        Tile.GuildHall,
        Tile.Tavern,
        Tile.CoffeeHouse,
        Tile.Embassy,
        Tile.Kiosk,
        Tile.AuctionHouse,
        Tile.SecretSociety,
        Tile.Catacombs,
    ]);
});

test("Renders tiles as HTML", () => {
    expect(renderTilesAsHtml(generateStartTiles(GameType.Base))).toEqual(
        "<div class=\"card card-1\"></div>" +
        "<div class=\"card card-2\"></div>" +
        "<div class=\"card card-3\"></div>" +
        "<div class=\"card card-4\"></div>" +
        "<div class=\"clear\"></div>" +
        "<div class=\"card card-5\"></div>" +
        "<div class=\"card card-6\"></div>" +
        "<div class=\"card card-7\"></div>" +
        "<div class=\"card card-8\"></div>" +
        "<div class=\"clear\"></div>" +
        "<div class=\"card card-9\"></div>" +
        "<div class=\"card card-10\"></div>" +
        "<div class=\"card card-11\"></div>" +
        "<div class=\"card card-12\"></div>" +
        "<div class=\"clear\"></div>" +
        "<div class=\"card card-13\"></div>" +
        "<div class=\"card card-14\"></div>" +
        "<div class=\"card card-15\"></div>" +
        "<div class=\"card card-16\"></div>" +
        "<div class=\"clear\"></div>");
});

test("Generate random tile setups until rules are met", () => {
    const tiles = generateStartTiles(GameType.Base);
    expect(generate(tiles, () => true)).toBe(tiles);

    let count = 0;
    expect(generate(tiles, () => ++count > 2)).not.toEqual(tiles);
});

test("Generate random valid tile setup for Base", () => {
    const tiles = generateStartTiles(GameType.Base);
    expect(generate(
        generateStartTiles(GameType.Base),
        composeRules(GameType.Base),
    )).not.toBe(tiles);
});

test("Generate random valid tile setup for Mocha & Baksheeh", () => {
    const tiles = generateStartTiles(GameType.MochaBaksheesh);
    expect(generate(
        generateStartTiles(GameType.MochaBaksheesh),
        composeRules(GameType.MochaBaksheesh),
    )).not.toBe(tiles);
});

test("Generate random valid tile setup for Seals & Letters", () => {
    const tiles = generateStartTiles(GameType.LettersSeals);
    expect(generate(
        generateStartTiles(GameType.LettersSeals),
        composeRules(GameType.LettersSeals),
    )).not.toBe(tiles);
});

test("Generate random valid tile setup for Great Bazaar", () => {
    const tiles = generateStartTiles(GameType.Both);
    expect(generate(
        generateStartTiles(GameType.Both),
        composeRules(GameType.Both)),
    ).not.toBe(tiles);
});