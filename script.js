// Select input fields and buttons
var productName = document.getElementById('productName');
var productPrice = document.getElementById('ProductPrice');
var productTitle = document.getElementById('ProductTitle');
var addBtn = document.getElementById('addbtn');
var searchInput = document.getElementById('search');
var myTableBody = document.querySelector('#mytable tbody');

// Load products from Local Storage or initialize an empty array
var productList = JSON.parse(localStorage.getItem('products'));
var editIndex = null;

display(productList);

addBtn.addEventListener("click", Add);

// Function to add product
function Add() {
    if (!validateInputs()) return;

    var product = {
        name: productName.value.trim(),
        price: productPrice.value.trim(),
        title: productTitle.value.trim()
    };

    if (editIndex === null) {
        productList.push(product);
    } else {
        productList[editIndex] = product;
        editIndex = null;
        addBtn.innerText = "Add"; 
    }

    saveToLocalStorage();
    display(productList);
    clearInputs();
}

// Function to display products
function display(products) {
    myTableBody.innerHTML = "";
    products.forEach((product, index) => {
        myTableBody.innerHTML += `
            <tr>
                <td>${product.name}</td>
                <td>${product.price}</td>
                <td>${product.title}</td>
                <td><button class="btn btn-warning btn-sm" onclick="editProduct(${index})">Edit</button></td>
                <td><button class="btn btn-danger btn-sm" onclick="deleteProduct(${index})">Delete</button></td>
            </tr>
        `;
    });
}

// Function to save data to Local Storage
function saveToLocalStorage() {
    localStorage.setItem('products', JSON.stringify(productList));
}

// Function to clear input 
function clearInputs() {
    productName.value = '';
    productPrice.value = '';
    productTitle.value = '';
}

// Function to edit a product 
function editProduct(index) {
    var product = productList[index];
    productName.value = product.name;
    productPrice.value = product.price;
    productTitle.value = product.title;

    editIndex = index; 
    addBtn.innerText = "Update"; 
}

// Function to delete a product
function deleteProduct(index) {
    productList.splice(index, 1);
    saveToLocalStorage();
    display(productList);
}

// Function to search products
searchInput.addEventListener('keyup', function (event) {
    var term = event.target.value.toLowerCase().trim();
    var filteredData = productList.filter(product => product.name.toLowerCase().includes(term));
    display(filteredData);
});

// Validation functions  and i add some things
function isValidProductName(name) {
    var regex = /^[A-Z][a-zA-Z]{4,}$/;
    return regex.test(name);
}

function isValidPrice(price) {
    return !isNaN(price) && price >= 100;
}

function isValidTitle(title) {
    var regex = /^[A-Za-z, ]{10,}$/;
    return regex.test(title);
}

// Function to show error message  this is extra from me
function showError(input, message) {
    var errorElement = input.nextElementSibling;
    errorElement.innerText = message;
    errorElement.style.color = 'red';
    input.style.border = '2px solid red';
}

// Function to clear error message
function clearError(input) {
    var errorElement = input.nextElementSibling;
    errorElement.innerText = '';
    input.style.border = '1px solid #ccc';
}

// Input validation 
productName.addEventListener('input', function () {
    if (isValidProductName(productName.value.trim())) {
        clearError(productName);
    } else {
        showError(productName, "Must start with a capital letter and be at least 5 letters.");
    }
});

productPrice.addEventListener('input', function () {
    if (isValidPrice(productPrice.value.trim())) {
        clearError(productPrice);
    } else {
        showError(productPrice, "Price must be at least 100.");
    }
});

productTitle.addEventListener('input', function () {
    if (isValidTitle(productTitle.value.trim())) {
        clearError(productTitle);
    } else {
        showError(productTitle, "Must be at least 10 characters.");
    }
});

// Function to validate inputs
function validateInputs() {
    var valid = true;

    if (!isValidProductName(productName.value.trim())) {
        showError(productName, "Must start with a capital letter and be at least 5 letters.");
        valid = false;
    }

    if (!isValidPrice(productPrice.value.trim())) {
        showError(productPrice, "Price must be at least 100.");
        valid = false;
    }

    if (!isValidTitle(productTitle.value.trim())) {
        showError(productTitle, "Must be at least 10 characters.");
        valid = false;
    }

    return valid;
}
