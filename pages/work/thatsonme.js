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
  url: 'https://thatson.me',
  problem: "The single biggest friction point in online fashion is the fitting room gap and there's no way to try before you buy, so customers default to hesitation, and businesses pay for it in returns and lost sales.",
  solution: "Upload a photo of yourself, drop in any clothing item, and see yourself wearing it in seconds. Powered by Google's latest image generation model, That's On Me brings the fitting room to wherever you're shopping with no store, no guessing and no regret purchases.",
  outcome: [
    "THIS IS MY FIRST FULL STACK WEB APPLICATION BUILT WITH CLAUDE CODE, I NEED TO REFINE MY PROCESS.",
    "CLAUDE HAS ITS LIMITATIONS AS I DISCOVERED BY THE QUALITY OF THE FRONTEND CODE AND HOW MUCH I NEEDED TO REFINE.",
    "WORKING WITH MODERN MODELS SUCH AS GOOGLE'S IMAGE GENERATION API IS SIMPLER THAN EXPECTED AND SHOULD BE A PART OF MY PROJECTS.",
  ],
  body: [
    {
      type: 'sectionTitle',
      text: 'I built this before learning Figma MCP so it started directly in Figma.',
    },
    {
      type: 'fullVideo',
      src: 'https://matte-cdn.b-cdn.net/TOM_FIgma_01.mp4',
    },
    {
      type: 'sectionTitle',
      text: 'Next step was to feed screenshots into Claude Desktop.',
    },
    {
      type: 'fullVideo',
      src: 'https://matte-cdn.b-cdn.net/TOM_Claude_02.mp4',
    },
    {
      type: 'sectionTitle',
      text: 'Followed by refining the frontend code created by Claude Code.',
    },
    {
      type: 'fullVideo',
      src: 'https://matte-cdn.b-cdn.net/TOM_Code.mp4',
    },
    {
      type: 'sectionTitle',
      text: 'Once the frontend is rewritten, time to test the image generation.',
    },
    {
      type: 'fullVideo',
      src: 'https://matte-cdn.b-cdn.net/TOM_Testing.mp4',
    },
    {
      type: 'sectionTitle',
      text: 'And finally before launch, I made the app responsive for mobile viewports and made a demo video.',
    },
    {
      type: 'fullVideo',
      src: 'https://matte-cdn.b-cdn.net/TOM_Mobile.mp4',
    },
  ],
}

export default function ThatsOnMe({ dark }) {
  return <CaseStudyPage config={config} />
}
