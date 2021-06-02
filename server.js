const { response } = require("express");
const express = require("express");
const app = express();
let fs = require("fs");
app.use(express.json());

let quotes = require("./quotes.json");

app.get("/", function (request, response) {
  response.send("/quotes/17 should return one quote, by id");
});
app.get("/quotes", function (res, res) {
  let names = quotes.map((u) => u.author);
  res.send(names);
});
app.get("/quote", function (req, res) {
  let namesQ = quotes.map((b) => b.quote);
  res.send(namesQ);
});

app.get("/quotes/:id", function (request, response) {
  let id = request.params.id;
  let buscaId = quotes.find((i) => i.id == id);
  response.json(buscaId);
});

app.get("/quote/:id", function (request, response) {
  let id = parseInt(request.params.id);
  const isANumber = !isNaN(id);
  if (isANumber && id >= 0) {
    id = parseInt(request.params.id);
    let quote = quotes.find((i) => i.id == id);
    if (quote) {
      // si existe
      response.json(quote);
    } else {
      // si no existe
      response.status(404).send(`quote with id=${id} not found`);
    }
  } else {
    response.status(400).send("id debe ser igual o mayor que 0!");
  }
});

// post Api

app.post("/quotes", (req, res) => {
  let quotePost = req.body;
  console.log(quotePost);
  quotePost.id = Math.max(...quotes.map((j) => j.id)) + 1;
  quotes.push(quotePost);
  fs.writeFile("quotes.json", JSON.stringify(quotes, null, 2), console.log);
  res.status(201).json(quotePost);
});
// Api Put

app.put("/quotes/:id", function (req, res) {
  let id = parseInt(req.params.id);
  let body = req.body;
  let quotesFind = quotes.find((i) => i.id == id);
  quotesFind.author = body.author;
  quotesFind.quote = body.quote;
  quotesFind.id = body.id;
  fs.writeFile("quotes.json", JSON.stringify(quotes, null, 2), console.log);

  res.status(200).json(quotesFind);
});

// Delete
app.delete("/quotes/:id", function (req, res) {
  let id = parseInt(req.params.id);
  if (id) {
    quotes = quotes.filter((i) => !(i.id == id));
    fs.writeFile("quotes.json", JSON.stringify(quotes, null, 4), console.log);
    res.status(200).send(`${id}`);
  } else {
    res.status(400).send("Id debe ser un numero");
  }
});

app.listen(3000, () => console.log("Listening on port 3000"));
