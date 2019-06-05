import helpers from '../helpers'

/**
 * Class representing a Category.
 * @example
 * // Root category:
 * const electronic = new Category('Electronic')
 * // Inner category:
 * const telephone = new Category('Telephone', electronic)
 * // Inner - Leaf category:
 * const iOS = new Category('iOS', telephone)
 */
class Category {
  /**
   * Create a category.
   * @param {Category} parent - The category which the category belongs to.
   * @param {String} title - Category title.
   * @param {Boolean} leaf - Category is leaf or not?
   */
  constructor (title, parent = null) {
    if (!helpers.isAcceptableString(title)) {
      throw new Error('Title is not in acceptable form.')
    }
    // TODO: check if parent exists, instanceof Category. Add tests to category.test.js
    this.title = title
    this.parent = parent
    this.leaf = !!parent
  }
}

export default Category
