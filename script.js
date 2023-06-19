// Get references to the containers and buttons
const firstContainer = document.getElementById("first");
const secondContainer = document.getElementById("second");
const thirdContainer = document.getElementById("third");
const fourthContainer = document.getElementById("fourth");
const backButton = document.getElementById("back");
const nextButton = document.getElementById("next");
const summaryContainer = document.querySelector(".summary_container");

function checkout() {
  // Show the modal popup
  document.getElementById("myModal").style.display = "block";

  // Refresh the page after the modal is closed
  setTimeout(() => {
    location.reload();
  }, 3000);
}
// Function to handle button clicks
function showContainer(container) {
  // Hide all containers
  firstContainer.classList.remove("active");
  secondContainer.classList.remove("active");
  thirdContainer.classList.remove("active");
  fourthContainer.classList.remove("active");

  // Show the selected container
  container.classList.add("active");
  nextBtn();
}

// Add click event listeners to images in the first container
const firstImages = document.querySelectorAll("#first .imagewrapper");
firstImages.forEach((image) => {
  image.addEventListener("click", () => {
    const src = image.querySelector("img").getAttribute("src");
    const heading = image.querySelector("p").textContent;
    const subheadin1 = image.querySelector(".imgsubheading1").textContent;
    const subheadin2 = image.querySelector(".imgsubheading2").textContent;

    //store details in local storage
    localStorage.setItem("selected_image", src);
    localStorage.setItem("for_whom", heading);
    localStorage.setItem("bag_volume", subheadin1);
    localStorage.setItem("description", subheadin2);

    summaryContainer.querySelector("img").setAttribute("src", src);
    summaryContainer.querySelector(".imgheading").textContent = heading;
    summaryContainer.querySelector(".imgsubheading1").textContent = subheadin1;
    summaryContainer.querySelector(".imgsubheading2").textContent = subheadin2;
    showContainer(secondContainer);
  });
});

// Get references to the bags containers and buttons
const bagselection = secondContainer.querySelectorAll(".bag_img_container");

nextButton.style.opacity = "0.3";
// Function to handle image clicks

function handleBagContainerClick(event) {
  // Remove the 'active' class from all bagselection
  bagselection.forEach((image) => {
    image.classList.remove("bagactive");
  });

  // Add the 'active' class to the clicked image
  event.currentTarget.classList.add("bagactive");
  nextBtn();

  //store data in local storage
  const targetContainer = event.currentTarget;
  const totalBags = targetContainer.querySelector("p").textContent;
  const prevPrice = targetContainer.querySelector(".prevprice").textContent;
  const newPrice = targetContainer.querySelector(".newprice").textContent;
  localStorage.setItem("total_bags", totalBags);
  localStorage.setItem("prev_price", prevPrice);
  localStorage.setItem("new_price", newPrice);

  summaryContainer.querySelector(".subTag").textContent = totalBags;
  summaryContainer.querySelector(".newprice").textContent = newPrice;
  summaryContainer.querySelector(".prevprice").textContent = prevPrice;

  // Add red border color to the clicked image
  event.currentTarget.style.borderColor = "red";
}

// Attach click event listeners to the bagselection
bagselection.forEach((image) => {
  image.addEventListener("click", handleBagContainerClick);
});

// Get references to the grind containers and buttons
const grindselection = secondContainer.querySelectorAll(".grind_img_container");

// Function to handle image clicks
function handleGrindContainerClick(event) {
  // Remove the 'active' class from all grindselection
  grindselection.forEach((image) => {
    image.classList.remove("grindactive");
  });

  // Add the 'active' class to the clicked image
  event.currentTarget.classList.add("grindactive");
  nextBtn();

  //store data in local storage
  const targetContainer = event.currentTarget;
  const grindType = targetContainer.querySelector("p").textContent;
  const grindTest = targetContainer.querySelector("span").textContent;
  localStorage.setItem("grind_type", grindType);
  localStorage.setItem("grind_test", grindTest);

  const grind = summaryContainer.querySelectorAll(".grindsubTag");
  grind[0].textContent = grindType;
  grind[2].textContent = grindTest;

  // Add red border color to the clicked image
  event.currentTarget.style.borderColor = "red";
}

// Attach click event listeners to the grindselection
grindselection.forEach((image) => {
  image.addEventListener("click", handleGrindContainerClick);
});

// Get references to the months containers and buttons
const monthselection = secondContainer.querySelectorAll(".btnContainer");

// Function to handle image clicks
function handleMonthContainerClick(event) {
  // Remove the 'active' class from all grindselection
  monthselection.forEach((image) => {
    image.classList.remove("monthactive");
  });

  // Add the 'active' class to the clicked image
  event.currentTarget.classList.add("monthactive");
  nextBtn();

  //store data in local storage
  const targetContainer = event.currentTarget;
  const frequency = targetContainer.querySelector("p").textContent;
  localStorage.setItem("frequency", frequency);

  summaryContainer.querySelector(".freqsubTag").textContent = frequency;

  // Add red border color to the clicked image
  event.currentTarget.style.borderColor = "red";
}

// Attach click event listeners to the grindselection
monthselection.forEach((image) => {
  image.addEventListener("click", handleMonthContainerClick);
});

// Get references to the containers and buttons in the third container

const selectButtons = thirdContainer.querySelectorAll(".roast_btn");
const thirdButton = document.getElementById("thirdnext");
thirdButton.style.opacity = "0.3";

// Function to handle container click event
function handleRoastContainerClick(event) {
  const container = event.currentTarget;
  const selectButton = container.querySelector(".roast_btn");
  // Retrieve the localStorageValue
  const localStorageValue = localStorage.getItem("total_bags");

  // Convert the localStorageValue to an integer
  const maxSelectableCount = parseInt(localStorageValue, 10);

  // Check if the container is already selected
  const isSelected = container.classList.contains("selected");

  if (isSelected) {
    // Deselect the container
    container.classList.remove("selected");
    selectButton.textContent = "Select";
    container.classList.remove("roastactive");
    // const itemArray = localStorage.setItem([]);
    // itemArray.push(container.querySelector(".roastname").textContent)
    nextBtn();
  } else {
    // Get the total count of selected containers
    const selectedCount = thirdContainer.querySelectorAll(".selected").length;

    // Check if the maximum selectable count is reached
    if (selectedCount < maxSelectableCount) {
      const newValue = localStorage.getItem("items_array") || [];
      const itemArray = [];
      itemArray.push(container.querySelector(".roastname").textContent);

      localStorage.setItem("items_array", itemArray);

      const setTagValue = summaryContainer.querySelectorAll(".roastsubTag");
      setTagValue[0].textContent = "Lavazza Coffee";
      setTagValue[1].textContent = "Van Houtte";

      // Select the container
      container.classList.add("selected");
      selectButton.textContent = "Selected";
      container.classList.add("roastactive");
      nextBtn();
    } else {
      // Alert the user when maximum selectable count is reached
      alert(`You have already selected ${maxSelectableCount} Roasts.`);
    }
  }
}

// Attach click event listeners to the containers
const containers = thirdContainer.querySelectorAll(".roast_container");
containers.forEach((container) => {
  container.addEventListener("click", handleRoastContainerClick);
});

function nextBtn() {
  const secondContainerActive = secondContainer.classList.contains("active");
  const thirdContainerActive = thirdContainer.classList.contains("active");
  const fourthContainerActive = fourthContainer.classList.contains("active");

  secondContainerActive &&
    backButton.addEventListener("click", () => {
      showContainer(firstContainer);
    });
  thirdContainerActive &&
    backButton.addEventListener("click", () => {
      showContainer(secondContainer);
    });
  fourthContainerActive &&
    backButton.addEventListener("click", () => {
      showContainer(thirdContainer);
    });

  if (secondContainerActive) {
    const classlength = secondContainer.querySelectorAll(
      ".monthactive, .grindactive, .bagactive"
    );
    if (classlength.length === 3) {
      nextButton.style.opacity = "1";
      nextButton.addEventListener("click", () => {
        showContainer(thirdContainer);
      });
    } else {
      nextButton.removeEventListener("click", () => {});
      nextButton.style.opacity = "0.3";
    }
  }
  if (thirdContainerActive) {
    const selectedCount = thirdContainer.querySelectorAll(".selected").length;
    const localStorageCount = localStorage.getItem("total_bags");
    const maxCount = parseInt(localStorageCount, 10);
    const currentSelected = document.querySelector(".total_count");
    currentSelected.textContent = `${selectedCount}/${maxCount}`;
    if (selectedCount === maxCount) {
      thirdButton.addEventListener("click", () => {
        showContainer(fourthContainer);
      });
      thirdButton.style.opacity = "1";
    } else {
      thirdButton.removeEventListener("click", () => {
        showContainer(fourthContainer);
      });
      thirdButton.style.opacity = "0.3";
    }
  }
}
