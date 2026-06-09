import CaseStudyPage from '../../components/CaseStudyPage'

const config = {
  heroVideo: 'https://matte-cdn.b-cdn.net/THATSONMEDESIGN.mp4',
  num: '01',
  title: "THAT'S ON ME",
  type: 'WEB / MOBILE APP',
  year: '2026',
  role: 'PRODUCT DESIGNER / DEVELOPER',
  tools: ['FIGMA', 'CLAUDE CODE', 'GOOGLE GEMINI', 'NEXT.JS'],
  description: "VIRTUAL CLOTHES TRYON APP USING GOOGLE'S IMAGE GENERATION MODEL TO MIX IMAGES OF USERS AND ITEMS OF CLOTHING. USERS GET AN IDEA OF WHAT CLOTHES WILL LOOK LIKE ON THEM AND BUSINESSES WILL HAVE LESS CARTS GO EMPTY. DESIGNED IN FIGMA BUILT WITH CLAUDE CODE.",
  problem: 'ADD PROBLEM STATEMENT HERE.',
  solution: 'ADD SOLUTION HERE.',
  outcome: [
    'ADD OUTCOME POINT HERE.',
    'ADD OUTCOME POINT HERE.',
    'ADD OUTCOME POINT HERE.',
  ],
}

export default function ThatsOnMe({ dark }) {
  return <CaseStudyPage config={config} />
}
