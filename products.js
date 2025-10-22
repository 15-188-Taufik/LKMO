// products.js
// Ini adalah database produk kita.
// Kita akan menggunakan ID unik (p1, p2, dst.) untuk setiap produk.

const allProducts = {
    // Best Selling
    "p1": {
        name: "Elegant Blouse",
        price: "$49.99",
        imageUrl: "https://images.unsplash.com/photo-1739961065821-7f6270ee9c3b?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=687",
        specs: `
            <ul>
                <li><strong>Material:</strong> 100% Silk Crepe</li>
                <li><strong>Fit:</strong> Relaxed Fit</li>
                <li><strong>Care:</strong> Dry clean only</li>
            </ul>
        `,
        description: "Blus sutra elegan yang sempurna untuk pakaian kantor atau acara semi-formal. Kain ringan dan desain klasik."
    },
    "p2": {
        name: "Vintage Jean Jacket",
        price: "$89.99",
        imageUrl: "https://images.unsplash.com/photo-1545291730-faff8ca1d4b0?w=500&q=80",
        specs: `
            <ul>
                <li><strong>Material:</strong> 100% Cotton Denim</li>
                <li><strong>Fit:</strong> Regular Fit</li>
                <li><strong>Care:</strong> Machine wash cold</li>
            </ul>
        `,
        description: "Jaket jean vintage ini memberikan tampilan klasik yang tak lekang oleh waktu. Dibuat dari denim katun berkualitas tinggi."
    },
    "p3": {
        name: "Summer Dress",
        price: "$65.00",
        imageUrl: "https://images.unsplash.com/photo-1617137968427-85924c800a22?w=500&q=80",
        specs: `
            <ul>
                <li><strong>Material:</strong> 95% Cotton, 5% Spandex</li>
                <li><strong>Fit:</strong> A-Line</li>
                <li><strong>Care:</strong> Hand wash recommended</li>
            </ul>
        `,
        description: "Gaun musim panas yang ringan dan sejuk dengan motif bunga yang cerah. Sempurna untuk hari yang cerah."
    },
    "p4": {
        name: "Classic Trench Coat",
        price: "$120.00",
        imageUrl: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=500&q=80",
        specs: `
            <ul>
                <li><strong>Material:</strong> Water-resistant Polyester</li>
                <li><strong>Fit:</strong> Tailored Fit</li>
                <li><strong>Features:</strong> Double-breasted, Belted waist</li>
            </ul>
        `,
        description: "Trench coat klasik yang harus dimiliki. Tahan air dan bergaya, melindungi Anda dari cuaca sambil tetap terlihat modis."
    },
    "p5": {
        name: "Minimalist Hoodie",
        price: "$75.00",
        imageUrl: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=687",
        specs: `
            <ul>
                <li><strong>Material:</strong> 80% Cotton, 20% Polyester</li>
                <li><strong>Fit:</strong> Oversized</li>
                <li><strong>Features:</strong> Fleece-lined, Kangaroo pocket</li>
            </ul>
        `,
        description: "Hoodie super nyaman dengan desain minimalis. Sempurna untuk bersantai di rumah atau tampilan kasual."
    },
    "p6": {
        name: "Leather Handbag",
        price: "$150.00",
        imageUrl: "https://images.unsplash.com/photo-1598099947145-e85739e7ca28?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=735",
        specs: `
            <ul>
                <li><strong>Material:</strong> 100% Genuine Leather</li>
                <li><strong>Size:</strong> 12" W x 9" H x 5" D</li>
                <li><strong>Features:</strong> Internal zip pocket, Magnetic closure</li>
            </ul>
        `,
        description: "Tas tangan kulit asli yang dibuat dengan indah. Aksesori abadi yang melengkapi pakaian apa pun."
    },
    // New Arrivals
    "p7": {
        name: "Urban Sneakers",
        price: "$110.00",
        imageUrl: "https://images.unsplash.com/photo-1560769629-975ec94e6a86?w=500&q=80",
        specs: `
            <ul>
                <li><strong>Upper:</strong> Mesh and Suede</li>
                <li><strong>Sole:</strong> Rubber</li>
                <li><strong>Color:</strong> White/Grey/Red</li>
            </ul>
        `,
        description: "Sneaker urban yang menggabungkan kenyamanan dan gaya. Sempurna untuk dipakai sepanjang hari di kota."
    },
    "p8": {
        name: "Bomber Jacket",
        price: "$145.00",
        imageUrl: "https://images.unsplash.com/photo-1677555465624-30ec4088f4c4?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=687",
        specs: `
            <ul>
                <li><strong>Material:</strong> Nylon Shell, Polyester Lining</li>
                <li><strong>Fit:</strong> Standard Fit</li>
                <li><strong>Features:</strong> Ribbed cuffs, Zip pocket on sleeve</li>
            </ul>
        `,
        description: "Jaket bomber modern dengan sentuhan klasik. Ringan namun hangat, ideal untuk cuaca transisi."
    },
    "p9": {
        name: "Floral Scarf",
        price: "$40.00",
        imageUrl: "https://i.pinimg.com/736x/82/e2/91/82e291bee88e9ff2f22aed919dc4dac7.jpg",
        specs: `
            <ul>
                <li><strong>Material:</strong> 100% Viscose</li>
                <li><strong>Size:</strong> 70" x 35"</li>
                <li><strong>Pattern:</strong> Floral Print</li>
            </ul>
        `,
        description: "Syal bunga cantik yang terbuat dari bahan viscose lembut. Tambahkan sentuhan warna pada pakaian Anda."
    },
    "p10": {
        name: "Beanie Hat",
        price: "$25.00",
        imageUrl: "https://i.pinimg.com/1200x/64/5b/56/645b56d35a70e54959acecebb1962b7f.jpg",
        specs: `
            <ul>
                <li><strong>Material:</strong> 100% Acrylic Knit</li>
                <li><strong>Fit:</strong> One size fits all</li>
                <li><strong>Style:</strong> Cuffed Beanie</li>
            </ul>
        `,
        description: "Tetap hangat dan bergaya dengan beanie rajut klasik ini. Lembut, nyaman, dan cocok dengan segalanya."
    },
    // Recommendations
    "p11": {
        name: "Stylish Watch",
        price: "$199.99",
        imageUrl: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&q=80",
        specs: `
            <ul>
                <li><strong>Case:</strong> Stainless Steel</li>
                <li><strong>Movement:</strong> Quartz</li>
                <li><strong>Water Resistance:</strong> 5 ATM</li>
            </ul>
        `,
        description: "Jam tangan penuh gaya dengan desain minimalis. Menampilkan casing stainless steel dan tali kulit yang tahan lama."
    },
    "p12": {
        name: "Running Shoes",
        price: "$120.00",
        imageUrl: "https://plus.unsplash.com/premium_photo-1664537975122-9c598d85816e?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1170",
        specs: `
            <ul>
                <li><strong>Upper:</strong> Breathable Mesh</li>
                <li><strong>Midsole:</strong> Foam Cushioning</li>
                <li><strong>Use:</strong> Road Running</li>
            </ul>
        `,
        description: "Sepatu lari ringan yang dirancang untuk kecepatan dan kenyamanan. Midsole busa memberikan bantalan responsif."
    },
    "p13": {
        name: "Minimalist Hoodie (Dark)",
        price: "$75.00",
        imageUrl: "https://images.unsplash.com/photo-1738486260141-f9a2561323c4?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1170",
        specs: `
            <ul>
                <li><strong>Material:</strong> 80% Cotton, 20% Polyester</li>
                <li><strong>Fit:</strong> Oversized</li>
                <li><strong>Features:</strong> Fleece-lined, Kangaroo pocket</li>
            </ul>
        `,
        description: "Hoodie super nyaman dengan desain minimalis dalam warna gelap. Sempurna untuk bersantai di rumah."
    },
    "p14": {
        name: "Headphones",
        price: "$99.00",
        imageUrl: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&q=80",
        specs: `
            <ul>
                <li><strong>Type:</strong> Over-ear, Wireless</li>
                <li><strong>Battery:</strong> 20 hours playtime</li>
                <li><strong>Features:</strong> Noise Cancelling</li>
            </ul>
        `,
        description: "Nikmati suara imersif dengan headphone nirkabel ini. Dilengkapi peredam bising aktif dan daya tahan baterai lama."
    }
};