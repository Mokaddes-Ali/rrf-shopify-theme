jQuery(document).ready(function () {

  function loading(){
   return ` <svg class="w-5 h-5 ml-2 animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99" />
            </svg>`

  }
  // 🔹 Cart UI 
  function updateCartUI(cart) {
     const cartWrapper = $(".cart-product-content");

  // Cart empty 
  if (cart.item_count === 0) {
    cartWrapper.html(`
      <div class="flex flex-col items-center justify-center py-16 w-full">
        <p class="text-2xl font-bold text-red-500 mb-6">Your cart is empty</p>
        <a href="/collections/all" 
           class="px-6 py-3 bg-black text-white rounded-[62px] font-medium hover:bg-gray-800 transition">
          Go to Shop
        </a>
      </div>
    `);
    return; 
  }

  // Cart
  cartWrapper.html(`
    <div class="cart-left-product flex self-start w-7/12 p-[20px_24px] flex-col items-start gap-6 rounded-[20px] border border-[rgba(0,0,0,0.10)]">
      <div id="cart-item"></div>
    </div>
    <div class="flex w-5/12 p-[22px_24px] flex-col items-start gap-[26px] shrink-0 rounded-[20px] border border-[rgba(0,0,0,0.10)]">
      <!-- Order Summary -->
      <div class="heading">
        <h1 class="text-black font-satoshi text-[24px] font-bold leading-none">Order Summary</h1>
      </div>
      <div class="calculation pt-[6px]  w-full flex flex-col gap-[28px]">
        <div class="subtotal w-full flex justify-between items-start">
          <h1 class="text-black/60 font-satoshi text-[20px]">Subtotal</h1>
          <h2 class="cart-summary-subtotal text-black text-[20px] font-bold"></h2>
        </div>
        <div class="subtotal w-full flex justify-between items-start">
          <h1 class="text-black/60 font-satoshi text-[20px]">Discount (-20%)</h1>
          <h2 class="cart-summary-discount text-[#FF3333] text-[20px] font-bold"></h2>
        </div>
        <div class="subtotal w-full flex justify-between items-start">
          <h1 class="text-black font-satoshi text-[20px]">Total</h1>
          <h2 class="cart-summary-total text-black text-[24px] font-bold"></h2>
        </div>
      </div>
        <!-- coupone code  -->
      <form class="flex w-full justify-between items-start -mt-[3px]">
        <div class=" p-3.5 rounded-[62px] bg-[#F0F0F0]">

          <!-- Icon + Input -->
          <div class="flex items-center gap-3">
            <!-- SVG Icon -->
            <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none" viewBox="0 0 24 24">
              <path
                d="M23.0766 12.4857L13.7653 3.17444C13.5917 2.9997 13.3851 2.86115 13.1576 2.76685C12.93 2.67254 12.686 2.62435 12.4397 2.62507H3.75001C3.45164 2.62507 3.16549 2.7436 2.95451 2.95457C2.74353 3.16555 2.62501 3.4517 2.62501 3.75007V12.4398C2.62429 12.6861 2.67248 12.9301 2.76679 13.1576C2.86109 13.3852 2.99963 13.5918 3.17438 13.7654L12.4856 23.0766C12.8372 23.4281 13.3141 23.6256 13.8113 23.6256C14.3084 23.6256 14.7853 23.4281 15.1369 23.0766L23.0766 15.1369C23.4281 14.7853 23.6255 14.3085 23.6255 13.8113C23.6255 13.3141 23.4281 12.8373 23.0766 12.4857ZM13.8113 21.2204L4.87501 12.2813V4.87507H12.2813L21.2175 13.8113L13.8113 21.2204ZM9.37501 7.87507C9.37501 8.17174 9.28703 8.46175 9.12221 8.70842C8.95739 8.9551 8.72312 9.14736 8.44903 9.26089C8.17494 9.37442 7.87334 9.40412 7.58237 9.34625C7.2914 9.28837 7.02413 9.14551 6.81435 8.93573C6.60457 8.72595 6.46171 8.45868 6.40383 8.1677C6.34595 7.87673 6.37566 7.57513 6.48919 7.30104C6.60272 7.02695 6.79498 6.79269 7.04165 6.62786C7.28833 6.46304 7.57834 6.37507 7.87501 6.37507C8.27283 6.37507 8.65436 6.5331 8.93567 6.81441C9.21697 7.09571 9.37501 7.47724 9.37501 7.87507Z"
                fill="black" fill-opacity="0.4" />
            </svg>
            <!-- Input -->
            <input type="text" placeholder="Add promo code"
              class="flex-1 bg-transparent outline-none placeholder-black/40 text-black/40 text-[16px] font-[400] font-satoshi" />
          </div>
        </div>
        <!-- Right: Button -->
        <div>
          <button type="submit"
            class="flex justify-center items-center gap-3 px-8 py-2.5 rounded-[62px] bg-black text-white text-[16px] font-satoshi font-medium">
            Apply
          </button>
        </div>
      </form>
      <!-- Checkout Button -->
      <div class="checkout-btn">
        <button class="flex h-[60px] px-[54px] justify-center items-center gap-[12px] rounded-[62px] bg-black text-white text-[16px] font-medium">
          Go to Checkout
        </button>
      </div>
    </div>
  `);
    // Left side 
    $("#cart-item").empty();

    $.each(cart.items, function (index, item) {
      $("#cart-item").append(`
        <div class="product-wrapper flex items-center justify-between border-b py-4">
          <div class="flex items-center gap-4">
            ${item.image ? `
              <img src="${item.image}" alt="${item.title}" class="w-20 h-20 object-cover rounded-md" />
            ` : ""}
            <div>
              <h1 class="font-bold text-lg">${item.title}</h1>
              <p class="text-sm text-gray-500">Qty: <span class="product-quantity">${item.quantity}</span></p>
              <h2 class="font-semibold">$${(item.original_price / 100).toFixed(2)}</h2>
            </div>
          </div>
          <div class="flex items-center gap-2">
            <button class="decrease-qty px-2 py-1 bg-gray-200 rounded" data-item-id="${item.key}">-</button>
            <span>${item.quantity}</span>
            <button class="increase-qty px-2 py-1 bg-gray-200 rounded" data-item-id="${item.key}">+</button>
            <button class="remove_item_from_cart text-red-500 ml-3" data-item-id="${item.key}">x</button>
          </div>
        </div>
      `);
    });

    // Right side 

    $(".cart-summary-subtotal").text(`$${(cart.items_subtotal_price / 100).toFixed(2)}`);
$(".cart-summary-discount").text(`$${(cart.total_discount / 100).toFixed(2)}`);
$(".cart-summary-total").text(`$${(cart.total_price / 100).toFixed(2)}`);


  const cartBadge = $(".cart-badge");
  if (cart.item_count > 0) {
    cartBadge.text(cart.item_count).show();
  } else {
    cartBadge.text("0").hide();
  }

  }

  // 🔹 Load cart 
  function loadCart() {
      $(".cart-summary-subtotal").html(loading());
    $(".cart-summary-discount").html(loading());
    $(".cart-summary-total").html(loading());

    $.ajax({
      type: "GET",
      url: "/cart.js",
      dataType: "json",
      success: function (cart) {
        updateCartUI(cart);
      }
    });
  }
  loadCart();

  function dataLoading(){
    $(".cart-summary-subtotal, .cart-summary-discount, .cart-summary-total").html(loading());
  }

  // 🔹 Remove 
  $(document).on("click", ".remove_item_from_cart", function (e) {
    e.preventDefault();
    let itemId = $(this).data("item-id");
     dataLoading();
    
    $.ajax({
      type: "POST",
      url: "/cart/change.js",
      data: { id: itemId, quantity: 0 },
      dataType: "json",
      success: function (cart) {
        updateCartUI(cart);
      }
    });
  });

  // Increase
  $(document).on("click", ".increase-qty", function (e) {
    e.preventDefault();
    let itemId = $(this).data("item-id");
    let currentQty = parseInt($(this).siblings("span").text());
    dataLoading();
    $.ajax({
      type: "POST",
      url: "/cart/change.js",
      data: { id: itemId, quantity: currentQty + 1 },
      dataType: "json",
      success: function (cart) {
        updateCartUI(cart);
      }
    });
  });

  //  Decrease
  $(document).on("click", ".decrease-qty", function (e) {
    e.preventDefault();
    let itemId = $(this).data("item-id");
    let currentQty = parseInt($(this).siblings("span").text());
    dataLoading();
    if (currentQty > 1) {
      $.ajax({
        type: "POST",
        url: "/cart/change.js",
        data: { id: itemId, quantity: currentQty - 1 },
        dataType: "json",
        success: function (cart) {
          updateCartUI(cart);
        }
      });
    }
  });
});
