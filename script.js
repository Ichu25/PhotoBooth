document.addEventListener('DOMContentLoaded', function () {
    const splashScreen = document.getElementById('splashScreen');

    // Hilangkan splash screen setelah 3 detik
    setTimeout(() => {
        splashScreen.style.opacity = '0'; // Tambahkan efek transisi
        setTimeout(() => {
            splashScreen.style.display = 'none'; // Sembunyikan elemen setelah transisi selesai
        }, 500); // Waktu transisi sesuai dengan CSS (0.5s)
    }, 3000); // Tampilkan splash screen selama 3 detik
});

document.addEventListener('DOMContentLoaded', function() {
    const cameraVideo = document.getElementById('cameraVideo');
    const cameraCanvas = document.getElementById('cameraCanvas');
    const photo1 = document.getElementById('photo1');
    const photo2 = document.getElementById('photo2');
    const photo3 = document.getElementById('photo3');
    const photo4 = document.getElementById('photo4');
    let currentPhoto = null;

    // Akses Kamera
    navigator.mediaDevices.getUserMedia({ video: true })
        .then(function(stream) {
            cameraVideo.srcObject = stream;
        })
        .catch(function(error) {
            console.error('Gagal mengakses kamera:', error);
            alert('Gagal mengakses kamera. Pastikan izin kamera diberikan dan situs web menggunakan HTTPS.');
        });

    // Fungsi untuk mengambil gambar dengan ukuran 150x150
    function takePicture() {
        // Membuat canvas off-screen dengan ukuran 150x150
        let offCanvas = document.createElement('canvas');
        offCanvas.width = 150;
        offCanvas.height = 150;
        let ctx = offCanvas.getContext('2d');
    
        // Membalik gambar secara horizontal (menghindari efek mirror)
        ctx.translate(offCanvas.width, 0); // Pindahkan titik awal ke kanan
        ctx.scale(-1, 1); // Balikkan gambar secara horizontal
    
        // Menggambar video ke canvas dengan skala dari ukuran asli ke 150x150
        ctx.drawImage(cameraVideo, 0, 0, cameraVideo.videoWidth, cameraVideo.videoHeight, 0, 0, 150, 150);
    
        // Kembalikan transformasi ke normal (opsional jika ada operasi lain)
        ctx.setTransform(1, 0, 0, 1, 0, 0);
    
        const imageDataURL = offCanvas.toDataURL('image/png');
        return imageDataURL;
    }

    // Tombol Capture (Icon Camera) untuk mengambil gambar
    document.getElementById('capture').addEventListener('click', function() {
        const imageDataURL = takePicture();
        if (!photo1.src || photo1.src === 'https://storage.googleapis.com/a1aa/image/8zAtxDrmOR7BRbgdCejk4TpZIAzNgjnZkvf6thyF8Ow.jpg') {
            photo1.src = imageDataURL;
            currentPhoto = photo1;
        } else if (!photo2.src || photo2.src === 'https://storage.googleapis.com/a1aa/image/b_uTReThpHHTeVFjYwBPQRsndvltTlIQy3N8_3rX2oM.jpg') {
            photo2.src = imageDataURL;
            currentPhoto = photo2;
        } else if (!photo3.src || photo3.src === 'https://storage.googleapis.com/a1aa/image/vwbJs1_F9ySD9xTkkgUTNFutqXRO54CqalBGodoiMxM.jpg') {
            photo3.src = imageDataURL;
            currentPhoto = photo3;
        } else if (!photo4.src || photo4.src === 'https://storage.googleapis.com/a1aa/image/BIvisTGQ04fiP93oQQeSAP5m5BcxrMkHIhUXQCKqSLE.jpg') {
            photo4.src = imageDataURL;
            currentPhoto = photo4;
        } else {
            alert('Semua slot foto sudah terisi.');
        }
    });

    // Tombol Foto Frame untuk mengubah warna frame dari hasil gambar
    document.getElementById('fotoFrame').addEventListener('click', function() {
        if (currentPhoto) {
            // Definisikan pilihan gaya frame
            const frames = [
                { border: "5px solid red", boxShadow: "0 0 10px red" },
                { border: "5px dashed green", boxShadow: "0 0 10px green" },
                { border: "5px dotted blue", boxShadow: "0 0 10px blue" },
                { border: "10px double yellow", boxShadow: "0 0 15px yellow" },
                { border: "5px solid purple", borderRadius: "50%", boxShadow: "0 0 10px purple" }
            ];
            // Ambil indeks gaya saat ini dari atribut data (default ke 0)
            let currentIndex = parseInt(currentPhoto.getAttribute('data-frame-index')) || 0;
            const newFrame = frames[currentIndex % frames.length];
            // Terapkan gaya frame baru
            currentPhoto.style.border = newFrame.border;
            currentPhoto.style.boxShadow = newFrame.boxShadow || "none";
            currentPhoto.style.borderRadius = newFrame.borderRadius || "0";
            // Perbarui indeks untuk klik selanjutnya
            currentPhoto.setAttribute('data-frame-index', currentIndex + 1);
        } else {
            alert('Pilih foto terlebih dahulu.');
        }
    });

    // Tombol Filter
    document.getElementById('Filter').addEventListener('click', function() {
        if (currentPhoto) {
            // Terapkan filter mempercerah dan memperjernih
            currentPhoto.style.filter = 'brightness(1.2) contrast(1.1) saturate(1.2)';
            alert('Filter mempercerah dan memperjernih diterapkan.');
        } else {
            alert('Pilih foto terlebih dahulu.');
        }
    });

    // Tombol Print
    document.getElementById('print').addEventListener('click', function () {
    const photos = [photo1, photo2, photo3, photo4];
    const validPhotos = photos.filter(photo => photo.src && !photo.src.includes('storage.googleapis.com')); // Filter foto yang valid

    if (validPhotos.length > 0) {
        const printWindow = window.open('', '_blank');
        const photoHTML = `
            <html>
            <head>
            <title>Print Photo</title>
            <style>
                body {
                margin: 0;
                padding: 0;
                display: flex;
                justify-content: center;
                align-items: center;
                flex-direction: column;
                height: 100vh;
                background: linear-gradient(135deg, #ff9a9e, #fad0c4, #fbc2eb);
                font-family: Arial, sans-serif;
                animation: backgroundAnimation 10s infinite alternate;
                }
                @keyframes backgroundAnimation {
                0% { background-position: 0% 50%; }
                100% { background-position: 100% 50%; }
                }
                h1 {
                font-size: 2em;
                color: #333;
                margin-bottom: 20px;
                text-align: center;
                }
                h3 {
                font-size: 1.5em;
                color: #333;
                margin-bottom: 20px;
                text-align: center;
                }
                .print-container {
                width: 100%;
                max-width: 800px;
                height: 100%;
                max-height: 1100px;
                display: grid;
                grid-template-columns: 1fr 1fr;
                grid-template-rows: 1fr 1fr;
                gap: 10px;
                padding: 20px;
                box-sizing: border-box;
                background: rgba(255, 255, 255, 0.8);
                border-radius: 20px;
                box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
                overflow: hidden;
                position: relative;
                }
                .print-container::before {
                content: '';
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: url('https://i.imgur.com/9Q9QZQe.png') no-repeat center center;
                background-size: cover;
                opacity: 0.2;
                z-index: -1;
                }
                .photo-frame {
                width: 100%;
                height: 100%;
                background: white;
                border: 3px solid #ccc;
                box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
                border-radius: 10px;
                overflow: hidden;
                display: flex;
                justify-content: center;
                align-items: center;
                }
                .photo-frame img {
                width: 100%;
                height: 100%;
                object-fit: cover;
                }
            </style>
            </head>
            <body>
            <h1>PHOTO BOOTH</h1>
            <h3>"Create your own sunshine☺️"</h3>
            <div class="print-container">
                ${validPhotos.map(photo => `
                <div class="photo-frame">
                    <img src="${photo.src}" alt="Photo Booth Image">
                </div>
                `).join('')}
            </div>
            </body>
            </html>
        `;
        printWindow.document.open();
        printWindow.document.write(photoHTML);
        printWindow.document.close();
        printWindow.focus();
        printWindow.print();
        printWindow.close();
        } else {
        alert('Tidak ada foto yang valid untuk dicetak.');
        }
    });

    // Tombol Send Email (gambar dikirim dalam format JPEG)
    document.getElementById('sendEmail').addEventListener('click', function() {
        if (currentPhoto) {
            let img = new Image();
            img.src = currentPhoto.src;
            img.onload = function() {
                let offCanvas = document.createElement('canvas');
                const maxWidth = 640;
                let scale = Math.min(1, maxWidth / img.width);
                offCanvas.width = img.width * scale;
                offCanvas.height = img.height * scale;
                let offCtx = offCanvas.getContext('2d');
                offCtx.drawImage(img, 0, 0, offCanvas.width, offCanvas.height);
                const jpegDataURL = offCanvas.toDataURL('image/jpeg', 0.5);

                const email = 'your_email@example.com'; // Ganti dengan email Anda
                const subject = 'Foto Photobooth';
                const body = 'Berikut adalah foto photobooth Anda: ' + jpegDataURL;
                const mailtoLink = 'mailto:' + email + '?subject=' + encodeURIComponent(subject) + '&body=' + encodeURIComponent(body);
                window.location.href = mailtoLink;
            };
        } else {
            alert('Pilih foto terlebih dahulu.');
        }
    });

    // Tombol Download
    document.getElementById('download').addEventListener('click', function() {
        if (currentPhoto) {
            const a = document.createElement('a');
            a.href = currentPhoto.src;
            a.download = 'photo.png';
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
        } else {
            alert('Pilih foto terlebih dahulu.');
        }
    });

    // Event listener untuk delete icon pada setiap foto hasil capture
    document.querySelectorAll('.delete-icon').forEach(function(button) {
        button.addEventListener('click', function(e) {
            e.stopPropagation(); // agar tidak memicu event lain (misalnya memilih foto)
            const photoId = button.getAttribute('data-photo');
            const photo = document.getElementById(photoId);
            let defaultSrc = "";
            if (photoId === "photo1") {
                defaultSrc = "https://storage.googleapis.com/a1aa/image/8zAtxDrmOR7BRbgdCejk4TpZIAzNgjnZkvf6thyF8Ow.jpg";
            } else if (photoId === "photo2") {
                defaultSrc = "https://storage.googleapis.com/a1aa/image/b_uTReThpHHTeVFjYwBPQRsndvltTlIQy3N8_3rX2oM.jpg";
            } else if (photoId === "photo3") {
                defaultSrc = "https://storage.googleapis.com/a1aa/image/vwbJs1_F9ySD9xTkkgUTNFutqXRO54CqalBGodoiMxM.jpg";
            } else if (photoId === "photo4") {
                defaultSrc = "https://storage.googleapis.com/a1aa/image/BIvisTGQ04fiP93oQQeSAP5m5BcxrMkHIhUXQCKqSLE.jpg";
            }
            photo.src = defaultSrc;
            photo.style.border = "none";
            photo.removeAttribute('data-color-index');
            if (currentPhoto && currentPhoto.id === photoId) {
                currentPhoto = null;
            }
        });
    });
});
