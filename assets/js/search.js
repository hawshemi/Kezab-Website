const searchDialog = document.getElementById('site-search')
const searchInput = searchDialog.querySelector('input')
const searchResults = searchDialog.querySelector('.search-results')
const searchStatus = searchDialog.querySelector('.search-status')
let searchPages = []
let searchIndex

function renderSearch() {
  searchResults.replaceChildren()
  searchStatus.textContent = ''
  const query = searchInput.value.trim().toLowerCase()
  if (!query) return

  const words = query.split(/\s+/)
  for (const page of searchPages) {
    const text = `${page.title} ${page.content}`.toLowerCase()
    if (!words.every(word => text.includes(word))) continue
    const item = document.createElement('li')
    const link = document.createElement('a')
    link.className = 'search-result-link'
    link.href = page.url
    link.textContent = page.title
    item.append(link)
    searchResults.append(item)
  }

  if (!searchResults.childElementCount) {
    searchStatus.textContent = searchDialog.dataset.noResults
  }
}

function openSearch() {
  if (searchDialog.open) return
  searchDialog.showModal()
  searchInput.focus()
  searchIndex ??= fetch(searchDialog.dataset.searchIndex)
    .then(response => response.json())
    .then(pages => {
      searchPages = pages
      renderSearch()
    })
}

document.querySelector('[data-search-open]').addEventListener('click', openSearch)
searchInput.addEventListener('input', renderSearch)
searchDialog.addEventListener('keydown', event => {
  if (event.key === 'Escape') {
    event.preventDefault()
    searchDialog.close()
  }
})

document.addEventListener('keydown', event => {
  if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'k') {
    event.preventDefault()
    openSearch()
  }
})
