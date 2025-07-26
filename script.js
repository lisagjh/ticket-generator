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

// form submit
const form = document.querySelector("form")

form.addEventListener("submit", (e) => {
  e.preventDefault()

  // get values
  const firstName = document.querySelector("#firstName").value.trim()
  const lastName = document.querySelector("#lastName").value.trim()
  const email = document.querySelector("#email").value.trim()
  const file = inputFile.files[0]

  // validation
  if (!firstName || !lastName || !email || !file) {
    alert("Please fill in all fields")
    return
  }

  // check file type
  const allowedTypes = ['image/jpeg', 'image/png']
  if (!allowedTypes.includes(file.type)) {
    alert('Only JPG and PNG are allowed.')
    return
  }

  // check file size
  const maxFileSize = 500 * 1024 // 500kb
  if (file.size > maxFileSize) {
    alert('Image is too big. Max 500kb.')
    return
  }

  // go to success page
  window.location.href = 'success.html'
})
