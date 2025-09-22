
jQuery(document).ready( function(){

  // quantity for popup and product details page

  const qtyInput = $('input[name="quantity"]');
    const productQuantity = $(".product-quantity");

    $(".plus-icon").off("click").on("click", function() {
        let value = parseInt(qtyInput.val()) || 1;
        value++;
        qtyInput.val(value);
        productQuantity.text(value);
    });

    $(".minus-icon").off("click").on("click", function() {
        let value = parseInt(qtyInput.val()) || 1;
        if (value > 1) value--;
        qtyInput.val(value);
        productQuantity.text(value);
    });


    // close_cart_drapper
    $('.close_cart_drapper').on("click", function(){
         $(".cart-popup").addClass("hidden");
          $(".product-cart-popup").addClass("hidden");
    });




      $(".product_quick_view").on("click", function(){

        let handle = $(this).data("product-handle");  
      
        $(".product-cart-popup").removeClass("hidden");

          // পুরোনো data clear করো
  $("#pop-up-product-title").empty();
  $(".pop-up-product-description").empty();
  $("#pop-up-product-price").empty();
  $("#pop-up-product-compare-price").empty();
  $("#discount_percent").empty();


  $("#product-loading").removeClass("hidden");


      $.ajax({
    type: "GET",
    url: "/products/" + handle + ".js",
    dataType: "json",
    success: function (product) {

      $("#product-loading").addClass("hidden");

      const product_price = product.variants[0].price;
      const product_compare_price = product.variants[0].compare_at_price;

      $("#pop-up-product-title").text(product.title);
      $(".pop-up-product-description").html(product.description);
      $("#pop-up-product-price").text(`$${(product_price / 100).toFixed(2)}`);

        $("#pop-up-product-compare-price").text(`$${(product_compare_price / 100).toFixed(2)}`);


         if ( product_compare_price > product_price ){
          let discount = ((product_compare_price - product_price) * 100) /product_compare_price;
          if(discount){
                $("#discount_percent").text(`${(discount).toFixed(2)}%`);
          }
           $("#discount_percent").addClass('hidden');
         
        
          }
    },
    error: function (err) {
      $("#product-loading").addClass("hidden");
      $("#pop-up-product-title").text("Failed to load product.");
      console.error("Product fetch failed:", err);
    }
  });
});

});