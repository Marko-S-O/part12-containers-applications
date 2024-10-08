const express = require('express');
const { Todo } = require('../mongo')
const { getAsync, setAsync } = require('../redis')
const router = express.Router();

/* GET todos listing. */
router.get('/', async (_, res) => {
  const todos = await Todo.find({})
  res.send(todos);
});

router.get('/statistics', async (_, res) => {
  const counterValue = await getAsync('todoCount')
  const json = {'added_todos': counterValue}
  res.send(json);
});

/* POST todo to listing. */
router.post('/', async (req, res) => {
  const todo = await Todo.create({
    text: req.body.text,
    done: false
  })
  var counterValue = await getAsync('todoCount')
  counterValue++
  await setAsync('todoCount', counterValue)
  res.send(todo);
});

const findByIdMiddleware = async (req, res, next) => {
  const { id } = req.params
  const todo = await Todo.findById(id)
  req.todo = todo
  if (!todo) {
    console.log('todo not found: ' + id)
    return res.sendStatus(404)
  }
  next()
}

const singleRouter = express.Router();

/* DELETE todo. */
singleRouter.delete('/', async (req, res) => {
  await req.todo.delete()  
  res.sendStatus(200);
});

/* GET todo. */
singleRouter.get('/', (req, res) => {
  console.log('get /:id')
  res.json(req.todo)
});

/* PUT todo. */
singleRouter.put('/', async (req, res) => {

  const { _id, text, done } = req.todo
  
  const id = _id

  const datafields = {}
  if (text) datafields.text = text
  if (req.body.hasOwnProperty('done')) datafields.done = done;

  Todo.findByIdAndUpdate(id, datafields, {new: true}).then(todo => {
    if(todo) {
       res.json(todo)
     } else {
      res.status(404).send({ error: 'todo ' + id + ' not found in DB' })
    }
  })
  .catch(error => next(error))
});

router.use('/:id', findByIdMiddleware, singleRouter);

module.exports = router;
