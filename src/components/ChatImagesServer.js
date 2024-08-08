const express = require('express');
const cloudinary = require('cloudinary').v2;
const multer = require('multer');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Set up Cloudinary configuration
cloudinary.config({
  cloud_name: 'ddkuww190',
  api_key: '887657211183549',
  api_secret: 'Is7nw4sidjxLOhExMnoNKVjUN18',
});

// Set up Multer for file uploads
const storage = multer.memoryStorage();
const upload = multer({ storage });

// Sample products array with image URLs
const products = [
  {
    src: 'images/img-9.jpg',
    text: 'Balenciaga Backpack in black smooth double calfskin',
    price: 'Tsh 55,000',
    store: 'Fashion World'
},
{
    src: 'images/img-2.webp',
    text: 'Marvel Spider-Man 2 Standard Edition - PlayStation 5',
    price: 'Tsh 150,000',
    store: 'Gee-Games'
},
{
    src: 'images/img-3.jpg',
    text: 'iPhone 15 Pro Max Gradient-Colour Case',
    price: 'Tsh 12,000',
    store: 'TechZone'
},
{
    src: 'images/img-4.jpg',
    text: 'Yezzy Boost Sneakers',
    price: 'Tsh 65,000',
    store: 'Footwear Emporium'
},
{
    src: 'images/img-13.webp',
    text: 'Cheetos Flaming Hot Snack',
    price: 'Tsh 3,600',
    store: 'Shoppers Supermarket'
},
{
    src: 'images/img-10.webp',
    text: 'VIZIO OLED Smart TV',
    price: 'Tsh 550,000',
    store: 'Electronics Depot'
},
{
    src: 'images/img-15.webp',
    text: 'Apple Watch Aluminum Series 7 (GPS + Cellular)',
    price: 'Tsh 650,000',
    store: 'Apple Store Tz'
},
{
    src: 'images/img-14.jpg',
    text: 'Angus Beef Steak Strips - 14oz - Good & Gather',
    price: 'Tsh 11,000',
    store: 'Shoppers Supermarket'
},
{
    src: 'images/img-11.jpg',
    text: 'BackPack by Bathing Ape',
    price: 'Tsh 62,000',
    store: 'Bags by Loy'
},
{
    src: 'images/img-13.webp',
    text: 'Cheetos Flaming Hot Snack',
    price: 'Tsh 3,600',
    store: 'Shoppers Supermarket'
},
{
    src: 'images/img-12.jpg',
    text: 'Baby boy Suspenders shirt and shorts',
    price: 'Tsh 16,000',
    store: 'Kids World'
},
{
    src: 'images/img-18.png',
    text: 'BODE Floret wool polo jumper',
    price: 'Tsh 26,000',
    store: 'Jojo & Loy'
},
{
    src: 'images/img-16.jpg',
    text: 'Women Jeans by Zara',
    price: 'Tsh 28,000',
    store: 'Jojo & Loy'
}
];

// Endpoint to handle image upload and comparison
app.post('/upload', upload.single('image'), async (req, res) => {
  try {
    const result = await cloudinary.uploader.upload_stream(async (error, result) => {
      if (error) {
        return res.status(500).send(error);
      }

      const uploadedImageUrl = result.secure_url;

      // Compare with existing products
      const matchingProduct = products.find((product) =>
        uploadedImageUrl.includes(product.src) // Simple comparison logic
      );

      if (matchingProduct) {
        return res.json({ message: 'Matching product found', product: matchingProduct });
      } else {
        return res.json({ message: 'No matching product found' });
      }
    });

    req.file.stream.pipe(result);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.listen(5000, () => {
  console.log('Server is running on port 5000');
});
