# TrueScrollBar

TrueScrollBar - light weight cusotm scrollbar lib (min.css + min.js ~ **7kB**)

> The library does not remove the native scroll. She hides it.
> **Appearance is easy to customize with CSS**

![alt text](./assets/tsb-screen.png "Screen")

## Todo

1. Install
2. Use
3. Put a star on [GitHub](https://github.com/lugin-design/truescrollbar)

## Usage

```JavaScript
npm i @lugindev/truescrollbar
```

```JavaScript
import TrueScrollBar from '@lugindev/truescrollbar'
import '@lugindev/truescrollbar/TrueScrollBar.min.css'

const el = document.querySelector('.you-element')
new TrueScrollBar(el, {...options} // optional)
```

or use [jsdelivr](https://www.jsdelivr.com/package/npm/@lugindev/truescrollbar?path=src)

```HTML
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@lugindev/truescrollbar@1/src/TrueScrollBar.min.css">
<script src="https://cdn.jsdelivr.net/npm/@lugindev/truescrollbar@1/src/TrueScrollBar.min.js"></script>
```
```JavaScript
new TrueScrollBar(el, options)
```

## Options

```JavaScript
{
    // Render TrueScrollBar only desktop
    // I see no reason to replace scrollbar on mobile
    // {Boolean} default: false
    desktopOnly: false,

    // If true: scrollbar will take up space in the markup
    // Default scrollbar is position: absolute
    // {Boolean} default: false
    takeMarkup: false,

    // Enable reading right to left direction
    // {Boolean} default: false
    rtl: false
}
```