async function loadWorkers() {
  try {
    const res = await fetch("http://localhost:5000/api/workers/all");
    const workers = await res.json();

    const workersList = document.getElementById("workersList");
    workersList.innerHTML = "";

    if (workers.length === 0) {
      workersList.innerHTML = "<p>No workers available right now.</p>";
      return;
    }

    workers.forEach(worker => {
      const card = document.createElement("div");
      card.classList.add("worker-card");
      card.innerHTML = `
        <h3>${worker.name}</h3>
        <p><strong>Email:</strong> ${worker.email}</p>
        <p><strong>Job:</strong> ${worker.jobType}</p>
        <p><strong>Experience:</strong> ${worker.experience}</p>
      `;
      workersList.appendChild(card);
    });
  } catch (err) {
    alert("⚠️ Could not fetch workers.");
  }
}

// Load workers when page opens
loadWorkers();
