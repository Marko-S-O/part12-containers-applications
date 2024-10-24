const express = require('express');
const router = express.Router();

const { getAsync } = require('../redis')

const configs = require('../util/config')

let visits = 0

/* GET index data. */
router.get('/', async (req, res) => {
  visits++

  res.send({
    ...configs,
    visits
  });
});

router.get('/statistics', async (_, res) => {
  const counterValue = await getAsync('todoCount')
  const json = {'added_todos': counterValue}
  res.send(json);
  console.log('yes!')
});

module.exports = router;
