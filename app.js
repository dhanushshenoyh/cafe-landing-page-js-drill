/**
 * Brew & Byte Café - Client Interactions
 * Day 01: HTML, CSS & JavaScript Essentials
 */

document.addEventListener('DOMContentLoaded', () => {
  // Elements
  const menuGrid = document.querySelector('.menu-grid');
  const orderCountElement = document.getElementById('order-count');
  const contactForm = document.getElementById('contact-form');
  const formFeedback = document.getElementById('form-feedback');

  // Running order count state
  let totalOrderItems = 0;

  /* ==========================================================================
     Task 4: Event Delegation & Event Bubbling Explanation
     ==========================================================================
     
     HOW EVENT BUBBLING WORKS:
     When an element (such as an <button> or an icon inside it) is clicked, the
     event starts at the innermost target (dispatch/target phase) and then travels
     upward through all parent DOM ancestors until it reaches <html> and window
     (bubbling phase).

     WHY EVENT DELEGATION WORKS FOR FUTURE / DYNAMIC ITEMS:
     Instead of attaching individual click listeners to every single '.btn-order'
     button on the page, we attach a single listener to their common ancestor:
     the '.menu-grid' container.
     
     When a user clicks any 'Add to order' button, that event bubbles up to the
     '.menu-grid' container, where our listener catches it. We then inspect
     `event.target.closest('button')` to detect which button was clicked and read
     its `dataset.item`.
     
     Because the listener is bound to the permanent parent container rather than
     individual card nodes, any new menu items or cards added to the DOM dynamically
     at a later time (e.g. from an API fetch or seasonal menu update) will automatically
     work out-of-the-box without needing to attach new event listeners or risking memory leaks.
     ========================================================================== */

  if (menuGrid && orderCountElement) {
    // Single event listener attached to the grid container
    menuGrid.addEventListener('click', (event) => {
      // Find the nearest button ancestor of the click target
      const button = event.target.closest('button');

      // Ignore clicks outside buttons or outside this specific menu grid
      if (!button || !menuGrid.contains(button)) {
        return;
      }

      // Check for the required data-item attribute
      const itemName = button.dataset.item;
      if (!itemName) {
        return;
      }

      // Increment order count
      totalOrderItems += 1;
      orderCountElement.textContent = totalOrderItems;

      // Provide temporary visual feedback on the button
      const originalText = button.textContent;
      button.textContent = `✓ Added ${itemName}!`;
      button.disabled = true;

      setTimeout(() => {
        button.textContent = originalText;
        button.disabled = false;
      }, 900);
    });
  }

  /* ==========================================================================
     Accessible Contact Form Handling
     ========================================================================== */
  if (contactForm && formFeedback) {
    contactForm.addEventListener('submit', (event) => {
      event.preventDefault();

      const nameInput = document.getElementById('contact-name');
      const emailInput = document.getElementById('contact-email');
      const messageInput = document.getElementById('contact-message');

      // Basic client validation check
      if (!nameInput.value.trim() || !emailInput.value.trim() || !messageInput.value.trim()) {
        formFeedback.className = 'form-feedback error';
        formFeedback.textContent = 'Please fill out all required fields before submitting.';
        return;
      }

      // Friendly success feedback
      const customerName = nameInput.value.trim();
      formFeedback.className = 'form-feedback success';
      formFeedback.textContent = `Thank you, ${customerName}! Your message has been sent to our barista team.`;

      // Reset form fields
      contactForm.reset();

      // Clear feedback after 6 seconds
      setTimeout(() => {
        formFeedback.textContent = '';
        formFeedback.className = 'form-feedback';
      }, 6000);
    });
  }
});
