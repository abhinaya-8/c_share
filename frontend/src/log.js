document.querySelector(".login-form").addEventListener("submit", async (e) => {
  e.preventDefault();

  const email = document.getElementById("loginEmail").value;
  const password = document.getElementById("loginPassword").value;
  const role = document.querySelector('input[name="role"]:checked').value;

  try {
    const res = await fetch("http://localhost:5000/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password, role }),
    });

    const data = await res.json();
    if (res.ok) {
      alert("✅ Login successful!");
      if (role === "Work") {
        window.location.href = "work.html";
      } else {
        window.location.href = "hire.html";
      }
    } else {
      alert("❌ " + data.message);
    }
  } catch (err) {
    alert("Server error!");
    console.error(err);
  }
});
