import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/router'
import { gsap } from 'gsap'
import Head from 'next/head'
import s from '../../styles/Home.module.css'
import w from '../../styles/Work.module.css'

const ARROW = '/images/arrowUpRight.svg'
const BULLET = '/images/shape1.svg'

const PROJECTS = [
  {
    num: '01',
    name: "THAT'S ON ME",
    type: 'WEB / MOBILE APP',
    year: '[2026]',
    slug: 'thatsonme',
    cells: [{ video: 'https://matte-cdn.b-cdn.net/THATSONMEDESIGN.mp4', hero: true }, '/images/thatsonmeScreens.jpg', 'desc'],
    rowClass: 'row1',
    info: {
      description: "VIRTUAL CLOTHES TRYON APP USING GOOGLE'S NANOBANANA IMAGE GENERATION MODEL TO MIX IMAGES OF USERS AND ITEMS OF CLOTHING. USERS GET AN IDEA OF WHAT CLOTHES WILL LOOK LIKE ON THEM AND BUSINESSES WILL HAVE LESS CARTS GO EMPTY. DESIGNED IN FIGMA BUILT WITH CLAUDE CODE",
      tools: ['FIGMA', 'CLAUDE CODE', 'GOOGLE GEMINI', 'NEXT.JS'],
    },
  },
  {
    num: '02',
    name: 'SHRTCTS',
    type: 'WEB APP',
    year: '[2026]',
    slug: 'shrtcts',
    cells: ['desc', { video: 'https://matte-cdn.b-cdn.net/shrtctsDesign.mp4', hero: true }, { logo: '/images/logos/shrtctsLogoMark.svg' }],
    rowClass: 'row2',
    info: {
      description: 'SHRTCTS.IO IS A TOOL FOR BUILDERS THAT WANT TO INCREASE THEIR PRODUCTIVITY USING APPS SUCH AS FIGMA, MIRO AND VSCODE BY TRAINING TO LEARN KEYBOARD SHORTCUTS TO BECOME POWER USERS WITH THE KNOWLEDGE TO WORK FASTER AND SMARTER.',
      tools: ['FIGMA', 'CLAUDE CODE', 'NEXT.JS', 'ADOBE'],
    },
  },
  {
    num: '03',
    name: 'CURL',
    type: 'WEB APP',
    year: '[2026]',
    slug: 'curl',
    cells: [{ video: 'https://matte-cdn.b-cdn.net/curlSign.mp4' }, 'desc', { video: 'https://matte-cdn.b-cdn.net/curlDesignVideo.mp4', hero: true }],
    rowClass: 'row3',
    info: {
      description: 'CURL IS A SITE FOR DISCOVERING INTERESTING THINGS ONLINE. LARGE PLATFORMS HAVE BECOME THE GATEKEEPERS OF ONLINE CONTENT BUT IT DOES NOT HAVE TO BE LIKE THIS. WITH OVER 3000 CURATED SITES ON CURL, USERS CAN FIND NEW AND INTERESTING WEBSITES AND WEB APPLICATIONS BASED ON THEIR INTERESTS.',
      tools: ['FIGMA', 'CLAUDE', 'CLAUDE CODE', 'NEXT.JS'],
    },
  },
  {
    num: '04',
    name: 'SELFWARE STUDIO',
    type: 'WEB APP',
    year: '[2026]',
    slug: 'selfwarestudio',
    cells: [{ logo: '/images/logos/selfStudioLogo.svg' }, { comingSoon: true }, 'desc'],
    rowClass: 'row4',
    info: {
      description: 'IF REPLIT AND LOVABLE ARE BIKES WITH TRAINING WHEELS FOR APP BUILDERS, SELFWARE STUDIO IS A BIKE KITCHEN WHERE YOU LEARN TO BUILD THE BIKE BEFORE YOU RIDE. EMPOWERING BUILDERS TO MAKE THEIR OWN SOFTWARE IS THE FUTURE.',
      tools: ['FIGMA', 'FIGMA MCP', 'CLAUDE CODE', 'NEXT.JS'],
    },
  },
  {
    num: '01',
    name: 'CONTEXTO',
    type: 'MOBILE APP',
    year: '[2025]',
    slug: 'contexto',
    cells: [{ video: 'https://matte-cdn.b-cdn.net/contextoMain.mp4', hero: true }, 'desc', {logo: 'https://matte-cdn.b-cdn.net/AVATAR.png'}],
    rowClass: 'row1',
    info: {
      description: 'CONTEXTO IS AN AI DRIVEN LANGUAGE LEARNING APPLICATION FOR INTERMEDIATE TO ADVANCED LEVEL LANGUAGE LEARNERS. USERS ARE TASKED WITH 5 DIFFERENT LANGUAGE EXCERCISES PER DAY THAT CLOSELY MIRROR IMMERSIVE EXPERIENCES TO ACCELERATE ACHIEVING FLUENCY.',
      tools: ['FIGMA', 'FIGJAM'],
    },
  },
  {
    
    num: '02',
    name: 'CURATED',
    type: 'WEB APP',
    year: '[2025]',
    slug: 'curated',
    cells: ['desc', { video: 'https://matte-cdn.b-cdn.net/curatedMain.mp4', hero: true }, { logo: 'https://matte-cdn.b-cdn.net/contextoLogoHD.png', spin: true }],
    rowClass: 'row2',
    info: {
      description: 'THE RIGHT PLAYLIST CAN COMPLETELY CHANGE AN EXPERIENCE, MAKING A TIME AND PLACE MORE MEMORABLE. TODAY WE INCREASINGLY RELY ON ALGORITHMS TO DRIVE MUSIC DISCOVERY AND INFORM OUR MUSIC CHOICES. CURATED TAKES THE POWER BACK TO THE PEOPLE THAT DEFINE TASTE BY PROVIDING A MARKETPLACE OF WELL CRAFTED MUSIC PLAYLISTS AND MUSIC BASED STORIES.',
      tools: ['FIGMA'],
    },
  },
  {
    num: '03',
    name: 'TIDAL MUSIC - COMMUNITY FEATURE',
    type: 'FEATURE ADDITION',
    year: '[2025]',
    slug: 'tidal',
    cells: [{logo: 'https://matte-cdn.b-cdn.net/USERTIDAL.jpg'}, 'desc',{ video: 'https://matte-cdn.b-cdn.net/TidalMain.mp4', hero: true } ],
    rowClass: 'row3',
    info: {
      description: 'MODERN MUSIC STREAMING PLATFORMS ALL SEEM TO IGNORE THE MOST IMPORTANT PART OF EXPERIENCING MUSIC - SHARING AND DISCOVERING NEW MUISC WITH OTHER PEOPLE. WITH THIS ADDITIONAL FEATURE IDEA FOR TIDAL, USERS CAN VIEW OTHER MEMBERS DISCOVERY PLAYLISTS AS WELL AS PUBLICLY SHARED PLAYLISTS TO FOSTER FINDING NEW ARTISTS THROUGH HUMAN CONNECTION.',
      tools: ['FIGMA'],
    },
  },
]

function DescCard({ slug, info, onCaseStudy }) {
  return (
    <div className={w.descCard}>
      <div className={w.descSection}>
        <p className={w.descLabel}>DESCRIPTION</p>
        <p className={w.descText}>{info.description}</p>
      </div>
      <div className={w.descSection}>
        <p className={w.descLabel}>TOOLS USED</p>
        <ul className={w.toolsList}>
          {info.tools.map((tool, i) => (
            <li key={i} className={w.toolsItem}>
              <img src={BULLET} alt="" className={w.toolsBullet} />
              {tool}
            </li>
          ))}
        </ul>
      </div>
      <button className={w.caseStudyBtn} onClick={() => onCaseStudy(slug)}>
        CASE STUDY
        <img src={ARROW} alt="" className={w.caseStudyArrow} />
      </button>
    </div>
  )
}

// Videos only start downloading once they near the viewport, and a shimmer
// skeleton shows until the video can play — then it fades in.
function LazyVideo({ src, hero, slug }) {
  const wrapRef = useRef(null)
  const [inView, setInView] = useState(false)
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    const el = wrapRef.current
    if (!el) return
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true)
          io.disconnect()
        }
      },
      { rootMargin: '500px 0px' } // begin loading a little before it scrolls in
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  return (
    <div ref={wrapRef} className={w.placeholder}>
      {!loaded && <div className={w.mediaSkeleton} aria-hidden="true" />}
      {inView && (
        <video
          src={src}
          className={w.cellVideo}
          style={{ opacity: loaded ? 1 : 0 }}
          autoPlay
          loop
          muted
          playsInline
          onLoadedData={() => setLoaded(true)}
          {...(hero ? { 'data-project-video': slug } : {})}
        />
      )}
    </div>
  )
}

export default function Work({ dark }) {
  const router = useRouter()
  // Restore the last toggled year so returning from a project (back button or
  // "BACK TO WORK") keeps the same year selected. Reads on the client during
  // client-side navigation, so there's no flash back to the default.
  const [selectedYear, setSelectedYear] = useState(() => {
    if (typeof window !== 'undefined') {
      return sessionStorage.getItem('work-year') || '[2026]'
    }
    return '[2026]'
  })
  const spinRef = useRef(null)

  useEffect(() => {
    sessionStorage.setItem('work-year', selectedYear)
  }, [selectedYear])

  const visibleProjects = PROJECTS.filter((p) => p.year === selectedYear)

  // Spinning logo: settle from 90° → 0° once, then spin a full turn (with a
  // brief pause between turns) forever.
  useEffect(() => {
    const el = spinRef.current
    if (!el) return

    gsap.set(el, { rotation: 90 })
    const tl = gsap.timeline()
    tl.to(el, { rotation: 0, duration: 0.8, ease: 'power2.out' })
      .to(el, {}, '+=1') // pause

    const spin = gsap.timeline({ repeat: -1 })
    spin.to(el, { rotation: '+=360', duration: 1.4, ease: 'power1.inOut' })
        .to(el, {}, '+=1') // pause between turns
    tl.add(spin)

    return () => {
      spin.kill()
      tl.kill()
      gsap.killTweensOf(el)
    }
  }, [selectedYear])

  function handleCaseStudy(slug) {
    const videoEl = document.querySelector(`[data-project-video="${slug}"]`)

    if (!videoEl) {
      router.push(`/work/${slug}`)
      return
    }

    const rect = videoEl.getBoundingClientRect()

    // Build a fixed overlay at the exact video position
    const overlay = document.createElement('div')
    overlay.id = 'cs-transition-overlay'
    overlay.style.cssText = `
      position: fixed;
      top: ${rect.top}px;
      left: ${rect.left}px;
      width: ${rect.width}px;
      height: ${rect.height}px;
      border-radius: 16px;
      overflow: hidden;
      z-index: 9999;
      pointer-events: none;
    `
    const capturedTime = videoEl.currentTime
    sessionStorage.setItem('cs-video-time', String(capturedTime))
    sessionStorage.setItem('cs-video-click-ts', String(Date.now()))

    const vid = document.createElement('video')
    vid.src = videoEl.src
    vid.autoplay = true
    vid.muted = true
    vid.loop = true
    vid.playsInline = true
    vid.style.cssText = 'position:absolute;top:0;left:50%;transform:translateX(-50%);height:100%;aspect-ratio:1.97/1;object-fit:cover;display:block;'
    overlay.appendChild(vid)
    document.body.appendChild(overlay)

    // Seek the overlay video to the same frame so it continues seamlessly
    vid.addEventListener('loadedmetadata', () => { vid.currentTime = capturedTime }, { once: true })

    const isMobile = window.innerWidth <= 768
    const targetTop = isMobile ? 120 : 0
    const targetHeight = isMobile ? window.innerWidth / 1.97 : window.innerHeight

    if (isMobile) {
      vid.style.cssText = 'width:100%;height:100%;object-fit:cover;display:block;'
    }

    gsap.to(overlay, {
      top: targetTop,
      left: 0,
      width: window.innerWidth,
      height: targetHeight,
      borderRadius: 0,
      duration: 0.75,
      ease: 'power3.inOut',
      onComplete: () => router.push(`/work/${slug}`),
    })
  }

  return (
    <>
      <Head><title>Work — MatteBrown Design</title></Head>
      <div className={s.page}>

      {/* PAGE HEADER */}
      <section className={w.header}>
        <span className={w.headerTitle}>WORK</span>
        <p className={w.headerTag}>[ SELECTED PROJECTS ]</p>
        <div className={w.yearToggle}>
          {['[2025]', '[2026]'].map((year) => (
            <button
              key={year}
              className={`${w.yearBtn} ${selectedYear === year ? w.yearBtnActive : ''}`}
              onClick={() => setSelectedYear(year)}
            >
              {year}
            </button>
          ))}
        </div>
      </section>

      {/* BENTO CONTAINER */}
      <div className={w.bentoContainer}>
        {visibleProjects.map((project) => (
          <div key={project.slug}>
            {/* ROW LABEL */}
            <div className={w.rowLabel}>
              <span className={w.rowNum}>{project.num}</span>
              <span className={w.rowName}>{project.name}</span>
              <span className={w.rowType}>{project.type}</span>
              <span className={w.rowYear}>{project.year}</span>
            </div>

            {/* BENTO GRID */}
            <div className={`${w.bentoImages} ${w[project.rowClass]}`}>
              {project.cells.map((cell, j) => {
                if (cell === 'desc') return (
                  <DescCard key={j} slug={project.slug} info={project.info} onCaseStudy={handleCaseStudy} />
                )
                if (cell?.video) return (
                  <LazyVideo key={j} src={cell.video} hero={cell.hero} slug={project.slug} />
                )
                if (cell?.comingSoon) return (
                  <div key={j} className={`${w.placeholder} ${w.comingSoonCell}`}>
                    <span className={w.comingSoonLabel}>Coming Soon</span>
                  </div>
                )
                if (cell?.logo) return (
                  <div key={j} className={`${w.placeholder} ${w.logoCell}`}>
                    <img
                      src={cell.logo}
                      alt=""
                      className={w.logoCellImg}
                      loading="lazy"
                      decoding="async"
                      ref={cell.spin ? spinRef : null}
                    />
                  </div>
                )
                if (cell) return (
                  <div key={j} className={w.placeholder}>
                    <img src={cell} alt="" className={w.cellImg} loading="lazy" decoding="async" />
                  </div>
                )
                return <div key={j} className={w.placeholder} />
              })}
            </div>

          </div>
        ))}
      </div>

    </div>
    </>
  )
}
