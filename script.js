document.addEventListener("DOMContentLoaded", function() {
    const menuSection = document.getElementById("menu");
    const titlePage = document.getElementById("title-page");
    const buyButtons = document.querySelectorAll(".buy-btn");
    const counters = document.querySelectorAll(".counter");
    const payButton = document.getElementById("pay-btn");
    const billPopup = document.getElementById("bill-popup");
    const billDetails = document.getElementById("bill-details");
    const complaintButton = document.getElementById("complaint-button");
    const complaintBox = document.getElementById("complaint-box");
    const closeComplaint = document.getElementById("close-complaint");

    document.getElementById("buy-here").addEventListener("click", function() {
        titlePage.style.display = "none";
        menuSection.style.display = "block"; 
        payButton.style.display = "inline-block"; 
    });

    buyButtons.forEach((button, index) => {
        button.addEventListener("click", function() {
            counters[index].style.display = "flex"; 
        });
    });

    counters.forEach(counter => {
        const incrementButton = counter.querySelector(".increment");
        const decrementButton = counter.querySelector(".decrement");
        const quantityDisplay = counter.querySelector(".quantity");

        let quantity = 0;

        incrementButton.addEventListener("click", function() {
            quantity++;
            quantityDisplay.textContent = quantity;
        });

        decrementButton.addEventListener("click", function() {
            if (quantity > 0) {
                quantity--;
                quantityDisplay.textContent = quantity;
            }
        });
    });

    payButton.addEventListener("click", function() {
        let total = 0;
        const items = [];

        counters.forEach(counter => {
            const itemName = counter.getAttribute('data-item');
            const quantity = parseInt(counter.querySelector(".quantity").textContent);
            const price = parseFloat(counter.parentElement.querySelector(".food-price").textContent);
            if (quantity > 0) {
                total += price * quantity;
                items.push(`${itemName}: ${quantity} x $${price.toFixed(2)}`);
            }
        });

        const tax = total * 0.01; 
        const totalWithTax = total + tax;

        billDetails.innerHTML = `
            <p>${items.join('<br>')}</p>
            <p>Subtotal: $${total.toFixed(2)}</p>
            <p>1% Gapax Tax: $${tax.toFixed(2)}</p>
            <p><strong>Total: $${totalWithTax.toFixed(2)}</strong></p>
        `;
        
        billPopup.style.display = "block"; 
    });

    complaintButton.addEventListener("click", function() {
        complaintBox.style.display = "block"; 
    });

    closeComplaint.addEventListener("click", function() {
        complaintBox.style.display = "none"; 
    });
});
