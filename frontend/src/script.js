const searchInput = document.getElementById("search-box");
const suggestionsList = document.getElementById("suggestions");

const skills = [
  "Plumber", "Electrician", "Tutor", 
  "Mechanic", "Painter", "Gardener", "Chef", "Caretaker"
];

searchInput.addEventListener("input", function () {
  const query = this.value.toLowerCase();
  suggestionsList.innerHTML = "";

  if (query) {
    const matches = skills.filter(skill =>
      skill.toLowerCase().includes(query)
    );
    matches.forEach(match => {
      const li = document.createElement("li");
      li.textContent = match;
      li.onclick = () => {
        searchInput.value = match;
        suggestionsList.style.display = "none";
      };
      suggestionsList.appendChild(li);
    });
    suggestionsList.style.display = matches.length ? "block" : "none";
  } else {
    suggestionsList.style.display = "none";
  }
});

document.addEventListener("click", e => {
  if (!e.target.closest(".search-container")) {
    suggestionsList.style.display = "none";
  }
});