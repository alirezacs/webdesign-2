let form = document.getElementById('form');
let titleInput = document.getElementById('title');
let priceInput = document.getElementById('price');
let list = document.getElementById('list');

let products = JSON.parse(localStorage.getItem('products')) || [];

form.addEventListener('submit', e => {
    e.preventDefault();
    
    let title = titleInput.value;
    let price = priceInput.value;

    products.push({
        title: title,
        price: price,
        id: products.length + 1
    });

    localStorage.setItem("products", JSON.stringify(products));

    renderProducts(products);
})

const renderProducts = (products) => {
    list.innerHTML = "";
    products.map(product => {
        list.innerHTML += `
            <div class="product-card">
                <h2>${product.title}</h2>
                <p class="price">$${product.price}</p>
                <div style='display: flex; gap: 10px'>
                    <button>View Product</button>
                    <button onclick="deleteProduct(${product.id})">Delete</button>
                </div>
            </div>  
        `
    })
}

renderProducts(products);

const deleteProduct = id => {
    products = products.filter(product => {
        return product.id !== id;
    })

    localStorage.setItem("products", JSON.stringify(products));

    renderProducts(products);
}