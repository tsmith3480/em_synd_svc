'use-strict'

module.exports = {
  best_bets: best_bets,
}

const
  request = require('request'),
  cheerio = require('cheerio'),
  himalaya = require('himalaya'),
  htm2json = require('html-to-json');

function best_bets(req, res, next) {
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

        htm2json
          .parse(html, ['p', (p) => ({ elem: p.text() })])
          .done(items => (
            res.json(items)
          ), err => (
            res.json(err)
          ))
      } else res.json({ message: 'class or id does not exist in document', code: 404 })
    } else res.json(err)
  })
}