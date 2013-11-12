'use strict';
var expect = require('expect.js');
var ramlUrl = require('../../../config').url;
describe('shelf',function(){

  beforeEach(function () {
    browser.get(ramlUrl);
    browser.executeScript(function () {
      localStorage['config.updateResponsivenessInterval'] = 1;
      window.onbeforeunload = null;
    });
    browser.wait(function(){
      return editorGetLine(2).then(function(text) {
        return text === 'title:';
      });
    });
  });

  var methods = ['get','post','put','delete','head','patch','options','trace', 'connect'];

  describe('resource-Methods elements',function(){

    it('Methods - check section', function(){
      methods.forEach(function(method){
        var definition = [
          '#%RAML 0.8',
          'title: My api',
          '/res:',
          '  '+method+':',
          '     '
        ].join('\\n');
        editorSetValue(definition);
        editorSetCursor(5,5);
        shelfElementsMethodsByGroupAssertion();
      });
    });

    xdescribe('baseUriParameters - Named Parameters', function(){ // https://www.pivotaltracker.com/story/show/60351064

      it('NamedParameters displayed on the shelf', function(){

        methods.forEach(function(method){
          var definition = [
            '#%RAML 0.8',
            'title: My api',
            'baseUri: http://www.theapi.com/{hola}',
            '/res:',
            '  '+method+':',
            '    baseUriParameters: ',
            '      hola:',
            '          '
          ].join('\\n');
          editorSetValue(definition);
          editorSetCursor(8,9);
          shelfElemNamedParametersByGroupAssertion();
        });
      });

      describe('Not displayed after select', function(){

        it('displayName is no longer displayed on the shelf', function(){
          methods.forEach(function(method){
            var definition = [
              '#%RAML 0.8',
              'title: My api',
              'baseUri: http://www.theapi.com/{hola}',
              '/res:',
              '  '+method+': ',
              '    baseUriParameters: ',
              '      hola:',
              '        displayName:',
              '          '
            ].join('\\n');
            editorSetValue(definition);
            editorSetCursor(9,9);
            var list2 =['displayName'];
            var listPromise = shelfGetListOfElementsFromShelf();
            listPromise.then(function (list) {
              noShelfElementsAssertion(list, shelfGetElemNamedParametersLevel(),list2);
            });
          });
        });

        it('description is no longer displayed on the shelf', function(){
          methods.forEach(function(method){
            var definition = [
              '#%RAML 0.8',
              'title: My api',
              'baseUri: http://www.theapi.com/{hola}',
              '/res:',
              '  '+method+': ',
              '    baseUriParameters: ',
              '      hola:',
              '        description:',
              '           '
            ].join('\\n');
            editorSetValue(definition);
            editorSetCursor(9,9);
            var list2 =['description'];
            var listPromise = shelfGetListOfElementsFromShelf();
            listPromise.then(function (list) {
              noShelfElementsAssertion(list, shelfGetElemNamedParametersLevel(),list2);
            });
          });
        });

        it('example is no longer displayed on the shelf', function(){
          methods.forEach(function(method){
            var definition = [
              '#%RAML 0.8',
              'title: My api',
              'baseUri: http://www.theapi.com/{hola}',
              '/res:',
              '  '+method+': ',
              '    baseUriParameters: ',
              '      hola:',
              '        example:',
              '           '
            ].join('\\n');
            editorSetValue(definition);
            editorSetCursor(9,9);
            var list2 =['example'];
            var listPromise = shelfGetListOfElementsFromShelf();
            listPromise.then(function (list) {
              noShelfElementsAssertion(list, shelfGetElemNamedParametersLevel(),list2);
            });
          });
        });

        it('type is no longer displayed on the shelf', function(){
          methods.forEach(function(method){
            var definition = [
              '#%RAML 0.8',
              'title: My api',
              'baseUri: http://www.theapi.com/{hola}',
              '/res:',
              '  '+method+': ',
              '    baseUriParameters: ',
              '      hola:',
              '        type:',
              '           '
            ].join('\\n');
            editorSetValue(definition);
            editorSetCursor(9,9);
            var list2 =['type'];
            var listPromise = shelfGetListOfElementsFromShelf();
            listPromise.then(function (list) {
              noShelfElementsAssertion(list, shelfGetElemNamedParametersLevel(),list2);
            });
          });
        });

        it('enum is no longer displayed on the shelf', function(){
          methods.forEach(function(method){
            var definition = [
              '#%RAML 0.8',
              'title: My api',
              'baseUri: http://www.theapi.com/{hola}',
              '/res:',
              '  '+method+': ',
              '    baseUriParameters: ',
              '      hola:',
              '        enum:',
              '           '
            ].join('\\n');
            editorSetValue(definition);
            editorSetCursor(9,9);
            var list2 =['enum'];
            var listPromise = shelfGetListOfElementsFromShelf();
            listPromise.then(function (list) {
              noShelfElementsAssertion(list, shelfGetElemNamedParametersLevel(),list2);
            });
          });
        });

        it('pattern is no longer displayed on the shelf', function(){
          methods.forEach(function(method){
            var definition = [
              '#%RAML 0.8',
              'title: My api',
              'baseUri: http://www.theapi.com/{hola}',
              '/res:',
              '  '+method+': ',
              '    baseUriParameters: ',
              '      hola:',
              '        pattern:',
              '            '
            ].join('\\n');
            editorSetValue(definition);
            editorSetCursor(9,9);
            var list2 =['pattern'];
            var listPromise = shelfGetListOfElementsFromShelf();
            listPromise.then(function (list) {
              noShelfElementsAssertion(list, shelfGetElemNamedParametersLevel(),list2);
            });
          });
        });

        it('minLength is no longer displayed on the shelf', function(){
          methods.forEach(function(method){
            var definition = [
              '#%RAML 0.8',
              'title: My api',
              'baseUri: http://www.theapi.com/{hola}',
              '/res:',
              '  '+method+': ',
              '    baseUriParameters: ',
              '      hola:',
              '        minLength:',
              '            '
            ].join('\\n');
            editorSetValue(definition);
            editorSetCursor(9,9);
            var list2 =['minLength'];
            var listPromise = shelfGetListOfElementsFromShelf();
            listPromise.then(function (list) {
              noShelfElementsAssertion(list, shelfGetElemNamedParametersLevel(),list2);
            });
          });
        });

        it('maxLength is no longer displayed on the shelf', function(){
          methods.forEach(function(method){
            var definition = [
              '#%RAML 0.8',
              'title: My api',
              'baseUri: http://www.theapi.com/{hola}',
              '/res:',
              '  '+method+': ',
              '    baseUriParameters: ',
              '      hola:',
              '        maxLength:',
              '           '
            ].join('\\n');
            editorSetValue(definition);
            editorSetCursor(9,9);
            var list2 =['maxLength'];
            var listPromise = shelfGetListOfElementsFromShelf();
            listPromise.then(function (list) {
              noShelfElementsAssertion(list, shelfGetElemNamedParametersLevel(),list2);
            });
          });
        });

        it('maximum is no longer displayed on the shelf', function(){
          methods.forEach(function(method){
            var definition = [
              '#%RAML 0.8',
              'title: My api',
              'baseUri: http://www.theapi.com/{hola}',
              '/res:',
              '  '+method+': ',
              '    baseUriParameters: ',
              '      hola:',
              '        maximum:',
              '          '
            ].join('\\n');
            editorSetValue(definition);
            editorSetCursor(9,9);
            var list2 =['maximum'];
            var listPromise = shelfGetListOfElementsFromShelf();
            listPromise.then(function (list) {
              noShelfElementsAssertion(list, shelfGetElemNamedParametersLevel(),list2);
            });
          });
        });

        it('minimum is no longer displayed on the shelf', function(){
          methods.forEach(function(method){
            var definition = [
              '#%RAML 0.8',
              'title: My api',
              'baseUri: http://www.theapi.com/{hola}',
              '/res:',
              '  '+method+': ',
              '    baseUriParameters: ',
              '      hola:',
              '        minimum:',
              '           '
            ].join('\\n');
            editorSetValue(definition);
            editorSetCursor(9,9);
            var list2 =['minimum'];
            var listPromise = shelfGetListOfElementsFromShelf();
            listPromise.then(function (list) {
              noShelfElementsAssertion(list, shelfGetElemNamedParametersLevel(),list2);
            });
          });
        });

        it('required is no longer displayed on the shelf', function(){
          methods.forEach(function(method){
            var definition = [
              '#%RAML 0.8',
              'title: My api',
              'baseUri: http://www.theapi.com/{hola}',
              '/res:',
              '  '+method+': ',
              '    baseUriParameters: ',
              '      hola:',
              '        required:',
              '           '
            ].join('\\n');
            editorSetValue(definition);
            editorSetCursor(9,9);
            var list2 =['required'];
            var listPromise = shelfGetListOfElementsFromShelf();
            listPromise.then(function (list) {
              noShelfElementsAssertion(list, shelfGetElemNamedParametersLevel(),list2);
            });
          });
        });

        it('default is no longer displayed on the shelf', function(){
          methods.forEach(function(method){
            var definition = [
              '#%RAML 0.8',
              'title: My api',
              'baseUri: http://www.theapi.com/{hola}',
              '/res:',
              '  '+method+': ',
              '    baseUriParameters: ',
              '      hola:',
              '        default:',
              '            '
            ].join('\\n');
            editorSetValue(definition);
            editorSetCursor(9,9);
            var list2 =['default'];
            var listPromise = shelfGetListOfElementsFromShelf();
            listPromise.then(function (list) {
              noShelfElementsAssertion(list, shelfGetElemNamedParametersLevel(),list2);
            });
          });
        });
      }); // Not displayed after being selected

    }); //baseUriParameters

    describe('headers - Named Parameters', function(){

      it('NamedParameters displayed on the shelf', function(){
        methods.forEach(function(method){
          var definition = [
            '#%RAML 0.8',
            'title: My api',
            'baseUri: http://www.theapi.com/{hola}',
            '/res:',
            '  '+method+': ',
            '    headers: ',
            '      hola:',
            '          '
          ].join('\\n');
          editorSetValue(definition);
          editorSetCursor(8,9);
          shelfElemNamedParametersByGroupAssertion();
        });
      });

      describe('Not displayed after select', function(){

        it('displayName is no longer displayed on the shelf', function(){
          methods.forEach(function(method){
            var definition = [
              '#%RAML 0.8',
              'title: My api',
              'baseUri: http://www.theapi.com/{hola}',
              '/res:',
              '  '+method+': ',
              '    headers: ',
              '      hola:',
              '        displayName:',
              '          '
            ].join('\\n');
            editorSetValue(definition);
            editorSetCursor(9,9);
            var list2 =['displayName'];
            var listPromise = shelfGetListOfElementsFromShelf();
            listPromise.then(function (list) {
              noShelfElementsAssertion(list, shelfGetElemNamedParametersLevel(),list2);
            });
          });
        });

        it('description is no longer displayed on the shelf', function(){
          methods.forEach(function(method){
            var definition = [
              '#%RAML 0.8',
              'title: My api',
              'baseUri: http://www.theapi.com/{hola}',
              '/res:',
              '  '+method+': ',
              '    headers: ',
              '      hola:',
              '        description:',
              '           '
            ].join('\\n');
            editorSetValue(definition);
            editorSetCursor(9,9);
            var list2 =['description'];
            var listPromise = shelfGetListOfElementsFromShelf();
            listPromise.then(function (list) {
              noShelfElementsAssertion(list, shelfGetElemNamedParametersLevel(),list2);
            });
          });
        });

        it('example is no longer displayed on the shelf', function(){
          methods.forEach(function(method){
            var definition = [
              '#%RAML 0.8',
              'title: My api',
              'baseUri: http://www.theapi.com/{hola}',
              '/res:',
              '  '+method+': ',
              '    headers: ',
              '      hola:',
              '        example:',
              '           '
            ].join('\\n');
            editorSetValue(definition);
            editorSetCursor(9,9);
            var list2 =['example'];
            var listPromise = shelfGetListOfElementsFromShelf();
            listPromise.then(function (list) {
              noShelfElementsAssertion(list, shelfGetElemNamedParametersLevel(),list2);
            });
          });
        });

        it('type is no longer displayed on the shelf', function(){
          methods.forEach(function(method){
            var definition = [
              '#%RAML 0.8',
              'title: My api',
              'baseUri: http://www.theapi.com/{hola}',
              '/res:',
              '  '+method+': ',
              '    headers: ',
              '      hola:',
              '        type:',
              '           '
            ].join('\\n');
            editorSetValue(definition);
            editorSetCursor(9,9);
            var list2 =['type'];
            var listPromise = shelfGetListOfElementsFromShelf();
            listPromise.then(function (list) {
              noShelfElementsAssertion(list, shelfGetElemNamedParametersLevel(),list2);
            });
          });
        });

        it('enum is no longer displayed on the shelf', function(){
          methods.forEach(function(method){
            var definition = [
              '#%RAML 0.8',
              'title: My api',
              'baseUri: http://www.theapi.com/{hola}',
              '/res:',
              '  '+method+': ',
              '    headers: ',
              '      hola:',
              '        enum:',
              '           '
            ].join('\\n');
            editorSetValue(definition);
            editorSetCursor(9,9);
            var list2 =['enum'];
            var listPromise = shelfGetListOfElementsFromShelf();
            listPromise.then(function (list) {
              noShelfElementsAssertion(list, shelfGetElemNamedParametersLevel(),list2);
            });
          });
        });

        it('pattern is no longer displayed on the shelf', function(){
          methods.forEach(function(method){
            var definition = [
              '#%RAML 0.8',
              'title: My api',
              'baseUri: http://www.theapi.com/{hola}',
              '/res:',
              '  '+method+': ',
              '    headers: ',
              '      hola:',
              '        pattern:',
              '            '
            ].join('\\n');
            editorSetValue(definition);
            editorSetCursor(9,9);
            var list2 =['pattern'];
            var listPromise = shelfGetListOfElementsFromShelf();
            listPromise.then(function (list) {
              noShelfElementsAssertion(list, shelfGetElemNamedParametersLevel(),list2);
            });
          });
        });

        it('minLength is no longer displayed on the shelf', function(){
          methods.forEach(function(method){
            var definition = [
              '#%RAML 0.8',
              'title: My api',
              'baseUri: http://www.theapi.com/{hola}',
              '/res:',
              '  '+method+': ',
              '    headers: ',
              '      hola:',
              '        minLength:',
              '            '
            ].join('\\n');
            editorSetValue(definition);
            editorSetCursor(9,9);
            var list2 =['minLength'];
            var listPromise = shelfGetListOfElementsFromShelf();
            listPromise.then(function (list) {
              noShelfElementsAssertion(list, shelfGetElemNamedParametersLevel(),list2);
            });
          });
        });

        it('maxLength is no longer displayed on the shelf', function(){
          methods.forEach(function(method){
            var definition = [
              '#%RAML 0.8',
              'title: My api',
              'baseUri: http://www.theapi.com/{hola}',
              '/res:',
              '  '+method+': ',
              '    headers: ',
              '      hola:',
              '        maxLength:',
              '           '
            ].join('\\n');
            editorSetValue(definition);
            editorSetCursor(9,9);
            var list2 =['maxLength'];
            var listPromise = shelfGetListOfElementsFromShelf();
            listPromise.then(function (list) {
              noShelfElementsAssertion(list, shelfGetElemNamedParametersLevel(),list2);
            });
          });
        });

        it('maximum is no longer displayed on the shelf', function(){
          methods.forEach(function(method){
            var definition = [
              '#%RAML 0.8',
              'title: My api',
              'baseUri: http://www.theapi.com/{hola}',
              '/res:',
              '  '+method+': ',
              '    headers: ',
              '      hola:',
              '        maximum:',
              '          '
            ].join('\\n');
            editorSetValue(definition);
            editorSetCursor(9,9);
            var list2 =['maximum'];
            var listPromise = shelfGetListOfElementsFromShelf();
            listPromise.then(function (list) {
              noShelfElementsAssertion(list, shelfGetElemNamedParametersLevel(),list2);
            });
          });
        });

        it('minimum is no longer displayed on the shelf', function(){
          methods.forEach(function(method){
            var definition = [
              '#%RAML 0.8',
              'title: My api',
              'baseUri: http://www.theapi.com/{hola}',
              '/res:',
              '  '+method+': ',
              '    headers: ',
              '      hola:',
              '        minimum:',
              '           '
            ].join('\\n');
            editorSetValue(definition);
            editorSetCursor(9,9);
            var list2 =['minimum'];
            var listPromise = shelfGetListOfElementsFromShelf();
            listPromise.then(function (list) {
              noShelfElementsAssertion(list, shelfGetElemNamedParametersLevel(),list2);
            });
          });
        });

        it('required is no longer displayed on the shelf', function(){
          methods.forEach(function(method){
            var definition = [
              '#%RAML 0.8',
              'title: My api',
              'baseUri: http://www.theapi.com/{hola}',
              '/res:',
              '  '+method+': ',
              '    headers: ',
              '      hola:',
              '        required:',
              '           '
            ].join('\\n');
            editorSetValue(definition);
            editorSetCursor(9,9);
            var list2 =['required'];
            var listPromise = shelfGetListOfElementsFromShelf();
            listPromise.then(function (list) {
              noShelfElementsAssertion(list, shelfGetElemNamedParametersLevel(),list2);
            });
          });
        });

        it('default is no longer displayed on the shelf', function(){
          methods.forEach(function(method){
            var definition = [
              '#%RAML 0.8',
              'title: My api',
              'baseUri: http://www.theapi.com/{hola}',
              '/res:',
              '  '+method+': ',
              '    headers: ',
              '      hola:',
              '        default:',
              '            '
            ].join('\\n');
            editorSetValue(definition);
            editorSetCursor(9,9);
            var list2 =['default'];
            var listPromise = shelfGetListOfElementsFromShelf();
            listPromise.then(function (list) {
              noShelfElementsAssertion(list, shelfGetElemNamedParametersLevel(),list2);
            });
          });
        });

      }); // Not displayed after being selected

    }); // headers

    describe('queryParameters - Named Parameters', function(){

      it('NamedParameters displayed on the shelf', function(){
        methods.forEach(function(method){
          var definition = [
            '#%RAML 0.8',
            'title: My api',
            'baseUri: http://www.theapi.com/{hola}',
            '/res:',
            '  '+method+': ',
            '    queryParameters: ',
            '      hola:',
            '          '
          ].join('\\n');
          editorSetValue(definition);
          editorSetCursor(8,9);
          shelfElemNamedParametersByGroupAssertion();
        });
      });

      describe('Not displayed after select', function(){

        it('displayName is no longer displayed on the shelf', function(){
          methods.forEach(function(method){
            var definition = [
              '#%RAML 0.8',
              'title: My api',
              'baseUri: http://www.theapi.com/{hola}',
              '/res:',
              '  '+method+': ',
              '    queryParameters: ',
              '      hola:',
              '        displayName:',
              '          '
            ].join('\\n');
            editorSetValue(definition);
            editorSetCursor(9,9);
            var list2 =['displayName'];
            var listPromise = shelfGetListOfElementsFromShelf();
            listPromise.then(function (list) {
              noShelfElementsAssertion(list, shelfGetElemNamedParametersLevel(),list2);
            });
          });
        });

        it('description is no longer displayed on the shelf', function(){
          methods.forEach(function(method){
            var definition = [
              '#%RAML 0.8',
              'title: My api',
              'baseUri: http://www.theapi.com/{hola}',
              '/res:',
              '  '+method+': ',
              '    queryParameters: ',
              '      hola:',
              '        description:',
              '           '
            ].join('\\n');
            editorSetValue(definition);
            editorSetCursor(9,9);
            var list2 =['description'];
            var listPromise = shelfGetListOfElementsFromShelf();
            listPromise.then(function (list) {
              noShelfElementsAssertion(list, shelfGetElemNamedParametersLevel(),list2);
            });
          });
        });

        it('example is no longer displayed on the shelf', function(){
          methods.forEach(function(method){
            var definition = [
              '#%RAML 0.8',
              'title: My api',
              'baseUri: http://www.theapi.com/{hola}',
              '/res:',
              '  '+method+': ',
              '    queryParameters: ',
              '      hola:',
              '        example:',
              '           '
            ].join('\\n');
            editorSetValue(definition);
            editorSetCursor(9,9);
            var list2 =['example'];
            var listPromise = shelfGetListOfElementsFromShelf();
            listPromise.then(function (list) {
              noShelfElementsAssertion(list, shelfGetElemNamedParametersLevel(),list2);
            });
          });
        });

        it('type is no longer displayed on the shelf', function(){
          methods.forEach(function(method){
            var definition = [
              '#%RAML 0.8',
              'title: My api',
              'baseUri: http://www.theapi.com/{hola}',
              '/res:',
              '  '+method+': ',
              '    queryParameters: ',
              '      hola:',
              '        type:',
              '           '
            ].join('\\n');
            editorSetValue(definition);
            editorSetCursor(9,9);
            var list2 =['type'];
            var listPromise = shelfGetListOfElementsFromShelf();
            listPromise.then(function (list) {
              noShelfElementsAssertion(list, shelfGetElemNamedParametersLevel(),list2);
            });
          });
        });

        it('enum is no longer displayed on the shelf', function(){
          methods.forEach(function(method){
            var definition = [
              '#%RAML 0.8',
              'title: My api',
              'baseUri: http://www.theapi.com/{hola}',
              '/res:',
              '  '+method+': ',
              '    queryParameters: ',
              '      hola:',
              '        enum:',
              '           '
            ].join('\\n');
            editorSetValue(definition);
            editorSetCursor(9,9);
            var list2 =['enum'];
            var listPromise = shelfGetListOfElementsFromShelf();
            listPromise.then(function (list) {
              noShelfElementsAssertion(list, shelfGetElemNamedParametersLevel(),list2);
            });
          });
        });

        it('pattern is no longer displayed on the shelf', function(){
          methods.forEach(function(method){
            var definition = [
              '#%RAML 0.8',
              'title: My api',
              'baseUri: http://www.theapi.com/{hola}',
              '/res:',
              '  '+method+': ',
              '    queryParameters: ',
              '      hola:',
              '        pattern:',
              '            '
            ].join('\\n');
            editorSetValue(definition);
            editorSetCursor(9,9);
            var list2 =['pattern'];
            var listPromise = shelfGetListOfElementsFromShelf();
            listPromise.then(function (list) {
              noShelfElementsAssertion(list, shelfGetElemNamedParametersLevel(),list2);
            });
          });
        });

        it('minLength is no longer displayed on the shelf', function(){
          methods.forEach(function(method){
            var definition = [
              '#%RAML 0.8',
              'title: My api',
              'baseUri: http://www.theapi.com/{hola}',
              '/res:',
              '  '+method+': ',
              '    queryParameters: ',
              '      hola:',
              '        minLength:',
              '            '
            ].join('\\n');
            editorSetValue(definition);
            editorSetCursor(9,9);
            var list2 =['minLength'];
            var listPromise = shelfGetListOfElementsFromShelf();
            listPromise.then(function (list) {
              noShelfElementsAssertion(list, shelfGetElemNamedParametersLevel(),list2);
            });
          });
        });

        it('maxLength is no longer displayed on the shelf', function(){
          methods.forEach(function(method){
            var definition = [
              '#%RAML 0.8',
              'title: My api',
              'baseUri: http://www.theapi.com/{hola}',
              '/res:',
              '  '+method+': ',
              '    queryParameters: ',
              '      hola:',
              '        maxLength:',
              '           '
            ].join('\\n');
            editorSetValue(definition);
            editorSetCursor(9,9);
            var list2 =['maxLength'];
            var listPromise = shelfGetListOfElementsFromShelf();
            listPromise.then(function (list) {
              noShelfElementsAssertion(list, shelfGetElemNamedParametersLevel(),list2);
            });
          });
        });

        it('maximum is no longer displayed on the shelf', function(){
          methods.forEach(function(method){
            var definition = [
              '#%RAML 0.8',
              'title: My api',
              'baseUri: http://www.theapi.com/{hola}',
              '/res:',
              '  '+method+': ',
              '    queryParameters: ',
              '      hola:',
              '        maximum:',
              '          '
            ].join('\\n');
            editorSetValue(definition);
            editorSetCursor(9,9);
            var list2 =['maximum'];
            var listPromise = shelfGetListOfElementsFromShelf();
            listPromise.then(function (list) {
              noShelfElementsAssertion(list, shelfGetElemNamedParametersLevel(),list2);
            });
          });
        });

        it('minimum is no longer displayed on the shelf', function(){
          methods.forEach(function(method){
            var definition = [
              '#%RAML 0.8',
              'title: My api',
              'baseUri: http://www.theapi.com/{hola}',
              '/res:',
              '  '+method+': ',
              '    queryParameters: ',
              '      hola:',
              '        minimum:',
              '           '
            ].join('\\n');
            editorSetValue(definition);
            editorSetCursor(9,9);
            var list2 =['minimum'];
            var listPromise = shelfGetListOfElementsFromShelf();
            listPromise.then(function (list) {
              noShelfElementsAssertion(list, shelfGetElemNamedParametersLevel(),list2);
            });
          });
        });

        it('required is no longer displayed on the shelf', function(){
          methods.forEach(function(method){
            var definition = [
              '#%RAML 0.8',
              'title: My api',
              'baseUri: http://www.theapi.com/{hola}',
              '/res:',
              '  '+method+': ',
              '    queryParameters: ',
              '      hola:',
              '        required:',
              '           '
            ].join('\\n');
            editorSetValue(definition);
            editorSetCursor(9,9);
            var list2 =['required'];
            var listPromise = shelfGetListOfElementsFromShelf();
            listPromise.then(function (list) {
              noShelfElementsAssertion(list, shelfGetElemNamedParametersLevel(),list2);
            });
          });
        });

        it('default is no longer displayed on the shelf', function(){
          methods.forEach(function(method){
            var definition = [
              '#%RAML 0.8',
              'title: My api',
              'baseUri: http://www.theapi.com/{hola}',
              '/res:',
              '  '+method+': ',
              '    queryParameters: ',
              '      hola:',
              '        default:',
              '            '
            ].join('\\n');
            editorSetValue(definition);
            editorSetCursor(9,9);
            var list2 =['default'];
            var listPromise = shelfGetListOfElementsFromShelf();
            listPromise.then(function (list) {
              noShelfElementsAssertion(list, shelfGetElemNamedParametersLevel(),list2);
            });
          });
        });

      }); // Not displayed after being selected

    }); //queryParameters

    describe('response', function(){

    }); //response

    describe('body', function(){

    }); //body

    describe('Method level - not displayed after being selected', function(){

      it('protocols is no longer displayed on the shelf', function(){
        methods.forEach(function(method){
          var definition = [
            '#%RAML 0.8',
            'title: My api',
            '/res:',
            '  '+method+': ',
            '    protocols: ',
            '       '
          ].join('\\n');
          editorSetValue(definition);
          editorSetCursor(5,5);
          var list2 =['protocols'];
          var listPromise = shelfGetListOfElementsFromShelf();
          listPromise.then(function (list) {
            noShelfElementsAssertion(list, shelfGetElemMethodLevel(),list2);
          });
        });
      });

      it('description is no longer displayed on the shelf', function(){
        methods.forEach(function(method){
          var definition = [
            '#%RAML 0.8',
            'title: My api',
            '/res:',
            '  '+method+': ',
            '    description: ',
            '       '
          ].join('\\n');
          editorSetValue(definition);
          editorSetCursor(5,5);
          var list2 =['description'];
          var listPromise = shelfGetListOfElementsFromShelf();
          listPromise.then(function (list) {
            noShelfElementsAssertion(list, shelfGetElemMethodLevel(),list2);
          });
        });
      });

      it('baseUriParameters is no longer displayed on the shelf', function(){
        methods.forEach(function(method){
          var definition = [
            '#%RAML 0.8',
            'title: My api',
            '/res:',
            '  '+method+': ',
            '    baseUriParameters: ',
            '       '
          ].join('\\n');
          editorSetValue(definition);
          editorSetCursor(5,5);
          var list2 =['baseUriParameters'];
          var listPromise = shelfGetListOfElementsFromShelf();
          listPromise.then(function (list) {
            noShelfElementsAssertion(list, shelfGetElemMethodLevel(),list2);
          });
        });
      });

      it('headers is no longer displayed on the shelf', function(){
        methods.forEach(function(method){
          var definition = [
            '#%RAML 0.8',
            'title: My api',
            '/res:',
            '  '+method+': ',
            '    headers: ',
            '       '
          ].join('\\n');
          editorSetValue(definition);
          editorSetCursor(5,5);
          var list2 =['headers'];
          var listPromise = shelfGetListOfElementsFromShelf();
          listPromise.then(function (list) {
            noShelfElementsAssertion(list, shelfGetElemMethodLevel(),list2);
          });
        });
      });

      it('queryParameters is no longer displayed on the shelf', function(){
        methods.forEach(function(method){
          var definition = [
            '#%RAML 0.8',
            'title: My api',
            '/res:',
            '  '+method+': ',
            '    queryParameters: ',
            '       '
          ].join('\\n');
          editorSetValue(definition);
          editorSetCursor(5,5);
          var list2 =['queryParameters'];
          var listPromise = shelfGetListOfElementsFromShelf();
          listPromise.then(function (list) {
            noShelfElementsAssertion(list, shelfGetElemMethodLevel(),list2);
          });
        });
      });

      it('responses is no longer displayed on the shelf', function(){
        methods.forEach(function(method){
          var definition = [
            '#%RAML 0.8',
            'title: My api',
            '/res:',
            '  '+method+': ',
            '    responses: ',
            '       '
          ].join('\\n');
          editorSetValue(definition);
          editorSetCursor(5,5);
          var list2 =['responses'];
          var listPromise = shelfGetListOfElementsFromShelf();
          listPromise.then(function (list) {
            noShelfElementsAssertion(list, shelfGetElemMethodLevel(),list2);
          });
        });
      });

      it('securedBy is no longer displayed on the shelf', function(){
        methods.forEach(function(method){
          var definition = [
            '#%RAML 0.8',
            'title: My api',
            '/res:',
            '  '+method+': ',
            '    securedBy: ',
            '       '
          ].join('\\n');
          editorSetValue(definition);
          editorSetCursor(5,5);
          var list2 =['securedBy'];
          var listPromise = shelfGetListOfElementsFromShelf();
          listPromise.then(function (list) {
            noShelfElementsAssertion(list, shelfGetElemMethodLevel(),list2);
          });
        });
      });

      it('IS is no longer displayed on the shelf', function(){
        methods.forEach(function(method){
          var definition = [
            '#%RAML 0.8',
            'title: My api',
            '/res:',
            '  '+method+': ',
            '    is: ',
            '       '
          ].join('\\n');
          editorSetValue(definition);
          editorSetCursor(5,5);
          var list2 =['is'];
          var listPromise = shelfGetListOfElementsFromShelf();
          listPromise.then(function (list) {
            noShelfElementsAssertion(list, shelfGetElemMethodLevel(),list2);
          });
        });
      });

      it('body is no longer displayed on the shelf', function(){
        methods.forEach(function(method){
          var definition = [
            '#%RAML 0.8',
            'title: My api',
            '/res:',
            '  '+method+': ',
            '    body: ',
            '       '
          ].join('\\n');
          editorSetValue(definition);
          editorSetCursor(5,5);
          var list2 =['body'];
          var listPromise = shelfGetListOfElementsFromShelf();
          listPromise.then(function (list) {
            noShelfElementsAssertion(list, shelfGetElemMethodLevel(),list2);
          });
        });
      });

    }); // not displayed after being selected
  });//resource-Methods elements
}); // shelf