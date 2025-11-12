/**
* Products Data & Helper Functions
* Contains mock product data for testing and utility functions
*/
// ============================================================================
// MOCK PRODUCT DATA
// ============================================================================
// This data can be used as fallback if API fails or for offline testing
export const MOCK_PRODUCTS = [
{
id: 1,
title: "Fjallraven - Foldsack No. 1 Backpack",
price: 109.95,
category: "men's clothing",
image: "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg",
description: "Your perfect pack for everyday use and walks in the forest."
},
{
id: 2,
title: "Mens Casual Premium Slim Fit T-Shirts",
price: 22.3,
category: "men's clothing",
image: "https://fakestoreapi.com/img/71-3HjGNDUL._AC_SY879._SX._UX._SY._UY_.jpg",
description: "Slim-fitting style, contrast raglan long sleeve."
},
{
id: 3,
title: "Mens Cotton Jacket",
price: 55.99,
category: "men's clothing",
image: "https://fakestoreapi.com/img/71li-ujtlUL._AC_UX679_.jpg",
description: "Great outerwear jackets for Spring/Autumn/Winter."
},
{
id: 4,
title: "Mens Casual Slim Fit",
price: 15.99,
category: "men's clothing",
image: "https://fakestoreapi.com/img/71YXzeOuslL._AC_UY879_.jpg",
description: "The color could be slightly different between on the screen and in practice."
},
{
id: 5,
title: "John Hardy Women's Legends Naga Gold & Silver Dragon Station Chain Bracelet",
price: 695,
category: "jewelery",
image: "https://fakestoreapi.com/img/71pWzhdJNwL._AC_UL640_QL65_ML3_.jpg",
description: "From our Legends Collection, the Naga was inspired by the mythical water dragon."
},
{
id: 6,
title: "Solid Gold Petite Micropave",
price: 168,
category: "jewelery",
image: "https://fakestoreapi.com/img/61sbMiUnoGL._AC_UL640_QL65_ML3_.jpg",
description: "Satisfaction Guaranteed. Return or exchange any order within 30 days."
},
{
id: 7,
title: "White Gold Plated Princess",
price: 9.99,
category: "jewelery",
image: "https://fakestoreapi.com/img/71YAIFU48IL._AC_UL640_QL65_ML3_.jpg",
description: "Classic Created Wedding Engagement Solitaire Diamond Promise Ring."
},
{
id: 8,
title: "Pierced Owl Rose Gold Plated Stainless Steel Double",
price: 10.99,
category: "jewelery",
image: "https://fakestoreapi.com/img/51UDEzMJVpL._AC_UL640_QL65_ML3_.jpg",
description: "Rose Gold Plated Double Flared Tunnel Plug Earrings."
},
{
id: 9,
title: "WD 2TB Elements Portable External Hard Drive - USB 3.0",
price: 64,
category: "electronics",
image: "https://fakestoreapi.com/img/61IBBVJvSDL._AC_SY879_.jpg",
description: "USB 3.0 and USB 2.0 Compatibility Fast data transfers."
},
{
id: 10,
title: "SanDisk SSD PLUS 1TB Internal SSD - SATA III 6 Gb/s",
price: 109,
category: "electronics",
image: "https://fakestoreapi.com/img/61U7T1koQqL._AC_SX679_.jpg",
description: "Easy upgrade for faster boot up, shutdown, application load and response."
}
];
// ============================================================================
// PRODUCT CATEGORIES
// ============================================================================
// List of all available product categories
export const CATEGORIES = [
"all",
"electronics",
"jewelery",
"men's clothing",
"women's clothing"
];
// ============================================================================
// HELPER FUNCTIONS
// ============================================================================
/**
* Get all unique categories from products array
* @param {Array} products - Array of product objects
* @returns {Array} - Array of unique category names
*/
export const getCategories = (products) => {
if (!products || products.length === 0) return CATEGORIES;
const categories = products.map(product => product.category);
return ['all', ...new Set(categories)];
};
/**
* Filter products by category
* @param {Array} products - Array of product objects
* @param {string} category - Category to filter by
* @returns {Array} - Filtered array of products
*/
export const filterByCategory = (products, category) => {
if (!products) return [];
if (category === 'all') return products;
return products.filter(product =>
product.category.toLowerCase() === category.toLowerCase()
);
};
/**
* Search products by title
* @param {Array} products - Array of product objects
* @param {string} searchTerm - Search term to match against titles
* @returns {Array} - Filtered array of matching products
*/
export const searchProducts = (products, searchTerm) => {
if (!products) return [];
if (!searchTerm || searchTerm.trim() === '') return products;
const term = searchTerm.toLowerCase().trim();
return products.filter(product =>
product.title.toLowerCase().includes(term) ||
product.description.toLowerCase().includes(term)
);
};
/**
* Sort products by price
* @param {Array} products - Array of product objects
* @param {string} order - 'asc' for ascending, 'desc' for descending
* @returns {Array} - Sorted array of products
*/
export const sortByPrice = (products, order = 'asc') => {
if (!products) return [];
return [...products].sort((a, b) => {
return order === 'asc' ? a.price - b.price : b.price - a.price;
});
};
/**
* Get product by ID
* @param {Array} products - Array of product objects
* @param {number} id - Product ID to find
* @returns {Object|undefined} - Product object or undefined if not found
*/
export const getProductById = (products, id) => {
if (!products) return undefined;
return products.find(product => product.id === id);
};
/**
* Format price as currency string
* @param {number} price - Price value
* @returns {string} - Formatted price string
*/
export const formatPrice = (price) => {
return ```{parseFloat(price).toFixed(2)}`;
};
/**
* Calculate discount price
* @param {number} price - Original price
* @param {number} discountPercent - Discount percentage (e.g., 20 for 20%)
* @returns {number} - Discounted price
*/
export const calculateDiscount = (price, discountPercent) => {
return price - (price * (discountPercent / 100));
};
/**
* Validate product object structure
* @param {Object} product - Product object to validate
* @returns {boolean} - True if valid, false otherwise
*/
export const isValidProduct = (product) => {
return (
product &&
typeof product.id !== 'undefined' &&
typeof product.title === 'string' &&
typeof product.price === 'number' &&
typeof product.category === 'string' &&
typeof product.image === 'string'
);
};
// ============================================================================
// EXPORTS
// ============================================================================
export default {
MOCK_PRODUCTS,
CATEGORIES,
getCategories,
filterByCategory,
searchProducts,
sortByPrice,
getProductById,
formatPrice,
calculateDiscount,
isValidProduct
};