export function dynamicImport (str) {
  if (window.URL.createObjectURL) {
    const blob = new window.Blob([str], { type: 'text/javascript' })
    const url = window.URL.createObjectURL(blob)
    const module = import(/* webpackIgnore: true */url)
    window.URL.revokeObjectURL(url)
    return module
  }
  
  const url = "data:text/javascript;base64," + btoa(str, "base64")
  return import(/* webpackIgnore: true */url)
}
