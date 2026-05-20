import CaseStudyPage from '../../components/CaseStudyPage'

const config = {
  heroVideo: 'https://res.cloudinary.com/dzghwkkzb/video/upload/v1778281928/curlDesignVideo_yxhpfr.mp4',
  num: '03',
  title: 'CURL',
  type: 'WEB APP',
  year: '2026',
  role: 'PRODUCT DESIGNER / DEVELOPER',
  tools: ['FIGMA', 'CLAUDE', 'CLAUDE CODE', 'NEXT.JS'],
  description: 'CURL IS A SITE FOR DISCOVERING INTERESTING THINGS ONLINE. LARGE PLATFORMS HAVE BECOME THE GATEKEEPERS OF ONLINE CONTENT BUT IT DOES NOT HAVE TO BE LIKE THAT. WITH OVER 3000 CURATED SITES ON CURL, USERS CAN FIND NEW AND INTERESTING WEBSITES AND WEB APPLICATIONS BASED ON THEIR INTERESTS.',
  problem: 'ADD PROBLEM STATEMENT HERE.',
  solution: 'ADD SOLUTION HERE.',
  outcome: [
    'ADD OUTCOME POINT HERE.',
    'ADD OUTCOME POINT HERE.',
    'ADD OUTCOME POINT HERE.',
  ],
}

export default function Curl({ dark }) {
  return <CaseStudyPage config={config} />
}
