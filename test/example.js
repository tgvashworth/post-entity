var pe = require('../');
var post = 'Hey. This #tweet is @you cos $APPL is at http://apple.com.';

var entities = pe.entities(post);
console.log(entities);

var result = pe.process(post);
console.log(result);
