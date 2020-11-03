var express = require('express'),
  bodyParser = require('body-parser');
yosys2digitaljs = require('./index.js'),
server = express();

server.use(
  express.urlencoded({
    extended: true
  })
)

server.use(express.json());
server.use(bodyParser.json());

port = process.env.PORT || 3040;

server.listen(port);

var sampleVerilogCode = "module counter (clk, rst, en, count); input clk, rst, en; output reg [3:0] count; always @(posedge clk) if (rst) count <= 4'd0; else if (en) count <= count + 4'd1; endmodule"

getJSON = function(req, res) {
  const yosysResult = yosys2digitaljs.process_sv(sampleVerilogCode);
  yosysResult.then( yosysResult => {
    const output = yosysResult.output;
    res.json(output);
  })
}

server.route('/getJSON')
  .get(getJSON)

server.post('/getJSON', (req, res) => {
  var reqCode = req.body.code;
  console.log(req);

  const yosysResult = yosys2digitaljs.process_sv(reqCode);
  yosysResult.then( yosysResult => {
    const output = yosysResult.output;
    console.log(output)
    res.json(output);
  })
})