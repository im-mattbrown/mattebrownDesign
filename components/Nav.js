import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/router'
import { gsap } from 'gsap'
import s from '../styles/Home.module.css'
import Link from 'next/link'

const LOGO = '/images/logos/m@Logo.svg'
const ARROW = '/images/arrowUpRight.svg'

const ALL_LINKS = [
  { label: 'ABOUT',      href: '/about',      shape: '/images/shape1.svg' },
  { label: 'WORK',       href: '/work',        shape: '/images/shape2.svg' },
  { label: 'CONTACT',    href: '/contact',     shape: '/images/shape1.svg' },
  { label: 'PLAYGROUND', href: '/playground',  shape: '/images/shape2.svg' },
]

const HOME_LINK = { label: 'HOME', href: '/', shape: '/images/shape1.svg' }

const ALL_HREFS = ['/', ...ALL_LINKS.map(l => l.href)]

function StartBtn({ color, arrowStyle }) {
  return (
    <button className={s.btn} style={color ? { color, borderColor: color } : {}}>
      START A PROJECT
      <img src={ARROW} alt="" className={s.btnArrow} style={arrowStyle} />
    </button>
  )
}

export default function Nav({ dark, onToggleDark, navColor }) {
  const [menuOpen, setMenuOpen] = useState(false)
  const menuRef = useRef(null)
  const stripeTlRef = useRef(null)  // stripe-only timeline — built once, never rebuilt
  const maxDelayRef = useRef(0)
  const router = useRouter()

  const textStyle = navColor ? { color: navColor } : {}
  const imgFilter = navColor
    ? { filter: 'brightness(0) invert(1) brightness(0.851)' }
    : {}

  const isHome = router.pathname === '/'
  const menuLinks = isHome
    ? ALL_LINKS
    : [HOME_LINK, ...ALL_LINKS.filter(l => l.href !== router.pathname)]

  useEffect(() => {
    ALL_HREFS.forEach(href => router.prefetch(href))
  }, [])

  // Build the stripe timeline once — stripes never change between routes
  useEffect(() => {
    const el = menuRef.current
    if (!el) return
    const stripes = Array.from(el.querySelectorAll('[data-stripe]'))
    const delays = stripes.map(() => Math.random() * 0.45)
    maxDelayRef.current = Math.max(...delays)
    const tl = gsap.timeline({ paused: true })
    stripes.forEach((stripe, i) => {
      tl.fromTo(stripe, { y: '-100%' }, { y: '0%', duration: 0.6, ease: 'power3.inOut' }, delays[i])
    })
    stripeTlRef.current = tl
    return () => tl.kill()
  }, [])

  // When the route changes, reset every current link element to its hidden start state.
  // This handles newly created DOM nodes (e.g. HOME) that GSAP has never touched.
  // Does NOT touch the stripe timeline so the close animation is unaffected.
  useEffect(() => {
    const links = menuRef.current?.querySelectorAll('[data-menu-link]')
    if (links?.length) gsap.set(links, { opacity: 0, y: 60 })
  }, [router.pathname])

  // Open: play stripes + animate current links from fresh query
  // Close: reverse stripes + quickly fade links out
  useEffect(() => {
    const links = Array.from(menuRef.current?.querySelectorAll('[data-menu-link]') ?? [])
    if (menuOpen) {
      stripeTlRef.current?.play()
      if (links.length) {
        gsap.killTweensOf(links)
        gsap.fromTo(
          links,
          { y: 60, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.5, ease: 'power2.out', stagger: 0.08, delay: maxDelayRef.current + 0.65 }
        )
      }
    } else {
      stripeTlRef.current?.reverse()
      if (links.length) {
        gsap.killTweensOf(links)
        gsap.to(links, { opacity: 0, y: 60, duration: 0.25, ease: 'power2.in' })
      }
    }
  }, [menuOpen])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  function handleNavClick(e, href) {
    e.preventDefault()
    router.push(href)
    setMenuOpen(false)
  }

  return (
    <>
      <nav data-anim="nav" className={s.nav} style={menuOpen ? { position: 'relative', zIndex: 1001 } : {}}>
        <Link href="/">
          <img
            src={LOGO} alt="Matte Brown" className={s.logo}
            style={{ ...(menuOpen ? { opacity: 0, pointerEvents: 'none' } : {}), ...imgFilter }}
          />
        </Link>
        <button
          className={`${s.darkToggle} ${s.navDarkToggle}`} onClick={onToggleDark}
          style={{ ...(menuOpen ? { opacity: 0, pointerEvents: 'none' } : {}), ...textStyle }}
        >
          {dark ? '[ LIGHT ]' : '[ DARK ]'}
        </button>
        <button
          className={s.darkToggle} onClick={() => setMenuOpen(o => !o)}
          style={menuOpen && navColor ? { color: dark ? '#d9d9d9' : '#0e0e0e' } : textStyle}
        >
          {menuOpen ? '[ CLOSE ]' : '[ MENU ]'}
        </button>
        <div className={s.navStartBtn} style={menuOpen ? { opacity: 0, pointerEvents: 'none' } : {}}>
          <StartBtn color={navColor} arrowStyle={imgFilter} />
        </div>
      </nav>

      <div
        ref={menuRef}
        className={s.menuOverlay}
        style={{ pointerEvents: menuOpen ? 'all' : 'none' }}
      >
        <div className={s.menuStripes}>
          {Array.from({ length: 20 }).map((_, i) => (
            <div key={i} data-stripe className={s.menuStripe} />
          ))}
        </div>
        <div className={s.menuContent}>
          <nav className={s.menuLinks}>
            {menuLinks.map(({ label, href, shape }) => (
              <a
                key={label}
                data-menu-link
                href={href}
                className={s.menuLink}
                onClick={(e) => handleNavClick(e, href)}
              >
                {label}
                <img src={shape} alt="" aria-hidden="true" className={s.menuLinkShape} />
              </a>
            ))}
          </nav>
          <div
            className={s.menuMobileActions}
            style={{ opacity: menuOpen ? 1 : 0, transition: 'opacity 0.3s ease' }}
          >
            <button className={s.darkToggle} onClick={onToggleDark}>
              {dark ? '[ LIGHT ]' : '[ DARK ]'}
            </button>
            <StartBtn />
          </div>
        </div>
      </div>
    </>
  )
}
