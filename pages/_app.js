import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Lenis from 'lenis'
import 'lenis/dist/lenis.css'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import '../styles/globals.css'
import Nav from '../components/Nav'

gsap.registerPlugin(ScrollTrigger)

export default function App({ Component, pageProps }) {
  const [dark, setDark] = useState(false)
  const router = useRouter()

  const navColor = router.pathname === '/about' ? '#d9d9d9' : undefined

  useEffect(() => {
    document.documentElement.dataset.theme = dark ? 'dark' : 'light'
  }, [dark])

  useEffect(() => {
    const lenis = new Lenis()
    lenis.on('scroll', ScrollTrigger.update)
    function raf(time) { lenis.raf(time * 1000) }
    gsap.ticker.add(raf)
    gsap.ticker.lagSmoothing(0)
    return () => { gsap.ticker.remove(raf); lenis.destroy() }
  }, [])

  return (
    <>
      <Nav dark={dark} onToggleDark={() => setDark(d => !d)} navColor={navColor} />
      <Component {...pageProps} dark={dark} />
    </>
  )
}
