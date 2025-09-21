
jQuery(document).ready( function(){
    $('.close_cart_drapper').on("click", function(){
         $(".cart-popup").addClass("hidden");
          $(".product-cart-popup").addClass("hidden");
    });



    $(".product_quick_view").on("click", function(){
        $(".product-cart-popup").removeClass("hidden");

        $.ajax({
      type: "GET",
      url: "/cart.js",
      dataType: "json",
      success: function (cart) {
        updateCartUI(cart);
      }
    });
    });

});