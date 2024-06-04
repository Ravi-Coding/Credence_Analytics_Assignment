
// ********************************** Credence Analytics Assignment ****************************
// ---------------Backend Project--------->

const express = require('express');
require('./config');
const Product = require('./Book'); // Book.js is file of Schema and model 

const app = express();

app.use(express.json());

// ________************** POST METHOD **************________ 

app.post("/books", async (req, resp) => {

    try {

        let data = new Product(req.body); 
        const result = await data.save(); 

        console.log(result);
        resp.send(result);

    } catch (error) {

        console.error("Error :", error);
        resp.status(500).send({ error: "Error ." });
    }

    // console.log(req.body); // checking req.body
    // res.send("Done");
    // console.log("waooo its working")
});


 // _________************* GET ALL METHOD ********_________

 app.get("/books", async (req, resp) => { 

    try {

        let data = await Product.find(); // getting all books data
        resp.send(data);

    } catch (error) {

        console.error("Error :", error);
        resp.status(500).send({ error: "Error " });
    }

    // console.log("Done")
    // console.log(req.body)
});

// ______*********** GET METHOD BY SPECIFIC ID ************* _______

app.get('/books/:_id', async (req, res) => {

    try {
      const data = await Product.findById(req.params._id);

      if (!data) {

        return res.status(404).send({ error: "Error " });

      }
      res.send(data);

    } catch (error) {

      console.error("Error:", error);
      res.status(500).send({ error: "Error " });
    }
     
    // console.log("Done")
    // console.log(req.body)

  });
  
  

// ___________************ DELETE METHOD **************___________

app.delete("/books/:id", async (req, res) => {

    try {
        console.log(req.params); // 

        
        let data = await Product.deleteOne({ _id: req.params.id }); // Deleting through specific id
        console.log(data);

        if (data.deletedCount === 0) {  // if deleted then  
            return res.status(404).send({ message: "ohhh Product not found !" }); // other wise 404
        }

        res.send({ message: "Waooo Product deleted successfully", data });

    } catch (error) {

        console.error("ohh Error : ", error);

        return res.status(500).send({ message: " Geting Error ", error: error.message });
    }

    // console.log("Done")
    // console.log(req.body)

});

// __________***************** PUT METHOD (Update) **********__________

app.put("/books/:_id", async (req, resp) => {

    try {

        console.log(req.params); // req.params

        let data = await Product.updateOne(

            { _id: req.params._id },
            { $set: req.body }
        );

        resp.send(data);

    } catch (error) {

        console.error("Error :", error);  

        resp.status(500).send({ error: "Error " });
    }

    // console.log("Done")
    // console.log(req.body)
});


app.listen(3005, () => {
    console.log("Waooo Server is running on http://localhost:3005"); // server is running
});
