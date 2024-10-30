const ipInput = document.querySelector("#ip-input");
const btn = document.querySelector("#arrow");
const ipDisplay = document.querySelector("#ip-address");
const locationDisplay = document.querySelector("#location");
const timeDisplay = document.querySelector("#timezone");
const ispDisplay = document.querySelector("#isp");
const errorMessage = document.querySelector("#errorMessage");

btn.addEventListener("click", fetchLocation);

function fetchLocation() {
  const KEY = "at_mbEI6v27RHCr1TrhHBeuCMgtF7VOM";
  const ipAddress = ipInput.value;
  async function fetchIpLocation() {
    try {
      if (!ipAddress) throw new Error("IP Address is missing");
      const res = await fetch(
        `https://geo.ipify.org/api/v2/country?apiKey=${KEY}&ipAddress=${ipAddress}`
      );
      if (!res.ok) throw new Error("An error occurred while fetching data");
      const data = await res.json();
      console.log(data);

      if (data.isp === "") {
        ispDisplay.textContent = "N/A";
      } else {
        ispDisplay.textContent = data.isp;
      }

      if (data.location.region === "") {
        locationDisplay.textContent.textContent = "N/A";
      } else {
        locationDisplay.textContent = data.location.region;
      }

      if (data.location.timezone === "") {
        timeDisplay.textContent.textContent = "N/A";
      } else {
        timeDisplay.textContent = `UTC ${data.location.timezone}`;
      }

      if (data.ip === "") {
        ipDisplay.textContent.textContent = "Not Found";
      } else {
        ipDisplay.textContent = data.ip;
      }
    } catch (err) {
      console.error(err.message);
      errorMessage.style.display = "block";
      errorMessage.textContent = err.message;
    }
  }
  fetchIpLocation();
}
