module.exports = app => {
    app.route('/products')
        .post(app.api.product.saveProduct)
        .get(app.api.product.getProducts)

    app.route('/products/response/:id')
        .patch(app.api.product.saveResponse)

    app.route('/products/pending')
        .get(app.api.product.getProductPending)
}