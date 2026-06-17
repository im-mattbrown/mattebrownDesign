import CaseStudyPage from '../../components/CaseStudyPage'

const config = {
  heroVideo: 'https://matte-cdn.b-cdn.net/shrtctsDesign.mp4',
  num: '02',
  title: 'SHRTCTS',
  type: 'WEB APP',
  year: '2026',
  role: 'PRODUCT DESIGNER / DEVELOPER',
  tools: ['FIGMA', 'CLAUDE CODE', 'NEXT.JS', 'ADOBE'],
  description: 'SHRTCTS.IO IS A TOOL FOR BUILDERS THAT WANT TO INCREASE THEIR PRODUCTIVITY USING APPS SUCH AS FIGMA, MIRO AND VSCODE BY TRAINING TO LEARN KEYBOARD SHORTCUTS TO BECOME POWER USERS WITH THE KNOWLEDGE TO WORK FASTER AND SMARTER.',
  url: 'https://www.shrtcts.io',
  problem: 'ADD PROBLEM STATEMENT HERE.',
  solution: 'ADD SOLUTION HERE.',
  outcome: [
    'ADD OUTCOME POINT HERE.',
    'ADD OUTCOME POINT HERE.',
    'ADD OUTCOME POINT HERE.',
  ],
}

export default function Shrtcts({ dark }) {
  return <CaseStudyPage config={config} />
}
