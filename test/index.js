'use strict';

var expect = require('chai').expect;
var htmlToPdf = require('phantom-html-to-pdf')();

describe('phantom-html-to-pdf-sierra', function() {
  it('should render normally', function(done) {
    htmlToPdf({ html: '<h1>Hello World</h1>' }, (err, pdf) => {
      if (err) {
        return done(err);
      }

      expect(pdf.logs).to.have.length.of.at.least(1);
      expect(pdf.numberOfPages).to.be.eql(1);
      done();
    });
  });
});
