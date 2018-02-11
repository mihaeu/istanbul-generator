/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
var Tile;
(function (Tile) {
    Tile[Tile["Wainwright"] = 1] = "Wainwright";
    Tile[Tile["FabricWarehouse"] = 2] = "FabricWarehouse";
    Tile[Tile["SpiceWarehouse"] = 3] = "SpiceWarehouse";
    Tile[Tile["FruitWarehouse"] = 4] = "FruitWarehouse";
    Tile[Tile["PostOffice"] = 5] = "PostOffice";
    Tile[Tile["Caravansary"] = 6] = "Caravansary";
    Tile[Tile["Fountain"] = 7] = "Fountain";
    Tile[Tile["BlackMarket"] = 8] = "BlackMarket";
    Tile[Tile["TeaHouse"] = 9] = "TeaHouse";
    Tile[Tile["SmallMarket"] = 10] = "SmallMarket";
    Tile[Tile["LargeMarket"] = 11] = "LargeMarket";
    Tile[Tile["PoliceStation"] = 12] = "PoliceStation";
    Tile[Tile["SultansPalace"] = 13] = "SultansPalace";
    Tile[Tile["SmallMosque"] = 14] = "SmallMosque";
    Tile[Tile["GreatMosque"] = 15] = "GreatMosque";
    Tile[Tile["GemstoneDealer"] = 16] = "GemstoneDealer";
    Tile[Tile["RoastingPlant"] = 17] = "RoastingPlant";
    Tile[Tile["GuildHall"] = 18] = "GuildHall";
    Tile[Tile["Tavern"] = 19] = "Tavern";
    Tile[Tile["CoffeeHouse"] = 20] = "CoffeeHouse";
    Tile[Tile["Embassy"] = 21] = "Embassy";
    Tile[Tile["Kiosk"] = 22] = "Kiosk";
    Tile[Tile["AuctionHouse"] = 23] = "AuctionHouse";
    Tile[Tile["SecretSociety"] = 24] = "SecretSociety";
    Tile[Tile["Catacombs"] = 25] = "Catacombs";
})(Tile = exports.Tile || (exports.Tile = {}));
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
var fountainPos4x4 = [5, 6, 9, 10];
var fountainPos5x4 = [6, 7, 8, 11, 12, 13];
var fountainPos5x5 = [12];
var tileCount4x4 = 16;
var tileCount5x4 = 20;
var tileCount5x5 = 25;
var validFountain = function (tileCount, validPos) { return function (tiles) {
    return tiles.length === tileCount && validPos.indexOf(tilePos(Tile.Fountain, tiles)) !== -1;
}; };
exports.validFountain4x4 = validFountain(tileCount4x4, fountainPos4x4);
exports.validFountain5x4 = validFountain(tileCount5x4, fountainPos5x4);
exports.validFountain5x5 = validFountain(tileCount5x5, fountainPos5x5);
var columnCount = function (tiles) { return tiles.length === 16 ? 4 : 5; };
var row = function (tile, tiles) { return Math.floor(tilePos(tile, tiles) / columnCount(tiles)); };
var column = function (tile, tiles) { return Math.floor(tilePos(tile, tiles) % columnCount(tiles)); };
exports.blackMarketTeaHouseDifferentRows = function (tiles) {
    return row(Tile.BlackMarket, tiles) !== row(Tile.TeaHouse, tiles);
};
exports.blackMarketTeaHouseDifferentColumns = function (tiles) {
    return column(Tile.BlackMarket, tiles) !== column(Tile.TeaHouse, tiles);
};
exports.blackMarketTeaHouseDistanceGreaterThan3 = function (tiles) {
    return Math.abs(row(Tile.BlackMarket, tiles) - row(Tile.TeaHouse, tiles))
        + Math.abs(column(Tile.BlackMarket, tiles) - column(Tile.TeaHouse, tiles)) > 3;
};
var $ = function (cssSelector) { return [].slice.call(document.querySelectorAll(cssSelector)); };
var selectedGameType = function () { return $(".game:checked").map(function (el) { return el.value; }); };
var determineGameType = function () {
    var selected = selectedGameType();
    if (selected.length === 0) {
        return GameType.Base;
    }
    if (selected.length === 2) {
        return GameType.Both;
    }
    return selected.pop();
};
var tilePos = function (tileIndex, tiles) { return tiles.indexOf(tileIndex); };
exports.generate = function (tiles, rules) {
    return rules(tiles) ? tiles : exports.generate(shuffle(tiles.slice()), rules);
};
exports.renderTilesAsHtml = function (tiles) {
    var output = "";
    var columns = columnCount(tiles);
    for (var i = 0; i < tiles.length; i += 1) {
        output += "<div class=\"card card-" + tiles[i] + "\"></div>";
        if (i % columns === columns - 1) {
            output += '<div class="clear"></div>';
        }
    }
    return output;
};
var GameType;
(function (GameType) {
    GameType["Base"] = "Base";
    GameType["MochaBaksheesh"] = "MochaBaksheesh";
    GameType["LettersSeals"] = "LettersSeals";
    GameType["Both"] = "Both";
})(GameType = exports.GameType || (exports.GameType = {}));
var generateArray = function (n) { return Array.apply(null, { length: n }).map(function (value, index) { return index + 1; }); };
exports.generateStartTiles = function (gameType) {
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
exports.composeRules = function (gameType) { return function (tiles) {
    if (gameType === GameType.Base) {
        return exports.validFountain4x4(tiles) && exports.blackMarketTeaHouseDistanceGreaterThan3(tiles);
    }
    return gameType === GameType.Both ? exports.validFountain5x5(tiles) : exports.validFountain5x4(tiles)
        && exports.blackMarketTeaHouseDifferentColumns(tiles)
        && exports.blackMarketTeaHouseDifferentRows(tiles)
        && exports.blackMarketTeaHouseDistanceGreaterThan3(tiles);
}; };
var randomizeStartSetup = function (tiles) {
    for (var i = 0; i < Math.random() * 10; i += 1) {
        tiles = shuffle(tiles);
    }
    return tiles;
};
var generateAndOutputHtml = function (element) { return function () { return element.innerHTML = exports.renderTilesAsHtml(exports.generate(randomizeStartSetup(exports.generateStartTiles(determineGameType())), exports.composeRules(determineGameType()))); }; };
window.addEventListener("load", function () {
    var target = document.getElementById("generated-setup");
    var generateButton = document.getElementById("generate");
    var gameTypeForm = document.getElementById("game-type");
    if (target && generateButton && gameTypeForm) {
        generateAndOutputHtml(target);
        generateButton.onclick = generateAndOutputHtml(target);
        gameTypeForm.onchange = generateAndOutputHtml(target);
    }
    else {
        console.error("damn");
    }
}, false);


/***/ })
/******/ ]);