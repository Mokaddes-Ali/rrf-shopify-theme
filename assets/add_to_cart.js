jQuery(document).ready(function(){
    let addToCartForm = $('form[action$="/cart/add"]');

    addToCartForm.on("submit", function(e){
        e.preventDefault();
        const btn = $("#add-to-cart");
        const originalText = btn.text();

        // Button loading
        btn.prop("disabled", true).html(`
            <svg class="w-5 h-5 ml-2 animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99" />
            </svg>
        `);

        let formData = new FormData(this);

        fetch(window.Shopify.routes.root + 'cart/add.js', {
            method: 'POST',
            body: formData
        })
        .then(res => res.json())
        .then(() => {
            return fetch(window.Shopify.routes.root + 'cart.js').then(res => res.json());
        })
        .then(cart => {
            $(".cart-popup").removeClass("hidden");
            $(".cart-drawer-items").empty();

            cart.items.forEach(item => {
                $(".cart-drawer-items").append(`
                    <div class="product-info-image flex gap-3 border-b border-black/10 last:border-0 pb-2 fast:pt-0 pt-3">
                        <div class="image w-20 h-20 bg-gray-100 rounded-md overflow-hidden">
                            <img src="${ item.image }" alt="${item.title}" class="object-cover w-full h-full" />
                        </div>
                        <div class="flex-grow relative">
                            <div class="product-info flex flex-col gap-2 font-satoshi text-gray-800 font-medium text-base leading-none">
                                <h1 class="font-bold">${ item.title }</h1>
                                <p>Quantity: ${ item.quantity }</p>
                                <h2>Price: $${ ((item.quantity * item.price) / 100).toFixed(2) }</h2>
                            </div>
                        </div>
                    </div>
                `);
            });

            // Restore button
            btn.prop("disabled", false).text(originalText);
        })
        .catch(err => {
            console.error("Error:", err);
            alert("Product not added");
            btn.prop("disabled", false).text(originalText);
        });
    });
});
