document.addEventListener("DOMContentLoaded", function () {
  // Semua section utama yang harus ditampilkan secara default (kecuali strategi/aktivis)
  const allSections = document.querySelectorAll("section");
  const specialSections = ["strategi", "aktivis"];
  const mainSections = Array.from(allSections).filter(
    (sec) => !specialSections.includes(sec.id)
  );

  // Fungsi untuk menampilkan konten utama (Beranda, Menu, SWOT, dll.)
  function showMainContent() {
    mainSections.forEach((sec) => (sec.style.display = "block"));
    specialSections.forEach((id) => {
      const sec = document.getElementById(id);
      if (sec) sec.style.display = "none";
    });
  }

  // Fungsi untuk menampilkan konten khusus (Strategi/Aktivis)
  function showSpecialContent(targetId) {
    mainSections.forEach((sec) => (sec.style.display = "none"));
    specialSections.forEach((id) => {
      const sec = document.getElementById(id);
      if (sec) sec.style.display = id === targetId ? "block" : "none";
    });
  }

  // Pastikan status awal benar (konten utama terlihat, strategi/aktivis tersembunyi)
  showMainContent();

  // --- 1. Toggle Baca Selengkapnya di Blog ---
  const readMoreButtons = document.querySelectorAll(".read-more-toggle");
  readMoreButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const targetId = this.getAttribute("data-target");
      const targetElement = document.getElementById(targetId);

      if (targetElement) {
        targetElement.classList.toggle("hidden-full-text");
        this.textContent = targetElement.classList.contains("hidden-full-text")
          ? "Baca Selengkapnya"
          : "Sembunyikan";
      }
    });
  });

  // --- 2. Toggle Flowcharts dan Roadmap ---
  const toggleButtons = document.querySelectorAll(".toggle-button");
  toggleButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const targetId = this.getAttribute("data-target");
      const targetElement = document.getElementById(targetId);

      if (targetElement) {
        targetElement.classList.toggle("toggle-content-hidden");
        if (targetElement.classList.contains("toggle-content-hidden")) {
          this.textContent =
            targetId === "flowcharts-content"
              ? "Tampilkan Detail Flowchart"
              : "Tampilkan Gambar Roadmap Bisnis";
        } else {
          this.textContent = "Sembunyikan Detail";
        }
      }
    });
  });

  // --- 3. Toggle Navigasi Mobile & Smooth Scroll ---
  const navToggle = document.querySelector(".nav-toggle");
  const mainNav = document.getElementById("main-nav");

  if (navToggle && mainNav) {
    navToggle.addEventListener("click", function () {
      mainNav.classList.toggle("active");
    });
  }

  // --- 4. Navigasi Tautan (Pemisahan Logika Scrolling vs Tampilan Khusus) ---
  const allNavLinks = mainNav.querySelectorAll("a");

  allNavLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      // 4a. Tutup menu mobile
      if (mainNav.classList.contains("active")) {
        mainNav.classList.remove("active");
      }

      const href = this.getAttribute("href");
      const dataSection = this.getAttribute("data-section");

      if (dataSection) {
        // LOGIKA UNTUK STRATEGI & AKTIVIS (MENGGANTI TAMPILAN)
        e.preventDefault(); // Mencegah scrolling
        showSpecialContent(dataSection);
      } else if (href && href.startsWith("#")) {
        // LOGIKA UNTUK SEMUA TAUTAN SCROLL (Beranda, Menu, SWOT, dll.)

        // Jika sedang di tampilan Strategi/Aktivis, kembalikan ke konten utama
        if (
          document.getElementById("strategi").style.display === "block" ||
          document.getElementById("aktivis").style.display === "block"
        ) {
          showMainContent();
          // Biarkan event default berjalan (smooth scroll)
        }

        // Smooth Scroll Manual (optional, jika Anda ingin kontrol penuh)
        // const targetElement = document.getElementById(href.substring(1));
        // if (targetElement) {
        //     e.preventDefault();
        //     targetElement.scrollIntoView({ behavior: 'smooth' });
        // }
        // Jika Anda tidak menggunakan smooth scroll manual, biarkan event default berjalan
      }
    });
  });
});
