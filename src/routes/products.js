const express = require("express");
const router = express.Router();
const path = require('path');
const multer = require('multer');
const productsController = require('../controllers/productsController.js');
const authMiddleware = require('../middlewares/authMiddleware.js');

// configuracion para imagenes de productos
let multerDiskStorage2 = multer.diskStorage({
    destination: (req, file, callback) => {
        let folder = path.join(__dirname, '../../public/img/productImages');
        callback(null, folder);
    },
    filename: (req, file, callback) => {
        let imageName = 'prod-' + Date.now() + path.extname(file.originalname);
        callback(null, imageName);
    }
})
let fileProdUpload = multer({ storage: multerDiskStorage2 });

// rutas
router.get('/', productsController.allProducts); // 1

router.get('/search', productsController.searchProducts);

/**
 * para acceder a ver el historial se requiere iniciar session
 */
router.get('/history', authMiddleware, productsController.productHistory);

router.get('/create', productsController.createProduct); // 2

router.get('/cart', authMiddleware, productsController.productCart);

router.post('/create', fileProdUpload.single('imagenProd'), productsController.saveProduct); // 4

router.get('/:categoria', productsController.listByCategory);

router.get('/:idProducto/details', productsController.productDetails); // 3

router.get('/:idProducto/edit', productsController.editProduct); // 5

/**
 * Comentamos la ruta con metodo put para usar post para que funcione el editar productos
 */
//router.put('/:idProducto/edit', productsController.updateProduct); // 6
router.post('/:idProducto/edit', productsController.updateProduct); // 6

/**
 * Comentamos la ruta con metodo delete para usar get para que funcione el eliminar productos
 */
router.get('/:idProducto/delete', productsController.deleteProduct); // 7
//router.delete('/:idProducto/delete', productsController.deleteProduct); // 7



module.exports = router;