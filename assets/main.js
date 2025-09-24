
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
        $(".wishlist-cart-popup").addClass("hidden");
    });

      $(".product_quick_view").on("click", function(){

        let handle = $(this).data("product-handle");  
      
        $(".product-cart-popup").removeClass("hidden");
          $("#product-loading").removeClass("hidden");

          const ratingContainer = $(".rating-stars");

// Build stars HTML
let starsHTML = '';
for (let i = 1; i <= 5; i++) {
  starsHTML += `
    <svg xmlns="http://www.w3.org/2000/svg" width="25" height="23" viewBox="0 0 25 23" fill="none">
      <path
        d="M12.3562 0L15.8569 7.53796L24.1077 8.53794L18.0204 14.1966L19.619 22.3526L12.3562 18.3119L5.09341 22.3526L6.69201 14.1966L0.604756 8.53794L8.85555 7.53796L12.3562 0Z"
        fill="#FFC633" />
    </svg>
  `;
}

      $.ajax({
    type: "GET",
    url: "/products/" + handle + ".js",
    dataType: "json",
    success: function (product) {
      console.log(product);

      $("#product-loading").addClass("hidden");
          $("#pop-up-product-details").empty().append(`
            <section class="product-template">
    <!-- Product Details -->
<div class="product-details-area w-full py-6 px-5 flex">
    <!-- product-details-left image -->
    <div class="product-details-left w-6/12 flex gap-6">
        <!-- Sidebar images -->
    <div class="slider-nav product-image-sidebar pt-8 flex flex-col gap-3">

    ${ product.images.map(img => `
        <div class="product-sidebar-img w-[100px] h-[120px]">
          <img src="${ img }" alt="${ product.title }" class="w-full h-full object-contain"/>
        </div>`
    )};
    </div>
         <!-- Main image slider -->
    <div class="slider-for product-main-image w-[344px] h-[430px]">
        <div>
          <img src="${ product.featured_image }" alt="${ product.title }" class="w-full h-[530px] object-contain"/>
        </div>
    </div>
    </div>
    

  
    <!-- product details right -->
    <div class="product-details-right w-4/12 flex flex-col gap-[12px] pt-[5px] pb-[25px]">

        <!-- product text -->
        <div class="text-area-wrapper w-full flex flex-col gap-[15.30px]">
            <h1 class="text-black font-[700] min-w-[610px] text-[39.25px] not-italic leading-none font-integralcf">
               ${ product.title }
                </h1>

            <!-- rating -->
            <div class="rating flex gap-[14px] items-center pt-[2px]">
                <div class="rating-icon flex gap-[7.10px]">
                    ${starsHTML}
                </div>
                <!-- rating rate -->
                <div class="rating-rate">
                    <h1 class="text-black font-satoshi text-[16px] not-italic font-normal leading-none">4.5/5</h1>
                </div>
            </div>

            <!-- product price -->
            <div class="product-price pt-[7.60px] pb-[2px] flex gap-[13.50px]">
                <h1 class="text-black font-satoshi text-[32px] not-italic font-extrabold leading-none">
                ${ product.price }
                </h1>
                <h2
                    class="text-[rgba(0,0,0,0.3)] font-satoshi text-[32px] not-italic font-bold leading-none line-through">
                     ${ product.compare_at_price }
                    </h2>
               
            </div>

            <!-- text -->
            <p class="text-[rgba(0,0,0,0.6)] pb-[3px] font-satoshi text-[16px] not-italic font-normal leading-[22px]">
                ${ product.description }
                </p>
            <!-- divider -->
            <div class="w-full h-[2px] bg-[rgba(0,0,0,0.10)]"></div>
          </div>

    <div class="cart-btn">
      <button id="add-to-cart"
        class="disabled:cursor-not-allowed disabled:opacity-50 flex px-[54px] py-[16px] justify-center items-center gap-[12px] flex-shrink-0 rounded-[62px] bg-black text-white font-[Satoshi] text-[16px] not-italic font-medium leading-normal"
        type="submit">
        Add to Cart
      </button>
    </div>

    </div>


</div>
</section>
    `);

    

    },
    error: function (err) {
      $("#product-loading").addClass("hidden");
      $("#pop-up-product-title").text("Failed to load product.");
      console.error("Product fetch failed:", err);
    }
  });
});


      // Add to wishlist
            $(".add_wishlist").on("click", function () {
            var card = $(this).closest(".wishlist-card");
            $(this).addClass("hidden");
            card.find(".close_wishlist").removeClass("hidden");

            let product_id = $(this).data("product_id");

            let wishList = JSON.parse(localStorage.getItem("wishlist") || "[]");
            if (!wishList.includes(product_id)) {
                wishList.push(product_id);
                localStorage.setItem("wishlist", JSON.stringify(wishList));
                $(".show-wishlist-btn span").text(wishList.length);

            }
            });

            // Remove from wishlist
            $(".close_wishlist").on("click", function () {
            var card = $(this).closest(".wishlist-card");
            $(this).addClass("hidden");
            card.find(".add_wishlist").removeClass("hidden");

            let product_id = $(this).data("product_id");

            let wishList = JSON.parse(localStorage.getItem("wishlist") || "[]");
            wishList = wishList.filter((id) => id !== product_id);
            localStorage.setItem("wishlist", JSON.stringify(wishList));
            $(".show-wishlist-btn span").text(wishList.length);
            });
        //   loading stay wishlist button
            $(".wishlist-card").each(function () {
            let product_id = $(this)
                .find(".add_wishlist, .close_wishlist")
                .data("product_id");

            let wishList = JSON.parse(localStorage.getItem("wishlist") || "[]");
            if (wishList.includes(product_id)) {
                $(this).find(".add_wishlist").addClass("hidden");
                $(this).find(".close_wishlist").removeClass("hidden");
                $(".show-wishlist-btn span").text(wishList.length);
            }
            });
              // show-wishlist-btn
           $(".show-wishlist-btn").on("click", function(){
               let wishList_card = localStorage.getItem("wishlist");
               if(wishList_card){
                 $(".wishlist-cart-popup").removeClass("hidden");
                 wishList_card = JSON.parse(wishList_card);

                 $(".wishlist-drawer-items").empty();
                 
                 wishList_card.forEach( function(product_handle){
                  console.log(product_handle);
                   $.ajax({
                        type: "GET",
                        url: `/products/${product_handle}.js`,
                        dataType: "json",
                        success: function (product) {
                        console.log(product);

          $(".wishlist-drawer-items").append(`
         <section class="product-template flex gap-4 items-center">
                  <!-- image  -->
              <div class="w-4/12">
                  <div class="w-[144px] h-[130px]">
                    <img src="${ product.featured_image }" alt="${ product.title }" class="w-full h-full object-contain"/>
                  </div>
              </div>

    
    <div class="product-details-right w-8/12 flex flex-col gap-3 py-1.5">

        <!-- product text -->
        <div class="text-area-wrapper w-full flex flex-col gap-[15.30px]">
            <h1 class="text-black font-[500] max-w-lg text-base not-italic leading-none font-integralcf">
               ${ product.title }
                </h1>

            <!-- product price -->
            <div class="product-price py-1">
                <h1 class="text-black font-satoshi text-base not-italic font-extrabold leading-none">
                $${ (product.price /100).toFixed(2) }
                </h1>  
            </div>
          </div>

    <div class="cart-btn flex gap-3">
       <form action="/cart" method="post" class="flex items-center gap-4">
  <div class="flex px-5 py-3 gap-3 items-center flex-shrink-0 rounded-[62px] bg-[#F0F0F0]">
      <!-- Minus Icon -->
      <svg class="minus-icon" xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none">
        <path d="M21.375 12C21.375 12.2984 21.2565 12.5845 21.0455 12.7955C20.8345 13.0065 20.5484 13.125 20.25 13.125H3.75C3.45163 13.125 3.16548 13.0065 2.9545 12.7955C2.74353 12.5845 2.625 12.2984 2.625 12C2.625 11.7016 2.74353 11.4155 2.9545 11.2045C3.16548 10.9935 3.45163 10.875 3.75 10.875H20.25C20.5484 10.875 20.8345 10.9935 21.0455 11.2045C21.2565 11.4155 21.375 11.7016 21.375 12Z" fill="black"/>
      </svg>

      <span class="product-quantity text-black font-satoshi text-[16px] text-center">1</span>

      <input type="hidden" name="quantity" value="1" min="1" />

      <!-- Plus Icon -->
      <svg class="plus-icon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none">
        <path d="M21.375 12C21.375 12.2984 21.2565 12.5845 21.0455 12.7955C20.8345 13.0065 20.5484 13.125 20.25 13.125H13.125V20.25C13.125 20.5484 13.0065 20.8345 12.7955 21.0455C12.5845 21.2565 12.2984 21.375 12 21.375C11.7016 21.375 11.4155 21.2565 11.2045 21.0455C10.9935 20.8345 10.875 20.5484 10.875 20.25V13.125H3.75C3.45163 13.125 3.16548 13.0065 2.9545 12.7955C2.74353 12.5845 2.625 12.2984 2.625 12C2.625 11.7016 2.74353 11.4155 2.9545 11.2045C3.16548 10.9935 3.45163 10.875 3.75 10.875H10.875V3.75C10.875 3.45163 10.9935 3.16548 11.2045 2.9545C11.4155 2.74353 11.7016 2.625 12 2.625C12.2984 2.625 12.5845 2.74353 12.7955 2.9545C13.0065 3.16548 13.125 3.45163 13.125 3.75V10.875H20.25C20.5484 10.875 20.8345 10.9935 21.0455 11.2045C21.2565 11.4155 21.375 11.7016 21.375 12Z" fill="black"/>
      </svg>
  </div>
</form>

      <button id="add-to-cart"
        class="disabled:cursor-not-allowed disabled:opacity-50 flex px-6 py-3 justify-center items-center gap-[12px] flex-shrink-0 rounded-[62px] bg-black text-white font-[Satoshi] text-sm not-italic font-medium leading-normal"
        type="submit">
        Add to Cart
      </button>
    </div>
</section>`
          )
        }
          });
                 })

               }

             });
            

});