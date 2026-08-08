import { useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/router'
import Head from 'next/head'
import s from '../styles/Home.module.css'
import cs from '../styles/CaseStudy.module.css'

const ARROW = '/images/arrowUpRight.svg'

// Each story video only starts downloading as it nears the viewport, so they
// load one-by-one as the reader scrolls. A shimmer skeleton shows until the
// video can play, then it fades in.
function LazyStoryVideo({ src }) {
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
      { rootMargin: '600px 0px' } // begin loading a little before it scrolls in
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  return (
    <div ref={wrapRef} className={cs.storyVideoWrap}>
      {!loaded && <div className={cs.storySkeleton} aria-hidden="true" />}
      {inView && (
        <video
          src={src}
          className={cs.storyFullImg}
          style={{ opacity: loaded ? 1 : 0 }}
          autoPlay
          loop
          muted
          playsInline
          onLoadedData={() => setLoaded(true)}
        />
      )}
    </div>
  )
}

function StoryBlock({ block }) {
  if (block.type === 'sectionTitle') return (
    <h2 className={cs.storySectionTitle}>{block.text}</h2>
  )
  if (block.type === 'fullImage') return (
    <img src={block.src} alt={block.alt || ''} className={cs.storyFullImg} loading="lazy" decoding="async" />
  )
  if (block.type === 'text') return (
    <p className={cs.storyText}>{block.text}</p>
  )
  if (block.type === 'fullVideo') return (
    <LazyStoryVideo src={block.src} />
  )
  return null
}

export default function CaseStudyPage({ config }) {
  const { heroVideo, num, title, type, year, role, tools, description, problem, solution, outcome, body, url } = config
  const router = useRouter()
  const heroVideoRef = useRef(null)

  useEffect(() => {
    const video = heroVideoRef.current

    const savedTime = sessionStorage.getItem('cs-video-time')
    const clickTs = sessionStorage.getItem('cs-video-click-ts')
    if (savedTime && clickTs && video) {
      sessionStorage.removeItem('cs-video-time')
      sessionStorage.removeItem('cs-video-click-ts')
      const seekTo = (v) => {
        const elapsed = (Date.now() - parseInt(clickTs)) / 1000
        v.currentTime = (parseFloat(savedTime) + elapsed) % v.duration
      }
      if (video.readyState >= 1) {
        seekTo(video)
      } else {
        video.addEventListener('loadedmetadata', () => seekTo(video), { once: true })
      }
    }

    const overlay = document.getElementById('cs-transition-overlay')
    if (overlay) {
      const t = setTimeout(() => overlay.remove(), 120)
      return () => clearTimeout(t)
    }
  }, [])

  return (
    <>
      <Head><title>{title} — MatteBrown Design</title></Head>
      <section className={cs.hero}>
        <video
          ref={heroVideoRef}
          src={heroVideo}
          className={cs.heroVideo}
          autoPlay
          loop
          muted
          playsInline
        />
        <div className={cs.heroMeta}>
          <span className={cs.heroNum}>{num}</span>
          <span className={cs.heroTitle}>{title}</span>
          <span className={cs.heroType}>{type} — [{year}]</span>
        </div>
      </section>

      <div className={s.page}>
        <section className={cs.content}>

          <div className={cs.overview}>
            <div className={cs.overviewLabel}>[ OVERVIEW ]</div>
            <p className={cs.overviewText}>{description}</p>
          </div>

          <div className={cs.details}>
            <div className={cs.detailCol}>
              <p className={cs.detailLabel}>ROLE</p>
              <p className={cs.detailValue}>{role}</p>
            </div>
            <div className={cs.detailCol}>
              <p className={cs.detailLabel}>TOOLS</p>
              <p className={cs.detailValue}>{tools.join(' · ')}</p>
            </div>
            <div className={cs.detailCol}>
              <p className={cs.detailLabel}>YEAR</p>
              <p className={cs.detailValue}>{year}</p>
            </div>
            <div className={cs.detailCol}>
              <p className={cs.detailLabel}>TYPE</p>
              <p className={cs.detailValue}>{type}</p>
            </div>
            {url && (
              <div className={cs.detailCol}>
                <p className={cs.detailLabel}>WEBSITE</p>
                <a href={url} target="_blank" rel="noopener noreferrer" className={cs.visitBtn}>
                  VISIT SITE
                  <img src={ARROW} alt="" className={cs.visitArrow} />
                </a>
              </div>
            )}
          </div>

          <div className={cs.section}>
            <p className={cs.sectionLabel}>[ PROBLEM ]</p>
            <p className={cs.sectionText}>{problem}</p>
          </div>

          <div className={cs.section}>
            <p className={cs.sectionLabel}>[ SOLUTION ]</p>
            <p className={cs.sectionText}>{solution}</p>
          </div>

          {body && body.length > 0 &&
            body.map((block, i) => <StoryBlock key={i} block={block} />)
          }

          <div className={cs.section}>
            <p className={cs.sectionLabel}>[ OUTCOME ]</p>
            <ul className={cs.outcomeList}>
              {outcome.map((item, i) => (
                <li key={i} className={cs.outcomeItem}>
                  <img
                    src={i % 2 === 0 ? '/images/shape1.svg' : '/images/shape2.svg'}
                    alt=""
                    className={cs.outcomeShape}
                  />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className={cs.backRow}>
            <button className={cs.backBtn} onClick={() => router.push('/work')}>
              <img src={ARROW} alt="" className={cs.backArrow} />
              BACK TO WORK
            </button>
          </div>

        </section>
      </div>
    </>
  )
}

