

/////// REQUIREDS ///////
const express = require('express');
const bodyParser= require('body-parser');
const MongoClient = require('mongodb').MongoClient
const mongodb = require('mongodb');
require("dotenv-safe").config();
const jwt = require('jsonwebtoken');
var TOKEN_GLOBAL = "ND"



/////// DEFINIÇÃO DO EXPRESS ///////
const app = express();
app.use(bodyParser.urlencoded({ extended: true })) // Interação html <-> js
app.use(express.static('public')) // concede acesso ao diretorio "public"
app.use(bodyParser.json())


////// ENGINE HTML //////
app.set('view engine', 'ejs')


////// CONCT MONGODB //////
url_conecxao = "mongodb+srv://vitor_kogut:joaokogut123@bd01.ezjmr.mongodb.net/BD01?retryWrites=true&w=majority"
produtosCollection = ''
MongoClient.connect(url_conecxao, { useUnifiedTopology: true} ,function(err, client){
  if (err) return console.error(err)
  console.log('Conectado ao MongoDB!')

  db = client.db('Teste_produtos') // DEFINE O BD
  produtosCollec = db.collection('Cervejas') // DEFINE O COLLECTION
  garrafasCollec = db.collection('Garrafas') // DEFINE O COLLECTION
  tiposCollec = db.collection('Tipos') // DEFINE O COLLECTION
  marcasCollec = db.collection('Marcas') // DEFINE O COLLECTION

})


/////// FUNCS ///////
app.listen(3000, function() {
    console.log('Esperando em http://localhost:3000/')
})



app.get('/', function(req, res) {                             // Envia o index do HTML
  res.render('index.ejs')
  console.log(TOKEN_GLOBAL)
})


app.get("/ver_garrafas.html", async function(req, res) {      // Ao realizar pedido "GET" em "/ver_garrafas"
  cursor = await db.collection('Garrafas').find().toArray()   // pega dados dos produtos
  res.render("ver_garrafas.ejs", {cursor:cursor, token:TOKEN_GLOBAL})                       // renderiza o novo html com os dados
})
app.post('/ver_garrafas.html/adicionar',verifyJWT, function(req, res) {
  console.log(req.body)                                        // OBTEM DADOS DO FORM NOME "/ver_garrafas.html/adicionar"
  garrafasCollec.insertOne(req.body)
  res.redirect('/ver_garrafas.html')
})


app.get("/ver_cervejas.html", async function(req, res) {      // Ao realizar pedido "GET" em "/ver_cervejas"
  cursor = await db.collection('Cervejas').find().toArray();   // pega dados das ja cadastraDAS


  marcas = await db.collection('Marcas').find().toArray()     // passar opções para o html
  garrafas = await db.collection('Garrafas').find().toArray()
  tipos = await db.collection('Tipos').find().toArray()

  
  res.render("ver_cervejas.ejs", {cursor:cursor, marcas:marcas, garrafas:garrafas, tipos:tipos  } )                       // renderiza o novo html com os dados
})
app.post('/ver_cervejas.html/adicionar',verifyJWT, function(req, res) {
  console.log(req.body)                                       // OBTEM DADOS DO FORM NOME "/ver_cervejas.html/adicionar"
  produtosCollec.insertOne(req.body)
  res.redirect('/ver_cervejas.html')
})


app.get("/ver_marcas.html", async function(req, res) {      // Ao realizar pedido "GET" em "/ver_marcas"
  cursor = await db.collection('Marcas').find().toArray()   // pega dados dos produtos
  res.render("ver_marcas.ejs",cursor)                       // renderiza o novo html com os dados
})
app.post('/ver_marcas.html/adicionar',verifyJWT,  function(req, res) {
  console.log(req.body)                                       // OBTEM DADOS DO FORM NOME "/ver_marcas.html/adicionar"
  marcasCollec.insertOne(req.body)
  res.redirect('/ver_marcas.html')
})


app.get("/ver_tipos.html", async function(req, res) {      // Ao realizar pedido "GET" em "/ver_tipos"
  cursor = await db.collection('Tipos').find().toArray()   // pega dados dos produtos
  res.render("ver_tipos.ejs",cursor)                       // renderiza o novo html com os dados
})
app.post('/ver_tipos.html/adicionar',verifyJWT,  function(req, res) {
  console.log(req.body)                                       // OBTEM DADOS DO FORM NOME "/ver_tipos.html/adicionar"
  tiposCollec.insertOne(req.body)
  res.redirect('/ver_tipos.html')
})





app.get("/edit_cervejas.html", async function(req, res) {      
  cursor = await db.collection('Cervejas').find().toArray()   
  res.render("edit_cervejas.ejs",cursor)                       // renderiza o novo html com os dados
})
app.post('/edit_cervejas.html/remover',verifyJWT,  function(req, res) {               
  produtosCollec.deleteOne({_id: new mongodb.ObjectID(req.body.delete_id)})
  res.redirect('/edit_cervejas.html')
})
app.post('/edit_cervejas.html/edit',verifyJWT,  function(req, res){
  var querry = {_id: mongodb.ObjectID(req.body.modify_id)};

  var a_modificar = req.body.elemento_a_modificar.toString();
  console.log(a_modificar)

  if( a_modificar == "tipo"){
    novo_valor = {$set: {  tipo: req.body.novo_valor.toString(),} };
    produtosCollec.updateOne(querry, novo_valor);
  }
  if( a_modificar == "nome"){
    novo_valor = {$set:{nome : req.body.novo_valor.toString(),} };
    produtosCollec.updateOne(querry, novo_valor);  
  }
  if( a_modificar == "marca"){
    novo_valor = {$set: {  marca : req.body.novo_valor.toString(),} };
    produtosCollec.updateOne(querry, novo_valor);  
  }
  if( a_modificar == "garrafa"){
    novo_valor = {$set: {  garrafa : req.body.novo_valor.toString(),} };
    produtosCollec.updateOne(querry, novo_valor);
  }

  res.redirect('/edit_cervejas.html')
})

app.get("/edit_garrafas.html", async function(req, res) {      
  cursor = await db.collection('Garrafas').find().toArray()   // pega dados dos produtos
  res.render("edit_garrafas.ejs",cursor)                                     // renderiza o novo html com os dados
})
app.post('/edit_garrafas.html/remover',verifyJWT,  function(req, res) {               
  garrafasCollec.deleteOne({_id: new mongodb.ObjectID(req.body.delete_id)})
  res.redirect('/edit_garrafas.html')
})


app.get("/edit_marcas.html", async function(req, res) {      
  cursor = await db.collection('Marcas').find().toArray()   
  res.render("edit_marcas.ejs",cursor)                       // renderiza o novo html com os dados
})
app.post('/edit_marcas.html/remover',verifyJWT,  function(req, res) {               
  marcasCollec.deleteOne({_id: new mongodb.ObjectID(req.body.delete_id)})
  res.redirect('/edit_marcas.html')
})


app.get("/edit_tipos.html", async function(req, res) {      
  cursor = await db.collection('Tipos').find().toArray()   
  res.render("edit_tipos.ejs",cursor)                       // renderiza o novo html com os dados
})
app.post('/edit_tipos.html/remover',verifyJWT,  function(req, res) {               
  tiposCollec.deleteOne({_id: new mongodb.ObjectID(req.body.delete_id)})
  res.redirect('/edit_tipos.html')
})


app.get("/pesquisa_cervejas.html", async function(req, res) {      
  cursor = await db.collection('Cervejas').find().toArray()   
  res.render("pesquisa_cervejas.ejs",cursor)                       // renderiza o novo html com os dados
})
app.post("/pesquisa_cervejas.html/pesquisar", async function(req, res) {
  
  var a_modificar = req.body.categoria.toString()
  var valor_pesquisado = req.body.valor.toString() 

  if( a_modificar == "tipo"){
    cursor = await produtosCollec.find( {tipo : req.body.valor.toString()} ).toArray()
  }
  if( a_modificar == "nome"){
    cursor = await produtosCollec.find( {nome : req.body.valor.toString()} ).toArray()
  }
  if( a_modificar == "marca"){
    cursor = await produtosCollec.find( {marca : req.body.valor.toString()} ).toArray()
  }
  if( a_modificar == "garrafa"){
    cursor = await produtosCollec.find( {garrafa : req.body.valor.toString()} ).toArray()
  }

  res.render("pesquisa_cervejas.ejs",cursor)                       // renderiza o novo html com os dados
})


///////// authentication///////////
app.get("/login.html", async function(req, res) {         
  res.render("login.ejs")                       // renderiza o novo html com os dados
})
app.post('/login.html/logar', async (req, res, next) => {
  var user_fornecido = req.body.user.toString() 
  var senha_fornecida = req.body.senha.toString()
  var autenticado = false

  cursor = await db.collection("Users").find( {user : user_fornecido} ).toArray()

  if ( cursor[0].user.toString() == user_fornecido && cursor[0].senha.toString() == senha_fornecida ){
    autenticado = true
  }

  if(autenticado){
    //auth ok
    const id = cursor[0]._id; 
    const token = await jwt.sign({ id }, process.env.SECRET, {
      expiresIn: 300 // expires in 5min
    });
    TOKEN_GLOBAL = token
    return res.json({ auth: true, token: token });
  }
  res.status(500).json({message: 'Login inválido!'});
})

function verifyJWT(req, res, next){
  const token = TOKEN_GLOBAL;
  if (!token) return res.status(401).json({ auth: false, message: 'No token provided.' });
  
  jwt.verify(token, process.env.SECRET, function(err, decoded) {
    if (err) return res.status(500).json({ auth: false, message: 'Failed to authenticate token.' });
    
    // se tudo estiver ok, salva no request para uso posterior
    req.userId = decoded.id;
    next();
  })}

  app.get("/deslogar", async function(req, res) {         
    TOKEN_GLOBAL = "OFF"  
    res.redirect("/")                     // renderiza o novo html com os dados
  })