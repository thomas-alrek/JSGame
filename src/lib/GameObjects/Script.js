/**
 * @file JSGame Script GameObject.
 * @package jsgame
 * @copyright (c) 2016, Thomas Alrek
 * @author Thomas Alrek <thomas@alrek.no>
 */

"use strict";

/**
 * @class Script
 * Creates a new instance of Script.
 * <p><i>Script is an instance of GameObject</i></p>
 *
 * @constructor
 * @param {options} options An object containing construct options
 */
function Script(){
    this.code = "return;";
}

module.exports = Script;