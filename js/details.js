const searchParam = location.search;
const loading = document.querySelector(".loading");
const param = new URLSearchParams(searchParam);
const id = param.get("id");

(async function () {
  loading.classList.remove("d-none");
  const options = {
    method: "GET",
    headers: {
      "x-rapidapi-key": "a39f3edc9dmshf07ccd715c29e29p1afe8djsn0ac3c3c874dd",
      "x-rapidapi-host": "free-to-play-games-database.p.rapidapi.com",
    },
  };
  const response = await fetch(
    `https://free-to-play-games-database.p.rapidapi.com/api/game?id=${id}`,
    options
  );
  loading.classList.add("d-none");
  const responseData = await response.json();
  display(responseData);
  console.log(responseData);
})();

function display(data) {
  const dataBox = `
  <div class="col-md-4">
   <figure>
      <img src="${data.thumbnail}" class="w-100" alt="details image" />
   </figure>
</div>
<div class="col-md-8">
   <div>
      <nav aria-label="breadcrumb">
         <ol class="breadcrumb">
            <li class="breadcrumb-item text-reset"><a href="./index.html">Home</a></li>
            <li class="breadcrumb-item text-info" aria-current="page">${data.title}</li>
         </ol>
      </nav>
      <h1>${data.title}</h1>
      <h3>About ${data.title}</h3>
      <p>${data.description}</p>
      <button id="playGame" class="btn btn-primary mt-3">Play Now</button>
   </div>
</div>
  `;
  document.getElementById("detailsData").innerHTML = dataBox;
  changeBackground(data);
  gameLink(data);
}

function changeBackground(data) {
  const backgroundImage = data.thumbnail.replace("thumbnail", "background");
  document.body.style.cssText = `
    background-image: url(${backgroundImage});
  background-position: center;
  background-size: cover;
  `;
}

function gameLink(data) {
  const playButton = document.getElementById("playGame");
  playButton.addEventListener("click", () => {
    window.open(data.freetogame_profile_url, "_blank");
  });
}
