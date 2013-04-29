var t = require("tap"),
    pe = require('../');

t.test("entities", function (t) {
  t.test('hashtag', function (t) {
    var result = pe.entities('This is my #first.');
    t.equal(result[0].raw, '#first');
    t.equal(result[0].index, 11);
    t.end();
  });

  t.test('cashtag', function (t) {
    var result = pe.entities('This is my $APPL.');
    t.equal(result[0].raw, '$APPL');
    t.equal(result[0].index, 11);
    t.end();
  });

  t.test('hashtags', function (t) {
    var result = pe.entities('This is my #first and #second.');
    t.equal(result[0].raw, '#first');
    t.equal(result[0].index, 11);
    t.equal(result[1].raw, '#second');
    t.equal(result[1].index, 22);
    t.end();
  });

  t.test('mention', function (t) {
    var result = pe.entities('This is my @first.');
    t.equal(result[0].raw, '@first');
    t.equal(result[0].index, 11);
    t.end();
  });

  t.test('mentions', function (t) {
    var result = pe.entities('This is my @first and @second.');
    t.equal(result[0].raw, '@first');
    t.equal(result[0].index, 11);
    t.equal(result[1].raw, '@second');
    t.equal(result[1].index, 22);
    t.end();
  });

  t.test('link', function (t) {
    var result = pe.entities('This is my http://first.net.');
    t.equal(result[0].raw, 'http://first.net');
    t.equal(result[0].index, 11);
    t.end();
  });

  t.test('links', function (t) {
    var result = pe.entities('This is my http://first.net and http://second.org.');
    t.equal(result[0].raw, 'http://first.net');
    t.equal(result[0].index, 11);
    t.equal(result[1].raw, 'http://second.org');
    t.equal(result[1].index, 32);
    t.end();
  });

  t.test('hashtags, mentions & links', function (t) {
    var result = pe.entities('This is my #first and @second and http://third.com.');
    t.equal(result[0].raw, '#first');
    t.equal(result[0].index, 11);
    t.equal(result[1].raw, '@second');
    t.equal(result[1].index, 22);
    t.equal(result[2].raw, 'http://third.com');
    t.equal(result[2].index, 34);
    t.end();
  });

  t.test('crazy', function (t) {
    var result = pe.entities('Another #super cool #x-post by @yAW_momma. #Get_it from http://the-google.net.');
    t.equal(result.length, 5);
    t.equal(result[0].raw, '#super');
    t.equal(result[1].raw, '#x');
    t.equal(result[2].raw, '@yAW_momma');
    t.equal(result[3].raw, '#Get_it');
    t.equal(result[4].raw, 'http://the-google.net');
    t.end();
  });

  t.test('multiline', function (t) {
    var result = pe.entities('More \n $APPL \n nesses #yolo');
    t.equal(result.length, 2);
    t.equal(result[0].raw, '$APPL');
    t.equal(result[1].raw, '#yolo');
    t.end();
  });

  t.test('nothing from empty string', function (t) {
    var result = pe.entities('');
    t.equal(result.length, 0);
    t.end();
  });

  t.test('throws', function (t) {
    t.plan(1);
    try {
      var result = pe.entities();
    } catch (e) {
      t.ok(true);
    }
    t.end();
  });

  t.end();
});

t.test("process", function (t) {
  var str, result, resStr;

  str = 'This is my #first crosspost from #twapp by @phuu. You can get it from http://twapp.phuu.net.';
  result = pe.process(str);
  resStr = result.map(function (e) { return e.raw; }).join('');
  t.equal(str, resStr);
  t.equal(result.length, 9);

  str = '#here is another @great post from #me.';
  result = pe.process(str);
  resStr = result.map(function (e) { return e.raw; }).join('');
  t.equal(str, resStr);
  t.equal(result.length, 6);

  str = '@yep $APPL is doing #great http://apple.com.';
  result = pe.process(str);
  resStr = result.map(function (e) { return e.raw; }).join('');
  t.equal(str, resStr);
  t.equal(result.length, 8);

  t.end();
});