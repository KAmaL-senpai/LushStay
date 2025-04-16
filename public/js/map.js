mapboxgl.accessToken = mapToken.trim(); // Ensure this value is correct

const map = new mapboxgl.Map({
  container: "map", // container ID
  style: "mapbox://styles/mapbox/streets-v11", // ✅ Required map style
  center: listing.geometry.coordinates, // [longitude, latitude]
  zoom: 10, // Initial zoom level
});

// Create a custom icon
const customMarker = document.createElement("div");
customMarker.className = "custom-marker";
customMarker.style.backgroundImage = "url('https://cdn-icons-png.flaticon.com/128/3293/3293413.png')"; // Replace with your icon URL
customMarker.style.width = "40px"; // Adjust size
customMarker.style.height = "40px";
customMarker.style.backgroundSize = "cover";

const marker = new mapboxgl.Marker({ element: customMarker })
  .setLngLat(listing.geometry.coordinates)
  .setPopup(
    new mapboxgl.Popup({ offset: 25 }).setHTML(`<h4>${listing.location} </h4> <p>Exact location will be provided after booking</p>`)
  )
  .addTo(map);
