module.exports = (sequalize, Sequalize) => {
    const Customer = sequalize.define("customer", {
      no: {
        type: Sequalize.UUID
      }, 
      nama: {
        type: Sequalize.STRING
      },
      alamat: {
        type: Sequalize.STRING
      },
      kota: {
        type: Sequalize.STRING
      }
    });
  
    return Customer;
  };