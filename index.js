const ipInput = document.querySelector("#ip-input");
const btn = document.querySelector("#arrow");
const ipDisplay = document.querySelector("#ip-address");
const locationDisplay = document.querySelector("#location");
const timeDisplay = document.querySelector("#timezone");
const ispDisplay = document.querySelector("#isp");
const errorMessage = document.querySelector("#errorMessage");
const mapContainer = document.querySelector("#mapContainer");

btn.addEventListener("click", fetchLocation);

function fetchLocation() {
  const KEY = "at_mbEI6v27RHCr1TrhHBeuCMgtF7VOM";
  const ipAddress = ipInput.value;

  async function fetchIpLocation() {
    try {
      if (!ipAddress) throw new Error("IP Address is missing");

      const res = await fetch(
        `https://geo.ipify.org/api/v2/country,city?apiKey=${KEY}&ipAddress=${ipAddress}`
      );

      if (!res.ok) {
        throw new Error(
          "An error occurred while fetching data. Please check the IP address and try again"
        );
      }

      const data = await res.json();
      console.log(data);

      ispDisplay.textContent = data.isp || "N/A";
      locationDisplay.textContent = data.location.city
        ? `${data.location.city}, ${data.location.country}`
        : "N/A";
      timeDisplay.textContent = data.location.timezone
        ? `UTC ${data.location.timezone}`
        : "N/A";
      ipDisplay.textContent = data.ip || "Not Found";

      if (window.map) {
        window.map.remove();
      }

      window.map = L.map("mapContainer").setView(
        [data.location.lat, data.location.lng],
        1
      );

      L.tileLayer(
        "https://api.maptiler.com/maps/streets-v2/{z}/{x}/{y}.png?key=fARIAzvqpblj0OMqS0Qu",
        {
          attribution:
            '<a href="https://www.maptiler.com/copyright/" target="_blank">&copy; MapTiler</a> <a href="https://www.openstreetmap.org/copyright" target="_blank">&copy; OpenStreetMap contributors</a>',
        }
      ).addTo(window.map);
      L.marker([data.location.lat, data.location.lng]).addTo(window.map);
    } catch (err) {
      console.error(err.message);
      errorMessage.style.display = "block";
      errorMessage.classList.add("errorStyle");
      errorMessage.textContent = err.message;

      if (window.map) {
        window.map.remove();
        window.map = null;
        mapContainer.remove();
      }
      ispDisplay.textContent = "N/A";
      locationDisplay.textContent = "N/A";
      timeDisplay.textContent = "N/A";
      ipDisplay.textContent = "Not Found";
    }
  }

  fetchIpLocation();
}
