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
   * @param {String} title - Category title.
   * @param {Boolean} leaf - Category is leaf or not?
   */
  constructor (title, parent = null, leaf = false) {
    this.title = title
    this.parent = parent
    this.leaf = leaf
  }
}

export default Category
