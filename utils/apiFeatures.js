class APIFeatures {
  constructor(query, queryString) {
    this.query = query
    this.queryString = queryString
  }

  filter() {
    // -----Filtering Query-----
    const queryObj = { ...this.queryString }
    const excludeFields = ["page", "sort", "limit", "fields"]
    excludeFields.forEach(el => delete queryObj[el])

    let queryStr = JSON.stringify(queryObj)
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, match => `$${match}`)
    this.query = this.query.find(JSON.parse(queryStr))
    return this
  }

  // advance() {
  //   const queryObj = { ...this.query }
  //   console.log("queryObj: ", queryObj)
  // }

  sort() {
    // -----Sorting Method-----
    if(this.queryString.sort) {
      this.query = this.query.sort(this.queryString.sort)
    }
    return this
  }

  pagination() {
    // -----PAGINATION FUNCTION-----
    const page = this.queryString.page * 1 || 1
    const limit = this.queryString.limit * 1 || 10
    const skip = (page - 1) * limit

    this.query = this.query.skip(skip).limit(limit)

    return this
  }

}

module.exports = APIFeatures
