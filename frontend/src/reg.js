document.querySelector(".reg-form").addEventListener("submit", async (e) => {
  e.preventDefault();

  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();
  const phn = document.getElementById("phn").value.trim();
  const add = document.getElementById("add").value.trim();

  // Email must end with @gmail.com
  const emailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
  // Phone must be digits only and 10 digits long
  const phoneRegex = /^\d{10}$/;

  if (!emailRegex.test(email)) {
    alert("❌ Please enter a valid Gmail address (e.g., user@gmail.com)");
    return;
  }

  if (!phoneRegex.test(phn)) {
    alert("❌ Please enter a valid 10-digit phone number");
    return;
  }

  try {
    const res = await fetch("http://localhost:5000/api/workers/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password, phn, add }),
    });

    const data = await res.json();
    if (res.ok) {
      alert("✅ Registered successfully!");
      window.location.href = "login.html";
    } else {
      alert("❌ " + data.message);
    }
  } catch (err) {
    alert("Server error!");
    console.error(err);
  }
});