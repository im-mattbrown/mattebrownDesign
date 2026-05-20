import { useState, useEffect, useLayoutEffect, useRef } from 'react'
import { useRouter } from 'next/router'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import s from '../styles/Home.module.css'

const ARROW = '/images/arrowUpRight.svg'

const FOOTER_WORDS = ['Functionality', 'Strategy', 'Taste', 'Intention']

const TESTIMONIALS = [
  {
    image: '/images/auvik.jpeg',
    name: 'Auvik Mir',
    company: 'Founder - Mouse Potato Lab',
    quote: 'His design expertise effectively bridges the gap between design and development. If you want pixel-perfect output, Matte has you covered!',
  },
  {
    image: '/images/steve.jpeg',
    name: 'Steve Atkinson',
    company: 'Staff Software Engineer - Netflix',
    quote: 'Matt is professional, a great UX and UI designer, has incredible attention to detail and a voracious appetite for team building. He is personable and lives to help others, a real team player.',
  },
  {
    image: '/images/juan2.jpg',
    name: 'Juan Medina',
    company: 'Technical Advisor - Amazon',
    quote: 'I thoroughly enjoyed working with Matte for several years as part of my startup. He was our first full time hire, and drove getting work done on time, was a great coduit between engineering and the business. I recommend Matte for any web or mobile project, very capable, trustworthy and a good person on top of it all.',
  },
]

function drawCover(video, canvas) {
  const { videoWidth: vw, videoHeight: vh } = video
  const { width: cw, height: ch } = canvas
  if (!vw || !cw) return
  const ctx = canvas.getContext('2d')
  ctx.clearRect(0, 0, cw, ch)
  const scale = Math.max(cw / vw, ch / vh)
  const dw = vw * scale
  const dh = vh * scale
  ctx.drawImage(video, (cw - dw) / 2, (ch - dh) / 2, dw, dh)
}

function ArrowBtn({ label, white, dark, href, to }) {
  const router = useRouter()
  const cls = `${s.btn} ${white ? s.btnWhite : ''} ${dark ? s.btnDark : ''}`
  const arrowCls = dark ? s.btnDarkArrow : s.btnArrow
  if (to) {
    return (
      <button className={cls} onClick={() => router.push(to)}>
        {label}
        <img src={ARROW} alt="" className={arrowCls} />
      </button>
    )
  }
  if (href) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={`${cls} ${s.btnLink}`}>
        {label}
        <img src={ARROW} alt="" className={arrowCls} />
      </a>
    )
  }
  return (
    <button className={cls}>
      {label}
      <img src={ARROW} alt="" className={arrowCls} />
    </button>
  )
}

export default function Home({ dark }) {
  const [footerWord, setFooterWord] = useState({ cur: 0, prev: null })
  const prevDarkRef = useRef(null)

  useEffect(() => {
    const id = setInterval(() => {
      setFooterWord(w => ({ cur: (w.cur + 1) % FOOTER_WORDS.length, prev: w.cur }))
    }, 2000)
    return () => clearInterval(id)
  }, [])
  const videoRef = useRef(null)
  const canvasRef = useRef(null)
  const reverseRef = useRef(null)
  const pendingRafRef = useRef(null)
  const wordWrapRef = useRef(null)
  const measureRef = useRef(null)
  const tomVideoRef = useRef(null)
  const shrtctsVideoRef = useRef(null)
  const curlVideoRef = useRef(null)
  const collageVideoRef = useRef(null)

  useEffect(() => {
    // Project videos: play when in view, pause when out
    const projectVideos = [tomVideoRef.current, shrtctsVideoRef.current, curlVideoRef.current].filter(Boolean)
    const projectObservers = projectVideos.map(video => {
      const observer = new IntersectionObserver(
        ([entry]) => { entry.isIntersecting ? video.play() : video.pause() },
        { threshold: 0.3 }
      )
      observer.observe(video)
      return observer
    })

    // Collage video: play once on first entry then disconnect — loops forever after
    const collage = collageVideoRef.current
    let collageObserver
    if (collage) {
      collageObserver = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            collage.play()
            collageObserver.disconnect()
          }
        },
        { threshold: 0.1 }
      )
      collageObserver.observe(collage)
    }

    return () => {
      projectObservers.forEach(o => o.disconnect())
      collageObserver?.disconnect()
    }
  }, [])

  useLayoutEffect(() => {
    const wrap = wordWrapRef.current
    const measure = measureRef.current
    if (!wrap || !measure) return
    measure.textContent = FOOTER_WORDS[footerWord.cur]
    wrap.style.width = `${measure.getBoundingClientRect().width}px`
  }, [footerWord.cur])

  // ── Video reverse engine ───────────────────────────────────────────────────
  useEffect(() => {
    const video = videoRef.current
    const canvas = canvasRef.current
    if (!video || !canvas) return

    function syncCanvasSize() {
      const rect = canvas.getBoundingClientRect()
      if (rect.width > 0) {
        canvas.width = Math.round(rect.width)
        canvas.height = Math.round(rect.height)
      }
    }

    function onSeeked() {
      const base = reverseRef.current
      if (!base || !video.paused) return
      drawCover(video, canvas)
      pendingRafRef.current = requestAnimationFrame((now) => {
        pendingRafRef.current = null
        if (!reverseRef.current) return
        const elapsed = (now - base.wallTime) / 1000
        const next = base.videoTime - elapsed
        if (next <= 0) {
          video.currentTime = 0
          drawCover(video, canvas)
          reverseRef.current = null
          return
        }
        video.currentTime = next
      })
    }

    const ro = new ResizeObserver(syncCanvasSize)
    ro.observe(canvas)
    video.addEventListener('loadedmetadata', syncCanvasSize)
    video.addEventListener('seeked', onSeeked)
    if (video.readyState >= 1) syncCanvasSize()

    return () => {
      video.removeEventListener('loadedmetadata', syncCanvasSize)
      video.removeEventListener('seeked', onSeeked)
      ro.disconnect()
    }
  }, [])

  // ── Scroll animations ──────────────────────────────────────────────────────
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Hero entrance (plays immediately on load)
      gsap.from('[data-anim="hero-l"]', {
        x: -120, opacity: 0, duration: 1.3, ease: 'power3.out',
      })
      gsap.from('[data-anim="hero-r"]', {
        x: 120, opacity: 0, duration: 1.3, ease: 'power3.out',
      })
      gsap.from('[data-anim="hero-fade"]', {
        y: 30, opacity: 0, duration: 0.9, ease: 'power2.out',
        stagger: 0.12, delay: 0.35,
      })

      // Generic fade-up on scroll
      gsap.utils.toArray('[data-anim="fade-up"]').forEach(el => {
        gsap.from(el, {
          y: 50, opacity: 0, duration: 0.9, ease: 'power2.out',
          scrollTrigger: { trigger: el, start: 'top 88%' },
        })
      })

      // Slide from left on scroll
      gsap.utils.toArray('[data-anim="fade-l"]').forEach(el => {
        gsap.from(el, {
          x: -60, opacity: 0, duration: 1, ease: 'power2.out',
          scrollTrigger: { trigger: el, start: 'top 88%' },
        })
      })

      // Slide from right on scroll
      gsap.utils.toArray('[data-anim="fade-r"]').forEach(el => {
        gsap.from(el, {
          x: 60, opacity: 0, duration: 1, ease: 'power2.out',
          scrollTrigger: { trigger: el, start: 'top 88%' },
        })
      })

      // Works heading words stagger up
      gsap.from('[data-anim="works-word"]', {
        y: 80, opacity: 0, duration: 0.9, ease: 'power3.out', stagger: 0.1,
        scrollTrigger: { trigger: '[data-anim="works-section"]', start: 'top 85%' },
      })

      // AI statement lines stagger up
      gsap.from('[data-anim="ai-line"]', {
        y: 40, opacity: 0, duration: 0.7, ease: 'power2.out', stagger: 0.08,
        scrollTrigger: { trigger: '[data-anim="ai-section"]', start: 'top 80%' },
      })

      // Pinned horizontal testimonials
      const horizSection = document.querySelector('[data-anim="horiz-section"]')
      const horizTrack = document.querySelector('[data-anim="horiz-track"]')
      if (horizSection && horizTrack) {
        const getAmount = () => horizTrack.scrollWidth - horizSection.offsetWidth
        const horizTl = gsap.timeline({
          scrollTrigger: {
            trigger: horizSection,
            start: 'top top',
            end: () => `+=${getAmount()}`,
            scrub: 1,
            pin: true,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        })
        // Translate the track left to reveal cards
        horizTl.to(horizTrack, { x: () => -getAmount(), ease: 'none' }, 0)
        // All images scale down from 1.15 → 1 across the full scroll
        horizTl.fromTo('[data-anim="horiz-img"]', { scale: 1.15 }, { scale: 1, ease: 'none' }, 0)
      }

      // AI section — stacked image clip-path reveals tied to scroll
      const aiImgTl = gsap.timeline({
        scrollTrigger: {
          trigger: '[data-anim="ai-section"]',
          start: 'top 60%',
          end: 'center 20%',
          scrub: 1.5,
        },
      })
      // youngMatt reveals upward: clip retreats from bottom
      aiImgTl.fromTo(
        '[data-anim="young-matt"]',
        { clipPath: 'inset(100% 0% 0% 0%)' },
        { clipPath: 'inset(0% 0% 0% 0%)', ease: 'none' },
        0
      )
      // oldMatt reveals downward: clip retreats from top
      aiImgTl.fromTo(
        '[data-anim="old-matt"]',
        { clipPath: 'inset(0% 0% 100% 0%)' },
        { clipPath: 'inset(0% 0% 0% 0%)', ease: 'none' },
        0
      )

      // Image reveal — clip-path expands from square crop to full image, tied to scroll
      const revealTl = gsap.timeline({
        scrollTrigger: {
          trigger: '[data-anim="image-reveal-section"]',
          start: 'top 85%',
          end: 'bottom 25%',
          scrub: 1.5,
        },
      })
      // Clip starts as a square-ish, slightly left-of-centre crop; opens to full bleed
      revealTl.fromTo(
        '[data-anim="image-reveal"]',
        { clipPath: 'inset(0% 24% 0% 20% round 4px)' },
        { clipPath: 'inset(0% 0% 0% 0% round 0px)', ease: 'none' },
        0
      )
      // Subtle zoom-out on the image as the crop opens — adds depth
      revealTl.fromTo(
        '[data-anim="image-reveal"] img',
        { scale: 1.08 },
        { scale: 1, ease: 'none' },
        0
      )
    })

    return () => ctx.revert()
  }, [])

  useEffect(() => {
    if (prevDarkRef.current === null) {
      prevDarkRef.current = dark
      return
    }
    prevDarkRef.current = dark

    const video = videoRef.current
    const canvas = canvasRef.current
    if (!video) return

    if (dark) {
      reverseRef.current = null
      if (pendingRafRef.current) {
        cancelAnimationFrame(pendingRafRef.current)
        pendingRafRef.current = null
      }
      if (canvas) canvas.removeAttribute('data-active')
      video.play()
    } else {
      video.pause()
      reverseRef.current = {
        wallTime: performance.now(),
        videoTime: video.currentTime,
      }
      if (canvas) {
        drawCover(video, canvas)
        canvas.setAttribute('data-active', '')
      }
      const firstNext = video.currentTime - 1 / 30
      video.currentTime = firstNext > 0 ? firstNext : 0
    }
  }, [dark])

  return (
    <div className={s.page}>

      {/* HERO */}
      <section className={s.hero}>
        <div className={s.heroNames}>
          <span data-anim="hero-l" className={s.heroName}>MATTE</span>
          <span data-anim="hero-r" className={s.heroName}>BROWN</span>
        </div>
        <div data-anim="hero-fade" className={s.heroSubtitle}>
          <p>UX/UI&nbsp;&nbsp;&nbsp;&nbsp;DESIGNER</p>
          <p>&amp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;DEVELOPER</p>
        </div>
        <p data-anim="hero-fade" className={s.available}>[ AVAILABLE FOR HIRE ]</p>
        <div className={s.heroImageWrap}>
          <div className={s.heroVideoBox}>
            <video
              ref={videoRef}
              className={s.heroVideo}
              src="/videos/mattHero.mp4"
              muted
              playsInline
              preload="auto"
            />
            <canvas ref={canvasRef} className={s.reverseCanvas} />
          </div>
        </div>
        <div data-anim="hero-fade" className={s.heroBio}>
          <p className={s.heroBioText}>
            CREATIVE DESIGNER WHO<br />
            SHIPS INTUITIVE, USABLE &amp;<br />
            ACCESSIBLE UI&nbsp;&nbsp;&nbsp;&nbsp;I WORK<br />
            AT THE INTERSECTION<br />
            OF CODE AND DESIGN
            <img src="/images/shape1.svg" alt="" aria-hidden="true" className={s.heroBioShape} />
          </p>
        </div>
        <div data-anim="hero-fade" className={s.heroBottom}>
          <div className={s.heroLocation}>
            <p>BASED IN</p>
            <p>SACRAMENTO, CA</p>
          </div>
          <div className={s.heroBottomCenter}>
            <ArrowBtn label="MY WORK" />
          </div>
          <p className={s.heroYears}>[ 7+ YEARS OF EXPERIENCE ]</p>
        </div>
      </section>

      {/* ABOUT HEADING */}
      <section className={s.aboutHeading}>
        <h2 data-anim="fade-up" className={s.aboutTitle}>
          Designer who codes.<br />Developer THAT cares.
        </h2>
        <p data-anim="fade-r" className={s.whoAmI}>[ WHO AM I? ]</p>
      </section>

      {/* WHO AM I — FULL-BLEED IMAGE REVEAL */}
      <section data-anim="image-reveal-section" className={s.imageRevealSection}>
        <div data-anim="image-reveal" className={s.imageRevealTrack}>
          <img
            src="/images/mattWall.jpg"
            alt="Matte Brown"
            className={s.imageRevealImg}
          />
        </div>
      </section>

      {/* BIO */}
      <section className={s.bioSection}>
        <div data-anim="fade-up" className={s.bioText}>
          <img src="/images/shape2.svg" alt="" aria-hidden="true" className={s.bioSectionShape} />
          <p>
            HI, I&rsquo;M MATTE&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;A FULL STACK DESIGNER FROM SACRAMENTO WITH AN EYE FOR AESTHETICALLY PLEASING AND INTUITIVE UI. MY BACKGROUND IS IN UX RESEARCH AND FRONTEND DEVELOPMENT. I DESIGN, CODE AND SHIP DIGITAL PRODUCTS SUCH AS WEB AND MOBILE APPS, AS WELL AS WEBSITES FOR BUSINESSES AND FOUNDERS. MY CAREER HAS SPANNED ACROSS STARTUPS, DESIGN AGENCIES AND ENTERPRISE COMPANIES.
          </p>
        </div>
      </section>

      {/* WORKS HEADING */}
      <section data-anim="works-section" className={s.worksHeading}>
        <span data-anim="works-word" className={s.worksTitle}>SOME</span>
        <span data-anim="works-word" className={s.worksTitle}>SELECTED</span>
        <span data-anim="works-word" className={s.worksYear}>[ 2026 ]</span>
        <span data-anim="works-word" className={s.worksTitle}>WORKS</span>
      </section>

      <hr className={s.divider} />

      {/* PROJECT 1 */}
      <div className={s.projectRow}>
        <div data-anim="fade-l" className={s.projectLeft}>
          <div className={s.projectMeta}>
            <p className={s.projectType}>WEB/MOBILE APP</p>
            <p className={s.projectName}>THAT&rsquo;S ON ME</p>
            <p className={s.projectDate}>[JAN/2026]</p>
          </div>
          <video
            ref={tomVideoRef}
            src="https://res.cloudinary.com/dzghwkkzb/video/upload/v1777746976/thatsOnMeVidPortfolio_ymlawk.mp4"
            className={s.projectVideo}
            muted
            loop
            playsInline
            preload="metadata"
          />
        </div>
        <div data-anim="fade-r" className={s.projectRight}>
          <p className={s.projectDesc}>
            DIGITAL SHOPPING EXPERIENCES HAVE SEVERAL ELEMENTS MISSING THAT CANNOT BE REPLICATED FROM A TRADITIONAL IN STORE CLOTHING PROVIDER. WITH <strong>THAT&rsquo;S ON ME,</strong> USERS CAN VIRTUALLY TRY ON CLOTHES BY USING GOOGLE&rsquo;S LATEST IMAGE GENERATION MODEL NANO BANANA TO MERGE PHOTOS OF THEMSELVES WITH THE ITEM OF CLOTHING THEY ARE LOOKING TO PURCHASE. THIS GIVES THE USER AN IDEA OF WHAT THEY WOULD LOOK LIKE IN THE CLOTHES BEFORE THEY PURCHASE. LEADING TO A BETTER ONLINE SHOPPING EXPERIENCE FOR CUSTOMERS AND LESS CARTS GOING EMPTY FOR YOUR BUSINESS.
          </p>
          <div className={s.btnRow}>
            <ArrowBtn label="VISIT SITE" href="https://thatson.me" />
            <ArrowBtn label="CASE STUDY" dark to="/work/thatsonme" />
          </div>
        </div>
      </div>

      <hr className={s.divider} />

      {/* PROJECT 2 */}
      <div className={s.projectRow}>
        <div data-anim="fade-l" className={s.projectLeft}>
          <div className={s.projectMeta}>
            <p className={s.projectType}>WEB APP</p>
            <p className={s.projectName}>SHRTCTS.IO</p>
            <p className={s.projectDate}>[FEB/2026]</p>
          </div>
          <video
            ref={shrtctsVideoRef}
            src="https://res.cloudinary.com/dzghwkkzb/video/upload/v1772238552/TOM_Final_LinkedIn_1_imxbai.mp4"
            className={s.projectVideo}
            muted
            loop
            playsInline
            preload="metadata"
          />
        </div>
        <div data-anim="fade-r" className={s.projectRight}>
          <p className={s.projectDesc}>
            MOST MODERN SOFTWARE APPLICATIONS HAVE A SET OF KEYBOARD SHORTCUTS THAT ALLOW A USER TO STREAMLINE THEIR WORKFLOWS AND INCREASE PRODUCTIVITY. THE PROBLEM IS THAT TRYING TO LEARN THESE KEY BINDINGS CAN BE A CHALLENGE, ONE THAT MANY USERS NEVER ATTEMPT TO TAKE ON. WITH SHRTCTS.IO, USERS OF APPS SUCH AS FIGMA, MIRO AND VSCODE CAN TRAIN TO BECOME POWER USERS THROUGH FUN CHALLENGES, PROGRESSING ACROSS LEVELS TOWARDS KEYBOARD SHORTCUT MASTERY.
          </p>
          <div className={s.btnRow}>
            <ArrowBtn label="VISIT SITE" href="https://shrtcts.io" />
            <ArrowBtn label="CASE STUDY" dark to="/work/shrtcts" />
          </div>
        </div>
      </div>
      <hr className={s.divider} />
      {/* PROJECT 3 */}
      <div className={s.projectRow}>
        <div data-anim="fade-l" className={s.projectLeft}>
          <div className={s.projectMeta}>
            <p className={s.projectType}>WEB APP</p>
            <p className={s.projectName}>CURL</p>
            <p className={s.projectDate}>[MAR/2026]</p>
          </div>
          <video
            ref={curlVideoRef}
            src="https://res.cloudinary.com/dzghwkkzb/video/upload/v1777747716/curlPortfolioFinal_rylwzw.mp4"
            className={s.projectVideo}
            muted
            loop
            playsInline
            preload="metadata"
          />
        </div>
        <div data-anim="fade-r" className={s.projectRight}>
          <p className={s.projectDesc}>
            I GOT BORED OF THE INTERNET ONE DAY AND DECIDED TO TRY TO CHANGE THAT. IN THE PAST I USED THE INTERNET TO DISCOVER NEW AND INTERESTING THINGS ON A REGULAR BASIS, THINGS THAT CHANGED THE TRAJECTORY OF MY LIFE. TODAY I BRAINROT ON TIKTOK OR BUILD WITH AI. WITH CURL, A WEB APP THAT DRIVES ONLINE DISCOVERY, USERS CAN "CURL" ONE OF OVER 3000 CURATED WEBSITES BASED ON THEIR SELECTED TOPICS, SUBTOPICS AND NICHE INTERESTS. MY GOAL WITH CURL IS TO DRIVE THE DISCOVERY THAT MADE ME LOVE THE INTERNET WHEN I WAS YOUNGER.
          </p>
          <div className={s.btnRow}>
            <ArrowBtn label="VISIT SITE" href="https://www.curl.fyi" />
            <ArrowBtn label="CASE STUDY" dark to="/work/curl" />
          </div>
        </div>
      </div>

      <hr className={s.divider} />

      {/* PROJECT 4 */}
      <div className={s.projectRow}>
        <div data-anim="fade-l" className={s.projectLeft}>
          <div className={s.projectMeta}>
            <p className={s.projectType}>WEB APP</p>
            <p className={s.projectName}>SELFWARE STUDIO</p>
            <p className={s.projectDate}>[APR/2026]</p>
          </div>
          <div className={s.projectImgGif}>
            <span className={s.comingSoon}>COMING SOON</span>
          </div>
        </div>
        <div data-anim="fade-r" className={s.projectRight}>
          <p className={s.projectDesc}>
            BEING A SOLO BUILDER OR WORSE YET, A &ldquo;VIBE CODER&rdquo; IS STILL SOMEWHAT OF A WILD WEST. MANY TOOLS EXIST TO ASSIST BUILDERS WHO WANT TO BUILD SOFTWARE OR &ldquo;SELFWARE&rdquo; TO SOLVE THEIR OWN PROBLEMS. PLATFORMS SUCH AS LOVEABLE, BOLT AND REPLIT PROMISE TO CREATE AN APP FOR YOU WITH JUST A PROMPT, NO KNOWLEDGE REQUIRED. WHILE THESE ARE GOOD FOR A COMPLETE BEGINNER, THERE IS A GAP IN THE MARKET FOR SOLO BUILDERS THAT DO NOT NEED THEIR HAND HELD THROUGH THE PROCESS. SELFWARE STUDIO ALLOWS USERS WITH PRODUCT DESIGN OR CODING KNOWLEDGE TO STEP THROUGH A TRACK PROVEN UX RESEARCH PROCESS BEFORE THEY EVEN BEGIN TO BUILD.
          </p>
          <div className={s.btnRow}>
            <ArrowBtn label="VISIT SITE" href="https://curl.fyi" />
            <ArrowBtn label="CASE STUDY" dark to="/work/selfwarestudio" />
          </div>
        </div>
      </div>

      {/* HORIZONTAL TESTIMONIALS — pinned, scrolls horizontally */}
      <section data-anim="horiz-section" className={s.horizSection}>
        <div data-anim="horiz-track" className={s.horizTrack}>
          {TESTIMONIALS.map((t, i) => (
            <article key={i} className={s.horizCard}>
              <div className={s.horizImgWrap}>
                <img
                  data-anim="horiz-img"
                  src={t.image}
                  alt={t.name}
                  className={s.horizImg}
                />
              </div>
              <div className={s.horizRight}>
                <blockquote className={s.horizQuote}>
                  &ldquo;{t.quote}&rdquo;
                </blockquote>
                <div className={s.horizAttrib}>
                  <span className={s.horizName}>{t.name}</span>
                  <span className={s.horizCompany}>{t.company}</span>
                </div>
              </div>
            </article>
          ))}
        </div>
        <h2 className={s.horizTitle}>THEIR WORDS,<br />NOT MINE</h2>
      </section>

      {/* COLLAGE VIDEO */}
      <video
        ref={collageVideoRef}
        src="https://res.cloudinary.com/dzghwkkzb/video/upload/v1778028681/collagePortfolio_sos2wh.mp4"
        className={s.collageVideo}
        muted
        loop
        playsInline
        preload="auto"
      />

      {/* AI STATEMENT */}
      <section data-anim="ai-section" className={s.aiSection}>
        <div className={s.aiText}>
          <p data-anim="ai-line">LEVERAGING ADVANCEMENTS IN MODERN AI</p>
          <p data-anim="ai-line">SYSTEMS WITH CREATIVE INTUITION TO DRIVE</p>
          <p data-anim="ai-line">TANGIBLE</p>
          <p data-anim="ai-line">RESULTS AND ELEVATE YOUR BUSINESS&rsquo;</p>
          <p data-anim="ai-line">BRAND.</p>
        </div>
        <div className={s.aiImgStack}>
          <div data-anim="young-matt" className={s.aiImgTop}>
            <img
              src="/images/youngMatt3.png"
              alt="Young Matte"
              className={s.aiStackImg}
            />
          </div>
          <div data-anim="old-matt" className={s.aiImgBottom}>
            <img
              src="/images/oldMatt1.png"
              alt="Matte Brown"
              className={s.aiStackImg}
            />
          </div>
        </div>
      </section>

      <hr className={s.divider} />

      {/* SERVICES */}
      <section className={s.services}>
        <div data-anim="fade-up" className={s.servicesDesc}>
          <p>MY WORK COMBINES STRATEGIC INSIGHT WITH</p>
          <p>DESIGN THEORY AND INNOVATIVE THINKING</p>
          <p>TO DELIVER BESPOKE SOLUTIONS THAT ALIGN</p>
          <p>WITH YOUR BUSINESS OBJECTIVES. PARTNER WITH</p>
          <p>ME TO SET YOUR BRAND APART.</p>
        </div>
        <ArrowBtn label="MY WORK" white />
      </section>

      {/* FOOTER */}
      <footer className={s.footer}>
        <hr className={s.divider} />
        <div className={s.footerTop}>
          <div data-anim="fade-l" className={s.footerSocials}>
            <a href="#">linkedin</a>
            <a href="#">RESUME</a>
            <a href="#">email</a>
          </div>
          <div className={s.footerHeading}>
            <h2 data-anim="fade-up" className={s.footerTitle}>
              Creativity Meets<br />
              <span className={s.footerTitleGrey}>[ </span>
              <span className={s.footerWordWrap} ref={wordWrapRef}>
                <span ref={measureRef} className={s.footerWordMeasure} aria-hidden="true" />
                {footerWord.prev !== null && (
                  <span
                    key={`x-${footerWord.prev}`}
                    className={`${s.footerTitleMuted} ${s.footerWordSlideOut}`}
                    aria-hidden="true"
                  >
                    {FOOTER_WORDS[footerWord.prev]}
                  </span>
                )}
                <span
                  key={`n-${footerWord.cur}`}
                  className={`${s.footerTitleMuted} ${s.footerWordSlideIn}`}
                >
                  {FOOTER_WORDS[footerWord.cur]}
                </span>
              </span>
              <span className={s.footerTitleGrey}> ]</span>
            </h2>
            <p data-anim="fade-up" className={s.footerSub}>
              You made it all the way to the footer. Please take some time<br />
              to explore the rest of my portfolio and check out more of my<br />
              work in the work page and the playground page. Thank you<br />
              for taking the time to get to know me!
            </p>
          </div>
          <nav data-anim="fade-r" className={s.footerNav}>
            <p className={s.footerNavLabel}>[pages]</p>
            <a href="/about">about</a>
            <a href="/work">Work</a>
            <a href="/contact">contact</a>
            <a href="/playground">Playground</a>
          </nav>
        </div>
      </footer>

    </div>
  )
}
