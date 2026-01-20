const express = require('express');
const router = express.Router();
const { validateProduct }= require('../../middleware/validators/productValidators');
const { handleValidation } = require('../../middleware/validation');
const { requireAuth } = require('../../middleware/authentication')

const {
    getAllProductsFromAccount,
    createProduct,
    deleteProduct,
    updateProduct,
    getAllPublicProducts,
    getPublicProductsByCategory
} = require('../../controllers/products');

// Public marketplace route
router.get("/public", getAllPublicProducts);
router.get("/public", getPublicProductsByCategory);


// Merchant routes
router.delete('/:id', requireAuth, deleteProduct);
router.put('/:id', requireAuth, updateProduct);

router.get('/', requireAuth, getAllProductsFromAccount); 
router.post('/', requireAuth, validateProduct, handleValidation, createProduct);




module.exports = router;
