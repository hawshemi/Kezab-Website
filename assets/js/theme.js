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
  const settings = document.querySelector('.settings')
  document.querySelectorAll('[name="color-theme"]').forEach(input => {
    input.checked = input.value === theme
    input.addEventListener('change', () => {
      theme = input.value
      localStorage.setItem('color-theme', theme)
      applyTheme()
    })
  })
  document.addEventListener('click', event => {
    if (!settings.contains(event.target)) settings.open = false
  })
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && settings.open) {
      settings.open = false
      settings.querySelector('summary').focus()
    }
  })
})
