const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
    let total = 0
    blogs.forEach(function(v) {
        total = total + v.likes
    })

    return total
}

const favouriteBlog = (blogs) => {
    return blogs.reduce(function(prev, current) {
        return (prev.likes > current.likes) ? prev : current
    })
}

const mostBlogs = (blogs) => {

    let authors = blogs.map(function (el) { return el.author })

    const mostFrequent = arr =>
        Object.entries(
            arr.reduce((a, v) => {
                a[v] = a[v] ? a[v] + 1 : 1;
                return a;
        }, {})
        ).reduce((a, v) => (v[1] >= a[1] ? v : a), [null, 0])[0];
    
    return {
        author: mostFrequent(authors),
        blogs: authors.reduce((a, v) => (v === mostFrequent(authors) ? a + 1 : a), 0)
    }
}

const mostLikes = (blogs) => {
    res = {}

    blogs.map((blog) => {
        res[blog.author] = (res[blog.author] || 0) + blog.likes
    })

    const author = Object.keys(res).reduce((a, b) => res[a] > res[b] ? a : b)

    return { 
        author: author,
        likes: res[author]
    }
}
  
module.exports = {
    dummy,
    totalLikes,
    favouriteBlog,
    mostBlogs,
    mostLikes
}