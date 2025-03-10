document.addEventListener("DOMContentLoaded", function () {
    const video = document.getElementById("video-preview");
    const canvas = document.getElementById("canvas-output");
    const captureButton = document.getElementById("capture-button");
    const downloadButton = document.getElementById("download-button");
    const frameButton = document.getElementById("frame-button");
    const printButton = document.getElementById("print-button");
    const emailButton = document.getElementById("email-button");
    const filterButton = document.getElementById("filter-button");
    const capturedImagesContainer = document.getElementById("captured-images");
    const filterDropdown = document.getElementById("filter-dropdown");

    let capturedImages = [];

    // Fungsi untuk menampilkan atau menyembunyikan dropdown filter
    filterButton.addEventListener("click", function () {
        filterDropdown.style.display = filterDropdown.style.display === "block" ? "none" : "block";
    });

    // Mendapatkan akses ke kamera
    navigator.mediaDevices
        .getUserMedia({ video: { width: 1920, height: 1080 } })
        .then((stream) => {
            video.srcObject = stream;
        })
        .catch((error) => {
            console.error("Error accessing camera:", error);
        });

    // Fungsi untuk menangkap gambar
    captureButton.addEventListener("click", function () {
        const ctx = canvas.getContext("2d");
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

        const imageDataURL = canvas.toDataURL("image/png");

        // Jika sudah ada 6 gambar, hapus gambar pertama (gambar tertua)
        if (capturedImages.length >= 6) {
            capturedImages.shift();
            capturedImagesContainer.removeChild(capturedImagesContainer.firstChild);
        }

        // Buat elemen gambar baru
        const imageContainer = document.createElement("div");
        imageContainer.className = "captured-image-container";

        const image = document.createElement("img");
        image.src = imageDataURL;
        image.className = "captured-image";

        imageContainer.appendChild(image);
        capturedImagesContainer.appendChild(imageContainer);

        // Tambahkan gambar ke array
        capturedImages.push(imageContainer);
    });

    // Fungsi untuk mendownload gambar
    downloadButton.addEventListener("click", function () {
        const image = canvas.toDataURL("image/jpeg", 1.0);
        const link = document.createElement("a");
        link.download = "photobooth.jpg";
        link.href = image;
        link.click();
    });

    // Fungsi untuk mencetak gambar
    printButton.addEventListener("click", function () {
        window.print();
    });

    // Fungsi untuk mengirim email dengan gambar
    emailButton.addEventListener("click", function () {
        const email = prompt("Enter email address:");
        if (email) {
            const image = canvas.toDataURL("image/jpeg", 1.0);
            const link = document.createElement("a");
            link.href = `mailto:${email}?subject=Your%20Photobooth%20Image&body=Here%20is%20your%20image%20from%20the%20photobooth.%0D%0A%0D%0A<img src="${image}" alt="Photobooth Image">`;
            link.click();
        }
    });

    // Fungsi untuk menerapkan filter
    function applyFilter(filter) {
        if (filter === "grayscale") {
            video.style.filter = "grayscale(100%)";
        } else if (filter === "sepia") {
            video.style.filter = "sepia(100%)";
        } else {
            video.style.filter = "none";
        }
    }

    // Event listener untuk tombol filter
    document.querySelectorAll(".dropdown-item").forEach((item) => {
        item.addEventListener("click", function () {
            const filter = this.getAttribute("onclick").match(/'([^']+)'/)[1];
            applyFilter(filter);
            filterDropdown.style.display = "none"; // Sembunyikan dropdown setelah memilih filter
        });
    });
});
