const countriesEl = document.getElementById("countries");
const toggleBtn = document.getElementById("toggle");
const filterBtn = document.getElementById("filter");
const regionFilters = filterBtn.querySelectorAll("li");
const searchEl = document.getElementById("search");
const modal = document.getElementById("modal");
const closeBtn = document.getElementById("close");

//Fetching countries from an API
async function getCountries() {
  const res = await fetch("https://restcountries.com/v3.1/all");
  const countries = await res.json();
  displayCountries(countries);
}

function displayCountries(countries) {
  countriesEl.innerHTML = "";
  countries.forEach(country => {
    const countryEl = document.createElement("div");
    countryEl.classList.add("card");
    countryEl.innerHTML = `
            <div class="card-header">
                <img src="${country.flags.png}" alt="${country.name.common}" />
            </div>
            <div class="card-body">
                <h2 class="country-name">${country.name.official}</h2>
                <p><strong>Population:</strong> ${country.population}</p>
                <p class="country-region"><strong>Region:</strong> ${country.region}</p>
                <p><strong>Capital:</strong> ${country.capital}</p>
            </div>
        `;
    //After we add element to DOm then we need to add event listener to cards
    countryEl.addEventListener("click", e => {
      modal.style.display = "flex";

      showCountryDetails(country);
    });
    countryEl.classList.add("loaded");
    countriesEl.appendChild(countryEl);
  });
}
getCountries();

//Show country details
function showCountryDetails(country) {
  const modalBody = modal.querySelector(".modal-body");
  const modalImage = modal.querySelector("img");
  let langs = "";
  let currencies = "";
  for (let key in country.languages) {
    langs += ` ${country.languages[key]}`;
  }
  for (let key in country.currencies) {
    currencies += ` ${country.currencies[key].name}`;
  }
  console.log(country);

  modalImage.src = country.flags.png;
  modalBody.innerHTML = `
      <h2>${country.name.official}</h2>
      <p>
        <strong>Native Name:</strong>
         ${country.name.common}
      </p>
      <p>
        <strong>Population:</strong>
         ${country.population}
      </p>
      <p>
        <strong>Region:</strong>
         ${country.region}
      </p>
      <p>
        <strong>Sub Region:</strong>
         ${country.subregion}
      </p>
        <p><strong>Capital:</strong> 
        ${country.capital}
        </p>
      </p>
      <p>
        <strong>Top Level Domain:</strong>
        ${country.tld[0]}
      </p>
       <p>

           <strong>Currencies:</strong>
            ${currencies}
      </p > 
      <p>
        <strong>Languages:</strong>
        ${langs}
      </p>

  `;
}

toggleBtn.addEventListener("click", e => {
  document.body.classList.toggle("dark");
});

filterBtn.addEventListener("click", () => {
  filterBtn.classList.toggle("open");
});

//Clos modal buttons
closeBtn.addEventListener("click", e => {
  modal.style.display = "none";
});

searchEl.addEventListener("input", e => {
  const { value } = e.target;
  const countryName = document.querySelectorAll(".country-name");
  countryName.forEach(name => {
    if (name.innerText.toLowerCase().includes(value.toLowerCase())) {
      name.parentElement.parentElement.style.display = "block";
    } else {
      name.parentElement.parentElement.style.display = "none";
    }
  });
});

regionFilters.forEach(filter => {
  filter.addEventListener("click", () => {
    const value = filter.innerText;
    const countryRegion = document.querySelectorAll(".country-region");
    countryRegion.forEach(region => {
      if (region.innerText.includes(value) || value === "All") {
        region.parentElement.parentElement.style.display = "block";
      } else {
        region.parentElement.parentElement.style.display = "none";
      }
    });
  });
});

/**
 * Expanding a card
 */

// countryCards.forEach(country => {
//   country.addEventListener("click", e => {
//     console.log(country);
//   });
// });
