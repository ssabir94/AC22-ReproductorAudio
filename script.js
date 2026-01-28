// Aquesta funció em permet obtenir l'element <audio> a partir del seu id
function agafarAudio(id) {
  return document.querySelector("#" + id);
}

// Reprodueixo l'àudio cridant el mètode play()
function playAudio(id) {
  agafarAudio(id).play();
}

// Pauso la reproducció amb el mètode pause()
function pauseAudio(id) {
  agafarAudio(id).pause();
}

// Pujar el volum sumant 0.1 al valor actual
// El volum màxim és 1, per això faig servir Math.min
function volumMes(id) {
  const audio = agafarAudio(id);
  audio.volume = Math.min(1, audio.volume + 0.1);
}

// Baixar el volum restant 0.1
// El volum mínim és 0, per això faig servir Math.max
function volumMenys(id) {
  const audio = agafarAudio(id);
  audio.volume = Math.max(0, audio.volume - 0.1);
}

// Avançar la reproducció 5 segons
// Modifico la propietat currentTime
function mesCinc(id) {
  const audio = agafarAudio(id);
  audio.currentTime = audio.currentTime + 5;
}

// Retrocedir la reproducció 5 segons
function menysCinc(id) {
  const audio = agafarAudio(id);
  audio.currentTime = audio.currentTime - 5;
}

// Augmentar la velocitat de reproducció
// Faig passos de 0.25 perquè el canvi sigui progressiu
function velocitatMes(id) {
  const audio = agafarAudio(id);
  audio.playbackRate = Math.min(3, audio.playbackRate + 0.25);
}

// Reduir la velocitat de reproducció
// No deixo baixar de 0.25 perquè sinó l'àudio queda massa lent
function velocitatMenys(id) {
  const audio = agafarAudio(id);
  audio.playbackRate = Math.max(0.25, audio.playbackRate - 0.25);
}

// Activar o desactivar el silenci (mute)
// La propietat muted és booleana, per això faig servir !
function toggleMute(id) {
  const audio = agafarAudio(id);
  audio.muted = !audio.muted;
}

/*
  Temps actual:
  Aquí actualitzo el text "Temps actual: X segons" mentre sona l'àudio.
  Faig servir l'esdeveniment timeupdate, que s'executa cada cop que canvia el temps.
  Faig servir querySelectorAll per detectar automàticament
  tots els reproductors sense haver de canviar el codi cada cop.
*/

// Agafo tots els elements <audio> que tinguin un id que comenci per "player"
const audios = document.querySelectorAll("audio[id^='player']");

// Recorro tots els reproductors trobats
audios.forEach(function (audio) {

  // A partir de l'id (per exemple "player7") obtinc el número
  const numero = audio.id.replace("player", "");

  // Agafo el span corresponent on mostro el temps
  const textTemps = document.querySelector("#temps-player" + numero);

  // Comprovo que existeixi abans d'afegir l'esdeveniment
  if (textTemps) {
    audio.addEventListener("timeupdate", function () {
      // Mostro els segons arrodonits per no tenir decimals
      textTemps.textContent = Math.floor(audio.currentTime);
    });
  }
});
