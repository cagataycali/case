/**
 * Class representing a Category.
 * @example
 * // Root category:
 * const electronic = new Category('Electronic')
 * // Inner category:
 * const telephone = new Category('Telephone', electronic, true)
 * // Inner - Leaf category:
 * const iOS = new Category('iOS', telephone, true)
 */
class Category {
  /**
   * Create a category.
   * @param {Category} parent - The category which the category belongs to.
   * @param {string} title - Category title.
   * @param {boolean} leaf - Category is leaf or not?
   */
  constructor (title, parent = null, leaf = false) {
    this.title = title
    this.parent = parent
    this.leaf = leaf
  }
}

export default Category
