const sites = [
 {code:"S1",name:"Dombivli Railway Station Approach Road (West)",zone:"Commercial / high traffic",pm25:88,pm10:165,noise:76,limit:65,lat:19.2180,lon:73.0860},
 {code:"S2",name:"Phadke Road Market Area (East)",zone:"Commercial",pm25:74,pm10:142,noise:73,limit:65,lat:19.2160,lon:73.0830},
 {code:"S3",name:"Kopar Road Junction",zone:"Commercial / mixed",pm25:69,pm10:131,noise:70,limit:65,lat:19.2115,lon:73.0785},
 {code:"S4",name:"College Campus, Telcos Wadi",zone:"Silence zone",pm25:46,pm10:92,noise:58,limit:50,lat:19.2055,lon:73.0740},
 {code:"S5",name:"Residential Lane near Kopar Road",zone:"Residential",pm25:41,pm10:84,noise:54,limit:55,lat:19.2090,lon:73.0765},
 {code:"S6",name:"Hospital–School Zone (West)",zone:"Silence zone",pm25:52,pm10:101,noise:61,limit:50,lat:19.2150,lon:73.0715},
 {code:"S7",name:"MIDC Phase II Periphery",zone:"Industrial",pm25:97,pm10:189,noise:79,limit:75,lat:19.2260,lon:73.0875}
];

function addBars(elId, key1, key2, max, cls1, cls2){
  const el=document.getElementById(elId);
  sites.forEach(s=>{
    const g=document.createElement("div");g.className="bar-group";
    const a=document.createElement("div");a.className=`bar ${cls1}`;a.style.height=`${s[key1]/max*100}%`;a.innerHTML=`<em>${s[key1]}</em>`;
    const b=document.createElement("div");b.className=`bar ${cls2}`;b.style.height=`${s[key2]/max*100}%`;b.innerHTML=`<em>${s[key2]}</em>`;
    const label=document.createElement("div");label.className="bar-label";label.textContent=s.code;
    g.append(a,b,label);el.appendChild(g);
  });
}
addBars("airBars","pm25","pm10",210,"pm25","pm10");
addBars("noiseBars","noise","limit",90,"noise","limit");

const map=L.map("mapCanvas",{scrollWheelZoom:false}).setView([19.214,73.079],14);
L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",{maxZoom:19,attribution:'© OpenStreetMap contributors'}).addTo(map);

function noiseColor(s){const d=s.noise-s.limit;return d<=0?"#19a974":d<=5?"#ee9c32":"#e95454"}
sites.forEach(s=>{
 const c=noiseColor(s);
 const marker=L.circleMarker([s.lat,s.lon],{radius:10,color:c,fillColor:c,fillOpacity:.82,weight:3});
 const status=s.noise<=s.limit?"Within limit":`Above limit by ${s.noise-s.limit} dB(A)`;
 marker.bindPopup(`<div class="popup-title">${s.code} — ${s.name}</div><div style="font-size:10px;color:#78808d;margin-bottom:7px">${s.zone}</div><div class="popup-grid"><span>PM2.5</span><b>${s.pm25} µg/m³</b><span>PM10</span><b>${s.pm10} µg/m³</b><span>Noise</span><b>${s.noise} dB(A)</b><span>Limit</span><b>${s.limit} dB(A)</b></div><div class="status" style="color:${c}">${status}</div>`);
 marker.addTo(map);
});

const survey=document.getElementById("surveyChart");
survey.innerHTML='<div class="donut"></div><div class="donut-label">60 respondents • perception survey</div>';

document.getElementById("menuBtn").addEventListener("click",()=>document.getElementById("nav").classList.toggle("open"));
document.querySelectorAll("nav a").forEach(a=>a.addEventListener("click",()=>document.getElementById("nav").classList.remove("open")));
