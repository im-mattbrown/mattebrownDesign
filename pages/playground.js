import { useState, useRef } from 'react'
import Head from 'next/head'
import s from '../styles/Playground.module.css'

// ─── Fill in each cell here ────────────────────────────────────────────────────
//
//  type       : 'image' | 'video' | null  (null = empty placeholder)
//  src        : path or URL to the file
//  poster     : (video only) thumbnail shown before the video plays
//  category   : 'Videos' | 'Photography' | 'Websites' | 'TouchDesigner' | null
//  alt        : alt text for images
//  playOnClick: (video only) true = muted/paused by default, plays with sound on click
//
const CELLS_DATA = [
  { id: 1,  type: 'image', src: '/images/craterLake.jpg',  poster: null, category: 'Photography', alt: 'Crater Lake', playOnClick: false },
  { id: 2,  type: 'image', src: '/images/mas.JPG',          poster: null, category: 'Photography', alt: 'matts son',   playOnClick: false },
  { id: 3,  type: null,    src: null,                        poster: null, category: null,           alt: '',           playOnClick: false },
  { id: 4,  type: null,    src: null,                        poster: null, category: null,           alt: '',           playOnClick: false },
  { id: 5,  type: 'video', src: 'https://matte-cdn.b-cdn.net/rockmanEdit%20(1).mp4', poster: null, category: 'Videos', alt: '', playOnClick: true },
  { id: 6,  type: 'image', src: '/images/instruments.JPG',  poster: null, category: 'Photography', alt: 'instruments', playOnClick: false },
  { id: 7,  type: null,    src: null,                        poster: null, category: null,           alt: '',           playOnClick: false },
  { id: 8,  type: null,    src: null,                        poster: null, category: null,           alt: '',           playOnClick: false },
  { id: 9,  type: null,    src: null,                        poster: null, category: null,           alt: '',           playOnClick: false },
  { id: 10, type: null,    src: null,                        poster: null, category: null,           alt: '',           playOnClick: false },
  { id: 11, type: null,    src: null,                        poster: null, category: null,           alt: '',           playOnClick: false },
  { id: 12, type: 'video', src: 'https://matte-cdn.b-cdn.net/AISystems.mp4', poster: null, category: 'Videos', alt: '', playOnClick: true },
  { id: 13, type: 'video', src: 'https://matte-cdn.b-cdn.net/Human-Factor1.mp4', poster: null, category: 'Videos', alt: '', playOnClick: true },
  { id: 14, type: null,    src: null,                        poster: null, category: null,           alt: '',           playOnClick: false },
  // { id: 15, type: 'video', src: 'https://matte-cdn.b-cdn.net/Human-Factor1.mp4', poster: null, category: 'Videos', alt: '', playOnClick: true },
  { id: 16, type: null,    src: null,                        poster: null, category: null,           alt: '',           playOnClick: false },
  { id: 17, type: 'video', src: 'https://matte-cdn.b-cdn.net/HCI-02%20(1).mp4', poster: null, category: 'Videos', alt: '', playOnClick: true }, // row 9  — left
  { id: 18, type: 'video', src: 'https://matte-cdn.b-cdn.net/DBFinal.mp4', poster: null, category: 'Websites', alt: '', playOnClick: true }, // row 10 — center
  { id: 19, type: 'video', src: 'https://matte-cdn.b-cdn.net/HCI-02%20(1).mp4', poster: null, category: 'Videos', alt: '', playOnClick: true }, // row 11 — right
  { id: 20, type: 'video', src: 'https://matte-cdn.b-cdn.net/HCI-02%20(1).mp4', poster: null, category: 'Videos', alt: '', playOnClick: true }, // row 12 — center
]
// ──────────────────────────────────────────────────────────────────────────────

const FILTERS = ['Videos', 'Photography', 'Websites', 'TouchDesigner']

function CellMedia({ cell }) {
  const [playing, setPlaying] = useState(false)
  const videoRef = useRef(null)

  if (!cell.src) return null

  if (cell.type === 'image') {
    return <img src={cell.src} alt={cell.alt} className={s.cellMedia} />
  }

  if (cell.type === 'video') {
    if (cell.playOnClick) {
      function handleClick() {
        const v = videoRef.current
        if (!v) return
        if (playing) {
          v.pause()
          setPlaying(false)
        } else {
          v.play()
          setPlaying(true)
        }
      }

      return (
        <div className={s.videoWrap} onClick={handleClick}>
          <video
            ref={videoRef}
            src={cell.src}
            poster={cell.poster ?? undefined}
            className={s.cellMedia}
            loop
            playsInline
          />
          {!playing && (
            <div className={s.playOverlay}>
              <div className={s.playBtn}>
                <svg viewBox="0 0 24 24" fill="currentColor" width="28" height="28">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </div>
            </div>
          )}
        </div>
      )
    }

    return (
      <video
        src={cell.src}
        poster={cell.poster ?? undefined}
        className={s.cellMedia}
        autoPlay
        muted
        loop
        playsInline
      />
    )
  }

  return null
}

export default function Playground() {
  const [active, setActive] = useState([])

  function toggleFilter(f) {
    setActive(prev => prev.includes(f) ? prev.filter(x => x !== f) : [...prev, f])
  }

  return (
    <>
      <Head>
        <title>Playground — MatteBrown Design</title>
      </Head>
      <div className={s.wrap}>
        <div className={s.filters}>
          {FILTERS.map(f => (
            <button
              key={f}
              className={`${s.filterBtn} ${active.includes(f) ? s.filterBtnActive : ''}`}
              onClick={() => toggleFilter(f)}
            >
              {f}
            </button>
          ))}
        </div>

        <div className={s.grid}>
          {CELLS_DATA.map(cell => {
            const dimmed = active.length > 0 && (!cell.category || !active.includes(cell.category))
            return (
              <div
                key={cell.id}
                className={`${s.cell} ${s[`cell${cell.id}`]} ${dimmed ? s.cellDimmed : ''}`}
              >
                <CellMedia cell={cell} />
              </div>
            )
          })}
        </div>
      </div>
    </>
  )
}
