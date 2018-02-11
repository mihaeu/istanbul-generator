"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = require("../app");
test("Fountain rules exclude illegal board setups", () => {
    expect(app_1.validFountain5x5([])).toBeFalsy();
    expect(app_1.validFountain5x5([7])).toBeFalsy();
    expect(app_1.validFountain5x5([0, 1, 2, 3, 4, 5, 6, 7])).toBeFalsy();
    expect(app_1.validFountain4x4([])).toBeFalsy();
    expect(app_1.validFountain4x4([7])).toBeFalsy();
    expect(app_1.validFountain4x4([0, 1, 2, 3, 4, 5, 6, 7])).toBeFalsy();
    expect(app_1.validFountain5x4([])).toBeFalsy();
    expect(app_1.validFountain5x4([7])).toBeFalsy();
    expect(app_1.validFountain5x4([0, 1, 2, 3, 4, 5, 6, 7])).toBeFalsy();
});
test("Invalid if fountain not in the center place for 5x5", () => {
    expect(app_1.validFountain5x5([
        0, 1, 2, 3, 4,
        5, 6, 7, 9, 0,
        1, 2, 3, 4, 5,
        6, 7, 9, 0, 1,
        2, 3, 4, 5, 6,
    ])).toBeFalsy();
});
test("Valid if fountain not in the center place for 5x5", () => {
    expect(app_1.validFountain5x5([
        0, 1, 2, 3, 4,
        5, 6, 0, 9, 0,
        1, 2, 7, 4, 5,
        6, 0, 9, 0, 1,
        2, 3, 4, 5, 6,
    ])).toBeTruthy();
});
test("Valid if fountain in innermost 4 spaces for 4x4", () => {
    expect(app_1.validFountain4x4([
        0, 1, 2, 3,
        5, 6, 0, 9,
        1, 2, 7, 4,
        6, 0, 9, 0,
    ])).toBeTruthy();
    expect(app_1.validFountain4x4([
        0, 1, 2, 3,
        5, 7, 0, 9,
        1, 2, 1, 4,
        6, 0, 9, 0,
    ])).toBeTruthy();
});
test("Invalid if fountain not in innermost 6 spaces for 5x4", () => {
    expect(app_1.validFountain5x4([
        5, 6, 7, 9, 0,
        1, 2, 3, 4, 5,
        6, 7, 9, 0, 1,
        2, 3, 4, 5, 6,
    ])).toBeFalsy();
});
test("Valid if fountain in innermost 6 spaces for 5x4", () => {
    expect(app_1.validFountain5x4([
        0, 1, 2, 3, 4,
        5, 6, 0, 9, 0,
        1, 2, 7, 4, 5,
        6, 0, 9, 0, 1,
    ])).toBeTruthy();
    expect(app_1.validFountain5x4([
        0, 1, 2, 3, 4,
        5, 7, 0, 9, 0,
        1, 2, 0, 4, 5,
        6, 0, 9, 0, 1,
    ])).toBeTruthy();
    expect(app_1.validFountain5x4([
        0, 1, 2, 3, 4,
        5, 6, 0, 7, 0,
        1, 2, 0, 4, 5,
        6, 0, 9, 0, 1,
    ])).toBeTruthy();
});
test("Invalid if if black market and tea house in the same row", () => {
    expect(app_1.blackMarketTeaHouseDifferentRows([
        5, 6, 8, 9, 0,
        1, 2, 3, 4, 5,
        6, 7, 9, 0, 1,
        2, 3, 4, 5, 6,
    ])).toBeFalsy();
    expect(app_1.blackMarketTeaHouseDifferentRows([
        8, 6, 0, 1, 9,
        1, 2, 3, 4, 5,
        6, 7, 9, 0, 1,
        2, 3, 4, 5, 6,
    ])).toBeFalsy();
});
test("Valid if if black market and tea house in the same row", () => {
    expect(app_1.blackMarketTeaHouseDifferentRows([
        0, 6, 0, 1, 9,
        8, 2, 3, 4, 5,
        6, 7, 9, 0, 1,
        2, 3, 4, 5, 6,
    ])).toBeTruthy();
});
test("Invalid if if black market and tea house in the same column", () => {
    expect(app_1.blackMarketTeaHouseDifferentColumns([
        0, 8, 0, 0, 0,
        0, 0, 0, 0, 0,
        0, 0, 0, 0, 0,
        0, 9, 0, 0, 0,
    ])).toBeFalsy();
    expect(app_1.blackMarketTeaHouseDifferentColumns([
        9, 0, 0, 0, 0,
        0, 0, 0, 0, 0,
        0, 0, 0, 0, 0,
        0, 0, 0, 0, 0,
        8, 0, 0, 0, 0,
    ])).toBeFalsy();
});
test("Valid if if black market and tea house in the same column", () => {
    expect(app_1.blackMarketTeaHouseDifferentColumns([
        0, 8, 0, 0, 0,
        0, 0, 0, 0, 0,
        0, 0, 0, 0, 0,
        9, 0, 0, 0, 0,
    ])).toBeTruthy();
    expect(app_1.blackMarketTeaHouseDifferentColumns([
        0, 0, 0, 0, 8,
        0, 0, 0, 0, 0,
        0, 0, 0, 0, 0,
        0, 0, 0, 0, 0,
        9, 0, 0, 0, 0,
    ])).toBeTruthy();
});
test("Invalid if black market and tea house distance less than 3 for 4x4", () => {
    expect(app_1.blackMarketTeaHouseDistanceGreaterThan3([
        0, 0, 0, 0,
        0, 0, 0, 0,
        0, 0, 0, 0,
        0, 0, 0, 0,
    ])).toBeFalsy();
});
test("Valid if black market and tea house distance less than 3 for 4x4", () => {
    expect(app_1.blackMarketTeaHouseDistanceGreaterThan3([
        8, 0, 0, 0,
        0, 0, 0, 9,
        0, 0, 0, 0,
        0, 0, 0, 0,
    ])).toBeTruthy();
});
test("Invalid if black market and tea house distance less than 3 for 5x4", () => {
    expect(app_1.blackMarketTeaHouseDistanceGreaterThan3([
        0, 0, 0, 0, 0,
        0, 0, 0, 0, 0,
        0, 0, 0, 0, 0,
        0, 0, 0, 0, 0,
    ])).toBeFalsy();
});
test("Valid if black market and tea house distance less than 3 for 5x4", () => {
    expect(app_1.blackMarketTeaHouseDistanceGreaterThan3([
        8, 0, 0, 0, 0,
        0, 0, 0, 9, 0,
        0, 0, 0, 0, 0,
        0, 0, 0, 0, 0,
    ])).toBeTruthy();
});
test("Invalid if black market and tea house distance less than 3 for 5x5", () => {
    expect(app_1.blackMarketTeaHouseDistanceGreaterThan3([
        0, 0, 0, 0, 0,
        0, 0, 0, 0, 0,
        0, 0, 0, 0, 0,
        0, 0, 0, 0, 0,
        0, 0, 0, 0, 0,
    ])).toBeFalsy();
});
test("Valid if black market and tea house distance less than 3 for 5x5", () => {
    expect(app_1.blackMarketTeaHouseDistanceGreaterThan3([
        8, 0, 0, 0, 0,
        0, 0, 0, 9, 0,
        0, 0, 0, 0, 0,
        0, 0, 0, 0, 0,
        0, 0, 0, 0, 0,
    ])).toBeTruthy();
});
