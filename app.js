require ('./config/config');
const express = require ('express');
const bodyparser = require('body-parser');
const morgan = require ('morgan');
const session = require ('cookie-session');
const port = process.env.PORT;
const app = express();

app.use (morgan('dev'));
app.use (bodyparser.urlencoded({
      extended: true
} )

);

   app.use(session({
      secret: 'node'  
  }));

// configuracion de ejs  template engine
app.set('view engine', 'ejs');

app.use('/public', express.static('public'));

let tareas = ['uno','dos'];

app.get('/',function(request, response){
    response.render('formulario.ejs',{
        tareas
    });
});

app.post('/adicionar', function(request, response){
       let tarea = request.body.nuevatarea;
       tareas.push(tarea);
       response.redirect('/');
});

//eliminar tareas

app.get('/borrar/:id', function(request,response){
 let id = +request.params.id;
tareas.splice(id,1);
response.redirect('/');
})

app.listen(port, function(){
    console.log('escuchando el puerto', port);
});