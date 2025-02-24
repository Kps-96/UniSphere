async function searchUniversity() {
  const query = document.getElementById("search").value.trim();
  const resultsContainer = document.getElementById("results");

  // If input is empty, hide results
  if (query === "") {
      resultsContainer.style.display = "none";
      return;
  }

  resultsContainer.innerHTML = ""; // Clear previous results
  resultsContainer.style.display = "block"; // Show results div

  const apiUrl = `http://universities.hipolabs.com/search?name=${query}`;

  try {
      const response = await fetch(apiUrl);
      const universities = await response.json();

      if (universities.length === 0) {
          resultsContainer.innerHTML = "<p>No results found.</p>";
          return;
      }

      universities.forEach(university => {
          const universityCard = document.createElement("div");
          universityCard.classList.add("university-card");

          universityCard.innerHTML = `
              <h3>${university.name}</h3>
              <p><strong>Country:</strong> ${university.country}</p>
              <p><strong>Website:</strong> 
                  <a href="${university.web_pages[0]}" target="_blank">${university.web_pages[0]}</a>
              </p>
          `;

          resultsContainer.appendChild(universityCard);
      });

  } catch (error) {
      console.error("Error fetching data:", error);
      resultsContainer.innerHTML = "<p style='color: red;'>Failed to load data.</p>";
  }
}
