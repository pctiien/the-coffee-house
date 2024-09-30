class QueryHelper {
    constructor(query,queryString)
    {
        this.query = query
        this.queryString = queryString
    }

    filter(){
        const queryObj = {...this.queryString}
        const excludedFields = ["page", "sort", "limit"]
        excludedFields.forEach(field => delete queryObj[field])

        let queryStr = JSON.stringify(queryObj)
        queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`)
        this.query = this.query.find(JSON.parse(queryStr))
        return this
    }

    sort(){
        if(this.queryString.sort)
        {
            const sortBy = this.queryString.sort.split(',').join(' ')
            this.query = this.query.sort(sortBy)
        }else{
            this.query = this.query.sort('-createdAt')
        }
        return this
    }
    limit(){

        const limitVal = this.queryString.limit * 1 || 10
        this.query = this.query.limit(limitVal)

        return this
    }
    paginate(){

        const page = this.queryString.page * 1 || 1
        const limit = this.queryString.limit * 1 || 10
        const skip = (page-1)*limit

        this.query = this.query.skip(skip).limit(limit)

        return this
    }
    executeQuery(){
        this.filter().sort().limit().paginate()
        return this 
    }
}

module.exports = QueryHelper