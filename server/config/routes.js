module.exports = app => {
    app.route('/products')
        .post(app.api.product.save)
        .get(app.api.product.get)

    app.route('/products/response/:id')
        .patch(app.api.product.saveResponse)
}