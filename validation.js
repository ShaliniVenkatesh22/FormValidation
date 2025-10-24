const form = document.getElementById("form");
const msg = document.getElementById("msg");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const username = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("pass").value.trim();
  const confirm_password = document.getElementById("cpass").value.trim();

  if (!username || !email || !password || !confirm_password) {
    alert("All fields are required");
    return;
  }

  if (password.length < 5) {
    alert("Password length must be greater than 5");
    return;
  }

  if (password !== confirm_password) {
    alert("Passwords do not match");
    return;
  }

  try {
    const res = await fetch("/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, email, password }),
    });

    const data = await res.json();
    msg.textContent = data.message;
  } catch (err) {
    console.error("Error:", err);
    msg.textContent = "Something went wrong. Please try again later.";
  }
});
