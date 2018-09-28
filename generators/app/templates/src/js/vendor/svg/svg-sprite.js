// <script>loadSVG('full/url/to/file.svg')</script> disable cache
// <script>loadSVG('full/url/to/file.svg', '1.0')</script> set version of svg file
// <script>loadSVG('full/url/to/file.svg', false, 'customNameKeyContentData', 'customNameKeyContentVersion')</script> set custom keys for local storage of svg file without cache

!function(win) {
  win.loadSVG = function(path, revision, dataName, revisionName) {
    'use strict';
    if (typeof revision == 'undefined' || revision === false) {
      revision = new Date().getTime().toString();
    }
    if (typeof dataName == 'undefined') {
      dataName = 'inlineSVGdata';
    }

    if (typeof revisionName == 'undefined') {
      revisionName = 'inlineSVGrev';
    }

    if (!win.document.createElementNS || !win.document.createElementNS('http://www.w3.org/2000/svg', 'svg').createSVGRect)
      return true;

    var isLocalStorage = 'localStorage' in win && win['localStorage'] !== null,
      request,
      data,
      insertIT = function() {
        win.document.body.insertAdjacentHTML('afterbegin', data);
      },
      insert = function() {
        if (win.document.body)
          insertIT();
        else
          win.document.addEventListener('DOMContentLoaded', insertIT);
      }
      ;

    if (isLocalStorage && localStorage.getItem(revisionName) === revision) {
      data = localStorage.getItem(dataName);
      if (data) {
        insert();
        return true;
      }
    }

    try {
      request = new XMLHttpRequest();
      request.open('GET', path, true);
      request.onload = function() {
        if (request.status >= 200 && request.status < 400) {
          data = request.responseText;
          insert();
          if (isLocalStorage) {
            localStorage.setItem(dataName, data);
            localStorage.setItem(revisionName, revision);
          }
        }
      };
      request.send();
    } catch (e) {}
  };
}(window);
