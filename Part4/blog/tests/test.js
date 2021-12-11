const dummy = require('../utils/list_helper').dummy
const totalLikes = require('../utils/list_helper').totalLikes
const favouriteBlog = require('../utils/list_helper').favouriteBlog
const mostBlogs = require('../utils/list_helper').mostBlogs
const mostLikes = require('../utils/list_helper').mostLikes

const blogs = [
    {
      _id: "5a422a851b54a676234d17f7",
      title: "React patterns",
      author: "Michael Chan",
      url: "https://reactpatterns.com/",
      likes: 7,
      __v: 0
    },
    {
      _id: "5a422aa71b54a676234d17f8",
      title: "Go To Statement Considered Harmful",
      author: "Edsger W. Dijkstra",
      url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
      likes: 5,
      __v: 0
    },
    {
      _id: "5a422b3a1b54a676234d17f9",
      title: "Canonical string reduction",
      author: "Edsger W. Dijkstra",
      url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
      likes: 12,
      __v: 0
    },
    {
      _id: "5a422b891b54a676234d17fa",
      title: "First class tests",
      author: "Robert C. Martin",
      url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
      likes: 10,
      __v: 0
    },
    {
      _id: "5a422ba71b54a676234d17fb",
      title: "TDD harms architecture",
      author: "Robert C. Martin",
      url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
      likes: 0,
      __v: 0
    },
    {
      _id: "5a422bc61b54a676234d17fc",
      title: "Type wars",
      author: "Robert C. Martin",
      url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
      likes: 2,
      __v: 0
    }  
]

describe('dummy', () => {

    test('dummy returns one', () => {
        const blogs = []
      
        const result = dummy(blogs)
        expect(result).toBe(1)
      })
})

describe('totalLikes', () => {

    let total = 0
    blogs.forEach(function(v) {
        total = total + v.likes
    })
    
    test('result', () => {
        const result = totalLikes(blogs)
        expect(result).toBe(total)
      })
})

describe('favouriteBlog', () => {

    const res = blogs.reduce(function(prev, current) {
        return (prev.likes > current.likes) ? prev : current
    })

    test('blogs likes', () => {
        const result = favouriteBlog(blogs).likes
        expect(result).toBe(res.likes)
      })
})

describe('mostBlogs', () => {

    let authors = blogs.map(function (el) { return el.author })

    const mostFrequent = arr =>
        Object.entries(
            arr.reduce((a, v) => {
                a[v] = a[v] ? a[v] + 1 : 1;
                return a;
        }, {})
        ).reduce((a, v) => (v[1] >= a[1] ? v : a), [null, 0])[0];
    
    const expected = {
        author: mostFrequent(authors),
        blogs: authors.reduce((a, v) => (v === mostFrequent(authors) ? a + 1 : a), 0)
    }
    
    test('author', () => {
        const result = mostBlogs(blogs).author
        expect(result).toBe(expected.author)
    })


    test('blogs', () => {
        const result = mostBlogs(blogs).blogs
        expect(result).toBe(expected.blogs)
    })

})

describe('mostLikes', () => {
    res = {}

    blogs.map((blog) => {
        res[blog.author] = (res[blog.author] || 0) + blog.likes
    })

    const mostLikesAuthor = Object.keys(res).reduce((a, b) => res[a] > res[b] ? a : b)

    console.log(res[mostLikesAuthor])
    console.log(mostLikesAuthor)

    test('author', () => {
        const result = mostLikes(blogs).author
        expect(result).toBe(mostLikesAuthor)
    })

    test('likes', () => {
        const result = mostLikes(blogs).likes
        expect(result).toBe(res[mostLikesAuthor])
  
    })
})