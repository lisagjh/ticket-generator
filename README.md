# Conference Ticket Generator

This is a solution to the [Conference ticket generator challenge on Frontend Mentor](https://www.frontendmentor.io/challenges/conference-ticket-generator-oq5gFIU12w). This project allows users to fill out a form with their details and generate a personalized conference ticket.

<img width="1470" height="917" alt="Preview of generated ticket" src="https://github.com/user-attachments/assets/c237cf7e-6c6f-4502-a62c-5842db378f89" />

## Table of Contents

- [Overview](#overview)
  - [The Challenge](#the-challenge)
- [My Process](#my-process)
  - [Built With](#built-with)
  - [What I Learned](#what-i-learned)
  - [Continued Development](#continued-development)
- [Author](#author)

## Overview

### The Challenge

Users should be able to:

- Complete the form with their details and upload an avatar.
- Receive form validation messages if:
  - Any field is missed.
  - The email address is not formatted correctly.
  - The avatar upload is too big (max 500kb) or the wrong image format (JPG or PNG only).
- Complete the form using only their keyboard.
- See the generated conference ticket when they successfully submit the form.
- View the optimal layout for the interface depending on their device's screen size.
- See hover and focus states for all interactive elements on the page.

## My Process

### Built With

- HTML
- CSS
  - custom properties, altered by JS
- JavaScript
- Mobile First Development

I decided to go back to plain old HTML, CSS and JS for this. I have gotten so used to working with frameworks, that I thought it was a good idea to go back

### What I Learned

This project was a great opportunity to work with vanilla JavaScript for form handling, validation, and dynamic content generation.

#### Client-Side Form Validation

I added validation using JavaScript. The form checks for empty fields, validates the email format with a regular expression, and inspects the uploaded file's type and size. Invalid submissions are prevented, and users are alerted to the specific errors.

```javascript
// check if email is valid using regex
function isValidEmail(email) {
  const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return pattern.test(email);
}

// ... inside the submit event listener
const allowedTypes = ['image/jpeg', 'image/png']
if (!allowedTypes.includes(file.type)) {
  alert('Only JPG and PNG are allowed.')
  return
}

const maxFileSize = 500 * 1024
if (file.size > maxFileSize) {
  alert('Image is too big. Max 500kb.')
  return
}
```

#### Data Persistence with `sessionStorage`

To transfer user data from the form page (`index.html`) to the success page (`success.html`), I used `sessionStorage`. For the user's avatar, the `FileReader` API was used to convert the image file into a base64 string, which could then be easily stored and retrieved.

(Took some googling to figure out how to do that though.)

```javascript
// Convert file to base64
const reader = new FileReader()
reader.onload = function (event) {
  const base64Image = event.target.result

  // Opslaan in sessionStorage
  sessionStorage.setItem("userFirstName", firstName)
  sessionStorage.setItem("userLastName", lastName)
  sessionStorage.setItem("userEmail", email)
  sessionStorage.setItem("userGithub", github)
  sessionStorage.setItem("userImage", base64Image)

  // Doorsturen
  window.location.href = 'success.html'
}

reader.readAsDataURL(file)
```

#### Interactive Card Effect

On the success page, the generated ticket features an interactive hover effect. I used a `mousemove` event listener on the card to calculate the cursor's position relative to the card's center. This data is then used to update CSS custom properties for `rotateX`, `rotateY`, and a radial gradient for a glare effect. This creates a smooth, perspective-based tilt as the user hovers over their ticket.

```javascript
// ...inside 'mousemove' event listener on the card
const rect = card.getBoundingClientRect();
const x = e.clientX - rect.left;
const y = e.clientY - rect.top;

const centerX = rect.width / 2;
const centerY = rect.height / 2;
const rotateLimit = 10;

// card rotation
const rotateY = ((x - centerX) / centerX) * rotateLimit;
const rotateX = ((centerY - y) / centerY) * rotateLimit;

// set card rotation and glare styling using CSS custom properties
card.style.setProperty('--rotateX', `${rotateX}deg`);
card.style.setProperty('--rotateY', `${rotateY}deg`);
card.style.setProperty('--glare-opacity', '.5');
```

```css
.card {
  --rotateX: 0deg;
  --rotateY: 0deg;
  transform: perspective(1000px) rotateX(var(--rotateX)) rotateY(var(--rotateY));
  transition: transform 0.2s ease-out;
}
```

### Continued Development

I would like to add better error handling. Now the user just get's a standard browser alert. I'd like to create a custom alert. Also need to make it visible which input is missing.
