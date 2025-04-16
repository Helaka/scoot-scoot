export function ThemeScript() {
  const themeScript = `
    (function() {
      try {
        const storedTheme = localStorage.getItem('theme')
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
        const theme = storedTheme || (prefersDark ? 'dark' : 'light')
        
        if (theme === 'dark') {
          document.documentElement.classList.add('dark')
        } else {
          document.documentElement.classList.remove('dark')
        }
      } catch (e) {
        console.error('Theme initialization failed:', e)
      }
    })()
  `

  return <script dangerouslySetInnerHTML={{ __html: themeScript }} />
}
