import { browserScrollBarWidth, deviceIsMac, deviceUseCursor } from '@lugindev/brohelper'
import './TrueScrollBar.sass'

const raf = window.requestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    window.mozRequestAnimationFrame ||
    window.msRequestAnimationFrame ||
    window.oRequestAnimationFrame ||
    function (callback) { window.setTimeout(callback, 1000 / 60) }

function debounce(f, ms) {
    let timer = null
    return function d(...args) {
        const onComplete = () => {
            f.apply(this, args)
            timer = null
        }

        timer && clearTimeout(timer)
        timer = setTimeout(onComplete, ms)
    }
}

export default class TrueScrollBar {
    /**
     * @param {HTMLElement} el - DOM element
     * @param {Object} options - options..
     * @param {Boolean} [options.takeMarkup=false] options.takeMarkup - true === don't position: absolute
     * @param {Boolean} [options.rtl=false] options.rtl - writing direction right to left
     * @param {Boolean} [options.desktopOnly=false] options.desktopOnly - render only desctop device
     */
    constructor(el, options = {}) {
        const {
            desktopOnly = false,
            takeMarkup = false,
            rtl = false
        } = options

        this.el = el
        this.isBody = this.el === document.body

        this.desktopOnly = desktopOnly
        this.takeMarkup = takeMarkup
        this.rtl = rtl

        /** @type {Number} */
        this.scrollBarWidthDefault = 20
        this.lastScrollTop = -1
        this.rafSetCount = 0

        this.isMac = deviceIsMac()
        this.isCursorDevice = deviceUseCursor()
        this.scrollBarWidth = browserScrollBarWidth()

        this.desktopOnly
            ? (this.scrollBarWidth > 0 || this.isMac && this.isCursorDevice) && this.init()
            : this.init()
    }

    init() {
        this.el.classList.length
            ? this.el.classList.add('tsb-target')
            : this.el.setAttribute('class', 'tsb-target')
        this.takeMarkup && this.el.classList.add('tsb-takemarkup')
        this.isBody && ['height', 'maxHeight'].forEach(el => {
            this.el.style[el] = '100vh'
        })

        this.createWrap()
        this.createInner()
        this.createCont()
        this.createScrollBar()

        while (this.el.firstChild) {
            this.cont.appendChild(this.el.firstChild)
        }

        this.inner.appendChild(this.cont)
        this.wrap.appendChild(this.inner)
        this.el.appendChild(this.wrap)
        this.el.appendChild(this.scroll)

        this.scrolled()
        this.dragDealer()
        this.resize()
    }

    createWrap() {
        this.wrap = document.createElement('div')
        this.wrap.setAttribute('class', 'tsb-wrap')
        this.takeMarkup && this.wrap.classList.add('tsb-takemarkup')
    }

    createInner() {
        this.inner = document.createElement('div')
        this.inner.setAttribute('class', 'tsb-inner')
        this.inner.style.marginRight = `-${this.scrollBarWidth ? this.scrollBarWidth : this.scrollBarWidthDefault}px`
    }

    createCont() {
        this.cont = document.createElement('div')
        this.cont.setAttribute('class', 'tsb-cont')
        this.cont.style.marginRight = `${this.scrollBarWidth ? 0 : this.scrollBarWidth}px`
    }

    createScrollBar() {
        this.scroll = document.createElement('div')
        this.scroll.setAttribute('class', 'tsb-scroll')
        this.takeMarkup
            ? (this.scroll.style.order = this.rtl ? 0 : 2) && this.scroll.classList.add('tsb-takemarkup')
            : this.scroll.style[this.rtl ? 'left' : 'right'] = '0px'

        this.scrollBg = document.createElement('div')
        this.scrollBg.setAttribute('class', 'tsb-scroll__bg')

        this.bar = document.createElement('div')
        this.bar.setAttribute('class', 'tsb-scroll__bar')

        this.scrollBg.appendChild(this.bar)
        this.scroll.appendChild(this.scrollBg)
    }

    setBarPosition() {
        this.scrollHeight = this.inner.scrollHeight
        this.clientHeight = this.inner.clientHeight
        this.scrollRatio = this.clientHeight / this.scrollHeight
        this.scrollTop = this.inner.scrollTop

        if (this.scrollRatio >= 1) {
            this.scroll.classList.add('tsb-scroll--hidden')
            this.el.classList.add('tsb-hidden')
        } else {
            this.scroll.classList.remove('tsb-scroll--hidden')
            this.el.classList.remove('tsb-hidden')
            this.bar.style.height = Math.max(this.scrollRatio * 100, 10) + '%'
            this.bar.style.top = (this.scrollTop / this.scrollHeight) * 100 + '%'
        }
    }

    scrolled() {
        const scroll = () => {
            if (this.lastScrollTop === this.inner.scrollTop) {
                if (this.rafSetCount < 60) {
                    this.setBarPosition()
                    this.rafSetCount++
                }
                raf(scroll)
                return false
            } else this.lastScrollTop = this.inner.scrollTop

            this.setBarPosition()

            raf(scroll)
        }

        scroll()
    }

    resize() {
        const f = debounce(() => { this.setBarPosition() }, 100)
        window.addEventListener('resize', f)
    }

    dragDealer() {
        this.bar.addEventListener('mousedown', e => {
            this.lastPageY = e.pageY
            this.el.classList.add('tsb-drag')

            document.addEventListener('mousemove', drag)
            document.addEventListener('mouseup', stop)

            return false
        })

        const drag = e => {
            const delta = e.pageY - this.lastPageY
            this.lastPageY = e.pageY

            raf(() => { this.inner.scrollTop += delta / this.scrollRatio })
        }

        const stop = () => {
            this.el.classList.remove('tsb-drag')
            document.removeEventListener('mousemove', drag)
            document.removeEventListener('mouseup', stop)
        }
    }
}