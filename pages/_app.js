import { useState, useEffect, useLayoutEffect, useRef } from 'react'
import { useRouter } from 'next/router'
import Lenis from 'lenis'
import 'lenis/dist/lenis.css'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Head from 'next/head'
import '../styles/globals.css'
import Nav from '../components/Nav'

gsap.registerPlugin(ScrollTrigger)

export default function App({ Component, pageProps }) {
  const [dark, setDark] = useState(false)
  const router = useRouter()

  const navColor = ['/about', '/playground'].includes(router.pathname) ? '#d9d9d9' : undefined
  // These case-study pages have full-bleed video heroes behind the nav, so the
  // nav blends with the video (dark over light frames, light over dark).
  const navBlend = ['/work/contexto', '/work/curated', '/work/tidal'].includes(router.pathname)

  useEffect(() => {
    document.documentElement.dataset.theme = dark ? 'dark' : 'light'
  }, [dark])

  const lenisRef = useRef(null)

  useEffect(() => {
    const lenis = new Lenis()
    lenisRef.current = lenis
    lenis.on('scroll', ScrollTrigger.update)
    function raf(time) { lenis.raf(time * 1000) }
    gsap.ticker.add(raf)
    gsap.ticker.lagSmoothing(0)
    return () => { gsap.ticker.remove(raf); lenis.destroy() }
  }, [])

  useLayoutEffect(() => {
    document.documentElement.scrollTop = 0
    document.body.scrollTop = 0
    const l = lenisRef.current
    if (l) {
      l.animatedScroll = 0
      l.targetScroll = 0
    }
  }, [router.pathname])

  return (
    <>
      <Head>
        <title>MatteBrown Design</title>
      </Head>
      <Nav dark={dark} onToggleDark={() => setDark(d => !d)} navColor={navColor} navBlend={navBlend} />
      <Component {...pageProps} dark={dark} />
    </>
  )
}
