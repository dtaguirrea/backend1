const socket = io()
socket.on('products', (products) => {
    const productTableBody = document.getElementById('product-table-body');
    productTableBody.innerHTML = '';
    products.forEach(product => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${product.title}</td>
            <td>${product.description}</td>
            <td>${product.code}</td>
            <td>${product.price}</td>
            <td>${product.stock}</td>
            <td>${product.category}</td>
            <td><button onclick="deleteProduct('${product.id}')">Eliminar</button></td>
        `
        productTableBody.appendChild(tr);
    })
})
document.getElementById('add-product-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const title = e.target.elements.title.value;
    const description = e.target.elements.description.value;
    const code = e.target.elements.code.value;
    const price = e.target.elements.price.value;
    const stock = e.target.elements.stock.value;
    const category = e.target.elements.category.value;
    socket.emit('newProduct', { title, description, code, price, stock, category });
    e.target.reset();
})
function deleteProduct(id) {
    socket.emit('deleteProduct', id);
}