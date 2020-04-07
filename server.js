const express = require('express')
const bodyParser = require('body-parser')
const app = express()

//app.use(express.urlencoded({ extended: true }))
app.use(express.json())
var done = false;
let todos = [
    //{ task: 'Buy Eggs', done: false, due: '2020-04-05' },
    //{ task: 'Learn JS', done: false, due: '2020-04-06' },
    // { task: 'Make Pizza', done: true, due: '2020-04-01' },
    // { task: 'Practice Coding', done: false, due: '2020-04-03' }

]

//add data to html page and then serve it to browser
app.use('/', express.static(__dirname + '/front-end'))

app.get('/todos', (req, res) => {

    const resp = todos.map((t, i) => ({
        id: i + 1,
        task: t.task,
        done: t.done,
        due: t.due
    }))

    res.status(200).send(resp)
})



app.put('/todos/status', (req, res) => {
    var idx = req.body.id - 1;

    if (todos[idx] == null) {
        return res.status(404).send({ error: 'Task with id not found.' })
    }
    var status = req.body.done;
    var todoToChange = todos[idx];
    console.log("update", todoToChange)
    todoToChange.done = status;
    console.log("after updating", todoToChange)

    res.status(200).send({ success: 'Status updated', id: req.body.id });

})

app.post('/add', (req, res) => {
    if (typeof req.body.task !== 'string' || req.body.task == '') {
        return res.status(400).send({ error: 'Task name not provided' })
    }

    todos.push({
        task: req.body.task,
        done: req.body.done,
        due: req.body.due
    })
    console.log(todos);
    res.status(201).send({ success: 'New task added', id: todos.length })
})

app.post('/removedone', (req, res) => {
    console.log("Before Deletion", todos);
    let listOfTasks = req.body.tasklist;
    for (let i = 0; i < listOfTasks.length; i++) {
        //  console.log(Number(listOfTasks[i]) - (i + 1))
        todos.splice(Number(listOfTasks[i]) - (i + 1), 1);
    }
    console.log("After delete action", todos);
    res.status(200).send({ sucesss: 'Removed Succesfully', id: todos.length });
})

app.listen(3000)