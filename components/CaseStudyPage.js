import { useEffect, useRef } from 'react'
import { useRouter } from 'next/router'
import s from '../styles/Home.module.css'
import cs from '../styles/CaseStudy.module.css'

const ARROW = '/images/arrowUpRight.svg'

export default function CaseStudyPage({ config }) {
  const { heroVideo, num, title, type, year, role, tools, description, problem, solution, outcome } = config
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
          </div>

          <div className={cs.section}>
            <p className={cs.sectionLabel}>[ PROBLEM ]</p>
            <p className={cs.sectionText}>{problem}</p>
          </div>

          <div className={cs.section}>
            <p className={cs.sectionLabel}>[ SOLUTION ]</p>
            <p className={cs.sectionText}>{solution}</p>
          </div>

          <div className={cs.imgPlaceholder} />

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
