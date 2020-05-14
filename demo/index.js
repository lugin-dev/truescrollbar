import TrueScrollBar from '../src/TrueScrollBar'

document.querySelectorAll('.scroll').forEach(el => {
    new TrueScrollBar(el)
})
new TrueScrollBar(document.body, {
    takeMarkup: true,
    // rtl: true
})