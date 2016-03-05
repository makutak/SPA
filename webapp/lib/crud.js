/*
 * crud.js - CRUD db機能を提供するモジュール
 */

/* jslint        node   : true, continue : true,
   devel  : true, indent : true, maxerr   : 50,
   newcap : true, nomen  : true, plusplus : true,
   regexp : true, sloppy : true, vars     : false,
   white  : true
 */

/* global */

//モジュールスコープ変数開始
'use strict';

var checkType, constructObj, readObj,
    updateObj, destroyObj;
//モジュールスコープ変数終了

//パブリックメソッド開始
checkType = function () {};
constructObj = function () {};
readObj = function () {};
updateObj = function () {};
destroyObj = function () {};

module.exports = {
  makeMongoId : null,
  checkType   : checkType,
  construct   : constructObj,
  read        : readObj,
  update      : updateObj,
  destroy     : destroyObj
};
//パブリックメソッド終了

//モジュール初期化開始
console.log('** CRUD module loaded **');
//モジュール初期化終了

