/**
 * Gestion de la multi mower ?
 * La tondeuse disparait à la fin ?
 * Connaitre les zones propres de la map ?
 */
/*global console*/
/*global require*/

var fs          = require('fs');
var readline    = require('readline');

var Map         = require('./src/Map');
var map         = null;

var Mower       = require('./src/Mower');
var count       = 0;

var fileContent = [];
/**
 * checkFile - check if file contains a good number of line
 *
 * @throws Error if number of line is not correct
 */
checkFile = function () {
    if (fileContent.length % 2 !== 1) {
        throw new Error ('File is not correct - number of line is not correct');
    }
};

/**
 * getMap - get map size in file and create Map
 *
 * @throws Error if map position is not correct
 */
getMap = function () {
    map             = new Map();
    map.initMap(fileContent[0].split(' '));
};

/**
 * getMower - get in file mowers' information and create MowerList with all Mower
 *
 * @throws Error if file data is not correct
 */
getMower = function () {
    for (var i = 1, nMower = 1, arrLength = fileContent.length; i < arrLength; i++) {
        if (i % 2 === 1) {
            var lineParse = fileContent[i].split(' ');

            var mower = new Mower(nMower);
            if (!map.checkMowerConflictInit(parseInt(lineParse[0], 10), parseInt(lineParse[1], 10))) {
                throw new Error('Mower ' + nMower + ' is not correct - 2 mower are the same position on map');
            }
            mower.initPosition(lineParse, {x: map.x, y: map.y});
            map.pushPositionMower(mower.getPosition());
        } else {
            mower.initMove(fileContent[i]);
            map.pushMower(mower);
            nMower++;
        }
    }
};

/**
 * Init the reader for file
 */
var rd1 = readline.createInterface({
    input       : fs.createReadStream('./input'),
    output      : process.stdout,
    terminal    : false
});

/**
 * Read content of file and push in array
 */
rd1.on('line', function (line) {
    "use strict";
    fileContent.push(line);
});

/**
 * On file close, start create Map and Mower, and play
 */
rd1.on('close', function () {
    try {
        checkFile();
        getMap();
        getMower();
        map.playAllMowers();
        map.printAllMower();
    } catch (err)  {
        console.error(err)
    }
});
