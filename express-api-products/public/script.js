// fetches all products and set up the form event listener
window.onload = async () => {
    const uri = "/api/products";
    const config = {
        method: "get",
        mode: "cors"
    };

    try {
        const response = await fetch(uri, config);
        const json = await response.json();
        console.log("Fetched products:", json);

        loadUI(json.data);

        const form = document.getElementById("product-form");
        form.onsubmit = productSend;
    } catch (error) {
        console.error("Error fetching products:", error);
    }
};

async function productSend(event) {
    event.preventDefault();

    const productName = document.getElementById("name").value;
    const productCategory = document.getElementById("category").value;
    const productPrice = document.getElementById("price").value;
    const productDescription = document.getElementById("description").value;
    const productFeatures = document.getElementById("features").value.split(',').map(feature => feature.trim());
    const productImage = document.getElementById("image").value;

    const newProduct = {
        name: productName,
        category: productCategory,
        price: productPrice,
        description: productDescription,
        features: productFeatures,
        image: productImage
    };

    try {
        const result = await fetch("/api/products", {
            method: "post",
            mode: "cors",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newProduct)
        });

        console.log("Server response:", result);

        const productAdded = await result.json();
        console.log("Product added:", productAdded);

        const main = document.querySelector("#product-grid");
        addProduct(productAdded.data || productAdded, main);
    } catch (error) {
        console.error("Error adding product:", error);
    }
}

function loadUI(products) {
    const main = document.querySelector("#product-grid");

    products.forEach(product => {
        addProduct(product, main);
    });
}

// Adds a product to the DOM
function addProduct(product, main) {
    const section = document.createElement("section");
    const buttonDelete = document.createElement("button");
    const h2 = document.createElement("h2");
    const img = document.createElement("img");
    const p = document.createElement("p");
    const ul = document.createElement("ul");

    h2.innerHTML = product.name;
    img.src = product.image;
    img.alt = `Image of ${product.name}`;
    p.innerHTML = product.description;
    buttonDelete.className = "delete";
    buttonDelete.innerHTML = "X";  

    buttonDelete.onclick = () => removeProduct(product.id, section);

    // List product details
    const details = [
        `Name: ${product.name}`,
        `Category: ${product.category}`,
        `Price: $${product.price}`,
        `Description: ${product.description}`,
        `Features: ${product.features.join(', ')}`
    ];

    for (const detail of details) {
        addProductDetail(ul, detail);
    }

    section.appendChild(buttonDelete);
    section.appendChild(h2);
    section.appendChild(img);
    section.appendChild(p);
    section.appendChild(ul);
    main.appendChild(section);
}

// Sends a DELETE requestto remove a product from the server
async function removeProduct(id, section) {
    try {
        const result = await fetch(`/api/products/${id}`, {
            method: "delete",
            mode: "cors",
            headers: {
                "Content-Type": "application/json"
            }
        });

        if (result.ok) {
            section.remove();
        } else {
            console.error('Error deleting product:', result.statusText);
        }
    } catch (error) {
        console.error("Error during product deletion:", error);
    }
}

function addProductDetail(ul, detail) {
    const li = document.createElement("li");
    li.innerHTML = detail;
    ul.appendChild(li);
}
