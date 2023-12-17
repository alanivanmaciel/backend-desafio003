const ProductManager = require("./ProductManager.js");
const productManager = new ProductManager();

const express = require("express");
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/products/", async (req, res) => {
  try {
    const limit = req.query.limit ? parseInt(req.query.limit) : undefined;
    const products = await productManager.getProducts(limit);
    res.json(products);
  } catch (error) {
    console.log(error);
    res.status(500).send("Error al obtener la lista de productos!");
    return;
  }
});

app.get("/products/:pid", async (req, res) => {
  try {
    const { pid } = req.params;
    const productId = await productManager.getProductById(Number(pid));
    res.send(productId);
  } catch (error) {
    console.log(error);
    res.status(500).send("Error al obtener al intentar obtener el producto.");
    return;
  }
});

app.listen(8080, () => {
  console.log("Escuchando en el puerto 8080:");
});
