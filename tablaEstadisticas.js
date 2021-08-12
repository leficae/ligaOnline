/*VARIABLES*/
let url =
  "https://api.football-data.org/v2/competitions/2014/matches?season=2020";
let token = "232f0e3ef0094d40bad674d5b9d824d4";

/*FETCH */
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
     estadisticas(data.matches);
    });
};
getDataFetch()

/*FUNCION PRINCIPAL*/
function estadisticas(arrayPartidos) {
  let dataEstadistica = [];
  for (let i = 0; i < arrayPartidos.length; i++) {
    let status = arrayPartidos[i].status;
    if (status != "FINISHED") {
      continue;
    }
    if (dataEstadistica.length == 0) {
      let firstTeam = {
        id: arrayPartidos[i].homeTeam.id,
        name: arrayPartidos[i].homeTeam.name,
        goles: 0,
        partidosJugados: 0,
        mediaGoles: 0,
      };
      dataEstadistica.push(firstTeam);
    } else {
      let estaDentro = false;
      for (let j = 0; j < dataEstadistica.length; j++) {
        if (dataEstadistica[j].id == arrayPartidos[i].homeTeam.id) {
          estaDentro = true;
        }
      }
      if (estaDentro == false) {
        let equipo = {
          id: arrayPartidos[i].homeTeam.id,
          name: arrayPartidos[i].homeTeam.name,
          goles: 0,
          partidosJugados: 0,
          mediaGoles: 0,
        };
        dataEstadistica.push(equipo);
      }
    }
  }
  for (let m = 0; m < dataEstadistica.length; m++) {
    for (let n = 0; n < arrayPartidos.length; n++) {
      if (dataEstadistica[m].id == arrayPartidos[n].homeTeam.id) {
        dataEstadistica[m].goles += arrayPartidos[n].score.fullTime.homeTeam;
        dataEstadistica[m].partidosJugados++;
      } else if (dataEstadistica[m].id == arrayPartidos[n].awayTeam.id) {
        dataEstadistica[m].goles += arrayPartidos[n].score.fullTime.awayTeam;
        dataEstadistica[m].partidosJugados++;
      }
    }
  }

  /*MEDIA*/
  for (let p = 0; p < dataEstadistica.length; p++) {
    let mediaGoles =
      dataEstadistica[p].goles / dataEstadistica[p].partidosJugados;
    dataEstadistica[p].mediaGoles = mediaGoles.toFixed(2);
  }
  /*SORT*/
  dataEstadistica.sort((a, b) => b.mediaGoles - a.mediaGoles);

  addTable(dataEstadistica);
  // console.log(dataEstadistica);
}

/*FUNCION GENERAR TABLA */
function addTable(dataEstadistica) {
  let tableBody = document.getElementById("tbody");
  let mejoresCinco = dataEstadistica.slice(0, 5);
  for (let i = 0; i < mejoresCinco.length; i++) {
    const row = document.createElement("tr");

    let escudo = document.createElement("img");
    escudo.src =
      "https://crests.football-data.org/" + mejoresCinco[i].id + ".svg";
    escudo.classList.add("escudoIMG");

    let equipoNombre = document.createElement("td");
    equipoNombre.innerHTML = mejoresCinco[i].name;

    let goles = document.createElement("td");
    goles.innerHTML = mejoresCinco[i].goles;

    let partidos = document.createElement("td");
    partidos.innerHTML = mejoresCinco[i].partidosJugados;

    let average = document.createElement("td");
    average.innerHTML = mejoresCinco[i].mediaGoles;

    let resultados = [escudo, equipoNombre, goles, partidos, average];
    for (let j = 0; j < resultados.length; j++) {
      const column = document.createElement("td");
      column.append(resultados[j]);
      row.appendChild(column);
    }
    tableBody.appendChild(row);
  }
}
