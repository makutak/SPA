/*
 * spa.model.js
 * モデルモジュール
*/

/* jslint browser : true, continue : true,
   devel  : true, indent : 2,      maxerr : 50,
   newcap : true, nomen  : true, plusplus : true,
   regexp : true, sloppy : true,     vars : false,
   white  : true
*/

/* global $, spa */
spa.model = (function () { return {}; }());

//peopleオブジェクトAPI
//----------------------
//peopleオブジェクトは spa.model.peopleで利用できる
//peopleオブジェクトはpersonオブジェクトの集合を管理するためのメソッドと
//イベントを提供する。peopleオブジェクトのパブリックメソッドには以下が含まれる。
//  * get_user() - 現在のpersonオブジェクトを返す。
//    現在のユーザがサインインしていない場合には、匿名personオブジェクトを返す。
//
//  * get_db() - あらかじめソートされたすべてのpersonオブジェクト
//    (現在のユーザを含む)のTaffyデータベースを返す。
//
//  * get_by_cid(<client_id>) - 指定された一意のIDを持つpersonオブジェクトを返す。
//
//  * login(<user_name>) - 指定のユーザ名を持つユーザとしてログインする。
//    現在のユーザオブジェクトは新しいIDを反映するように変更される。
//
//  * logout() - 現在のユーザオブジェクトを匿名に戻す。
//
//このオブジェクトが発行するjQueryグローバルイベントには以下が含まれる。
//  * 「spa-login」は、ユーザのログイン処理が完了したときに発行される。
//    更新されたユーザオブジェクトをデータとして提供する。
//
//  * 「spa-logout」はログアウトの完了時に発行される。
//    以前のユーザオブジェクトをデータとして提供する。
//
//それぞれの人はpersonオブジェクトで表される。
//personオブジェクトは以下のメソッドを提供する。
//  * get_is_user() - オブジェクトが現在のユーザの場合にtrueを返す。
//
//  * get_is_anon() - オブジェクトが匿名の場合にはtrueを返す。
//
//personオブジェクトの属性には以下が含まれる。
//  * cid - クライアントID文字列。これは常に定義され、
//    クライアントデータがバックエンドと同期していない場合のみid属性と異なる。
//
//  * id - 一意のID。オブジェクトがバックエンドと同期していない場合には未定義になることがある。
//
//  * name - ユーザの文字列名。
//
//  * css_map - アバター表現に使う属性のマップ。
//
//

