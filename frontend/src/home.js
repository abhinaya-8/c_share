document.addEventListener("DOMContentLoaded", () => {
  // ------- DATA -------
  const workersData = {
    Plumber: [
      { name: "John Doe", exp: "5 years", contact: "9876543210", rate: 200 },
      { name: "Amit Verma", exp: "3 years", contact: "9876543211", rate: 180 },
      { name: "Karan Singh", exp: "7 years", contact: "9876543212", rate: 250 },
    ],
    Electrician: [
      { name: "Rahul Kumar", exp: "8 years", contact: "9876543221", rate: 220 },
      { name: "Sandeep Sharma", exp: "4 years", contact: "9876543222", rate: 200 },
    ],
    Tutor: [
      { name: "Anita Sharma", exp: "Math Teacher - 10 years", contact: "9876543232", rate: 300 },
      { name: "Rohit Gupta", exp: "Science Tutor - 6 years", contact: "9876543233", rate: 280 },
    ],
    Mechanic: [
      { name: "Ravi Singh", exp: "Car repairs - 9 years", contact: "9876543243", rate: 250 },
      { name: "Deepak Kumar", exp: "Bike specialist - 5 years", contact: "9876543244", rate: 200 },
    ],
    Painter: [
      { name: "Suresh Kumar", exp: "House Painting - 6 years", contact: "9876543254", rate: 220 },
      { name: "Vikas Yadav", exp: "Wall Art - 3 years", contact: "9876543255", rate: 240 },
    ],
    Gardener: [
      { name: "Arun Verma", exp: "Garden Care - 5 years", contact: "9876543265", rate: 150 },
      { name: "Mukesh Patil", exp: "Lawn Expert - 7 years", contact: "9876543266", rate: 170 },
    ],
    Chef: [
      { name: "Priya Nair", exp: "Indian Cuisine - 10 years", contact: "9876543276", rate: 400 },
      { name: "Alok Sen", exp: "Continental - 8 years", contact: "9876543277", rate: 380 },
    ],
    Caretaker: [
      { name: "Sunita Devi", exp: "Elderly Care - 12 years", contact: "9876543287", rate: 200 },
      { name: "Meena Kumari", exp: "Child Care - 6 years", contact: "9876543288", rate: 180 },
    ],
  };

  // ------- MODALS -------
  let selectedWorker = null;

  window.showDetails = function (role) {
    const modal = document.getElementById("detailsModal");
    const roleTitle = document.getElementById("roleTitle");
    const workersList = document.getElementById("workersList");

    if (!workersData[role]) {
      alert(`No workers found for "${role}".`);
      return;
    }

    roleTitle.innerText = role + "s in Your City";
    workersList.innerHTML = "";

    workersData[role].forEach((worker, index) => {
      const div = document.createElement("div");
      div.className = "worker";
      div.style.cursor = "pointer";
      div.innerHTML = `
        <strong>Name:</strong> ${worker.name}<br>
        <strong>Experience:</strong> ${worker.exp}<br>
        <strong>Contact:</strong> ${worker.contact}
      `;
      div.addEventListener("click", () => selectWorker(role, index));
      workersList.appendChild(div);
    });

    modal.style.display = "flex";
  };

  window.selectWorker = function (role, index) {
    selectedWorker = workersData[role][index];
    document.getElementById("bookingTitle").innerText = "Booking " + selectedWorker.name;
    document.getElementById("workerRate").innerText = selectedWorker.rate;

    document.getElementById("detailsModal").style.display = "none";
    document.getElementById("bookingModal").style.display = "flex";
  };

  window.confirmBooking = function () {
    const date = document.getElementById("date").value;
    const time = document.getElementById("time").value;
    const hours = parseInt(document.getElementById("hours").value, 10);

    if (!selectedWorker) {
      alert("Please select a worker first.");
      return;
    }
    if (!date || !time || !hours) {
      alert("Please fill all booking details.");
      return;
    }

    const totalCost = selectedWorker.rate * hours;

    alert(`Booking Confirmed!
Worker: ${selectedWorker.name}
Date: ${date}
Time: ${time}
Hours: ${hours}
Total Cost: ₹${totalCost}`);

    closeBooking();
  };

  window.closeModal = function () {
    document.getElementById("detailsModal").style.display = "none";
  };

  window.closeBooking = function () {
    document.getElementById("bookingModal").style.display = "none";
  };

  // ------- SEARCH + SUGGESTIONS -------
  const searchBox = document.getElementById("search-box");
  const suggestions = document.getElementById("suggestions");
  const roles = Object.keys(workersData); // ["Plumber", "Electrician", ...]

  function clearSuggestions() {
    suggestions.innerHTML = "";
    suggestions.style.display = "none";
  }

  function renderSuggestions(items) {
    suggestions.innerHTML = "";
    if (!items.length) {
      clearSuggestions();
      return;
    }
    items.forEach((role) => {
      const li = document.createElement("li");
      li.textContent = role;
      li.tabIndex = 0;
      li.addEventListener("click", () => {
        searchBox.value = role;
        clearSuggestions();
        showDetails(role); // 🔥 open details when a suggestion is clicked
      });
      suggestions.appendChild(li);
    });
    suggestions.style.display = "block";
  }

  function findMatches(q) {
    const query = q.trim().toLowerCase();
    if (!query) return [];
    return roles.filter((r) => r.toLowerCase().includes(query));
  }

  // Typing in search -> show suggestions
  searchBox.addEventListener("input", (e) => {
    const matches = findMatches(e.target.value);
    renderSuggestions(matches);
  });

  // Press Enter in the search box -> open details (exact or first match)
  searchBox.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      const query = searchBox.value.trim().toLowerCase();
      if (!query) return;

      // exact match first
      const exact = roles.find((r) => r.toLowerCase() === query);
      if (exact) {
        clearSuggestions();
        showDetails(exact);
        return;
      }

      // otherwise first partial match
      const matches = findMatches(query);
      if (matches.length) {
        clearSuggestions();
        showDetails(matches[0]);
      } else {
        alert(`No role found for "${searchBox.value}".`);
      }
    }
  });

  // Click outside -> hide suggestions
  document.addEventListener("click", (e) => {
    if (!e.target.closest(".search-container")) clearSuggestions();
  });
});
