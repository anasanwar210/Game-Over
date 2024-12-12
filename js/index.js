// ? =============> Global ===============>
const loading = document.querySelector(".loading");

// ! =============> When Start ===============>
getGames("mmorpg");

// * =============> Events ===============>
document.querySelectorAll(".menu .nav-link").forEach(function (link) {
  link.addEventListener("click", function () {
    document.querySelector(".active").classList.remove("active");
    link.classList.add("active");
    const category = link.dataset.category;
    getGames(category);
  });
});

// ! =============> Functions ===============>

async function getGames(category) {
  try {
    loading.classList.remove("d-none");
    const options = {
      method: "GET",
      headers: {
        "x-rapidapi-key": "a39f3edc9dmshf07ccd715c29e29p1afe8djsn0ac3c3c874dd",
        "x-rapidapi-host": "free-to-play-games-database.p.rapidapi.com",
      },
    };
    const apiResponse = await fetch(
      `https://free-to-play-games-database.p.rapidapi.com/api/games?category=${category}`,
      options
    );
    const gamesData = await apiResponse.json();
    console.log(gamesData);
    displayData(gamesData);
    loading.classList.add("d-none");
  } catch (error) {
    console.log(error);
  }
}

function displayData(data) {
  let gamesCards = ``;
  for (let i = 0; i < data.length; i++) {
    let video = data[i].thumbnail.replace(
      "thumbnail.jpg",
      "videoplayback.webm"
    );
    gamesCards += `
       <div class="col">
      <div onmouseenter="startVideo(event)" onmouseleave="stopVideo(event)" class="card h-100 bg-transparent"
         role="button">
         <div class="card-body">
            <figure class="position-relative">
               <img class="card-img-top object-fit-cover h-100" src="${data[i].thumbnail}" alt="GameOver">
               <video muted="true" preload="none" loop class="w-100 d-none h-100 position-absolute top-0 start-0 z-3">
                  <source src=" ${video}">
               </video>
            </figure>
            <figcaption>
               <div class="hstack justify-content-between">
                  <h3 class="h6 small">${data[i].title}</h3>
                  <span class="badge text-bg-primary p-2">Free</span>
               </div>
              <div>
                <p class="card-text small text-center opacity-50">
                    ${data[i].short_description}
                </p>
              </div>
            </figcaption>
         </div>
         <footer class="card-footer small hstack justify-content-between">
            <span class="badge badge-color">${data[i].genre}</span>
            <span class="badge badge-color">${data[i].platform}</span>
         </footer>
      </div>
   </div>
    `;
  }
  document.getElementById("gameData").innerHTML = gamesCards;
}

function startVideo(event) {
  let videoEl = event.target.querySelector("video");
  videoEl.classList.remove("d-none");
  videoEl.play();
}

function startVideo(event) {
  let videoEl = event.target.querySelector("video");
  videoEl.classList.remove("d-none");
  videoEl.muted = "true";
  videoEl.play();
}

function stopVideo(event) {
  let videoEl = event.target.querySelector("video");
  videoEl.classList.add("d-none");
  videoEl.pause();
}
