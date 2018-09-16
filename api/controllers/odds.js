'use-strict'

module.exports = {
  get_odds: get_odds,
}

const
  request = require('request'),
  cheerio = require('cheerio');

function get_odds(req, res, next) {
  let
    url = req.swagger.params.url.value,
    elem = req.swagger.params.elem.value || 'body',
    id = req.swagger.params.id.value ? '#' + req.swagger.params.id.value : '',
    clas = req.swagger.params.clas.value ? '.' + req.swagger.params.clas.value : '';

  request(url, (err, response, body) => {
    if (!err) {
      const
        $ = cheerio.load(body),
        containedId = $(id)[0],
        containedClass = $(clas)[0];

      if (containedId || containedClass) {
        const html = $(elem + ' ' + clas + ' ' + id).html();
        res.json({success: true, data: html});
      } else res.json({ message: 'class or id does not exist in document', code: 404 })
    } else res.json(err)
  })
}