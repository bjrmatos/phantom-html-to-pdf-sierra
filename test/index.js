'use strict';

var path = require('path');
var expect = require('chai').expect;

var htmlToPdf = require('../')({
  strategy: 'dedicated-process'
});

var workers = require('../indexWorker')({
  pathToPhantomScript: path.join(__dirname, '../script.js'),
  timeout: 15000,
  numberOfWorkers: 2
});

describe('phantom-html-to-pdf-sierra', function() {
  it('should render normally', function(done) {
    htmlToPdf({ html: '<h1>Hello World</h1>' }, (err, pdf) => {
      if (err) {
        console.error('Error in test:', err);

        if (err.message.indexOf('if you are using macOS Sierra') !== -1) {
          return done();
        }

        return done(err);
      }

      console.log(pdf.logs);

      expect(pdf.logs).to.have.length.of.at.least(1);
      expect(pdf.numberOfPages).to.be.eql(1);
      done();
    });
  });
});

describe('phantom-workers-sierra', function() {
  it('should start normally', function(done) {
    workers.start(function(err) {
      if (err) {
        console.error('Error in test while starting:', err);

        if (err.message.indexOf('if you are using macOS Sierra') !== -1) {
          return done();
        }

        return done(err);
      }

      workers.execute({ url: 'https://jsreport.net' }, function(err, res) {
        if (err) {
          console.error('Error in test while executing:', err);

          return done(err);
        }

        console.log(res);
        done();
      });
    });
  });
});
