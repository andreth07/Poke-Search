document.addEventListener("DOMContentLoaded", function () {
    const pokemonList = document.getElementById("pokemon-list");
  
    // Busca os dados dos Pokémon e os exibe na lista.
    fetch("https://pokeapi.co/api/v2/pokemon?limit=199") 
        .then((response) => response.json())
        .then((data) => {
            data.results.forEach((pokemon) => {
                fetch(pokemon.url)
                    .then((response) => response.json())
                    .then((data) => {
                        // Cria elementos de lista para cada Pokémon e os adiciona à lista.
                        const listItem = document.createElement("li");
                        listItem.innerHTML = `
                            <h2>${data.name}</h2>
                            <img src="${data.sprites.front_default}" alt="${data.name}">
                            <p>Tipo: ${data.types.map((type) => type.type.name).join(", ")}</p>
                        `;
                        pokemonList.appendChild(listItem);
                    });
            });
        });
});

class MobileNavbar {
    constructor(mobileMenu, navList, navLinks) {
      this.mobileMenu = document.querySelector(mobileMenu);
      this.navList = document.querySelector(navList);
      this.navLinks = document.querySelectorAll(navLinks);
      this.activeClass = "active";
  
      this.handleClick = this.handleClick.bind(this);
    }
  
    animateLinks() {
      this.navLinks.forEach((link, index) => {
        link.style.animation
          ? (link.style.animation = "")
          : (link.style.animation = `navLinkFade 0.5s ease forwards ${
              index / 7 + 0.3
            }s`);
      });
    }
  
    handleClick() {
      this.navList.classList.toggle(this.activeClass);
      this.mobileMenu.classList.toggle(this.activeClass);
      this.animateLinks();
    }
  
    addClickEvent() {
      this.mobileMenu.addEventListener("click", this.handleClick);
    }
  
    init() {
      if (this.mobileMenu) {
        this.addClickEvent();
      }
      return this;
    }
  }
  
  const mobileNavbar = new MobileNavbar(
    ".mobile-menu",
    ".nav-list",
    ".nav-list li",
  );
  mobileNavbar.init();
