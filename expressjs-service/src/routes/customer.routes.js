module.exports = app => {
    const customers = require("../controllers/customer.controller");
  
    var router = require("express").Router();
  
    router.post("/", customers.create);
  
    router.get("/", customers.findAll);
  
    router.get("/:id", customers.findOne);
  
    router.put("/:id", customers.update);
  
    router.delete("/:id", customers.delete);
  
    app.use('/api/customers', router);
  };