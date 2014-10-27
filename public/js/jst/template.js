this["JST"] = this["JST"] || {};

this["JST"]["checkbox"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<div class="checkbox" aria-disabled="false">\n\t<span class="icons">\n\t\t<span class="first-icon fui-checkbox-unchecked"></span>\n\t\t<span class="second-icon fui-checkbox-checked"></span>\n\t</span>\n\t<input type="checkbox">\n\t<span>' +
((__t = (name)) == null ? '' : __t) +
'</span>\n</div>';

}
return __p
};

this["JST"]["iframe"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<!DOCTYPE html>\n<html lang="ja">\n<head>\n  <meta charset="UTF-8">\n  <title>GrowUI</title>\n  <link rel="stylesheet" href="css/jquery-ui.css" />\n  <link rel="stylesheet" href="css/bootstrap.css" />\n  <link rel="stylesheet" href="css/flat-ui.css" />\n  <link rel="stylesheet" href="css/style.css" />\n  <link rel="icon" href="favicon.ico" />\n  <script type="text/javascript">\n  parent.frameWindow = window;\n  parent.frameDocument = document;\n  </script>\n</head>\n<body class="iframe-body">\n  <div id="frameBody">\n  </div>\n</body>\n</html>\n';

}
return __p
};

this["JST"]["main"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<header>\n  <div class="left">\n    <i class="logo">\n      <u>GrowUI</u>\n    </i>\n  </div>\n  <div class="left-mid">\n    <select id="pageList" class="selectpicker select-block"></select>\n  </div>\n\n  <div class="right">\n    <div class="divider">\n    </div>\n    <div id="newPage" class="app-mode selected" data-toggle="tooltip" data-placement="bottom" title="新しいページを追加">\n      <div class="fui-new" data-toggle="modal" data-target="#newPageModal">\n      </div>\n    </div>\n    <div class="divider">\n    </div>\n    <div id="viewMode" class="app-mode selected" data-toggle="tooltip" data-placement="bottom" title="見た目を編集">\n      <div class="fui-eye">\n      </div>\n    </div>\n    <div id="dbMode" class="app-mode" data-toggle="tooltip" data-placement="bottom" title="データを編集">\n      <div class="fui-list">\n      </div>\n    </div>\n    <div id="runMode" class="app-mode" data-toggle="tooltip" data-placement="bottom" title="テスト">\n      <div class="fui-play">\n      </div>\n    </div>\n    <div class="divider">\n    </div>\n    <div class="dropdown">\n      <a href="#" class="dropdown-toggle" data-toggle="dropdown">\n        <div id="currentDeviceType" class="g-icon g-icon-imac"></div>\n      </a>\n      <span class="dropdown-arrow" style="right: 8px"></span>\n      <ul id="deviceTypeList" class="dropdown-menu dropdown-inverse">\n      </ul>\n    </div>\n    <div class="divider">\n    </div>\n  </div>\n</header>\n\n<div id="background" class="background">\n  <div class="container-drop">\n    <div id="frameWrapper" class="imac">\n      <div id="main" class="main">\n        <div id="editBox" class="edit-box" style="display: none;">\n        </div>\n        <div id="framePlaceholder">\n        </div>\n      </div>\n    </div>\n    <div id="dbTableWrapper" class="db-table-wrapper" style="display:none">\n    </div>\n    <div id="saveSuccess" class="tooltip fade">\n      <div class="tooltip-arrow"></div>\n      <div class="tooltip-inner">データを保存しました</div>\n    </div>\n  </div>\n  <div class="sidebar slider-outer">\n    <div class="parts-list-container">\n      <ul id="partsList" class="parts-list">\n      </ul>\n    </div>\n    <div class="slider-wrapper">\n      <div class="slider"></div>\n    </div>\n  </div>\n</div>\n\n<div class="modal fade" id="newPageModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">\n  <div class="modal-dialog modal-new-page">\n    <div class="modal-content">\n      <div class="modal-header">\n        <button type="button" class="close" data-dismiss="modal">\n          <span aria-hidden="true">&times;</span><span class="sr-only">閉じる</span>\n        </button>\n        <h4 class="modal-title" id="myModalLabel">新しいページを追加</h4>\n      </div>\n      <div class="modal-body">\n        <span>ページ名：</span>\n        <div id="newPageName" class="form-group" aria-disabled="false">\n          <input id="newPageNameInput" class="form-control" placeholder="">\n          <span id="newPageNameHelp" class="help-block"></span>\n        </div>\n      </div>\n      <div class="modal-footer">\n        <button type="button" class="btn btn-default" data-dismiss="modal">閉じる</button>\n        <button id="newPageAddButton" type="button" class="btn btn-primary">ページを追加</button>\n      </div>\n    </div>\n  </div>\n</div>';

}
return __p
};

this["JST"]["login"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<header>\n  <div class="left">\n    <i class="logo">\n      <u>GrowUI</u>\n    </i>\n  </div>\n  <div class="right">\n    <button class="btn btn-primary btn-login" id="login">ログイン</button>\n  </div>\n</header>\n<div class="growui-description">\n  <p>コーディング不要<br>ドラッグ＆ドロップだけの新しいWebサービス開発</p>\n  <p>今すぐ始める</p>>\n  <div class="sign-form" id="loginForm">\n    <div class="form-group">\n      <input type="text" value="" placeholder="mail" class="form-control" id="mail">\n      <span class="help-block" id="mailHelpBlock"></span>\n    </div>\n    <div class="form-group">\n      <input type="password" value="" placeholder="pass" class="form-control" id="pass">\n      <span class="help-block" id="passHelpBlock"></span>\n    </div>\n    <button class="btn btn-primary btn-lg btn-regist" id="newRegist">新規会員登録</button>\n    <br>\n    <button class="btn btn-default btn-regist" id="login">ログイン</button>\n  </div>\n</div>\n<div class="main-content">\n  <div class="imac">\n  </div>\n</div>';

}
return __p
};