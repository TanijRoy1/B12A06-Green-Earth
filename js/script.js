console.log("JS writting");

// Load categories 
const loadCategories = async () => {
  showLoadingDots(true);
  const url = "https://openapi.programming-hero.com/api/categories";
  const res = await fetch(url);
  const data = await res.json();
  const catagories = data.categories;
  displayCategories(catagories);
};
const displayCategories = (catagories) => {
  const container = document.getElementById("category-container");
  container.innerHTML = "";
  catagories.forEach((category) => {
    container.innerHTML += `<li onclick="loadPlants('${category.id}')" id="category-${category.id}"
                            class="category 2xl:text-xl font-medium mt-1 py-2.5 px-2 rounded cursor-pointer hover:bg-[#15803D] hover:text-white">
                            ${category.category_name}
                    </li>`;
  });
  showLoadingDots(false);
};

// Load Plants 
const loadPlants = async (id) => {
  showLoadingSpinner(true);
  const url = `https://openapi.programming-hero.com/api/category/${id}`;
  const res = await fetch(url);
  const data = await res.json();
  const plants = data.plants;
  displayPlants(data.plants);
  activeClassAdd(id);
};
const displayPlants = (plants) => {
  const container = document.getElementById("items-container-inner");
  container.innerHTML = "";
  plants.forEach((plant) => {
    const div = document.createElement("div");
    div.innerHTML = `<div class="item rounded-xl bg-white shadow-md p-4 flex flex-col gap-2.5 h-full max-h-[480px]">
                        <img src="${plant.image}" class="w-full h-[200px] rounded-xl object-cover" alt="">
                        <h1 onclick="loadDetails('${plant.id}')" class="text-[#1F2937] font-semibold text-xl cursor-pointer">${plant.name}</h1>
                        <p class="font-medium text-[#1F2937] 2xl:text-[14px] text-[12px] flex-1">
                            ${plant.description}
                        </p>
                        <div class="flex items-center justify-between">
                            <a href="#" class="bg-[#DCFCE7] text-[#15803D] py-1 px-3 font-medium rounded">${plant.category}</a>
                            <p class="font-semibold text-xl">৳<span>${plant.price}</span></p>
                        </div>
                        <button onclick="addToCart('${plant.id}')" class="add-cart-btn bg-[#15803D] border-2 border-[#15803D] hover:bg-white hover:text-[#15803D] text-white 2xl:text-xl font-medium py-1.5 rounded-4xl cursor-pointer">
                            Add to Cart
                        </button>
                    </div>`;
    container.appendChild(div);
  });
  showLoadingSpinner(false);
};

// load All Plants
const loadAllPlants = () => {
  showLoadingSpinner(true);
  const url = "https://openapi.programming-hero.com/api/plants";
  fetch(url)
    .then((res) => res.json())
    .then((data) => displayPlants(data.plants));
};

// Active class Add 
const activeClassAdd = (id) => {
    document.querySelectorAll(".category").forEach(category => {
        category.classList.remove("active");
    });
    document.getElementById(`category-${id}`).classList.add("active");
}

//Load Details 
const loadDetails = async (id) => {
  const url = `https://openapi.programming-hero.com/api/plant/${id}`;
  const res = await fetch(url);
  const data = await res.json();
  displayDetails(data.plants);
}
const displayDetails = (plant) => {
  const modalContainer = document.getElementById("my_modal_5");
  modalContainer.innerHTML = `<div class="modal-box">
            <h3 class="text-2xl font-bold py-1 pb-2.5">${plant.name}</h3>
            <img src="${plant.image}" class="w-full h-[260px] object-cover rounded-xl py-1" alt="Plant">
            <p class="py-1">
                <span class="font-bold">Category: </span>${plant.category}
            </p>
            <p class="py-1"><span class="font-bold">Price: </span>৳${plant.price}</p>
            <p class="py-1">
                <span class="font-bold">Description: </span>
                ${plant.description}
            </p>
            <div class="modal-action">
                <form method="dialog">
                    <button class="btn">Close</button>
                </form>
            </div>
        </div>`;
  my_modal_5.showModal();
}

// Add to cart functionality : Challenges Part
let addCartData = [];
let ids = [];

const addToCart = async (id) => {
  const url = `https://openapi.programming-hero.com/api/plant/${id}`;
  const res = await fetch(url);
  const data = await res.json();
  const plant = data.plants;

  ids.push(parseInt(id));
  const quantity = ids.filter(existingId => existingId === parseInt(id)).length;
  
  if (quantity > 1) {
    addCartData.forEach(data => {
      if(data.id == id) {
        data.quantity = quantity;
      }
    });
  } else {
    const cartData = {
      id: parseInt(plant.id),
      name: plant.name,
      price: parseInt(plant.price),
      quantity: quantity
    }
    addCartData.push(cartData);
  }
  
  const container = document.getElementById("add-cart-container");
  container.innerHTML = "";
  
  let sum = 0;
  addCartData.forEach(data => {
    container.innerHTML += `<div id="add-cart-${data.id}" class="add-cart-item bg-[#DCFCE7] mt-2 flex items-center justify-between gap-1 p-2 py-1 rounded">
                            <div>
                                <h1 class="2xl:text-xl font-semibold">${data.name}</h1>
                                <p class="font-medium 2xl:text-xl opacity-50">
                                    ৳<span>${data.price}</span> x ${data.quantity}
                                </p>
                            </div>
                            <div>
                                <i onclick="closeItem('${data.id}')" class="fa-solid fa-xmark hover:scale-105 cursor-pointer"></i>
                            </div>
                        </div>`;
  
    sum += data.price * data.quantity;
  });
  
  if (addCartData.length === 0) {
    document.getElementById("total").classList.add("hidden");
    ids = [];
  } else {
    document.getElementById("total").classList.remove("hidden");
    document.getElementById("total-price").innerText = sum;
  }

}
// close cart functionality 
const closeItem = (id) => {
  document.getElementById(`add-cart-${id}`).remove();

  addCartData = addCartData.filter(data => data.id != id);
  ids = ids.filter(existingId => existingId != id);
  
  let sum = 0;
  addCartData.forEach(data => {
    sum += data.price * data.quantity;
  });
  
  if (addCartData.length === 0) {
    document.getElementById("total").classList.add("hidden");
    ids = [];
  } else {
    document.getElementById("total").classList.remove("hidden");
    document.getElementById("total-price").innerText = sum;
  }
}

// loading spinner on main container
const showLoadingSpinner = (status) => {
  if (status) {
    document.getElementById("loading").classList.remove("hidden");
    document.getElementById("items-container").classList.add("hidden");
  } else {
    document.getElementById("loading").classList.add("hidden");
    document.getElementById("items-container").classList.remove("hidden");
  }
}
// loading dots on categories
const showLoadingDots = (status) => {
  if (status) {
    document.getElementById("loading-dots").classList.remove("hidden");
    document.getElementById("category-container").classList.add("hidden");
  } else {
    document.getElementById("loading-dots").classList.add("hidden");
    document.getElementById("category-container").classList.remove("hidden");
  }
}

loadAllPlants();
loadCategories();
