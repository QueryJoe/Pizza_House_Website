const sections = document.querySelectorAll("section");

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("active");
        } else {
          entry.target.classList.remove("active");
        }
      });
    }, { threshold: 0.3 });

    sections.forEach(sec => observer.observe(sec));

 const locationData = {
    'downtown': {
        map: '/../images/loc-1.png',
        address: 'Downtown: 123 Pizza St, Suite 100, Cityville, USA',
    },
    'uptown': {
        map: '/../images/loc-2.png',
        address: 'Uptown: 456 Crust Ave, Apt 2B, Townsville, USA',
    },
    'riverside': {
        map: '/../images/loc-3.png',
        address: 'Riverside: 789 River Rd, Building C, Villageton, USA',
    },
    'suburbs': {
        map: '/../images/loc-4.png',
        address: 'Suburbs: 101 Dough Ln, Unit 5, Hamlet, USA',
    }
};

document.addEventListener('DOMContentLoaded', () => {
    /*** PIZZA SECTION ***/
    const pizzaImage = document.getElementById('pizza-img');
    const pizzaDots = document.querySelectorAll('.pizza-dot');

    const pizzaImages = {
        'pepperoni': '/../images/pepporoni.png',
        'margherita': '/../images/margherita.png',
        'veggie': '/../images/veggie.png',
        'chicken': '/../images/chicken.png',
        'cheese': '/../images/cheese.png'
    };

    const pizzaKeys = Object.keys(pizzaImages);
    let pizzaIndex = 0;
    let pizzaInterval;

    function showPizza(index) {
        pizzaDots.forEach(d => d.classList.remove('active'));
        const dot = pizzaDots[index];
        dot.classList.add('active');
        const pizzaType = dot.dataset.pizza;
        pizzaImage.src = pizzaImages[pizzaType];
    }

    function startPizzaCycle() {
        pizzaInterval = setInterval(() => {
            pizzaIndex = (pizzaIndex + 1) % pizzaKeys.length;
            showPizza(pizzaIndex);
        }, 2000); // change every 3s
    }

    function resetPizzaCycle() {
        clearInterval(pizzaInterval);
        startPizzaCycle();
    }

    pizzaDots.forEach((dot, idx) => {
        dot.addEventListener('mouseover', () => {
            pizzaIndex = idx;
            showPizza(pizzaIndex);
            resetPizzaCycle();
        });
    });

    showPizza(pizzaIndex);
    startPizzaCycle();



    /*** LOCATION SECTION ***/
    const locationDots = document.querySelectorAll('.location-dot');
    const mapImage = document.getElementById('map-image');
    const addressInfo = document.getElementById('address-info');

    const locationKeys = Object.keys(locationData);
    let locationIndex = 0;
    let locationInterval;

    function showLocation(index) {
        locationDots.forEach(d => d.classList.remove('active'));
        const dot = locationDots[index];
        dot.classList.add('active');
        const location = dot.dataset.location;

        mapImage.src = locationData[location].map;
        addressInfo.innerHTML = `<h3 class="font-bold text-xl mb-2">Addresses</h3><p>${locationData[location].address}</p>`;
    }

    function startLocationCycle() {
        locationInterval = setInterval(() => {
            locationIndex = (locationIndex + 1) % locationKeys.length;
            showLocation(locationIndex);
        }, 4000); // change every 4s
    }

    function resetLocationCycle() {
        clearInterval(locationInterval);
        startLocationCycle();
    }

    locationDots.forEach((dot, idx) => {
        dot.addEventListener('mouseover', () => {
            locationIndex = idx;
            showLocation(locationIndex);
            resetLocationCycle();
        });
    });

    showLocation(locationIndex);
    startLocationCycle();
});


const menuData = {
    'gourmet-pizza': [
        { name: 'Margherita Pizza', description: 'Classic pizza with fresh mozzarella, basil, and tomato sauce.', price: '$15.99', image: '../images/margherita.png', discount: '10%' },
        { name: 'Pepperoni Perfection', description: 'A timeless favorite with generous amounts of pepperoni.', price: '$17.99', image: '../images/pepporoni.png', discount: null },
        { name: 'Veggie Supreme', description: 'Loaded with bell peppers, onions, mushrooms, and black olives.', price: '$16.50', image: '../images/veggie.png', discount: null },
        { name: 'BBQ Chicken', description: 'Grilled chicken, red onions, and tangy BBQ sauce.', price: '$18.99', image: '../images/chicken.png', discount: '15%' },
    ],
    'salads': [
        { name: 'Caesar Salad', description: 'Crisp romaine lettuce with croutons, parmesan, and Caesar dressing.', price: '$9.50', image: '../images/caser.png', discount: null },
        { name: 'Greek Salad', description: 'Fresh veggies, olives, and feta cheese with vinaigrette.', price: '$10.99', image: '../images/green.png', discount: '10%' },
        { name: 'Garden Salad', description: 'A simple salad with tomatoes, cucumbers, and bell peppers.', price: '$8.50', image: '../images/garden.png', discount: null },
    ],
    'make-your-own': [
        { name: 'Build Your Pizza', description: 'Choose your crust, sauce, cheese, and toppings.', price: 'Starts at $12.00', image: '../images/make.png', discount: null },
    ],
    'pastas-and-subs': [
        { name: 'Spaghetti & Meatballs', description: 'Classic spaghetti with rich marinara and savory meatballs.', price: '$14.99', image: '../images/spaghetti.png', discount: null },
    ],
    'drinks': [
        { name: 'Iced Tea', description: 'Freshly brewed sweet or unsweetened iced tea.', price: '$2.99', image: '../images/iced-tea.png', discount: null },
        { name: 'Lemonade', description: 'A freshly squeezed, tangy lemonade.', price: '$3.50', image: '../images/lemonade.png', discount: '10%' },
    ],
};

function renderMenuItems(tabName) {
    const container = document.getElementById('menu-items-container');
    container.innerHTML = '';
    const items = menuData[tabName] || [];

    items.forEach(item => {
        const itemDiv = document.createElement('div');
        itemDiv.className = 'item-card';

        itemDiv.innerHTML = `
            <div class="relative">
                <img src="${item.image}" alt="${item.name}" class="item-card-img w-[12rem] h-[12rem] object-cover rounded-t-lg">
                ${item.discount ? `<div class="discount-tag">${item.discount} OFF</div>` : ''}
            </div>
            <div class="rounded-b-lg menu-info-box">
                <h3 class="text-2xl font-bold text-[var(--primary)] mb-2">${item.name}</h3>
                <p class="text-[#fbfbfb] mb-4">${item.description}</p>
                <p class="text-3xl font-bold menu-item-price">${item.price}</p>
            </div>
        `;
        container.appendChild(itemDiv);
    });
}

document.addEventListener('DOMContentLoaded', () => {
    const tabs = document.querySelectorAll('.tab');
    
    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const tabName = tab.dataset.tab;
            tabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            renderMenuItems(tabName);
        });
    });

    // Initial render
    renderMenuItems('gourmet-pizza');
});

document.querySelectorAll(".faq-question").forEach(button => {
  button.addEventListener("click", () => {
    const faqItem = button.parentElement;
    const answer = faqItem.querySelector(".faq-answer");
    const icon = button.querySelector(".toggle-icon");

    // Collapse other answers
    document.querySelectorAll(".faq-answer").forEach(a => {
      if (a !== answer) {
        a.style.maxHeight = null;
      }
    });
    document.querySelectorAll(".toggle-icon").forEach(i => {
      if (i !== icon) i.textContent = "+";
    });

    // Toggle this one
    if (answer.style.maxHeight) {
      answer.style.maxHeight = null;
      icon.textContent = "+";
    } else {
      answer.style.maxHeight = answer.scrollHeight + "px";
      icon.textContent = "−";
    }
  });
});


const services = document.querySelectorAll(".service");

services.forEach(service => {
  service.addEventListener("click", () => {
    const alreadyExpanded = service.classList.contains("expanded");

    // Reset all
    services.forEach(s => {
      s.classList.remove("expanded", "shrunk");
      s.querySelector(".service-info").style.display = "none";
    });

    // If not already expanded, expand clicked
    if (!alreadyExpanded) {
      service.classList.add("expanded");
      service.querySelector(".service-info").style.display = "block";

      // Shrink others
      services.forEach(s => {
        if (s !== service) s.classList.add("shrunk");
      });
    }
  });
});

