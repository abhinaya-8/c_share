document.getElementById("workForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const jobType = document.getElementById("jobType").value;
  const experience = document.getElementById("experience").value;

  try {
    const res = await fetch("http://localhost:5000/api/workers/details", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, jobType, experience }),
    });

    const data = await res.json();

    if (res.ok) {
      alert("✅ Worker details updated successfully!");
      document.getElementById("workForm").reset();
      console.log("📦 Saved worker:", data.worker);
    } else {
      alert("❌ Error: " + data.error);
    }
  } catch (err) {
    alert("⚠️ Could not connect to backend. Is it running?");
    console.error(err);
  }
});
