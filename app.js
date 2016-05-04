var IstanbulGenerator = (function () {
    function IstanbulGenerator() {
        this.baseFountainPositions = [5, 6, 9, 10];
        this.mochaFountainPositions = [6, 7, 8, 11, 12, 13];
        this.baseColumns = 4;
        this.mochaColumns = 5;
        this.enCardMapping = [
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
        this.deCardMapping = [
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
        this.baseStartingPosition = [
            7, 2, 3, 4,
            5, 1, 9, 8,
            10, 6, 11, 12,
            13, 14, 15, 16
        ];
        this.mochaStartingPosition = [
            7, 2, 3, 4, 5,
            1, 9, 8, 10, 6,
            11, 12, 13, 14, 15,
            16, 17, 18, 19, 20
        ];
    }
    /**
     * @param {Array} array
     * @return {Array}
     */
    IstanbulGenerator.prototype.shuffle = function (array) {
        var currentIndex = array.length, temporaryValue, randomIndex;
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
    IstanbulGenerator.prototype.gameVersion = function () {
        var gameVersions = document.getElementsByName('game');
        for (var i = 0; i < gameVersions.length; i += 1) {
            if (gameVersions[i].checked === true) {
                return gameVersions[i].value;
            }
        }
    };
    /**
     * @return {boolean}
     */
    IstanbulGenerator.prototype.isBaseGame = function () {
        return this.gameVersion() === 'base';
    };
    /**
     * @return {number[]}
     */
    IstanbulGenerator.prototype.legalPositionsForFountain = function () {
        return this.isBaseGame()
            ? this.baseFountainPositions
            : this.mochaFountainPositions;
    };
    /**
     * The rules for the fountain placement are:
     *
     * - the fountain (card number 7) has to be in the 4/6 innermost positions
     *
     * @param {number[]} cards
     * @return {boolean}
     */
    IstanbulGenerator.prototype.fountainPlacementIsIncorrect = function (cards) {
        var actualFountainPosition = cards.indexOf(7);
        return this.legalPositionsForFountain().indexOf(actualFountainPosition) === -1;
    };
    /**
     * @return {number}
     */
    IstanbulGenerator.prototype.columnsPerRow = function () {
        return this.isBaseGame()
            ? this.baseColumns
            : this.mochaColumns;
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
    IstanbulGenerator.prototype.blackMarketAndTeaHousePlacementIsIncorrect = function (cards) {
        var columns = this.columnsPerRow(), blackMarketX = cards.indexOf(8) % columns, blackMarketY = cards.indexOf(8) / columns, teaHouseX = cards.indexOf(9) % columns, teaHouseY = cards.indexOf(9) / columns, distance = Math.abs(blackMarketX - teaHouseX) + Math.abs(blackMarketY - teaHouseY);
        return blackMarketX === teaHouseX
            || blackMarketY === teaHouseY
            || distance < 3;
    };
    /**
     * @return {number[]}
     */
    IstanbulGenerator.prototype.illegalStartingPosition = function () {
        return this.isBaseGame()
            ? this.baseStartingPosition
            : this.mochaStartingPosition;
    };
    /**
     * @return {string[]}
     */
    IstanbulGenerator.prototype.languageMapping = function () {
        var checkedLanguage = '', languages = document.getElementsByName('language');
        for (var i = 0; i < languages.length; i += 1) {
            if (languages[i].checked === true) {
                checkedLanguage = languages[i].value;
            }
        }
        return checkedLanguage === 'de'
            ? this.deCardMapping
            : this.enCardMapping;
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
    IstanbulGenerator.prototype.generate = function () {
        // illegal starting state
        var cards = this.illegalStartingPosition();
        while (this.fountainPlacementIsIncorrect(cards) || this.blackMarketAndTeaHousePlacementIsIncorrect(cards)) {
            cards = this.shuffle(cards);
        }
        return cards;
    };
    /**
     * @param {number[]} cards
     * @return {string}
     */
    IstanbulGenerator.prototype.cardSetupToHtml = function (cards) {
        var output = '', mapping = this.languageMapping(), columns = this.columnsPerRow();
        for (var i = 0; i < cards.length; i += 1) {
            output += "<div class=\"card card-" + cards[i] + "\"></div>";
            if (i % columns === columns - 1) {
                output += '<div class="clear"></div>';
            }
        }
        return output;
    };
    IstanbulGenerator.generateAndOutputHtml = function () {
        var generator = new IstanbulGenerator();
        document.getElementById('generated-setup').innerHTML = generator.cardSetupToHtml(generator.generate());
    };
    return IstanbulGenerator;
}());
document.getElementById('generate').onclick = IstanbulGenerator.generateAndOutputHtml;
IstanbulGenerator.generateAndOutputHtml();
//# sourceMappingURL=app.js.map