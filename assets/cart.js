jQuery(document).ready(function () {

  // 🔹 Loading SVG
  function loading(){
    return `<svg class="w-5 h-5 ml-2 animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99" />
           </svg>`;
  }

  // 🔹 Money format
  function moneyFormat(cents){
    return '$' + (cents / 100).toFixed(2);
  }

  // 🔹 Update Cart UI
  function updateCartUI(cart){
    const cartWrapper = $(".cart-product-content");

    if(cart.item_count === 0){
      cartWrapper.html(`
        <div class="flex flex-col items-center justify-center py-16 w-full">
          <p class="text-2xl font-bold text-red-500 mb-6">Your cart is empty</p>
          <a href="/collections/all" class="px-6 py-3 bg-black text-white rounded-[62px] font-medium hover:bg-gray-800 transition">Go to Shop</a>
        </div>
      `);
      return;
    }

    // Main Cart HTML
    cartWrapper.html(`
      <div class="cart-left-product flex self-start w-7/12 p-[20px_24px] flex-col items-start gap-6 rounded-[20px] border border-[rgba(0,0,0,0.10)]">
        <div id="cart-item"></div>
      </div>
      <div class="flex w-5/12 p-[22px_24px] flex-col items-start gap-[26px] shrink-0 rounded-[20px] border border-[rgba(0,0,0,0.10)]">
        <!-- Order Summary -->
        <div class="heading">
          <h1 class="text-black font-satoshi text-[24px] font-bold leading-none">Order Summary</h1>
        </div>
        <div class="calculation pt-[6px] w-full flex flex-col gap-[28px]">
          <div class="subtotal w-full flex justify-between items-start">
            <h1 class="text-black/60 font-satoshi text-[20px]">Subtotal</h1>
            <h2 class="cart-summary-subtotal text-black text-[20px] font-bold"></h2>
          </div>
          <div class="subtotal w-full flex justify-between items-start">
            <h1 class="text-black/60 font-satoshi text-[20px]">Discount</h1>
            <h2 class="cart-summary-discount text-[#FF3333] text-[20px] font-bold"></h2>
          </div>
          <div class="subtotal w-full flex justify-between items-start">
            <h1 class="text-black font-satoshi text-[20px]">Total</h1>
            <h2 class="cart-summary-total text-black text-[24px] font-bold"></h2>
          </div>
        </div>
      </div>
    `);

    // Items loop
    $("#cart-item").empty();
    $.each(cart.items, function(index, item){
      $("#cart-item").append(`
        <div class="product-wrapper flex items-center justify-between border-b py-4">
          <div class="flex items-center gap-4">
            ${item.image ? `<img src="${item.image}" alt="${item.title}" class="w-20 h-20 object-cover rounded-md"/>` : ""}
            <div>
              <h1 class="font-bold text-lg">${item.title}</h1>
              <p class="text-sm text-gray-500">Qty: <span class="product-quantity">${item.quantity}</span></p>
              <h2 class="font-semibold">${moneyFormat(item.original_price)}</h2>
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

    // Summary
    $(".cart-summary-subtotal").text(moneyFormat(cart.items_subtotal_price));
    $(".cart-summary-discount").text(moneyFormat(cart.total_discount));
    $(".cart-summary-total").text(moneyFormat(cart.total_price));

    // Badge
    const cartBadge = $(".cart-badge");
    cartBadge.text(cart.item_count > 0 ? cart.item_count : "0").toggle(cart.item_count > 0);
  }

  // 🔹 Load Cart
  function loadCart(){
    $(".cart-summary-subtotal, .cart-summary-discount, .cart-summary-total").html(loading());
    $.getJSON('/cart.js', function(cart){
      updateCartUI(cart);
    });
  }
  loadCart();

  function dataLoading(){
    $(".cart-summary-subtotal, .cart-summary-discount, .cart-summary-total").html(loading());
  }

  // 🔹 Variant Selection (Color + Size)
  function selectVariant(){
    $('.color-btn, .size-btn').on('click', function(){
      $(this).siblings().removeClass('selected');
      $(this).addClass('selected');

      let selectedOptions = {};
      $('.color-btn.selected, .size-btn.selected').each(function(){
        selectedOptions[$(this).data('option-name')] = $(this).data('option-value');
      });

      $.getJSON('/products/{{ product.handle }}.js', function(product){
        let variant = product.variants.find(function(v){
          return v.options.every(function(opt, index){
            let optionName = product.options[index];
            return !selectedOptions[optionName] || v.options[index] == selectedOptions[optionName];
          });
        });

        if(variant){
          $('input[name="id"]').val(variant.id);
          // Optional: update main/thumbnail images dynamically
          if(variant.featured_image){
            $('.product-main-image img').attr('src', variant.featured_image.src);
            $('.slider-nav img:first').attr('src', variant.featured_image.src);
          }
        }
      });
    });
  }
  selectVariant();

  // 🔹 Remove item
  $(document).on("click", ".remove_item_from_cart", function(e){
    e.preventDefault();
    let itemId = $(this).data("item-id");
    dataLoading();
    $.post('/cart/change.js', {id: itemId, quantity: 0}, function(cart){
      updateCartUI(cart);
    }, 'json');
  });

  // 🔹 Increase qty
  $(document).on("click", ".increase-qty", function(e){
    e.preventDefault();
    let itemId = $(this).data("item-id");
    let currentQty = parseInt($(this).siblings("span").text());
    dataLoading();
    $.post('/cart/change.js', {id: itemId, quantity: currentQty + 1}, function(cart){
      updateCartUI(cart);
    }, 'json');
  });

  // 🔹 Decrease qty
  $(document).on("click", ".decrease-qty", function(e){
    e.preventDefault();
    let itemId = $(this).data("item-id");
    let currentQty = parseInt($(this).siblings("span").text());
    if(currentQty > 1){
      dataLoading();
      $.post('/cart/change.js', {id: itemId, quantity: currentQty - 1}, function(cart){
        updateCartUI(cart);
      }, 'json');
    }
  });

});
