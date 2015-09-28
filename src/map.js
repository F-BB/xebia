/**
 * Created by florent on 27/09/2015.
 */

/**
 *
 * @constructor
 */
function Map() {

}

/**
 *
 * @type {{
 *      x: integer,
 *      y: integer,
 *      mowerPos: Array[object],
 *      mowerList: Array[Mower],
 *      initMap: Function,
 *      checkMowerConflictInit: Function,
 *      checkMowerConflict: Function,
 *      checkMowerOutMap: Function,
 *      moveMower: Function,
 *      turnMower: Function,
 *      playMower: Function,
 *      viewAllMower: Function,
 *      pushPositionMower: Function,
 *      pushMower: Function
 * }}
 */
Map.prototype = {
    x : 0,
    y : 0,
    mowerPos: [],
    mowerList: [],

    /**
     * Create the map with coordinate contains in the Array Content
     *
     * @param content | Array
     * @throws Error if Map coordinate is not correct
     */
    initMap: function (content) {
        if (content.length !== 2) {
            throw new Error('Map line is not correct - Too many input');
        }
        if (isNaN(content[0]) || parseInt(content[0], 10) < 1) {
            throw new Error('Map line is not correct - First input is not a number and must be > 1');
        }
        if (isNaN(content[1]) || parseInt(content[1], 10) < 1) {
            throw new Error('Map line is not correct - Second input is not a number and must be > 1');
        }

        this.x = parseInt(content[0], 10);
        this.y = parseInt(content[1], 10);
    },

    /**
     * @deprecated - check is not necessary
     *
     * Check if new mower is in conflict with other previous mower
     * @param x
     * @param y
     * @returns {boolean} true if no conflict and false if a conflict exist
     */
    checkMowerConflictInit : function (x, y) {
        var ret = true;

        for (var k = 0, mowerL = this.mowerPos.length; k < mowerL; k++) {
            var mowerPos = this.mowerPos[k];
            if (x === mowerPos.x && y === mowerPos.y) {
                ret = false;
            }
        }

        return ret;
    },

    /**
     * @deprecated - check is not necessary
     *
     * Check if a mower is in conflict before move
     *
     * @param mower
     * @returns {boolean} true if no conflict and false if  a conflict exist
     */
    checkMowerConflict: function (mower) {
        var ret = true;

        for (var k = 0, mowerL = this.mowerPos.length; k < mowerL; k++) {
            var mowerPos = this.mowerPos[k];

            if (mower.orientation === 0 && mower.pos.y + 1 === mowerPos.y) {
                ret = false;
            } else if (mower.orientation === 1 && mower.pos.x + 1 === mowerPos.x) {
                ret = false;
            } else if (mower.orientation === 2 && mower.pos.y - 1 === mowerPos.y) {
                ret = false;
            } else if (mower.orientation === 3 && mower.pos.x - 1 === mowerPos.x) {
                ret = false;
            }
        }

        return ret;
    },

    /**
     * Check if a mower exit the map with a move
     *
     * @param mower
     * @returns {boolean} true if no exit, false if the mower exit map
     */
    checkMowerOutMap: function (mower) {
        var ret = true;

        if (mower.orientation === 0 && mower.pos.y + 1 > this.y) {
            ret = false;
        } else if (mower.orientation === 1 && mower.pos.x + 1 > this.x) {
            ret = false;
        } else if (mower.orientation === 2 && mower.pos.y - 1 < 0) {
            ret = false;
        } else if (mower.orientation === 3 && mower.pos.x - 1 < 0) {
            ret = false;
        }

        return ret;
    },

    /**
     * Call checkMowerOutMap and move the mower position
     *
     * @param mower
     */
    moveMower: function (mower) {
        if (/*checkMowerConflict(mower) && */this.checkMowerOutMap(mower)) {
            if (mower.orientation === 0) {
                mower.pos.y++;
            } else if (mower.orientation === 1) {
                mower.pos.x++;
            } else if (mower.orientation === 2) {
                mower.pos.y--;
            } else if (mower.orientation === 3) {
                mower.pos.x--;
            }
        }
    },

    /**
     * Turn the mower
     *
     * @param mower
     * @param r
     */
    turnMower: function (mower, r) {
        if (r === 'D') {
            mower.orientation += 1;
        } else if (r === 'G') {
            mower.orientation -= 1;
        }

        if (mower.orientation > 3) {
            mower.orientation = 0;
        } else if (mower.orientation < 0) {
            mower.orientation = 3;
        }
    },

    /**
     * Get list of move for mower and execute move ask
     *
     * @param mower
     */
    playMower: function (mower) {
        for (var l = 0, moveL = mower.getListMove().length; l < moveL; l++) {
            if (mower.getMove(l) === 'A') {
                this.moveMower(mower);
            } else {
                this.turnMower(mower, mower.getMove(l));
            }
        }
    },

    /**
     * Get list of mower and call playMower for each mower
     */
    playAllMowers: function () {
        for (var k = 0, mowerListL = this.mowerList.length; k < mowerListL; k++) {
            this.playMower(this.mowerList[k])
        }
    },

    /**
     * Get List of mower and print all position and orientation for each mower
     */
    printAllMower: function () {
        for (var k = 0, mowerListL = this.mowerList.length; k < mowerListL; k++) {
            this.mowerList[k].print();
        }
    },

    /**
     * Add position in list for each mower
     *
     * @param mowerPos
     */
    pushPositionMower: function (mowerPos) {
        this.mowerPos.push(mowerPos)
    },

    /**
     * Add mower in list
     *
     * @param mower
     */
    pushMower: function (mower) {
        this.mowerList.push(mower);
    }
};

module.exports = Map;