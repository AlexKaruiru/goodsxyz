import productsData from './products.json'

/**
 * Fetch all products
 * @returns {Promise<Array>} Array of products
 */
export const getAllProducts = async () => {
  try {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 100))
    return productsData
  } catch (error) {
    console.error('Error fetching products:', error)
    throw error
  }
}

/**
 * Convert product name to URL-friendly slug
 * @param {string} name - Product name
 * @returns {string} URL-friendly slug
 */
const slugify = (name) => {
  return name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')
}

/**
 * Fetch a single product by ID
 * @param {string} productId - The product ID
 * @returns {Promise<Object|null>} Product object or null if not found
 */
export const getProductById = async (productId) => {
  try {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 100))
    const product = productsData.find(p => p.id === productId)
    return product || null
  } catch (error) {
    console.error('Error fetching product:', error)
    throw error
  }
}

/**
 * Fetch a single product by name (slug)
 * @param {string} productName - The product name (slugified)
 * @returns {Promise<Object|null>} Product object or null if not found
 */
export const getProductByName = async (productName) => {
  try {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 100))
    const product = productsData.find(p => slugify(p.name) === productName)
    return product || null
  } catch (error) {
    console.error('Error fetching product by name:', error)
    throw error
  }
}

/**
 * Get product slug from product object
 * @param {Object} product - Product object
 * @returns {string} URL-friendly slug
 */
export const getProductSlug = (product) => {
  return slugify(product.name)
}

/**
 * Search products by name
 * @param {string} query - Search query
 * @returns {Promise<Array>} Array of matching products
 */
export const searchProducts = async (query) => {
  try {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 100))
    if (!query || query.trim() === '') {
      return productsData
    }
    const lowerQuery = query.toLowerCase()
    return productsData.filter(product =>
      product.name.toLowerCase().includes(lowerQuery) ||
      product.description.toLowerCase().includes(lowerQuery)
    )
  } catch (error) {
    console.error('Error searching products:', error)
    throw error
  }
}

