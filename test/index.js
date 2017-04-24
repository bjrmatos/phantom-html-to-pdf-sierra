'use strict';

var expect = require('chai').expect;

var htmlToPdf = require('../')({
  strategy: 'dedicated-process'
});

describe('phantom-html-to-pdf-sierra', function() {
  it('should render normally', function(done) {
    htmlToPdf({ html: '<h1>Hello World</h1>' }, (err, pdf) => {
      if (err) {
        console.error('Error in test:', err);

        if (err.message.indexOf('if you are using macOS Sierra remember that phantomjs') !== -1) {
          return done()
        }

        return done(err);
      }

      console.log(pdf.logs)

      expect(pdf.logs).to.have.length.of.at.least(1);
      expect(pdf.numberOfPages).to.be.eql(1);
      done();
    });
  });
});
