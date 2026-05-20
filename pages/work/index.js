import { useRouter } from 'next/router'
import { gsap } from 'gsap'
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
    cells: [{ video: 'https://res.cloudinary.com/dzghwkkzb/video/upload/v1778264329/THATSONMEDESIGN_ddcbvt.mp4', hero: true }, '/images/thatsonmeScreens.jpg', 'desc'],
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
    cells: ['desc', { video: 'https://res.cloudinary.com/dzghwkkzb/video/upload/v1778264701/shrtctsDesign_qr421p.mp4', hero: true }, { logo: '/images/logos/shrtctsLogoMark.svg' }],
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
    cells: [{ video: 'https://res.cloudinary.com/dzghwkkzb/video/upload/v1778282310/curlSign_ggx6xt.mp4' }, 'desc', { video: 'https://res.cloudinary.com/dzghwkkzb/video/upload/v1778281928/curlDesignVideo_yxhpfr.mp4', hero: true }],
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
    cells: [null, 'desc'],
    rowClass: 'row4',
    info: {
      description: 'IF REPLIT AND LOVABLE ARE BIKES WITH TRAINING WHEELS FOR APP BUILDERS, SELFWARE STUDIO IS A BIKE KITCHEN WHERE YOU LEARN TO BUILD THE BIKE BEFORE YOU RIDE. EMPOWERING BUILDERS TO MAKE THEIR OWN SOFTWARE IS THE FUTURE.',
      tools: ['FIGMA', 'FIGMA MCP', 'CLAUDE CODE', 'NEXT.JS'],
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

export default function Work({ dark }) {
  const router = useRouter()

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

    gsap.to(overlay, {
      top: 0,
      left: 0,
      width: window.innerWidth,
      height: window.innerHeight,
      borderRadius: 0,
      duration: 0.75,
      ease: 'power3.inOut',
      onComplete: () => router.push(`/work/${slug}`),
    })
  }

  return (
    <div className={s.page}>

      {/* PAGE HEADER */}
      <section className={w.header}>
        <span className={w.headerTitle}>WORK</span>
        <p className={w.headerTag}>[ SELECTED PROJECTS ]</p>
      </section>

      {/* BENTO CONTAINER */}
      <div className={w.bentoContainer}>
        {PROJECTS.map((project) => (
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
                  <div key={j} className={w.placeholder}>
                    <video
                      src={cell.video}
                      className={w.cellVideo}
                      autoPlay
                      loop
                      muted
                      playsInline
                      {...(cell.hero ? { 'data-project-video': project.slug } : {})}
                    />
                  </div>
                )
                if (cell?.logo) return (
                  <div key={j} className={`${w.placeholder} ${w.logoCell}`}>
                    <img src={cell.logo} alt="" className={w.logoCellImg} />
                  </div>
                )
                if (cell) return (
                  <div key={j} className={w.placeholder}>
                    <img src={cell} alt="" className={w.cellImg} />
                  </div>
                )
                return <div key={j} className={w.placeholder} />
              })}
            </div>

          </div>
        ))}
      </div>

    </div>
  )
}
