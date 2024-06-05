

 //                       **************** Credence Analytics Assignment **************
//                                     --------Backend Project--------



const express = require('express');

require('./config'); 

const Book = require('./models/book');

const app = express();

const port = process.env.PORT || 3005;

app.use(express.json());  // 


// ************** POST METHOD **************

app.post('/books', async (req, res) => {
    
  try {

    let data = new Book(req.body);
    const result = await data.save();

    console.log(result);
    res.send(result);

  } catch (error) {

    console.error('Error:', error);
    res.status(500).send({ error: 'Error' });
  }

//  console.log("Done")
//  console.log(data)

});

// ************* GET ALL METHOD **************

app.get('/books', async (req, res) => {

  try {

    let data = await Book.find();
    res.send(data);

  } catch (error) {

    console.error('Error:', error);
    res.status(500).send({ error: 'Error ' });

  }

  //  console.log("Done")
//  console.log(data)

});

// ***************** GET METHOD BY SPECIFIC ID ************

app.get('/books/:_id', async (req, res) => {

  try {

    const data = await Book.findById(req.params._id);
    if (!data) {
      return res.status(404).send({ error: 'Book not found' });
    }
    res.send(data);

  } catch (error) {

    console.error('Error:', error);
    res.status(500).send({ error: 'Error' });

  }

  // console.log("Done")
//  console.log(data)

});

// ************ DELETE METHOD **************

app.delete('/books/:id', async (req, res) => {

  try {

    console.log(req.params);
    let data = await Book.deleteOne({ _id: req.params.id });
    console.log(data);

    if (data.deletedCount === 0) {
      return res.status(404).send({ message: 'Book not found!' });
    }

    res.send({ message: 'Book deleted successfully', data });

  } catch (error) {

    console.error('Error:', error);
    res.status(500).send({ message: 'Error deleting the book !', error: error.message });

  }
  //  console.log("Done")
//  console.log(data)

});

// **************** PUT METHOD (Update) **********

app.put('/books/:_id', async (req, res) => {

  try {

    console.log(req.params);
    let data = await Book.updateOne(
      { _id: req.params._id },
      { $set: req.body }
    );

    res.send(data);

  } catch (error) {

    console.error('Error:', error);
    res.status(500).send({ error: 'Error updating Book !' });

  }

  //  console.log("Done")
//  console.log(data)

});

app.listen(port, () => {

  console.log(`Server is running on http://localhost:${port}`);

});
