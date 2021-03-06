// nav style
const currentPage = location.pathname
const menuItems = document.querySelectorAll('header .links a')
const div = document.createElement('div')
div.className = 'page'

for (let item of menuItems) {
  if (currentPage.includes(item.getAttribute('href'))) {
    item.appendChild(div)
  }
}

// clickable cards based on routes
const cards = document.querySelectorAll(".card")
const view = document.querySelectorAll('.card-admin')

if (currentPage.includes('/recipes')) {
  for (let card of view) {
    card.addEventListener("click", (e) => {
      const cardId = card.getAttribute('id')

      window.location.href = `${currentPage}/${cardId}`
    });
  }
}
else if (currentPage.includes('/admin/chefs')) {
  for (let card of view) {
    card.addEventListener("click", (e) => {
      const cardId = card.getAttribute('id')

      if (currentPage == `/admin/chefs`) {
        window.location.href = `${currentPage}/${cardId}`
      }
      else if (currentPage == `/admin/chefs/${cardId}`) {
        window.location.href = `/recipes/${cardId}`
      }

    });
  }
}
else if (currentPage.includes('/home')) {
  for (let card of view) {
    card.addEventListener("click", (e) => {
      const cardId = card.getAttribute('id')

      window.location.href = `recipes/${cardId}`
    });
  }
}

// form delete confirmation box
if (currentPage.includes('/edit')) {
  const formDelete = document.querySelector('#form-delete')
  const modal = document.querySelector('#modal')
  const popup = modal.querySelector('input[name=popup')

  formDelete.addEventListener('submit', e => {
    if (popup.value !== null) {
      const close = modal.querySelector('#ok')

      modal.style.display = 'grid'
      close.addEventListener('click', e => {
        modal.style.display = 'none'
      })
    } else {
      const confirmation = confirm('Are you sure you want to delete')

      if (!confirmation) {
        event.preventDefault()  
      }
    }
  })
}

function paginate(selectedPage, totalPages) {
  let pages = [],
    oldPage

  for (let actualPage = 1; actualPage <= totalPages; actualPage++) {
    const firstAndLastPage = actualPage == 1 || actualPage == totalPages
    const pagesBeforeLastPage = actualPage >= selectedPage - 2
    const pagesAfterLastPage = actualPage <= selectedPage + 2

    if (firstAndLastPage || pagesBeforeLastPage && pagesAfterLastPage) {
      if (oldPage && actualPage - oldPage > 2) {
        pages.push('...')
      }
      if (oldPage && actualPage - oldPage == 2) {
        pages.push(oldPage + 1)
      }

      pages.push(actualPage)
      oldPage = actualPage
    }
  }

  return pages
}

function createPagination(pagination) {
  const presentPage = +pagination.dataset.page
  const total = +pagination.dataset.total
  const pages = paginate(presentPage, total)

  let elements = ''

  for (let page of pages) {
    const half = Math.floor(pages.length / 5)
    const middlePage = pages[half]
    // temporario, não middle page e sim o page
    // troca o let page pra outro nome e usa o page do const page pra pegar a page atual

    if (page == presentPage) {
      elements += `<a class="middle-page">${page}</a>`
    } else {
      elements += `<a href="?page=${page}">${page}</a>`
    }
  }

  pagination.innerHTML = elements
}

const pagination = document.querySelector('.pagination')

if (pagination) {
  createPagination(pagination)
}

