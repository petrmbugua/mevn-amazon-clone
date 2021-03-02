const router = require('express').Router();
const Category = require('../model/category');

// POST
router.post('/categories', async (req, res) => {
  try {
    const category = new Category();

    category.type = req.body.type;

    await category.save();

    res.json({
      success: true,
      message: 'Successfully created a new catgory',
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
});

// GET ALL
router.get('/categories', async (req, res) => {
  try {
    let categories = await Category.find();
    res.json({
      success: true,
      categories: categories,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
});

router.get('/categories/:id', async (req, res) => {
  try {
    let category = await Category.findOne({ _id: req.params.id });
    res.json({
      success: true,
      category: category,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
});

module.exports = router;
