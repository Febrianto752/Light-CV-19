const body = document.getElementsByTagName("html")[0];
const iconToggler = document.getElementsByClassName("icon-toggler")[0];
const navbarNav = document.getElementsByClassName("navbar-nav")[0];
const nav = document.getElementsByTagName("nav")[0];
const card = document.querySelectorAll(".container .card");
const form = document.getElementsByTagName("form")[0];

// event show card bagian kontak kami
window.addEventListener("scroll", function (e) {
  let wScroll = body.scrollTop;
  if (wScroll > 2400) {
    card.forEach((e, i) => {
      if (!e.classList.contains("show")) {
        setTimeout(function () {
          e.classList.add("show");
        }, i * 500);
      }
    });
  }
});

// event ketika icon toggle navbar di klik (event navbar collapse)
iconToggler.addEventListener("click", function () {
  navbarNav.classList.toggle("active");
  nav.classList.toggle("nav-active");
});

/* event mengembalikan height tag <nav> dan <ul> 
 seperti semula demgan menghapus kelas active|nav-active 
 jika masih ada di dalam element */
window.addEventListener("resize", function () {
  if (this.innerWidth > 300) {
    if (navbarNav.classList.contains("active")) {
      navbarNav.classList.toggle("active");
    }

    if (nav.classList.contains("nav-active")) {
      nav.classList.toggle("nav-active");
    }
  }
});

function checkStorage() {
  return typeof Storage !== "undefined";
}

function getListPeserta() {
  if (localStorage.getItem("list_peserta") == null) {
    localStorage.setItem("list_peserta", "[]");
  }
  return localStorage.getItem("list_peserta");
}

form.addEventListener("submit", function (event) {
  event.preventDefault();
  let inputName = document.querySelector("form input[name=namaLengkap]");
  let inputNIK = document.querySelector("form input[name=nik]");
  let inputNoHP = document.querySelector("form input[name=noHP]");
  let inputUsia = document.querySelector("form input[name=usia]");
  let inputAlamat = document.querySelector("form input[name=alamat]");
  if (checkStorage()) {
    let list_peserta = getListPeserta();
    list_peserta = JSON.parse(list_peserta);
    list_peserta.push({
      name: inputName.value,
    });
    localStorage.setItem("list_peserta", JSON.stringify(list_peserta));
    alert("Selamat anda berhasil mendaftar sebagai peserta vaksinasi");
  } else {
    alert("Something Error...");
  }

  inputName.value = "";
  inputNIK.value = "";
  inputNoHP.value = "";
  inputUsia.value = "";
  inputAlamat.value = "";
});

function updateQoutaVaksin() {
  let countPeserta = JSON.parse(getListPeserta()).length;
  let koutaVaksin = 1000;

  const score = document.getElementById("score");
  score.innerText = `${koutaVaksin - countPeserta}`;
}

updateQoutaVaksin();
