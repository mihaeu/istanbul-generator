# Istanbul Generator
![Istanbul Generator](istanbul-generator.gif)

Generates the game setup for Istanbul and Istanbul Mocha & Baksheesh by Pegasus Games. Tile names available in German and English.

## Rules

The placement rules for random setups in Istanbul are:

 - the fountain has to be in the innermost 4 (6 for the expansion) tiles
 - the black market and tea house have to be at least 3 tiles apart and cannot be on the same row/column

## Code

I first wrote this as a simple script, then refactored it into nicer JavaScript and then ended up with TypeScript, because I've been looking for an excuse to play around with it for a while. If you want to have a look at the code, check out the `app.ts` file, because the generated `app.js` file is less readable.

## License

Copyright (c) 2016 Michael Haeuslmann

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

