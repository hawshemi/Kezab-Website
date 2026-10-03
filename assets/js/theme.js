const root = document.documentElement
const systemTheme = matchMedia('(prefers-color-scheme: dark)')
let theme = localStorage.getItem('color-theme') || 'system'

function applyTheme() {
  root.dataset.theme = theme
  root.classList.toggle('dark', theme === 'dark' || theme === 'system' && systemTheme.matches)
}

applyTheme()
systemTheme.addEventListener('change', applyTheme)

document.addEventListener('DOMContentLoaded', () => {
  const settings = document.querySelectorAll('.settings')
  settings.forEach(disclosure => {
    const panel = disclosure.querySelector('.settings-panel')
    panel.inert = !disclosure.open
    disclosure.addEventListener('toggle', () => {
      panel.inert = !disclosure.open
      if (disclosure.open) settings.forEach(other => {
        if (other !== disclosure) other.open = false
      })
    })
  })
  document.querySelectorAll('[name="color-theme"]').forEach(input => {
    input.checked = input.value === theme
    input.addEventListener('change', () => {
      theme = input.value
      localStorage.setItem('color-theme', theme)
      applyTheme()
    })
  })
  document.addEventListener('click', event => {
    settings.forEach(disclosure => {
      if (!disclosure.contains(event.target)) disclosure.open = false
    })
  })
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape') settings.forEach(disclosure => {
      if (disclosure.open) {
        disclosure.open = false
        disclosure.querySelector('summary').focus()
      }
    })
  })
})
