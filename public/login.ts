const loginForm = document.getElementById("loginForm") as HTMLFormElement
const loginUsername = document.getElementById("login-username") as HTMLInputElement
const loginPassword = document.getElementById("login-password") as HTMLInputElement
const errorField = document.getElementById("errorField") as HTMLParagraphElement

loginForm.addEventListener("submit", (event) => {
  event.preventDefault()
  if (!loginUsername.value || !loginPassword.value) {
    errorField.innerText = "Fill out all fields"
    return
  }
  fetch(`/checkLogin?userName=${loginUsername.value}&password=${loginPassword.value}`)
    .then(data => data.json())
    .then(data => {
      if (data.status == 0) {
        errorField.innerText = "Login failed"
        return
      }
      window.location.href = "/"
    })
})