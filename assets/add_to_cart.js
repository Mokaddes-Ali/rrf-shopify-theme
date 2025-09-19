// console.log("Test Loaded cart js");
jQuery(document).ready( function(){
    let addToCartForm = document.querySelector('form[action$="/cart/add"]');

$(addToCartForm).on("submit", function(e){
    e.preventDefault();
    // console.log("form submitted");
     const btn = $("#add-to-cart");
            
            const originalText = btn.text();
            btn.prop("disabled", true).html(`
      <svg class="w-5 h-5 ml-2 animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99" />
      </svg>
    `);
    let formData = new FormData(addToCartForm);

fetch(window.Shopify.routes.root + 'cart/add.js', {
  method: 'POST',
  body: formData
})
.then(response => {
  return response.json(
       btn.html("Added to Cart"),
      alert("Submitted Product")
  );
})
.catch((error) => {
  console.error('Error:', error);
  alert("Product not added");
});
})
});