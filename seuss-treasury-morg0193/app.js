// Router local components
const Books = {
    data: function () {
      return {
        books: []
      }
    },
    created: function () {
      fetch('https://seussology.info/api/books')
        .then(response => response.json())
        .then(books => { this.books = books })
    },
    template: `
    <header class="container-fluid row bg-dark py-5 m-0">
      <div class="row">
        <div class="col">
          <h1 class="display-2 text-center text-light">Books</h1>
        </div>
      </div>
    </header>
    <section class="container py-5">
      <article class="row">
        <div class="col-3 mb-3" v-for="book in books">
          <router-link :to="'/book/' + book.id"><img :src="book.image" alt="book.title"></router-link>
        </div>
      </article>
    </section>
    `
  }
  
  const Quotes = {
    data: function () {
      return {
        quotes: []
      }
    },
    created: function () {
      fetch('https://seussology.info/api/quotes/random/10')
        .then(response => response.json())
        .then(quotes => { this.quotes = quotes })
    },
    template: `
    <header class="container-fluid row bg-dark py-5 m-0">
      <div class="row">
        <div class="col">
          <h1 class="display-2 text-center text-light">Quotes</h1>
        </div>
      </div>
    </header>
    <section class="container py-5">
      <article class="row">
        <div class="col-6" v-for="quote in quotes">
          <div class="card mb-3">
            <div class="card-body">
              <blockquote class="blockquote">
                <p class="mb-4">{{ quote.text }}</p>
                <footer class="blockquote-footer">Dr. Seuss in <cite title="Source Title">{{ quote.title }}</cite></footer>
              </blockquote>
            </div>
          </div>
        </div>
      </article>
    </section>
    `
  }
  
  const Book = {
    props: ['id'],
    data: function () {
      return {
        book: {}
      }
    },
    created: function () {
      fetch('https://seussology.info/api/books/' + this.id)
        .then(response => response.json())
        .then(book => { this.book = book })
    },
    template: `
    <header class="container-fluid row bg-dark py-5 m-0">
      <div class="row">
        <div class="col">
          <h1 class="display-2 text-center text-light">Seuss Treasury</h1>
        </div>
      </div>
    </header>
    <section class="container py-5">
      <article class="row">
        <div class="col-4">
          <img :src="book.image" alt="book.title">
        </div>
        <div class="col-8">
          <h1 class="display-3 mb-3">{{ book.title }}</h1>
          <h6 class="mb-4"><em>Published: {{ book.year_published }}</em></h6>
          <p class="lead">{{ book.description }}</p>
        </div>
      </article>
    </section>
    `
  }
  
  // Routes
  const routes = [
    { path: '/', component: Books },
    { path: '/quotes', component: Quotes },
    { path: '/book/:id', component: Book, props: true }
  ]
  
  // Create Router
  const router = VueRouter.createRouter({
    history: VueRouter.createWebHashHistory(),
    routes: routes
  })
  
  const app = Vue.createApp({})
  
  app.use(router)
  
  const vm = app.mount('#app')
  