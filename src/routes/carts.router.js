const { Router } = require("express");
const CartsManager = require("../managers/cartsManagerFS.js");
const router = Router();

const cartsService = new CartsManager();

router
  .get("/:cid", async (req, res) => {
    try {
        const {cid} = req.params;
        const cart = await cartsService.getCartById(parseInt(cid))
        res.send({
            status: "succes",
            payload: cart,
          });
    } catch (error) {
        console.log(error);
    }
  })
  .post("/", async (req, res) => {
    try {
      const result = await cartsService.createCart();
      res.send({
        status: "succes",
        payload: result,
      });
    } catch (error) {
      res.status(500).send(`Error de servidor. ${error.message}`);
    }
  })

  .post("/:cid/product/:pid", async (req, res) => {
    const {cid, pid} = req.params;
    const {quantity} = req.body

    const cart = await cartsService.addProductToCart(cid, pid, quantity)

    res.send({
        status: 'succes',
         cart})

    console.log("Router post carts");
  });

module.exports = router;
