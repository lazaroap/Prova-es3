/* eslint-disable no-param-reassign */
/* eslint-disable eqeqeq */
/* eslint-disable no-return-assign */
import express from 'express';
import cors from 'cors';
import { uuid } from 'uuidv4';

const app = express();

app.use(express.json());
app.use(cors());


let products = [];


app.get('/products', (request, response) => {
  // TODO: listagem de todos os produtos
  response.status(200).json(products)
});


app.post('/products', (request, response) => {
  // TODO: Salvar produto no array products
    const product = request.body;
    const productAtl = {id:uuid(), ...product, lovers: 0 }

    products.push(productAtl);
    response.status(201).json(productAtl);
});

app.put('/products/:id', (request, response) => {
  // TODO: Atualiza produto por ID
  const {id} = request.params;
  const code = request.body.code;
  const description = request.body.description;
  const buyPrice = request.body.buyPrice;
  const sellPrice = request.body.sellPrice;
  const tags = request.body.tags;

  let product = products.find(value => value.id == id);
  if(product == undefined){
      response.status(400).send();
  }else{
      product.code = code;
      product.description = description;
      product.buyPrice = buyPrice;
      product.sellPrice = sellPrice;
      product.tags = tags;
      response.status(200).json(product);
  }
});

app.delete('/products/:code', (request, response) => {
  // TODO: Remove TODOS os produtos que possuam o código passado por parâmetro
  const {code} = request.params;
  const index = products.findIndex(value => value.code == code);
  if(index == -1){
      response.status(400).send();
  }else{
      products.splice(index,1);
      response.status(204).send();
  }
});

app.post('/products/:code/love', (request, response) => {
  // TODO: Incrementa em 1 o número de lovers de todos os produtos que possuam 
  // o code do parâmetro
  const {code} = request.params;
  const product = products.find(value => value.code == code);
  product.lovers++;
  response.status(201).json(product);
  
});

app.get('/products/:code', (request, response) => {
  // TODO: Busca de todos os produtos com o código recebido por parâmetro.
  const {code} = request.params;
    const product = products.filter(value => value.code == code);
    if(product == undefined){
        response.status(400).json();
    }else{
        response.status(200).json(product);
    }

});

export default app;
