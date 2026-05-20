import CaseStudyPage from '../../components/CaseStudyPage'

const config = {
  heroVideo: 'https://res.cloudinary.com/dzghwkkzb/video/upload/v1778264701/shrtctsDesign_qr421p.mp4',
  num: '02',
  title: 'SHRTCTS',
  type: 'WEB APP',
  year: '2026',
  role: 'PRODUCT DESIGNER / DEVELOPER',
  tools: ['FIGMA', 'CLAUDE CODE', 'NEXT.JS', 'ADOBE'],
  description: 'SHRTCTS.IO IS A TOOL FOR BUILDERS THAT WANT TO INCREASE THEIR PRODUCTIVITY USING APPS SUCH AS FIGMA, MIRO AND VSCODE BY TRAINING TO LEARN KEYBOARD SHORTCUTS TO BECOME POWER USERS WITH THE KNOWLEDGE TO WORK FASTER AND SMARTER.',
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
