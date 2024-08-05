function buyProduct(productName, productPrice) {
    window.location.href = 'transaction.html?product=' + encodeURIComponent(productName) + '&price=' + productPrice;
}

function getParameterByName(name, url = window.location.href) {
    name = name.replace(/[\[\]]/g, '\\$&');
    const regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
}

function submitTransaction() {
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const address = document.getElementById('address').value;
    const quantity = document.getElementById('quantity').value;
    const productName = document.getElementById('product-name').value;
    const productPrice = document.getElementById('product-price').value;
    const totalPrice = quantity * productPrice;

    const invoiceData = {
        name,
        email,
        address,
        quantity,
        productName,
        totalPrice
    };

    localStorage.setItem('invoiceData', JSON.stringify(invoiceData));
    window.location.href = 'invoice.html';
}

document.addEventListener('DOMContentLoaded', () => {
    const productName = getParameterByName('product');
    const productPrice = getParameterByName('price');
    if (productName) {
        document.getElementById('product-name').value = productName;
    }
    if (productPrice) {
        document.getElementById('product-price').value = productPrice;
    }

    const invoiceData = JSON.parse(localStorage.getItem('invoiceData'));
    if (invoiceData) {
        document.getElementById('invoice-product-name').textContent = invoiceData.productName;
        document.getElementById('invoice-name').textContent = invoiceData.name;
        document.getElementById('invoice-email').textContent = invoiceData.email;
        document.getElementById('invoice-address').textContent = invoiceData.address;
        document.getElementById('invoice-quantity').textContent = invoiceData.quantity;
        document.getElementById('invoice-total-price').textContent = `Rp${invoiceData.totalPrice}`;
    }
});
