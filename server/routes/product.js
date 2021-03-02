const router = require('express').Router();
const Product = require('../model/product');

const upload = require('../middlewares/upload-photo');

// POST
router.post('/products', upload.single('photo'), async (req, res) => {
  try {
    let product = new Product();
    product.title = req.body.title;
    product.description = req.body.description;
    product.photo = req.file.path;
    product.price = req.body.price;
    product.stockQuantity = req.body.stockQuantity;

    await product.save();

    res.json({
      status: true,
      message: 'Successfully saved',
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
});

// GET - All
router.get('/products', async (req, res) => {
  try {
    let products = await Product.find();
    res.json({
      success: true,
      products: products,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
});

// GET - Single
router.get('/products/:id', async (req, res) => {
  try {
    let product = await Product.findOne({ _id: req.params.id });
    res.json({
      success: true,
      product: product,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
});

// PUT
router.put('/products/:id', upload.single('photo'), async (req, res) => {
  try {
    let product = await Product.findOneAndUpdate(
      { _id: req.params.id },
      {
        $set: {
          title: req.body.title,
          price: req.body.price,
          category: req.body.categoryID,
          photo: req.file.path,
          description: req.body.description,
          owner: req.body.ownerID,
        },
      },
      { upsert: true }
    );
    res.json({
      success: true,
      message: 'Updated Successfully',
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
});

// Delete

router.delete('/products/:id', async (req, res) => {
  try {
    let deleteProduct = await Product.findByIdAndDelete({ _id: req.params.id });
    
    if(deleteProduct){
      res.json({
        status: true,
        message: 'Successfully Deleted',
      });
    }

  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
});


module.exports = router;
