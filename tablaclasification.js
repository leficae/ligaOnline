let url =
  "https://api.football-data.org/v2/competitions/2014/standings";
let token = "232f0e3ef0094d40bad674d5b9d824d4";
const getDataFetch = async () => {
  await fetch(url, {
    method: "GET",
    headers: {
      "X-Auth-Token": token,
    },
  })
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
     addTableClass(data.standings[0].table);
    });
};
getDataFetch()

function addTableClass(clasificacion){
    let tableBody = document.getElementById("tbody");
    for (let i = 0; i < clasificacion.length; i++) {
        const row = document.createElement("tr");
         let escudo= document.createElement("img");
         escudo.src = clasificacion[i].team.crestUrl;
         escudo.classList.add("escudoIMG");
        
         let nombre = document.createElement("td");
         nombre.innerHTML = clasificacion[i].team.name;

         let PJ = document.createElement("td");
         PJ.innerHTML = clasificacion[i].playedGames;
         
         let V = document.createElement("td");
         V.innerHTML = clasificacion[i].won;
         
         let E = document.createElement("td");
         E.innerHTML = clasificacion[i].draw;

         let D = document.createElement("td");
         D.innerHTML = clasificacion[i].lost;

         let GF = document.createElement("td");
         GF.innerHTML = clasificacion[i].goalsFor;

         let GC = document.createElement("td");
         GC.innerHTML = clasificacion[i].goalsAgainst;

         let DG = document.createElement("td");
         DG.innerHTML = clasificacion[i].goalDifference;

         let PTS = document.createElement("td");
         PTS.innerHTML = clasificacion[i].points;

        let resultados = [escudo,nombre,PJ,V,E,D,GF,GC,DG,PTS];
        for (let j= 0; j <resultados.length; j++) {
            const column = document.createElement("td")
            column.append(resultados[j]);
            row.appendChild(column)
          }
          tableBody.appendChild(row);
    }
}
// addTableClass(data2.standings[0].table)

  
  