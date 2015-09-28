/**
 * Created by florent on 27/09/2015.
 */

/**
 *
 * @param id | Integer
 * @constructor
 */
function Mower(id) {
    this.id     = id;
}

/**
 *
 * @type {{
 *      pos: null,
 *      orientation: number,
 *      listMove: Array,
 *      id: null,
 *      listOrientation: string[],
 *      listMove: Array,
 *      initPosition: Function,
 *      initMove: Function,
 *      view: Function,
 *      getMove: Function,
 *      getOrientation: Function,
 *      getListMove: Function,
 *      getPosition: Function
 * }}
 */
Mower.prototype = {
    pos: null,
    orientation: 0,
    listMove: [],
    id: null,
    listOrientation: ["N", "E", "S", "W"],
    listMove: ["A", "D", "G"],

    /**
     * Get Position for mower in Content
     *
     * @param content | Array
     * @param map - map size (x, y)
     *
     * @throws Error if position of mower are out of map or if the mower's orientation is not correct
     */
    initPosition: function (content, map) {
        if (content.length !== 3) {
            throw new Error('Mower ' + this.id + ' is not correct - Line to define mower is not good');
        }
        if (isNaN(content[0]) || parseInt(content[0], 10) < 0 || parseInt(content[1], 10) > map.x) {
            throw new Error('Mower ' + this.id + ' is not correct - First input is not a number and must be > 1 but in map too');
        }
        if (isNaN(content[1]) || parseInt(content[1], 10) < 0 || parseInt(content[1], 10) > map.y) {
            throw new Error('Mower ' + this.id + ' is not correct - Second input is not a number and must be > 1 but in map too');
        }

        if (this.listOrientation.indexOf(content[2]) === -1) {
            throw new Error('Mower ' + this.id + ' is not correct - Orientation is not correct');
        }

        this.pos = {
            x: parseInt(content[0], 10),
            y: parseInt(content[1], 10)
        };
        this.orientation = this.listOrientation.indexOf(content[2]);
    },

    /**
     * Get List of move for the mower
     *
     * @param strMove | String
     *
     * @ throws Error if mower ask is not correct
     */
    initMove: function (strMove) {
        var listOfMove = [];
        for (var k = 0, strMoveL = strMove.length; k < strMoveL; k++) {
            if (this.listMove.indexOf(strMove.charAt(k)) === -1) {
                throw new Error ('Mower ' + this.id + ' is not correct - Move not identify');
            }
            listOfMove.push(strMove.charAt(k));
        }
        this.listMove = listOfMove;
    },

    /**
     * Print information about the mower :
     *      pos.x
     *      pos.y
     *      orientation
     */
    print: function () {
        console.log (this.pos.x, this.pos.y, this.listOrientation[this.orientation]);
    },

    /**
     * Return the move
     *
     * @param i
     * @returns char
     */
    getMove: function (i) {
        return this.listMove[i];
    },

    /**
     * Return the orientation
     *
     * @returns char
     */
    getOrientation: function () {
        return this.listOrientation[this.orientation];
    },

    /**
     * Return the list of move
     *
     * @returns {Array}
     */
    getListMove: function  () {
        return this.listMove;
    },

    /**
     * Return the position for the mower
     *
     * @returns object {x: integer, y: integer}
     */
    getPosition: function () {
        return this.pos;
    }
};

module.exports = Mower;