const express = require('express');
const redis = require('redis');

const app = express();
const client = redis.createClient();


// post route
app.post('/messages/:key', (req, res) => {
  const { key } = req.params;
  const { message } = req.body;

  // store msg in redis
  client.setex(key, 60, message, (err) => {
    if (err) {
      //  Redis errors
      console.error(err);
      return res.status(500).send('Internal server error');
      
    }
    res.send('Message stored successfully');
  });
});

// get route
app.get('/messages/:key', (req, res) => {
  const { key } = req.params;

  // get msg from redis
  client.get(key, (err, message) => {
    if (err) {
   
      console.error(err);
      return  res.status(500).send('Internal server error');
    
    }
    if (message === null) {
      
        return res.status(404).send('Message not found');
     
    }
    res.json({ message });
  });
});


app.listen(3000, () => {
  console.log('Server listening on port 3000');
});
