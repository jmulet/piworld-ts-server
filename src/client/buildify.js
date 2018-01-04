const buildify = require("buildify");

buildify()
  .load('./node_modules/jquery/dist/jquery.min.js')
  .concat([ 
           './node_modules/bootstrap/dist/js/bootstrap.min.js'])
  .save('./public/assets/bundles/pw-bootstrap.js');



buildify()
.load('./node_modules/jquery/dist/jquery.min.js')
.concat([ 
         './node_modules/bootstrap/dist/js/bootstrap.min.js',
         './node_modules/angular/angular.min.js',
         './node_modules/angular-sanitize/angular-sanitize.min.js'])
.save('./public/assets/bundles/pw-angular.js');