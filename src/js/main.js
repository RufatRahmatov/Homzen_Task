const agentsContainer = document.querySelector(".cards__container");
let BaseURL = "http://localhost:3000";


const getApiDataWithCB = async (endPoint, cb) => {
  let response = await fetch(`${BaseURL}/${endPoint}`).then((res) =>
    res.json()
  );
  cb(response);
};

const DeleteApiDataById = async (endPoint, id) => {
  let response = await fetch(`${BaseURL}/${endPoint}/${id}`, {
    method: "DELETE",
  });
  return response;
};



getApiDataWithCB("data", (agents) => {
  agents.map((agent) => {
    agentsContainer.innerHTML += `
  <div class="cards__card">
        <div class="cards__card--img">
          <img src="${agent.img}" alt="">
        </div>
        <div class="cards__card--desc">
            <h2>${agent.houseName}</h2>
            <p>${agent.properties} Properties</p>
          <p>Explore Now</p>
        </div>
     <button class="del" data-id=${agent.id}>Delete</button>
   
      </div>

        `
    const REMOVE_BTN = document.querySelectorAll(".del");

    REMOVE_BTN &&
      REMOVE_BTN.forEach((btn) =>
        btn.addEventListener("click", (e) => {
          e.preventDefault();
          let ImageId = e.target.getAttribute("data-id");
          DeleteApiDataById("data", ImageId);
        }))

  })
})
