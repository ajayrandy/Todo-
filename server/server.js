// var newUser = new User1({});
// newUser.save().then((doc)=>{
//     console.log('done',doc);
// },(err)=>{
//     console.log("erroe",err);
// })

// var newTodo1 = new Todo({text : '',completed : true});

// newTodo1.save().then((doc)=>{
//     console.log('done',doc);
// },(error)=>{
//     console.log(error);
// });
var {ObjectID} = require('mongodb');
var express = require('express');
var bodyParser = require('body-parser');

var {mongoose} = require('./db/mongoose');
var {Todo} = require('./models/todo');
var {User} = require('./models/user');

var app = express();

app.use(bodyParser.json());

app.post('/todos', (req, res) => {
  var todo = new Todo({
     text : req.body.text 
  });
  todo.save().then((doc)=>{
    res.send(doc);
},(e)=>{
    res.status(400).send(e);
});
  });

  app.get('/todos',(req,res)=>{
    Todo.find().then((doc)=>{
      res.send({doc});
    },(e)=>{
      res.status(400).send(e);
    });
  });

  app.get('/todos/:id',(req,res)=>{
    var id = req.params.id;
    if(!ObjectID.isValid(id))
    {
     return res.status(404).send();
    }
    Todo.findById(id).then((x)=>{
  if(!x)
  {
    return res.status(404).send();
  }
  
  res.send({x});
}).catch((e)=>{
  res.status(400).send();

  });
});

app.listen(3000, () => {
  console.log('Started on port 3000');
});

module.exports = {app};