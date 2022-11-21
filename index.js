var express = require('express');
require('dotenv').config();
const mongoose = require('mongoose');
const mongoString = process.env.DATABASE_URL;
const movie= require('./movie')
mongoose.connect(mongoString);
mongoose.Promise = global.Promise;
const database = mongoose.connection;

database.on('error', (error) => {
    console.log(error)
})

database.once('connected', () => {
    console.log('Database Connected');
})

var app = express();
var PORT = 5000;
 
app.use(express.json());


// var movies = [
//     {id: 101, name: "Fight Club", year: 1999, rating: 8.1},
//     {id: 102, name: "Inception", year: 2010, rating: 8.7},
//     {id: 103, name: "The Dark Knight", year: 2008, rating: 9},
//     {id: 104, name: "12 Angry Men", year: 1957, rating: 8.9}
//  ];
app.get('/', function (req, res) {
    console.log(req.body.name)
    res.send(req.body.name);
})
app.post('/seedData',(req,res)=>{

})
app.get('/movies', async function (req, res,next) {
   let data= await movie.find()
    return res.json({"data":data})
})

app.get('/movies/:id', async function(req, res){
   let data= await movie.findById(req.params.id)
   return res.json({"data":data})
});

app.post('/movies/add', function (req, res) {
      let newMovie= new movie(req.body)
      // newMovie.name = req.body.name;
      // newMovie.year= req.body.year;
      // newMovie.rating=req.body.rating;
      newMovie.save(function(err){
         if(err)
         res.json(err);
         res.json({
            data:newMovie,
            mssg:"Successful update"
         })
      });
})

app.put('/movies/update/:id', async function(req, res){
   let data= await movie.findById(req.params.id)
   data.overwrite({name: req.body.name, rating: req.body.rating , year: req.body.year})
   await data.save();
   return res.json({"data":data})

 });

app.delete('/movies/delete/:id', async function(req, res){
   let data= await movie.findOneAndDelete(req.params.id)
   return res.json({"Deleted Data":data })

});
  
app.listen(PORT, function(err){
    if (err) console.log(err);
    console.log("Server listening on PORT", PORT);
});