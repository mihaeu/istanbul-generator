(function() {
	'use strict';

	/**
	 * @param {Array} array
	 * @return {Array}
	 */
	var shuffle = function shuffle(array) {
		var currentIndex = array.length,
			temporaryValue,
			randomIndex;

		// While there remain elements to shuffle...
		while (0 !== currentIndex) {
			// Pick a remaining element...
			randomIndex = Math.floor(Math.random() * currentIndex);
			currentIndex -= 1;

			// And swap it with the current element.
			temporaryValue = array[currentIndex];
			array[currentIndex] = array[randomIndex];
			array[randomIndex] = temporaryValue;
		}

		return array;
	};

	/**
	 * return {string}
	 */
	var gameVersion = function gameVersion() {
		var game = '',
			gameVersions = document.getElementsByName('game');
		for (var index in gameVersions) {
			if (gameVersions[index].checked === true) {
				return gameVersions[index].value;
			}
		}
	};

	/**
	 * @return {number[]}
	 */
	var legalPositionsForFountain = function legalPositionsForFountain() {
		return gameVersion() === 'base'
			? [5, 6, 9, 10]
			: [6, 7, 8, 11, 12, 13];
	};

	/**
	 * The rules for the fountain placement are:
	 *
	 * - the fountain (card number 7) has to be in the 4/6 innermost positions
	 *
	 * @param {number[]} cards
	 * @return {boolean}
	 */
	var fountainPlacementIsIncorrect = function fountainPlacementIsIncorrect(cards) {
		var actualFountainPosition = cards.indexOf(7);
		return legalPositionsForFountain().indexOf(actualFountainPosition) === -1
	};

	/**
	 * @return {number}
	 */
	var columnsPerRow = function columnsPerRow() {
		return gameVersion() === 'base'
			? 4
			: 5;
	};

	/**
	 * The rules for the placement of the black market and the tea house are:
	 *
	 *  - the black market (card number 8) and the tea house (card number 9) have to be at
	 *    least 3 spaces apart from each other (Manhattan distance)
	 *  - the black market and the tea house may not be in the same row or column
	 *
	 * @param {number[]} cards
	 * @return {boolean}
	 */
	var blackMarketAndTeaHousePlacementIsIncorrect = function(cards) {
		var columns = columnsPerRow(),
			blackMarketX = cards.indexOf(8) % columns,
			blackMarketY = parseInt(cards.indexOf(8) / columns, 10),
			teaHouseX = cards.indexOf(9) % columns,
			teaHouseY = parseInt(cards.indexOf(9) / columns, 10),
			distance = Math.abs(blackMarketX - teaHouseX) + Math.abs(blackMarketY - teaHouseY);
		return blackMarketX === teaHouseX
			|| blackMarketY === teaHouseY
			|| distance < 3;
	};

	var illegalStartingPosition = function illegalStartingPosition() {
		var expansionStartingPosition = [
			7,  2,  3,  4,  5,
			1,  9,  8,  10, 6,
			11, 12, 13, 14, 15,
			16, 17, 18, 19, 20
		], baseStartingPosition = [
			7,  2,  3,  4,
			5,  1,  9,  8,
			10, 6,  11, 12,
			13, 14, 15, 16
		];
		return gameVersion() === 'base'
			? baseStartingPosition
			: expansionStartingPosition;
	};

	/**
	 * Generates a random setup for Istanbul (with or without Bakshish and Mokka)
	 *
	 * The rules for random generation are:
	 *
	 *  - the fountain (card number 7) has to be in the center
	 *  - the black market (card number 8) and the tea house (card number 9) have to be at
	 *    least 3 spaces apart from each other (Manhattan distance)
	 *  - the black market and the tea house may not be in the same row or column
	 *
	 * @return {number[]}
	 */
	var generate = function generate() {
		// illegal starting state
		var cards = illegalStartingPosition();
		while (fountainPlacementIsIncorrect(cards)
			|| blackMarketAndTeaHousePlacementIsIncorrect(cards)) {
			cards = shuffle(cards);
		}
		return cards;
	};

	var enCardMapping = [
		'Wainwright',
		'Fabric Warehouse',
		'Spice Warehouse',
		'Fruit Warehouse',
		'Post Office',
		'Caravansary',
		'Fountain',
		'Black Market',
		'Tea House',
		'Small Market',
		'Large Market',
		'Police Station',
		'Sultan\'s Palace',
		'Small Mosque',
		'Great Mosque',
		'Gemstone Dealer',
		'Roasting Plant',
		'Guild Hall',
		'Tavern',
		'Coffee House'
	];

	var deCardMapping = [
		'Wagnerei',
		'Tuchlage',
		'Gewürzlager',
		'Obstlager',
		'Postamt',
		'Karawanserei',
		'Brunnen',
		'Schwarzmark',
		'Teestube',
		'Kleiner Markt',
		'Großer Markt',
		'Polizeiwache',
		'Sultanspalast',
		'Kleine Moschee',
		'Große Moschee',
		'Edelsteinhändler',
		'Kaffeerösterei',
		'Gildenhalle',
		'Taverne',
		'Kaffeehaus'
	];

	/**
	 * @return {string[]}
	 */
	var languageMapping = function languageMapping() {
		var checkedLanguage = '',
			languages = document.getElementsByName('language');
		for (var index in languages) {
			if (languages[index].checked === true) {
				checkedLanguage = languages[index].value;
			}
		}
		if (checkedLanguage === 'de') {
			return deCardMapping;
		}
		return enCardMapping;
	};

	/**
	 * @param {number[]} cards
	 * @return {string}
	 */
	var cardSetupToHtml = function cardSetupToHtml(cards) {
		var i = 0,
			output = '',
			mapping = languageMapping(),
			columns = columnsPerRow();
		for (i in cards) {
			output += '<div class="card">' + mapping[cards[i] - 1] + ' (' + cards[i] + ')</div>';

			if (i % columns === columns - 1) {
				output += '<div class="clear"></div>';
			}
		}
		return output;
	};

	document.getElementById('generate').onclick = function() {
		document.getElementById('generated-setup').innerHTML = cardSetupToHtml(generate());
	};
	document.getElementById('generated-setup').innerHTML = cardSetupToHtml(generate());
})();