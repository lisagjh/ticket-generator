// avatar upload and preview
const dropArea = document.querySelector("#dropArea")
const inputFile = document.querySelector("#myFile")
const imageView = document.querySelector("#image-view")
const button = document.querySelector("button")

inputFile.addEventListener("change", uploadImage)

function uploadImage() {
  const file = inputFile.files[0]
  if (!file) return

  const imgLink = URL.createObjectURL(file)
  imageView.style.backgroundImage = `url(${imgLink})`
}

const form = document.querySelector("form");

// check if email is valid using regex
function isValidEmail(email) {
  const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return pattern.test(email);
}

form.addEventListener("submit", (e) => {
  e.preventDefault()

  const firstName = document.querySelector("#firstName").value.trim()
  const lastName = document.querySelector("#lastName").value.trim()
  const email = document.querySelector("#email").value.trim()
  const file = inputFile.files[0]
  const github = document.querySelector("#github").value

  if (!firstName || !lastName || !email || !file) {
    alert("Please fill in all fields")
    return
  }

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

  if (!isValidEmail(email)) {
    alert("Dit is geen geldig e-mailadres.");
    return
  }
  

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
})
