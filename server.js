var express = require('express');
var bodyParser = require('body-parser');
var yosys2digitaljs = require('./index.js');
var server = express();

server.use(
  express.urlencoded({
    extended: true
  })
)

server.use(express.json());
server.use(bodyParser.json());

port = process.env.PORT || 3040;

server.listen(port);

server.post('/getJSON', (req, res, next) => {
  var reqCode = req.body.code;

  const yosysResult = yosys2digitaljs.process_sv(reqCode);
  yosysResult.then(yosysResult => {
    res.json(yosysResult.output);
  }).catch(err => {
    res.status(400).send({
      message:  err.stderr
  })
  })
})