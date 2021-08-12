/*VARIABLES*/
let enviar = document.getElementById("myButton");
let url = "https://api.football-data.org/v2/competitions/2014/matches?season=2020";
let token = "232f0e3ef0094d40bad674d5b9d824d4";
let picture = document.getElementById("loader");

/*FETCH */
const getDataFetch = async () => {
  await fetch(url, {
    method: "GET",
    headers: {
      "X-Auth-Token": token,
    },
  })
    .then(function (response) {
      let img= "<img src='/img/giphy.gif' alt='fulbito'/>";
        picture.innerHTML = img;
      return response.json();
    })
    .then(function (data) {
      enviar.addEventListener("click", function () {
        filtrar(data.matches);
      });
      addTable(data.matches);
      picture.innerHTML = '';
    });
    
};
getDataFetch();


/*CREAR TABLA*/
function addTable(partidos) {
  let tableBody = document.getElementById("tbody");
  tableBody.innerHTML = "";
  for (let i = 0; i < partidos.length; i++) {
    const row = document.createElement("tr");

    let escudoL = document.createElement("img");
    escudoL.src =
      "https://crests.football-data.org/" + partidos[i].homeTeam.id + ".svg";
    escudoL.classList.add("escudoIMG");

    let fecha = new Date(partidos[i].utcDate);

    let escudoV = document.createElement("img");
    escudoV.src =
      "https://crests.football-data.org/" + partidos[i].awayTeam.id + ".svg";
    escudoV.classList.add("escudoIMG");

    let localT = document.createElement("td");
    localT.innerHTML = partidos[i].homeTeam.name;

    let visitorT = document.createElement("td");
    visitorT.innerHTML = partidos[i].awayTeam.name;

    let score = document.createElement("td");
    score.innerHTML =
      partidos[i].score.fullTime.homeTeam +
      "-" +
      partidos[i].score.fullTime.awayTeam;

    let jornada = document.createElement("td");
    jornada.innerHTML = partidos[i].matchday;

    let resultadopartido = [
      escudoL,
      localT,
      score,
      escudoV,
      visitorT,
      fecha.toLocaleString(),
      jornada,
    ];
    for (let j = 0; j < resultadopartido.length; j++) {
      const column = document.createElement("td");
      column.append(resultadopartido[j]);
      row.appendChild(column);
    }
    tableBody.appendChild(row);
  }
}
// addTable(data.matches);

//FUNCION DE FILTRADO
function filtrar(partidos) {
  let teamSearch = document.getElementById("teamSearch").value;
  if (teamSearch.value == "") {
    addTable(partidos);
  }

  let SortedData = partidos.filter((nombres) => {
    return (
      nombres.homeTeam.name.toLowerCase().includes(teamSearch.toLowerCase()) ||
      nombres.awayTeam.name.toLowerCase().includes(teamSearch.toLowerCase())
    );
  });
  addTable(SortedData);
}
