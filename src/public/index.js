const socket = io()
socket.on('products', (products) => {
    console.log('Received products:', products);
    const productTableBody = document.getElementById('product-table-body');
    productTableBody.innerHTML = '';
    products.forEach(product => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${product.name}</td>
            <td>${product.description}</td>
            <td>${product.price}</td>
            <td>${product.stock}</td>
            <td>${product.category}</td>
            <td><button onclick="deleteProduct('${product._id}')" id='id='delete-${product._id}'>Eliminar</button></td>
        `
        productTableBody.appendChild(tr);
    })
})
document.getElementById('add-product-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const name = e.target.elements.title.value;
    const description = e.target.elements.description.value;
    const price = e.target.elements.price.value;
    const stock = e.target.elements.stock.value;
    socket.emit('newProduct', { name, description, price, stock });
    e.target.reset();
})
function deleteProduct(id) {
    socket.emit('deleteProduct', id);
}