const { log } = require("console");
const fs = require("fs");
const path = require("path");

const productsFilePath = path.join(__dirname, "../data/productsDatabase.json");
const products = JSON.parse(fs.readFileSync(productsFilePath, "utf-8"));

const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

const controller = {

    allProducts: (req, res) => {
        res.render('products', { products: products })
    },

    listByCategory: (req, res) => {
        let prodBuscados = [];
        for (let i = 0; i < products.length; i++) {
            if (products[i].category == req.params.categoria) {
                prodBuscados.push(products[i])
            }
        }
        res.render('products', { products: prodBuscados })
    },

    productHistory: (req, res) => {
        res.render('historyProduct')
    },

    card: (req, res) => {
        res.render('productCard')
    },

    productDetails: (req, res) => {
        let product = products.find((i) => i.id == req.params.idProducto);
        res.render('detailProduct', { product: product })
    },

    createProduct: (req, res) => {
        res.render('createProduct')
    },

    saveProduct: (req, res) => {
        // console.log(req.body);
        console.log(req.file);
        if (req.file) {
            let prod = req.body;
            prod.image = req.file.filename;

            let maxId = -1;
            for (let i = 0; i < products.length; i++) {
                if (products[i].id > maxId) {
                    maxId = products[i].id;
                }
            }
            maxId++;
            let nuevoProducto = {
                id: maxId,
                name: req.body.nombreProd,
                price: req.body.precioProd,
                category: req.body.categoriaProd,
                discount: 0,
                description: req.body.descripcionProd,
                image: '/img/productImages/' + req.file.filename
            };
            console.log(nuevoProducto);
            products.push(nuevoProducto);
            res.redirect('/products');
        } else {
            res.redirect('/products/create')
        }
    },

    editProduct: (req, res) => {
        let product = products.find((i) => i.id == req.params.idProducto);
        // console.log(product);
        res.render('editProduct', { product: product })
    },

    updateProduct: (req, res) => {
        console.log(req.body);
        products.forEach((item) => {
            if (item.id == req.params.idProducto) {
                item = req.body;
            }
        })
        res.redirect('/products');
    }
}


module.exports = controller;