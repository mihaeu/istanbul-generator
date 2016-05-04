class IstanbulGenerator {

    private baseFountainPositions = [5, 6, 9, 10];
    private mochaFountainPositions = [6, 7, 8, 11, 12, 13];

    private baseColumns = 4;
    private mochaColumns = 5;

    private enCardMapping = [
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

    private deCardMapping = [
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

    private baseStartingPosition = [
        7, 2, 3, 4,
        5, 1, 9, 8,
        10, 6, 11, 12,
        13, 14, 15, 16
    ];

    private mochaStartingPosition = [
        7, 2, 3, 4, 5,
        1, 9, 8, 10, 6,
        11, 12, 13, 14, 15,
        16, 17, 18, 19, 20
    ];

    /**
     * @param {Array} array
     * @return {Array}
     */
    private shuffle(array) {
        let currentIndex = array.length,
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
    }

    /**
     * return {string}
     */
    private gameVersion() : string {
        const gameVersions = document.getElementsByName('game');
        for (let i = 0; i < gameVersions.length; i += 1) {
            if ((<HTMLInputElement>gameVersions[i]).checked === true) {
                return (<HTMLInputElement>gameVersions[i]).value;
            }
        }
    }

    /**
     * @return {boolean}
     */
    private isBaseGame() : boolean {
        return this.gameVersion() === 'base';
    }

    /**
     * @return {number[]}
     */
    private legalPositionsForFountain() : number[] {
        return this.isBaseGame()
            ? this.baseFountainPositions
            : this.mochaFountainPositions;
    }

    /**
     * The rules for the fountain placement are:
     *
     * - the fountain (card number 7) has to be in the 4/6 innermost positions
     *
     * @param {number[]} cards
     * @return {boolean}
     */
    private fountainPlacementIsIncorrect(cards) : boolean {
        let actualFountainPosition = cards.indexOf(7);
        return this.legalPositionsForFountain().indexOf(actualFountainPosition) === -1
    }

    /**
     * @return {number}
     */
    private columnsPerRow() : number {
        return this.isBaseGame()
            ? this.baseColumns
            : this.mochaColumns;
    }

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
    private blackMarketAndTeaHousePlacementIsIncorrect(cards:number[]) : boolean {
        const columns = this.columnsPerRow(),
            blackMarketX = cards.indexOf(8) % columns,
            blackMarketY = cards.indexOf(8) / columns,
            teaHouseX = cards.indexOf(9) % columns,
            teaHouseY = cards.indexOf(9) / columns,
            distance = Math.abs(blackMarketX - teaHouseX) + Math.abs(blackMarketY - teaHouseY);
        return blackMarketX === teaHouseX
            || blackMarketY === teaHouseY
            || distance < 3;
    }

    /**
     * @return {number[]}
     */
    private illegalStartingPosition() : number[] {
        return this.isBaseGame()
            ? this.baseStartingPosition
            : this.mochaStartingPosition;
    }

    /**
     * @return {string[]}
     */
    private languageMapping() : string[] {
        let checkedLanguage = '',
            languages = document.getElementsByName('language');
        for (let i = 0; i < languages.length; i += 1) {
            if ((<HTMLInputElement>languages[i]).checked === true) {
                checkedLanguage = (<HTMLInputElement>languages[i]).value;
            }
        }
        return checkedLanguage === 'de'
            ? this.deCardMapping
            : this.enCardMapping;
    }

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
    public generate() : number[] {
        // illegal starting state
        let cards = this.illegalStartingPosition();
        while (this.fountainPlacementIsIncorrect(cards) || this.blackMarketAndTeaHousePlacementIsIncorrect(cards)) {
            cards = this.shuffle(cards);
        }
        return cards;
    }

    /**
     * @param {number[]} cards
     * @return {string}
     */
    public cardSetupToHtml(cards) : string {
        let output = '',
            mapping = this.languageMapping(),
            columns = this.columnsPerRow();
        for (let i = 0; i < cards.length; i += 1) {
            output += `<div class="card card-${cards[i]}">${mapping[cards[i] - 1]} (${cards[i]})</div>`;

            if (i % columns === columns - 1) {
                output += '<div class="clear"></div>';
            }
        }
        return output;
    }

    public static generateAndOutputHtml() : void {
        const generator = new IstanbulGenerator();
        document.getElementById('generated-setup').innerHTML = generator.cardSetupToHtml(generator.generate());
    }
}

document.getElementById('generate').onclick = IstanbulGenerator.generateAndOutputHtml;
IstanbulGenerator.generateAndOutputHtml();
