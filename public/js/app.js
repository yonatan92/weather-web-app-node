console.log("Client side javascript file is loaded!");

const fetchWeather = (address, callback) => {
  fetch(`http://localhost:3000/weather?address=${address}`)
    .then((response) => {
      response.json().then((data) => {
        if (data.error) {
          callback(data.error);
        } else {
          callback(undefined, data);
        }
      });
      // console.log(response);
    })
    .catch((e) => console.log(e));
};

const weatherForm = document.querySelector("form");
const search = document.querySelector("input");
const messageOne = document.querySelector("#message-1");
const messageTwo = document.querySelector("#message-2");
weatherForm.addEventListener("submit", (e) => {
  messageOne.textContent = "Loading...";
  messageTwo.textContent = "";
  e.preventDefault();

  const location = search.value;
  fetchWeather(location, (error, data) => {
    if (error) {
      messageTwo.textContent = error;
      messageOne.textContent = "";
    } else {
      console.log(data);
      messageOne.textContent = `${data.location} ---- ${data.forecast.description}, ${data.forecast.temperature} degrees`;
    }
  });
});
