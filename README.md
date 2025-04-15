## ⚙ BASE URL
If you're running your backend locally:

http://localhost:5000


---

## 🔹 1. *Health Check*
*GET*  

http://localhost:5000/

✅ Should return: "Api running"

---

## 🔹 2. *Get All Products*
*GET*

http://localhost:5000/api/products

✅ Returns list of all products.

---

## 🔹 3. *Get Single Product by ID*
*GET*

http://localhost:5000/api/products/<product_id>

Example:

http://localhost:5000/api/products/6615d284876acf9eebcd7891


---

## 🔹 4. *User Registration*
*POST*  
URL:

http://localhost:5000/api/users


*Body (JSON):*
json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "123456"
}


✅ Returns user data + token.

---

## 🔹 5. *User Login*
*POST*  
URL:

http://localhost:5000/api/users/login


*Body (JSON):*
json
{
  "email": "john@example.com",
  "password": "123456"
}


✅ Returns user info + JWT token (save this for auth).

---

## 🔹 6. *Get User Profile*
*GET*

http://localhost:5000/api/users/profile


🛡 Requires Authorization header:

Bearer <your_token_here>


---

## 🔹 7. *Create an Order*
*POST*

http://localhost:5000/api/orders


*Headers:*

Authorization: Bearer <your_token_here>
Content-Type: application/json


*Body (JSON):*
json
{
  "orderItems": [
    {
      "name": "Adidas Shoes",
      "qty": 2,
      "image": "/images/shoe.jpg",
      "price": 100,
      "product": "6615d284876acf9eebcd7891"
    }
  ],
  "shippingAddress": {
    "address": "123 Street",
    "city": "Delhi",
    "postalCode": "110001",
    "country": "India"
  },
  "paymentMethod": "PayPal",
  "taxPrice": 10,
  "shippingPrice": 5,
  "totalPrice": 215
}


---

## 🔹 8. *Get Logged In User’s Orders*
*GET*

http://localhost:5000/api/orders/myorders


*Headers:*

Authorization: Bearer <your_token_here>


---

## 🔹 9. *Get PayPal Client ID*
*GET*

http://localhost:5000/api/config/paypal


✅ Returns your PayPal client ID if .env has PAYPAL_CLIENT_ID.

---

## 🔹 10. *Upload File (Image)*
*POST*

http://localhost:5000/api/upload


*Form-Data:*

Key: image (type: File)
Value: Choose an image file


✅ Returns the image path on success.

---

## 🧪 Optional: Admin Routes (Need Admin Token)
- **GET /api/users** → list all users  
- **PUT /api/users/:id** → update user  
- **DELETE /api/users/:id** → delete user  
- **GET /api/orders** → list all orders  
- **DELETE /api/products/:id** → delete product  
- **PUT /api/products/:id** → update product  
- **POST /api/products** → create new product

Let me know if you want full sample bodies/headers for any of these advanced routes too!

---

✅ *Pro Tip:* In Thunder Client, create a “Collection” like *Adidas Clone API* and save all these requests there for reusability. Want me to generate a Thunder Client collection.json file for you?