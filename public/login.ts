const loginForm = document.getElementById("loginForm") as HTMLFormElement
const loginUsername = document.getElementById("login-username") as HTMLInputElement
const loginPassword = document.getElementById("login-password") as HTMLInputElement

loginForm.addEventListener("submit", (event) => {
  event.preventDefault()
})