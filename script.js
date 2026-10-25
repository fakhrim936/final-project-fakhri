const typingText = document.getElementById('typing-text');
const kataKata = ["Maba Sistem Informasi💻", "Tukang Ngulik Web🚀", "Penjelajah Teknologi✨","Penikmat Kopi Golda ☕"];
let kataIndex = 0;
let hurufIndex = 0;
let isDeleting = false;

function ketikOtomatis() {
    if (!typingText) return;
    const kataSekarang = kataKata[kataIndex];
    
    if (isDeleting) {
        // Proses menghapus huruf
        typingText.textContent = kataSekarang.substring(0, hurufIndex - 1);
        hurufIndex--;
    } else {
        // Proses mengetik huruf
        typingText.textContent = kataSekarang.substring(0, hurufIndex + 1);
        hurufIndex++;
    }

    // Mengatur kecepatan ngetik (saat menghapus lebih cepat)
    let kecepatan = isDeleting ? 50 : 100;

    if (!isDeleting && hurufIndex === kataSekarang.length) {
        // Jeda sebentar setelah kata selesai diketik
        kecepatan = 2000; 
        isDeleting = true;
    } else if (isDeleting && hurufIndex === 0) {
        isDeleting = false;
        // Pindah ke kata selanjutnya
        kataIndex = (kataIndex + 1) % kataKata.length;
        kecepatan = 500; 
    }

    setTimeout(ketikOtomatis, kecepatan);
}

// Menjalankan animasi mengetik
document.addEventListener("DOMContentLoaded", ketikOtomatis);


// ==========================================
// 2. Animasi Muncul Saat Di-scroll (Scroll Reveal)
// ==========================================
// Menggunakan Intersection Observer agar performa web tetap ringan
const observerOptions = {
    threshold: 0.15, // Elemen mulai muncul saat 15% bagiannya terlihat di layar
    rootMargin: "0px 0px -50px 0px"
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add('tampil');
            // Berhenti memantau elemen ini agar animasinya tidak berulang-ulang
            observer.unobserve(entry.target); 
        }
    });
}, observerOptions);

// Mencari elemen-elemen yang ingin diberi animasi muncul
const elemenAnimasi = document.querySelectorAll('.project-card, .hobby-card, .timeline-item, .about-text');
elemenAnimasi.forEach((el) => observer.observe(el));


// ==========================================
// 3. Efek Navbar & Smooth Scroll
// ==========================================
const navbar = document.querySelector('.navbar');

// Memberi bayangan pada navbar saat di-scroll ke bawah
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Scroll halus (Smooth Scroll) saat menu navigasi diklik
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if(targetElement) {
            targetElement.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});