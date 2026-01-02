// Sayfa yüklendiğinde çalışacak fonksiyon
document.addEventListener('DOMContentLoaded', function() {
    const flowerGarden = document.getElementById('flowerGarden');
    const heartsContainer = document.getElementById('heartsContainer');
    
    // Çiçek renkleri (her çiçek için farklı renk kombinasyonları)
    const flowerColors = [
        { color1: '#FF9ECD', color2: '#FF6B9D' }, // Pembe
        { color1: '#9D4EDD', color2: '#7B2CBF' }, // Mor
        { color1: '#FFD166', color2: '#FFB347' }, // Sarı/Turuncu
        { color1: '#06D6A0', color2: '#04A777' }, // Yeşil
        { color1: '#118AB2', color2: '#0A6A8A' }, // Mavi
        { color1: '#EF476F', color2: '#D90429' }, // Kırmızı
        { color1: '#FF9A76', color2: '#FF7A45' }, // Açık Turuncu
        { color1: '#C77DFF', color2: '#9D4EDD' }, // Açık Mor
    ];
    
    // Çiçek sayısı
    const flowerCount = 12;
    
    // Çiçekleri oluştur
    function createFlowers() {
        for (let i = 0; i < flowerCount; i++) {
            // Rastgele bir çiçek rengi seç
            const colorIndex = i % flowerColors.length;
            const colors = flowerColors[colorIndex];
            
            // Çiçek konteynerı
            const flower = document.createElement('div');
            flower.className = 'flower';
            flower.style.animationDelay = `${i * 0.2}s`; // Sırayla açılma efekti
            
            // Çiçek sapı
            const stem = document.createElement('div');
            stem.className = 'flower-stem';
            stem.style.height = `${100 + Math.random() * 100}px`; // Rastgele sap uzunluğu
            
            // Çiçek başı
            const head = document.createElement('div');
            head.className = 'flower-head';
            
            // Çiçek merkezi
            const center = document.createElement('div');
            center.className = 'center';
            
            // Taç yaprakları
            const petalCount = 8;
            for (let j = 0; j < petalCount; j++) {
                const petal = document.createElement('div');
                petal.className = 'petal';
                
                // Petal boyutları ve pozisyonları
                const angle = (j * 360) / petalCount;
                const radius = 25;
                
                petal.style.width = '30px';
                petal.style.height = '30px';
                petal.style.top = '50%';
                petal.style.left = '50%';
                petal.style.transform = `translate(-50%, -50%) rotate(${angle}deg) translateX(${radius}px) rotate(-${angle}deg)`;
                petal.style.setProperty('--petal-color1', colors.color1);
                petal.style.setProperty('--petal-color2', colors.color2);
                
                head.appendChild(petal);
            }
            
            // Yapraklar
            for (let k = 0; k < 2; k++) {
                const leaf = document.createElement('div');
                leaf.className = 'leaf';
                leaf.style.left = `${k === 0 ? '-20px' : 'initial'}`;
                leaf.style.right = `${k === 1 ? '-20px' : 'initial'}`;
                leaf.style.transform = `rotate(${k === 0 ? '-45deg' : '45deg'})`;
                
                stem.appendChild(leaf);
            }
            
            // Elemanları birleştir
            head.appendChild(center);
            flower.appendChild(stem);
            flower.appendChild(head);
            
            // Bahçeye ekle
            flowerGarden.appendChild(flower);
        }
    }
    
    // Uçan kalpler oluştur
    function createHearts() {
        const heartCount = 20;
        
        for (let i = 0; i < heartCount; i++) {
            const heart = document.createElement('div');
            heart.className = 'heart';
            heart.innerHTML = '<i class="fas fa-heart"></i>';
            
            // Rastgele boyut
            const size = 0.5 + Math.random() * 1.5;
            heart.style.fontSize = `${size}rem`;
            
            // Rastgele renk
            const colors = ['#FF6B9D', '#FF9ECD', '#9D4EDD', '#FFD166', '#EF476F'];
            const color = colors[Math.floor(Math.random() * colors.length)];
            heart.style.color = color;
            
            // Rastgele animasyon gecikmesi
            heart.style.animationDelay = `${Math.random() * 5}s`;
            heart.style.animationDuration = `${2 + Math.random() * 4}s`;
            
            heartsContainer.appendChild(heart);
        }
    }
    
    // Arka plana düşen yapraklar efekti
    function createFallingLeaves() {
        const container = document.querySelector('.container');
        
        for (let i = 0; i < 15; i++) {
            const leaf = document.createElement('div');
            leaf.innerHTML = '❁';
            leaf.style.position = 'absolute';
            leaf.style.fontSize = `${1 + Math.random() * 2}rem`;
            leaf.style.color = `hsl(${Math.random() * 60 + 300}, 70%, 70%)`;
            leaf.style.top = '-50px';
            leaf.style.left = `${Math.random() * 100}vw`;
            leaf.style.opacity = '0.7';
            leaf.style.zIndex = '-1';
            leaf.style.pointerEvents = 'none';
            
            // Rastgele düşme animasyonu
            const animationDuration = 10 + Math.random() * 20;
            const animationDelay = Math.random() * 10;
            
            leaf.style.animation = `fall ${animationDuration}s linear ${animationDelay}s infinite`;
            
            container.appendChild(leaf);
        }
        
        // Düşme animasyonunu CSS'e ekle
        if (!document.querySelector('#fallingAnimation')) {
            const style = document.createElement('style');
            style.id = 'fallingAnimation';
            style.textContent = `
                @keyframes fall {
                    0% {
                        transform: translateY(0) rotate(0deg);
                        opacity: 0.7;
                    }
                    100% {
                        transform: translateY(100vh) rotate(360deg);
                        opacity: 0;
                    }
                }
            `;
            document.head.appendChild(style);
        }
    }
    
    // Sayfa yüklendiğinde tüm efektleri başlat
    createFlowers();
    createHearts();
    createFallingLeaves();
    
    // Sayfa başlığına efekt ekle
    let titleIndex = 0;
    const titleText = "Berra ❤️";
    const titleElement = document.querySelector('.title');
    
    function animateTitle() {
        titleElement.textContent = titleText.substring(0, titleIndex);
        titleIndex++;
        
        if (titleIndex <= titleText.length) {
            setTimeout(animateTitle, 150);
        }
    }
    
    // Başlık animasyonunu geciktirerek başlat
    setTimeout(animateTitle, 1000);
    
    // Fare tıklamasıyla ek çiçek oluştur
    document.addEventListener('click', function(e) {
        // Sadece belirli alanlarda tıklanırsa
        if (e.target.closest('.garden') || e.target.closest('.love-message')) {
            createClickFlower(e.clientX, e.clientY);
        }
    });
    
    // Tıklanınca oluşan özel çiçek
    function createClickFlower(x, y) {
        const colors = flowerColors[Math.floor(Math.random() * flowerColors.length)];
        
        const flower = document.createElement('div');
        flower.className = 'flower';
        flower.style.position = 'fixed';
        flower.style.left = `${x}px`;
        flower.style.top = `${y}px`;
        flower.style.zIndex = '1000';
        flower.style.pointerEvents = 'none';
        flower.style.transform = 'scale(0)';
        
        // Çiçek başı
        const head = document.createElement('div');
        head.className = 'flower-head';
        head.style.width = '40px';
        head.style.height = '40px';
        
        // Merkez
        const center = document.createElement('div');
        center.className = 'center';
        
        // Taç yaprakları
        const petalCount = 6;
        for (let j = 0; j < petalCount; j++) {
            const petal = document.createElement('div');
            petal.className = 'petal';
            
            const angle = (j * 360) / petalCount;
            const radius = 20;
            
            petal.style.width = '20px';
            petal.style.height = '20px';
            petal.style.top = '50%';
            petal.style.left = '50%';
            petal.style.transform = `translate(-50%, -50%) rotate(${angle}deg) translateX(${radius}px) rotate(-${angle}deg)`;
            petal.style.setProperty('--petal-color1', colors.color1);
            petal.style.setProperty('--petal-color2', colors.color2);
            
            head.appendChild(petal);
        }
        
        head.appendChild(center);
        flower.appendChild(head);
        
        document.body.appendChild(flower);
        
        // Animasyon
        flower.animate([
            { transform: 'scale(0) translateY(0)', opacity: 1 },
            { transform: 'scale(1.2) translateY(-20px)', opacity: 0.8 },
            { transform: 'scale(1) translateY(-40px)', opacity: 0.5 },
            { transform: 'scale(0.8) translateY(-60px)', opacity: 0 }
        ], {
            duration: 1500,
            easing: 'cubic-bezier(0.215, 0.610, 0.355, 1)'
        });
        
        // Animasyon bittikten sonra kaldır
        setTimeout(() => {
            flower.remove();
        }, 1500);
    }
    
    // Arka plan müziği (isteğe bağlı - yorum satırını kaldırabilirsiniz)
    /*
    const audio = new Audio('https://assets.mixkit.co/music/preview/mixkit-romantic-sunset-687.mp3');
    audio.loop = true;
    audio.volume = 0.3;
    
    // İlk tıklamada müziği başlat
    document.addEventListener('click', function startAudio() {
        audio.play().catch(e => console.log("Müzik çalınamadı: ", e));
        document.removeEventListener('click', startAudio);
    }, { once: true });
    */
});
