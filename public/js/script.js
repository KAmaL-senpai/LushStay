// Example starter JavaScript for disabling form submissions if there are invalid fields
(() => {
  "use strict";

  // Fetch all the forms we want to apply custom Bootstrap validation styles to
  const forms = document.querySelectorAll(".needs-validation");

  // Loop over them and prevent submission
  Array.from(forms).forEach((form) => {
    form.addEventListener(
      "submit",
      (event) => {
        if (!form.checkValidity()) {
          event.preventDefault();
          event.stopPropagation();
        }

        form.classList.add("was-validated");
      },
      false
    );
  });
})();

// -------------------------------------------------------------------------------------

// Filter Scoller
document.addEventListener("DOMContentLoaded", function () {
  const filterContainer = document.getElementById("filters");
  const leftBtn = document.getElementById("left-btn");
  const rightBtn = document.getElementById("right-btn");

  function updateButtons() {
    // Toggle left arrow and left gradient
    if (filterContainer.scrollLeft > 0) {
      leftBtn.style.display = "block";
      filterContainer.classList.add("left-shadow");
    } else {
      leftBtn.style.display = "none";
      filterContainer.classList.remove("left-shadow");
    }

    // Toggle right arrow
    if (
      filterContainer.scrollLeft + filterContainer.clientWidth >=
      filterContainer.scrollWidth
    ) {
      rightBtn.style.display = "none";
    } else {
      rightBtn.style.display = "block";
    }
  }

  leftBtn.addEventListener("click", function () {
    filterContainer.scrollBy({ left: -200, behavior: "smooth" });
  });

  rightBtn.addEventListener("click", function () {
    filterContainer.scrollBy({ left: 200, behavior: "smooth" });
  });

  filterContainer.addEventListener("scroll", updateButtons);

  // Ensure gradient and buttons are correct on load
  window.addEventListener("load", updateButtons);
});

// ---------------------------------------------------------------------------

//Filter Logic for the Listing
const filters = document.querySelectorAll(".filter");

// Get current selected categories from the URL
const params = new URLSearchParams(window.location.search);
let selectedCategories = params.get("category")
  ? new Set(params.get("category").split(","))
  : new Set();

// Highlight selected filters on page load
filters.forEach((filter) => {
  const category = filter.getAttribute("data-category");
  if (selectedCategories.has(category)) {
    filter.classList.add("selected");
  }

  filter.addEventListener("click", () => {
    if (selectedCategories.has(category)) {
      selectedCategories.delete(category);
    } else {
      selectedCategories.add(category);
    }

    const categoriesArray = Array.from(selectedCategories);
    const newParams = new URLSearchParams();

    if (categoriesArray.length > 0) {
      newParams.set("category", categoriesArray.join(","));
    }

    const url =
      newParams.toString().length > 0
        ? `/listings?${newParams.toString()}`
        : "/listings";
    window.location.href = url;
  });
});

//  -----------------------------------------------------------------------------------


document.getElementsByClassName("navbar-toggler-icon").addEventListener("clicke",()=>{
  
})