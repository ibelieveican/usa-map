function Mock(app) {
  app.get('/api/us_daily_perception', function (req, res) {
    res.json(require('./api/us_daily_perception.json'))
  })
  app.get('/api/historical', function (req, res) {
    res.json(require('./api/historical.json'))
  })
  app.get('/api/daily_perception/state_id/26', function (req, res) {
    res.json(require('./api/daily_perception_state_id.json'))
  })
  app.get('/api/state_reopening_status', function (req, res) {
    res.json(require('./api/state_reopening_status.json'))
  })
  app.get('/api/daily_perception/latest', function (req, res) {
    res.json(require('./api/daily_perception_latest.json'))
  })
  app.get('/v2/all', function (req, res) {
    res.json(require('./v2/all.json'))
  })
  app.get('/v2/states', function (req, res) {
    res.json(require('./v2/states.json'))
  })
  app.get('/api/allcovid', function (req, res) {
    res.json(require('./v2/all.json'))
  })
  app.get('/api/statescovid', function (req, res) {
    res.json(require('./v2/states.json'))
  })
}

module.exports = Mock