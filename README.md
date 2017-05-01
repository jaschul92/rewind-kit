# rewind-kit
Client for api.rewindkit.com

### Installation:
```
npm install rewind-kit --save
```

### Usage:

```
// Initialize client:

var RewindKit = require('rewind-kit')

const key = 'testKey'
const secret = 'testSecret'
const userId = 'testUserId'

var client = new RewindKit(key, secret, userId)

// GET all ops for a document
client.getOps(docId, function (error, response, body){})

// POST a single op to a document
client.postOp(docId, sequence, version, ops, ts, docType, function (error, response, body){})

```
