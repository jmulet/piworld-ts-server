const buildify = require("buildify");

// Create a vendor ejson bundle
buildify()
  .load('../../node_modules/ejson/vendor/base64.js')
  .concat(['./node_modules/underscore/underscore-min.js',
           '../../node_modules/ejson/vendor/ejson.js',
           '../../node_modules/ejson/vendor/stringify.js'])
  .uglify()
  .save('./public/assets/libs/ejson-vendor-bundle.min.js');

 

// Basic jquery + bootstrap bundle
buildify()
  .load('./node_modules/jquery/dist/jquery.min.js')
  .concat(['./public/assets/libs/ejson-vendor-bundle.min.js', 
           './node_modules/bootstrap/dist/js/bootstrap.min.js',
           './node_modules/jquery-slimscroll/jquery.slimscroll.min.js',
           './node_modules/fastclick/lib/fastclick.js'])
  .save('./public/assets/libs/bootstrap/pw-bootstrap.js');


// Bundle for most common ng-modules
buildify()
.load('./node_modules/angular-ui-bootstrap/dist/ui-bootstrap-tpls.js')
.concat([
         './public/assets/libs/angular/growl/angular-growl.js', 
         './public/assets/libs/ng-modules/modals/Modals.js',
         './public/assets/libs/ng-modules/Auth.js',
         './public/assets/libs/ng-modules/PwTable.js',
         './public/assets/libs/ng-modules/Translate.js'])
         .uglify()
.save('./public/assets/libs/ng-modules/pw-modules-basic.js');


// Angular jquery -- contains the most common ng-modules
buildify()
.load('./node_modules/jquery/dist/jquery.min.js')
.concat([ './public/assets/libs/ejson-vendor-bundle.min.js',
         '../../node_modules/socket.io-client/dist/socket.io.js'])
.concat(['./public/assets/libs/socketio-ejson-parser.js']).uglify()
.concat([
         './node_modules/bootstrap/dist/js/bootstrap.min.js',
         './node_modules/jquery-slimscroll/jquery.slimscroll.min.js',
         './node_modules/fastclick/lib/fastclick.js',
         './node_modules/angular/angular.min.js',
         './node_modules/angular-sanitize/angular-sanitize.min.js',
         './public/assets/libs/ng-modules/pw-modules-basic.js'])
.save('./public/assets/libs/angular/pw-angular-basic.js');


// Copy / bundle / minify css files from node_modules to assets/libs/   
buildify()
  .load('./node_modules/bootstrap/dist/css/bootstrap.min.css')
  .concat(['./node_modules/bootstrap/dist/css/bootstrap-theme.min.css',
           './node_modules/fontawesome-web/css/fontawesome-all.min.css',
           './mystyles.css'])   
  .save('./public/assets/libs/bootstrap/pw-bootstrap.min.css');

  buildify()
  .load('./node_modules/bootstrap/dist/css/bootstrap.min.css')
  .concat(['./node_modules/bootstrap/dist/css/bootstrap-theme.min.css',
           './node_modules/fontawesome-web/css/fontawesome-all.min.css',
           './node_modules/ionicons/dist/css/ionicons.min.css',
           './public/assets/libs/angular/growl/angular-growl.min.css',
           './mystyles.css'])   
  .save('./public/assets/libs/angular/pw-angular-basic.min.css');


// Admin lte
buildify()
.load('./node_modules/adminlte-full/dist/js/app.min.js')  
.save('./public/assets/libs/adminlte/AdminLTE.min.js');

buildify()
.load('./node_modules/adminlte-full/dist/css/AdminLTE.css') 
.concat(['./node_modules/adminlte-full/dist/css/skins/skin-blue.min.css',
         './node_modules/adminlte-full/dist/css/skins/skin-blue-light.min.css',
         './node_modules/adminlte-full/dist/css/skins/skin-red.min.css',
         './node_modules/adminlte-full/dist/css/skins/skin-red-light.min.css',
         './node_modules/adminlte-full/dist/css/skins/skin-black.min.css',
         './node_modules/adminlte-full/dist/css/skins/skin-black-light.min.css',
         './adminlte.css'])    
.save('./public/assets/libs/adminlte/AdminLTE.min.css');

