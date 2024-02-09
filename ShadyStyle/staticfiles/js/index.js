function displayAlert() {
  alert("Item has been added to the cart!");
}

function pageLoading() {
  alert("The page is Loading ckick ok to continue . . .");
}

async function getSunglassPage(itemId) {
    const response = await fetch(`${itemId}`);
    if (response.ok) {
        window.location.href = `${itemId}`;
    } else {
        console.error('Error:', response.status);
    }
}

async function addToCart(itemId) {
  const response = await fetch(`/api/get_sunglass/${itemId}`);
  if (response.ok) {
      const item = await response.json();
      item.quantity = 1;
      let cart = localStorage.getItem('cart');
      if (cart) {
          cart = JSON.parse(cart);
      } else {
          cart = [];
      }
      
      const existingItem = cart.find(i => i.id === item.id);
      if (!existingItem) {
          
          cart.push(item);
          localStorage.setItem('cart', JSON.stringify(cart));
      }
  } else {
      console.error('Error:', response.status);
  }
}

window.onload = function() {
  let cart = localStorage.getItem('cart');
  const emptyCartMessage = document.getElementById('empty-cart-message');
  if (cart) {
      cart = JSON.parse(cart);
      const productContainer = document.querySelector('.product');
      productContainer.innerHTML = '';  
      let subtotal = 0;
      cart.forEach(item => {
          const itemElement = document.createElement('div');
          itemElement.classList.add('product');
          itemElement.dataset.id = item.id;
          
          const price = Number(item.price);
          const quantity = Number(item.quantity);
          itemElement.innerHTML = `
              <div class="product-image">
                  <img src="${item.img}">
              </div>
              <div class="product-details">
                  <div class="product-title">${item.name}</div>
                  <p class="product-description">${item.description}</p>
              </div>
              <div class="product-price">${price}</div>
              <div class="product-quantity">
                <input type="number" value="${quantity}" min="1" class="quantity-input">
              </div>
              <div class="product-removal">
                  <button class="remove-product">Remove</button>
              </div>
              <div class="product-line-price">${price * quantity}</div>
          `;
          productContainer.appendChild(itemElement);
          subtotal += price * quantity;

          
          const quantityInput = itemElement.querySelector('.quantity-input');
          quantityInput.addEventListener('change', function() {
            updateQuantity(item.id, this.value);
            calculateTotals();  
        });
      });
      calculateTotals();  

      // Show or hide the empty cart message
      if (cart.length === 0) {
          emptyCartMessage.style.display = 'block';
      } else {
          emptyCartMessage.style.display = 'none';
      }
  } else {
      // Show the empty cart message if there's no cart in localStorage
      emptyCartMessage.style.display = 'block';
  }

  
  const removeButtons = document.querySelectorAll('.remove-product');
  removeButtons.forEach(button => {
      button.addEventListener('click', function() {
          const itemElement = this.parentElement.parentElement;
          const itemId = itemElement.dataset.id;  
          removeItem(itemId);  
          itemElement.remove();
          
          // Save the updated cart data to localStorage immediately after an item is removed
          let updatedCart = localStorage.getItem('cart');
          if (updatedCart) {
              updatedCart = JSON.parse(updatedCart);
              localStorage.setItem('cart', JSON.stringify(updatedCart));
              calculateTotals();

              // Show or hide the empty cart message
              if (updatedCart.length === 0) {
                  emptyCartMessage.style.display = 'block';
              } else {
                  emptyCartMessage.style.display = 'none';
              }
          }
      });
  });
}

function removeItem(itemId) {
  let cart = localStorage.getItem('cart');
  const emptyCartMessage = document.getElementById('empty-cart-message');
  if (cart) {
      cart = JSON.parse(cart);
      
      itemId = Number(itemId);
      cart = cart.filter(item => item.id !== itemId);  
      localStorage.setItem('cart', JSON.stringify(cart)); 
      
      if (cart.length === 0) {
        // Show the empty cart message if the cart is now empty
        emptyCartMessage.style.display = 'block';
      }
      return cart;  
  }
  return [];  
}

function calculateTotals() {
  let cart = localStorage.getItem('cart');
  if (cart) {
      cart = JSON.parse(cart);
      let subtotal = 0;
      cart.forEach(item => {
          const price = Number(item.price);
          const quantity = Number(item.quantity);
          subtotal += price * quantity;
      });
      document.getElementById('cart-subtotal').textContent = subtotal.toFixed(2);
      document.getElementById('cart-tax').textContent = (subtotal * 0.05).toFixed(2);  
      document.getElementById('cart-total').textContent = (subtotal * 1.05 + 15).toFixed(2);  
  }
}

function updateQuantity(itemId, quantity) {
  let cart = localStorage.getItem('cart');
  if (cart) {
      cart = JSON.parse(cart);
      const item = cart.find(i => i.id === itemId);  
      if (item) {
          item.quantity = Number(quantity);  
          localStorage.setItem('cart', JSON.stringify(cart));  

           
           const itemElement = document.querySelector(`.product[data-id="${itemId}"]`);
           const priceElement = itemElement.querySelector('.product-price');
           const linePriceElement = itemElement.querySelector('.product-line-price');
           const price = Number(priceElement.textContent);
           linePriceElement.textContent = (price * item.quantity).toFixed(2);
      }
  }
}