import { useState, useEffect, useLayoutEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import s from '../styles/Home.module.css'
import a from '../styles/About.module.css'

gsap.registerPlugin(ScrollTrigger)

const ARROW = '/images/arrowUpRight.svg'

const FOOTER_WORDS = ['Functionality', 'Strategy', 'Taste', 'Intention']

const BIO_TEXT = 'UPDATE THIS PLACEHOLDER TEXT WITH YOUR COPY. I AM A PRODUCT DESIGNER AND WEB DEVELOPER BASED IN SACRAMENTO CALIFORNIA WITH OVER SEVEN YEARS OF EXPERIENCE CRAFTING DIGITAL PRODUCTS THAT PEOPLE ACTUALLY WANT TO USE. I LOVE THE INTERSECTION WHERE CODE MEETS DESIGN AND I BRING THAT ENERGY TO EVERY PROJECT I TAKE ON.'

const COMPANIES = [
  {
    logo: '/images/logos/monomC.svg',
    name: 'MONOM STUDIO',
    type: 'PRODUCT DESIGNER / FOUNDER',
    date: '[JAN/2025]-[PRESENT]',
    desc: "DIGITAL SHOPPING EXPERIENCES HAVE SEVERAL ELEMENTS MISSING THAT CANNOT BE REPLICATED FROM A TRADITIONAL IN STORE CLOTHING PROVIDER. WITH MONOM STUDIO, USERS CAN VIRTUALLY TRY ON CLOTHES BY USING GOOGLE'S LATEST IMAGE GENERATION MODEL NANO BANANA TO MERGE PHOTOS OF THEMSELVES WITH THE ITEM OF CLOTHING THEY ARE LOOKING TO PURCHASE. THIS GIVES THE USER AN IDEA OF WHAT THEY WOULD LOOK LIKE IN THE CLOTHES BEFORE THEY PURCHASE.",
    href: 'https://www.monomstud.io/',
  },
  {
    logo: '/images/logos/mousePotato.svg',
    name: 'MOUSE POTATO LAB',
    type: 'PRODUCT DESIGNER / COFOUNDER',
    date: '[FEB/2020]-[JAN/2025]',
    desc: 'MOST MODERN SOFTWARE APPLICATIONS HAVE A SET OF KEYBOARD SHORTCUTS THAT ALLOW A USER TO STREAMLINE THEIR WORKFLOWS AND INCREASE PRODUCTIVITY. THE PROBLEM IS THAT TRYING TO LEARN THESE KEY BINDINGS CAN BE A CHALLENGE, ONE THAT MANY USERS NEVER ATTEMPT TO TAKE ON. WITH MOUSE POTATO LAB, USERS CAN TRAIN TO BECOME POWER USERS THROUGH FUN CHALLENGES, PROGRESSING ACROSS LEVELS TOWARDS KEYBOARD SHORTCUT MASTERY.',
    href: 'https://www.mousepotato.co/',
  },
  {
    logo: '/images/logos/laloLogo.svg',
    name: 'LALO',
    type: 'PRODUCT DESIGNER / COO',
    date: '[SEP/2021]-[JUN/2022]',
    desc: 'I GOT BORED OF THE INTERNET ONE DAY AND DECIDED TO TRY TO CHANGE THAT. IN THE PAST I USED THE INTERNET TO DISCOVER NEW AND INTERESTING THINGS ON A REGULAR BASIS, THINGS THAT CHANGED THE TRAJECTORY OF MY LIFE. WITH LALO, A WEB APP THAT DRIVES ONLINE DISCOVERY, USERS CAN EXPLORE OVER 3000 CURATED WEBSITES BASED ON THEIR SELECTED TOPICS, SUBTOPICS AND NICHE INTERESTS. MY GOAL IS TO DRIVE THE DISCOVERY THAT MADE ME LOVE THE INTERNET WHEN I WAS YOUNGER.',
    href: 'https://www.lalo.app/',
    logoLarge: true,
  },
  {
    logo: '/images/logos/blackFlagLogo.png',
    name: 'BLACK FLAG CREATIVE',
    type: 'UX RESEARCHER / DEVELOPER',
    date: '[APR/2018]-[SEP/2021]',
    desc: 'BEING A SOLO BUILDER OR WORSE YET, A "VIBE CODER" IS STILL SOMEWHAT OF A WILD WEST. MANY TOOLS EXIST TO ASSIST BUILDERS WHO WANT TO BUILD SOFTWARE OR "SELFWARE" TO SOLVE THEIR OWN PROBLEMS. BLACK FLAG CREATIVE ALLOWS USERS WITH PRODUCT DESIGN OR CODING KNOWLEDGE TO STEP THROUGH A TRACK PROVEN UX RESEARCH PROCESS BEFORE THEY EVEN BEGIN TO BUILD.',
    href: 'https://blackflagcreative.com/',
  },
]

function ArrowBtn({ label, href, white }) {
  const cls = `${s.btn}${white ? ` ${s.btnWhite}` : ''}`
  if (href) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={`${cls} ${s.btnLink}`}>
        {label}
        <img src={ARROW} alt="" className={s.btnArrow} />
      </a>
    )
  }
  return (
    <button className={cls}>
      {label}
      <img src={ARROW} alt="" className={s.btnArrow} />
    </button>
  )
}

export default function About({ dark }) {
  const [footerWord, setFooterWord] = useState({ cur: 0, prev: null })
  const heroImgRef = useRef(null)
  const wordWrapRef = useRef(null)
  const measureRef = useRef(null)

  useEffect(() => {
    const id = setInterval(() => {
      setFooterWord(w => ({ cur: (w.cur + 1) % FOOTER_WORDS.length, prev: w.cur }))
    }, 2000)
    return () => clearInterval(id)
  }, [])

  useLayoutEffect(() => {
    const wrap = wordWrapRef.current
    const measure = measureRef.current
    if (!wrap || !measure) return
    measure.textContent = FOOTER_WORDS[footerWord.cur]
    wrap.style.width = `${measure.getBoundingClientRect().width}px`
  }, [footerWord.cur])

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Hero text entrance
      gsap.from('[data-anim="about-title"]', {
        y: 40, opacity: 0, duration: 1.2, ease: 'power3.out', delay: 0.2,
      })
      gsap.from('[data-anim="about-tag"]', {
        y: 20, opacity: 0, duration: 0.8, ease: 'power2.out', delay: 0.5,
      })

      // Hero image fades to 0 as user scrolls into next section
      gsap.to(heroImgRef.current, {
        opacity: 0,
        scale: 1.05,
        scrollTrigger: {
          trigger: heroImgRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      })

      // Second section heading entrance
      gsap.from('[data-anim="about-heading"]', {
        y: 50, opacity: 0, duration: 1, ease: 'power2.out',
        scrollTrigger: { trigger: '[data-anim="about-heading"]', start: 'top 85%' },
      })
      gsap.from('[data-anim="about-sub"]', {
        x: 40, opacity: 0, duration: 0.8, ease: 'power2.out',
        scrollTrigger: { trigger: '[data-anim="about-sub"]', start: 'top 85%' },
      })

      // Mason image — clip-path reveal
      const masonTl = gsap.timeline({
        scrollTrigger: {
          trigger: '[data-anim="mason-section"]',
          start: 'top 85%',
          end: 'bottom 30%',
          scrub: 1.5,
        },
      })
      masonTl.fromTo('[data-anim="mason-img-wrap"]',
        { clipPath: 'inset(8% 0% 8% 0% round 4px)' },
        { clipPath: 'inset(0% 0% 0% 0% round 0px)', ease: 'none' },
        0
      )
      masonTl.fromTo('[data-anim="mason-img"]',
        { scale: 1.08 },
        { scale: 1, ease: 'none' },
        0
      )

      // Work history heading words stagger up
      gsap.from('[data-anim="work-hist-word"]', {
        y: 80, opacity: 0, duration: 0.9, ease: 'power3.out', stagger: 0.1,
        scrollTrigger: { trigger: '[data-anim="work-hist-section"]', start: 'top 85%' },
      })

      // Generic fade-up
      gsap.utils.toArray('[data-anim="fade-up"]').forEach(el => {
        gsap.from(el, {
          y: 50, opacity: 0, duration: 0.9, ease: 'power2.out',
          scrollTrigger: { trigger: el, start: 'top 88%' },
        })
      })

      // Company rows — slide in from left/right
      gsap.utils.toArray('[data-anim="fade-l"]').forEach(el => {
        gsap.from(el, {
          x: -60, opacity: 0, duration: 1, ease: 'power2.out',
          scrollTrigger: { trigger: el, start: 'top 88%' },
        })
      })
      gsap.utils.toArray('[data-anim="fade-r"]').forEach(el => {
        gsap.from(el, {
          x: 60, opacity: 0, duration: 1, ease: 'power2.out',
          scrollTrigger: { trigger: el, start: 'top 88%' },
        })
      })
    })

    return () => ctx.revert()
  }, [])

  // Separate effect so it re-runs when dark mode changes, picking the right target colour
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const words = gsap.utils.toArray('[data-word]')
      gsap.to(words, {
        color: dark ? '#d9d9d9' : '#0E0E0E',
        duration: 0.1,
        stagger: { each: 0.2, from: 'start' },
        scrollTrigger: {
          trigger: '[data-anim="bio-text"]',
          start: 'top 75%',
          end: 'bottom 30%',
          scrub: 1,
        },
      })
    })
    return () => ctx.revert()
  }, [dark])

  return (
    <>
      {/* HERO — outside .page so overflow-x:hidden on .page doesn't clip the -100px margin */}
      <section className={a.hero}>
        <img
          ref={heroImgRef}
          src="/images/MattDL.jpg"
          alt="Matte Brown"
          className={a.heroImg}
        />
        <div className={a.heroText}>
          <span data-anim="about-title" className={a.heroTitle}>ABOUT</span>
          <p data-anim="about-tag" className={a.heroTag}>[ WHO AM I? ]</p>
        </div>
      </section>

      <div className={s.page}>

      {/* ABOUT HEADING */}
      <section className={s.aboutHeading}>
        <h2 data-anim="about-heading" className={s.aboutTitle}>
          PRODUCT DESIGNER ||<br />
          WEB DEVELOPER ||<br />
          BOY DAD
        </h2>
        <p data-anim="about-sub" className={s.whoAmI}>[ ABOUT ME ]</p>
      </section>

      {/* BIO — image left + animated word paragraph right */}
      <section data-anim="mason-section" className={a.bioSection}>
        <div data-anim="mason-img-wrap" className={a.bioImgWrap}>
          <img
            data-anim="mason-img"
            src="/images/mason.jpg"
            alt="Matte Brown"
            className={a.bioImg}
          />
        </div>
        <p data-anim="bio-text" className={a.bioText}>
          {BIO_TEXT.split(' ').map((word, i) => (
            <span key={i} data-word className={a.bioWord}>{word}{' '}</span>
          ))}
        </p>
      </section>

      {/* WORK HISTORY HEADING */}
      <section data-anim="work-hist-section" className={s.worksHeading}>
        <span data-anim="work-hist-word" className={s.worksTitle}>WORK</span>
        <span data-anim="work-hist-word" className={s.worksYear}>[ COMPANIES I WORKED WITH ]</span>
        <span data-anim="work-hist-word" className={s.worksTitle}>HISTORY</span>
      </section>

      {/* COMPANY ROWS */}
      {COMPANIES.map((co, i) => (
        <div key={i}>
          <hr className={s.divider} />
          <div className={s.projectRow}>
            <div data-anim="fade-l" className={s.projectLeft}>
              <div className={s.projectMeta}>
                <p className={s.projectType}>{co.type}</p>
                <p className={s.projectName}>{co.name}</p>
                <p className={s.projectDate}>{co.date}</p>
              </div>
              <div className={a.companyLogoBox}>
                <img src={co.logo} alt={co.name} className={`${a.companyLogo}${co.logoLarge ? ` ${a.companyLogoLarge}` : ''}`} />
              </div>
            </div>
            <div data-anim="fade-r" className={s.projectRight}>
              <p className={s.projectDesc}>{co.desc}</p>
              <ArrowBtn label="VISIT SITE" href={co.href} />
            </div>
          </div>
        </div>
      ))}

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
            <p className={s.footerSub}>
              You made it all the way to the footer. Please take some time<br />
              to explore the rest of my portfolio and check out more of my<br />
              work in the work page and the playground page. Thank you<br />
              for taking the time to get to know me!
            </p>
          </div>
          <nav data-anim="fade-r" className={s.footerNav}>
            <p className={s.footerNavLabel}>[pages]</p>
            <a href="/home">home</a>
            <a href="/work">Work</a>
            <a href="/contact">contact</a>
            <a href="/playground">Playground</a>
          </nav>
        </div>
      </footer>

      </div>
    </>
  )
}
