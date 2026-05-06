import s from '../../styles/Home.module.css'
import w from '../../styles/Work.module.css'

const PROJECTS = [
  {
    num: '01',
    name: "THAT'S ON ME",
    type: 'WEB / MOBILE APP',
    year: '[2026]',
    slug: 'thatsonme',
    images: 3,
    rowClass: 'row1',
  },
  {
    num: '02',
    name: 'SHRTCTS',
    type: 'WEB APP',
    year: '[2026]',
    slug: 'shrtcts',
    images: 2,
    rowClass: 'row2',
  },
  {
    num: '03',
    name: 'CURL',
    type: 'WEB APP',
    year: '[2026]',
    slug: 'curl',
    images: 3,
    rowClass: 'row3',
  },
  {
    num: '04',
    name: 'SELFWARE STUDIO',
    type: 'WEB APP',
    year: '[2026]',
    slug: 'selfwarestudio',
    images: 2,
    rowClass: 'row4',
  },
]

export default function Work({ dark }) {
  return (
    <div className={s.page}>

      {/* PAGE HEADER */}
      <section className={w.header}>
        <span className={w.headerTitle}>WORK</span>
        <p className={w.headerTag}>[ SELECTED PROJECTS ]</p>
      </section>

      {/* BENTO CONTAINER */}
      <div className={w.bentoContainer}>
        {PROJECTS.map((project, i) => (
          <div key={project.slug}>
            {/* ROW LABEL */}
            <div className={w.rowLabel}>
              <span className={w.rowNum}>{project.num}</span>
              <span className={w.rowName}>{project.name}</span>
              <span className={w.rowType}>{project.type}</span>
              <span className={w.rowYear}>{project.year}</span>
            </div>

            {/* IMAGE BENTO GRID */}
            <div className={`${w.bentoImages} ${w[project.rowClass]}`}>
              {Array.from({ length: project.images }).map((_, j) => (
                <div key={j} className={w.placeholder} />
              ))}
            </div>

          </div>
        ))}
      </div>

    </div>
  )
}
