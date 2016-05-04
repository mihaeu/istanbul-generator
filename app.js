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
	 * The rules for the fountain placement are:
	 *
	 * - the fountain (card number 7) has to be in the 6 innermost positions (6, 7, 8, 11, 12, 13)
	 *
	 * @param {number[]} cards
	 * @return {boolean}
	 */
	var fountainPlacementIsIncorrect = function fountainPlacementIsIncorrect(cards) {
		var legalPositions = [6, 7, 8, 11, 12, 13],
			actualFountainPosition = cards.indexOf(7);
		return legalPositions.indexOf(actualFountainPosition) === -1
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
		/**
		 * @param {number[]} cards
		 * @return {boolean}
		 */
		var blackMarketX = cards.indexOf(8) % 5,
			blackmarketY = parseInt(cards.indexOf(8) / 5, 10),
			teaHouseX = cards.indexOf(9) % 5,
			teaHouseY = parseInt(cards.indexOf(9) / 5, 10),
			distance = Math.abs(blackMarketX - teaHouseX) + Math.abs(blackmarketY - teaHouseY);
		return blackMarketX === teaHouseX
			|| blackmarketY === teaHouseY
			|| distance < 3;
	};

	/**
	 * Generates a random setup for Istanbul: Bakshish and Mokka
	 *
	 * The resulting array will have the following indices:
	 *
	 *  0  1  2  3  4
	 *  5  6  7  8  9
	 * 10 11 12 13 14
	 * 15 16 17 18 19
	 *
	 * The rules for random generation are:
	 *
	 *  - the fountain (card number 7) has to be in the 6 innermost positions (6, 7, 8, 11, 12, 13)
	 *  - the black market (card number 8) and the tea house (card number 9) have to be at
	 *    least 3 spaces apart from each other (Manhattan distance)
	 *  - the black market and the tea house may not be in the same row or column
	 *
	 * @return {number[]}
	 */
	var generate = function generate() {
		// illegal starting state
		var cards = [
			 7,  2,  3,  4,  5,
			 1,  9,  8, 10,  6,
			11, 12, 13, 14, 15,
			16, 17, 18, 19, 20
		];
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
			mapping = languageMapping();
		for (i in cards) {
			output += '<div class="card">' + mapping[cards[i] - 1] + ' (' + cards[i] + ')</div>';

			if (i % 5 === 4) {
				output += '<div class="clear"></div>';
			}
		}
		return output;
	};

	document.getElementById('generate').onclick = function() {
		document.getElementById('generated-setup').innerHTML = cardSetupToHtml(generate());
	}
	document.getElementById('generated-setup').innerHTML = cardSetupToHtml(generate());
})();