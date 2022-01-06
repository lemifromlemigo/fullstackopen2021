const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)


test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('there are two blogs', async () => {
    const response = await api.get('/api/blogs')

    expect(response.body).toHaveLength(2)
})

test('blogs have ids', async () => {
  const response = await api.get('/api/blogs')
  console.log(response.body)

  response.body.map((res) => {
    expect(res.id).toBeDefined()
  })
})

test('blog post', async () => {

  const content = {
    title: "TEST",
    author: "TESTER",
    url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
    likes: 2,
  }

  const response_before = await api.get('/api/blogs')
  await api.post('/api/blogs')
  .send(content)
  const response_after = await api.get('/api/blogs')

  expect(response_after.body.length).toBe(response_before.body.length + 1)
  
})

test('likes default 0', async () => {

  const content = {
    title: "TEST",
    author: "TESTER",
    url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html"
  }

  await api.post('/api/blogs')
  .send(content)
  .then(res => {
    api.get(`/api/blogs/${res.body.id}`)
    .then((res) => {
      expect(res.body.likes).toBe(0)
    })

})})

test('empty content response 400', ( () => {

  const content = {
    author: "TESTER",
    likes: 12
  }
  
  api.post('/api/blogs')
  .send(content)
  .then(res => {
    expect(res.status).toBe(400)
  })
}))

test('remove blog', ( () => {
  
  const content = {
    title: "TEST",
    author: "TESTER",
    url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
    likes: 2
  }
  api.post('/api/blogs')
  .send(content)
  .then(res => api.delete({'id' : res.body.id}))
  .then(res => {
    expect(res.status).toBe(204)
  })

}))

test('edit blog', ( () => {
  
  const content = {
    title: "TEST",
    author: "TESTER",
    url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
    likes: 2
  }
  api.post('/api/blogs')
  .send(content)
  .then(res => {
    api.put({'id' : res.body.id})
      .set('title', 'test1223')
  })
  .then(res => {
    api.get('/api/blogs')
      .then((res) => {
        expect(res.body.title).toBe('test1223')
      })
  })

}))


afterAll(() => {
  mongoose.connection.close()
})