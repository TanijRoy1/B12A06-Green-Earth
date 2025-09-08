console.log("JS writting");

const loadCategories = async () => {
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
    const li = document.createElement("li");
    li.innerHTML = `<li onclick="loadPlants('${category.id}')" id="category-${category.id}"
                            class="category text-xl font-medium mt-1 py-2.5 px-2 rounded cursor-pointer hover:bg-[#15803D] hover:text-white">
                            ${category.category_name}
                    </li>`;
    container.appendChild(li);
  });
};

const loadPlants = async (id) => {
  const url = `https://openapi.programming-hero.com/api/category/${id}`;
  const res = await fetch(url);
  const data = await res.json();
  const plants = data.plants;
  displayPlants(data.plants);
  activeClassAdd(id);
};
const displayPlants = (plants) => {
  const container = document.getElementById("items-container");
  container.innerHTML = "";
  plants.forEach((plant) => {
    const div = document.createElement("div");
    div.innerHTML = `<div class="item rounded-xl bg-white shadow-md p-4 flex flex-col gap-4 h-full">
                        <img src="${plant.image}" class="w-full h-[300px] rounded-xl object-cover" alt="">
                        <h1 class="text-[#1F2937] font-semibold text-xl cursor-pointer">${plant.name}</h1>
                        <p class="font-medium text-[#1F2937] flex-1">
                            ${plant.description}
                        </p>
                        <div class="flex items-center justify-between">
                            <a href="#" class="bg-[#DCFCE7] text-[#15803D] py-1 px-3 font-medium">${plant.category}</a>
                            <p class="font-semibold text-xl">৳<span>${plant.price}</span></p>
                        </div>
                        <button class="bg-[#15803D] text-white text-xl font-medium py-2 rounded-4xl cursor-pointer">Add
                            to Cart</button>
                    </div>`;
    container.appendChild(div);
  });
};

// load All Plants
const loadAllPlants = () => {
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


loadAllPlants();
loadCategories();
