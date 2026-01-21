const map = L.map('map').setView([39.0, 35.0], 6);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19
}).addTo(map);

let markers = {};

async function loadVehicles() {
    const res = await fetch("/vehicles");
    const data = await res.json();

    const list = document.getElementById("vehicleList");
    list.innerHTML = "";

    for (const id in data) {
        const v = data[id];

        if (markers[id]) {
            markers[id].setLatLng([v.lat, v.lng]);
        } else {
            markers[id] = L.marker([v.lat, v.lng]).addTo(map)
                .bindPopup(v.name);
        }

        const div = document.createElement("div");
        div.className = "vehicle";
        div.innerText = v.name;
        div.onclick = () => {
            map.setView([v.lat, v.lng], 15);
            markers[id].openPopup();
        };
        list.appendChild(div);
    }
}

setInterval(loadVehicles, 2000);
loadVehicles();
