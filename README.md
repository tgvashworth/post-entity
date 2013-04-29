# post-entity

[![build status](https://secure.travis-ci.org/phuu/post-entity.png)](http://travis-ci.org/phuu/post-entity)

Extract entities and process a post (tweet, status etc) into text and entity blocks.

## Usage

Assume the following:

```javascript
var pe = require('post-entity'),
    post = 'Hey. This #tweet is @you cos $APPL is at http://apple.com.',
```

Extract the entities:

```javascript
var entities = pe.entities(post);

/*
entities =
[ { type: 'hashtag', index: 10, raw: '#tweet' },
  { type: 'mention', index: 20, raw: '@you' },
  { type: 'cashtag', index: 29, raw: '$APPL' },
  { type: 'link', index: 41, raw: 'http://apple.com' } ]
 */
```

Process into entity/text array:

```javascript
var result = pe.process(post);

/*
result =
[ { type: 'text', raw: 'Hey. This ', index: 0 },
  { type: 'hashtag', index: 10, raw: '#tweet' },
  { type: 'text', raw: ' is ', index: 16 },
  { type: 'mention', index: 20, raw: '@you' },
  { type: 'text', raw: ' cos ', index: 24 },
  { type: 'cashtag', index: 29, raw: '$APPL' },
  { type: 'text', raw: ' is at ', index: 34 },
  { type: 'link', index: 41, raw: 'http://apple.com' },
  { type: 'text', raw: '.', index: 57 } ]
 */
```

## Install

`npm install post-entity`

## Lisence

MIT