const { Router } = require("express");
const ProductManager = require("../managers/productManagerFS.js");

const router = Router();
const productManager = new ProductManager();

router.get("/", async (req, res) => {
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

router.get("/:pid", async (req, res) => {
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

router.post("/", async (req, res) => {
  const product = req.body;
  const newProduct = await productManager.addProduct(product);
  res.json(newProduct);
});

router.put("/:pid", async (req, res) => {
  try {
    const { pid } = req.params;
    const { prop, value } = req.body;

    await productManager.updateProduct(parseInt(pid), prop, value);

    res.status(201).send({
      status: "succes",
      message: "Producto actualizado correctamente.",
    });
  } catch (error) {
    console.error("Error al intentar actualizar el producto:", error);
    res
      .status(500)
      .json({ error: "Error interno del servidor al actualizar el producto." });
  }
});

router.delete("/:pid", async (req, res) => {
  try {
    const { pid } = req.params;
    await productManager.deleteProduct(parseInt(pid))

    res.status(201).send({
      status: "succes",
      message: "Producto eliminado correctamente."
    })
  } catch (error) {

  }
})

module.exports = router;
