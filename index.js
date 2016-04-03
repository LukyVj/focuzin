const express = require('express'),
      url = require('url'),
      http = require('http'),
      qs = require('querystring'),
      request = require('request').defaults({ encoding: null }),
      gm = require('gm'),
      imageMagick = gm.subClass({ imageMagick: true }),
      app = express(),
      open = require("open-uri"),
      fs =  require('fs'),
      phantom = require('phantom-render-stream'),
      render = phantom(),
      jade = require('jade');



  app.use(
    express.static(__dirname + '/public')
  );


  app.set('view engine', 'jade')

  app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

  app.get('/', function(req, res){

    var location = qs.parse(url.parse(req.url).query).u,
        y = qs.parse(url.parse(req.url).query).y,
        x = qs.parse(url.parse(req.url).query).x,
        w = qs.parse(url.parse(req.url).query).w,
        h = qs.parse(url.parse(req.url).query).h,
        c = qs.parse(url.parse(req.url).query).c,
        gui = qs.parse(url.parse(req.url).query).gui || false;

    request.get(location, function (error, response, body) {
      if (!error && response.statusCode == 200) {

        data =  new Buffer(body).toString('base64');
        body = '<img src="data:image/png;base64,'+data+'" id="jscii-element-image"/>'+
        '<div id="ascii-container-image"></div>';


        res.render('index', {
          original: location,
          y: y,
          x: x,
          w: w,
          h: h,
          c: c,
          gui: gui
        });
      }
    });
  });


  app.get('/ascii', function(req, res) {
    fs.readFile('./ascii.html', 'utf8', function (err,data) {
      if (err) {
        return console.log(err);
      }
      res.send(data);
    });
  });
  app.listen(process.env.PORT || 3000);

