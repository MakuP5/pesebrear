// 🎵 PLAYLIST INGLÉS (dentro de musica/ingles/)
const englishPlaylist = [
  {
    archivo: 'ingles/jingle-bell-rock.mp3',
    nombre: 'Bobby Helms - Jingle Bell Rock',
    imagen: 'img/jingle-bell-rock.jpg'
  },
  {
    archivo: 'ingles/all-i-want.mp3',
    nombre: 'Mariah Carey - All I Want For Christmas Is You',
    imagen: 'img/all-i-want.jpg'
  },
  {
    archivo: 'ingles/rockin-around.mp3',
    nombre: "Brenda Lee - Rockin' Around The Christmas Tree",
    imagen: 'img/rockin-around.jpg'
  }
];

// 🎵 PLAYLIST LATINA (dentro de musica/latinos/)
const latinPlaylist = [
  {
    archivo: 'latinos/Viene-El-Niñito.mp3',
    nombre: 'Ya Viene El Niñito',
    imagen: 'img/latinos-reujillo.jpg'
  },
  {
    archivo: 'latinos/Entre-pajay-heno.mp3',
    nombre: 'Entre paja y el heno',
    imagen: 'img/latinos-reujillo.jpg'
  },
  {
    archivo: 'latinos/No-se-Nino-Hermoso.mp3',
    nombre: 'No se Niño Hermoso',
    imagen: 'img/latinos-reujillo.jpg'
  }
];

// Estado actual
let currentPlaylist = englishPlaylist;
let grupoActual = 'ingles';
let indiceActual = 0;
let reproduciendo = false;

// Elementos del DOM
const player = document.getElementById('player');
const nombreCancion = document.getElementById('nombreCancion');
const portada = document.getElementById('portadaCancion');
const btnPrev = document.getElementById('btnPrev');
const btnPlay = document.getElementById('btnPlay');
const btnNext = document.getElementById('btnNext');
const btnGrupo = document.getElementById('btnGrupo');

// Cargar canción
function cargarCancion(indice) {
  const cancion = currentPlaylist[indice];
  if (!cancion) return;

  // Aquí se usa la carpeta correcta (ingles/ o latinos/)
  player.src = 'musica/' + cancion.archivo;

  nombreCancion.textContent = cancion.nombre;
  portada.src = cancion.imagen;
  portada.alt = 'Portada de ' + cancion.nombre;
}

// Reproducir
function reproducir() {
  player
    .play()
    .then(() => {
      reproduciendo = true;
      btnPlay.textContent = '⏸';
    })
    .catch((error) => {
      console.log('Autoplay bloqueado o requiere interacción:', error);
    });
}

// Pausar
function pausar() {
  player.pause();
  reproduciendo = false;
  btnPlay.textContent = '▶️';
}

// Anterior
function anterior() {
  indiceActual = (indiceActual - 1 + currentPlaylist.length) % currentPlaylist.length;
  cargarCancion(indiceActual);
  reproducir();
}

// Siguiente
function siguiente() {
  indiceActual = (indiceActual + 1) % currentPlaylist.length;
  cargarCancion(indiceActual);
  reproducir();
}

// Play/Pause
function togglePlay() {
  reproduciendo ? pausar() : reproducir();
}

// Mostrar/ocultar panel
function togglePlayer() {
  const wrapper = document.getElementById('musicWrapper');
  wrapper.classList.toggle('open');
}

// Cambiar grupo de canciones
function cambiarGrupo() {
  if (grupoActual === 'ingles') {
    grupoActual = 'latino';
    currentPlaylist = latinPlaylist;
    btnGrupo.textContent = 'Latino';
  } else {
    grupoActual = 'ingles';
    currentPlaylist = englishPlaylist;
    btnGrupo.textContent = 'Inglés';
  }

  indiceActual = 0;
  cargarCancion(indiceActual);
  reproducir();
}

// Eventos
btnPrev.addEventListener('click', anterior);
btnPlay.addEventListener('click', togglePlay);
btnNext.addEventListener('click', siguiente);
btnGrupo.addEventListener('click', cambiarGrupo);
player.addEventListener('ended', siguiente);

// Al cargar la página
document.addEventListener('DOMContentLoaded', () => {
  currentPlaylist = englishPlaylist;
  grupoActual = 'ingles';
  btnGrupo.textContent = 'Inglés';
  cargarCancion(indiceActual);
  reproducir();
});
