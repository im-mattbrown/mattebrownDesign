import CaseStudyPage from '../../components/CaseStudyPage'

const config = {
  heroVideo: 'https://matte-cdn.b-cdn.net/curlDesignVideo.mp4',
  num: '03',
  title: 'CURL',
  type: 'WEB APP',
  year: '2026',
  role: 'PRODUCT DESIGNER / DEVELOPER',
  tools: ['FIGMA', 'CLAUDE', 'CLAUDE CODE', 'NEXT.JS'],
  description: 'CURL IS A SITE FOR DISCOVERING INTERESTING THINGS ONLINE. LARGE PLATFORMS HAVE BECOME THE GATEKEEPERS OF ONLINE CONTENT BUT IT DOES NOT HAVE TO BE LIKE THAT. WITH OVER 3000 CURATED SITES ON CURL, USERS CAN FIND NEW AND INTERESTING WEBSITES AND WEB APPLICATIONS BASED ON THEIR INTERESTS.',
  url: 'https://www.curl.fyi',
  problem: "The discovery layer of the internet was effectively killed when algorithmic social feeds replaced open browsing. Curl rebuilds that layer for people who want to explore the web, not just consume it. CURL is for the person who just wants to find something interesting they didn't know existed.",
  solution: "Curl is a human-curated web discovery platform that serves you one interesting website at a time with no biased algorithm, no feed and no social graph. You press curl, you go somewhere new. The sites are hand-picked across dozens of topics and niches, skewing toward the obscure, the weird, and the genuinely interesting. You tell Curl what you're into, and it handles the rest, surfacing corners of the internet you never would have found on your own, one curl at a time.",
  outcome: [
    'I REALLY PUSHED FOR A BACK AND FORTH CONNECTION TO FIGMA MCP. FEEDING IT WIREFRAMES AND A PROMPT FOR THE UI, THEN REFINING THE UI IN FIGMA AND USING CLUADE TO UPDATE THE FRONTEND CODE.',
    'CLAUDE IS NOT GREAT AT GETTING THINGS PIXEL PERFECT THE FIRST TIME AROUND AND I HAD TO BE SURE TO REVIEW EACH CHANGE CAREFULLY FOR THINGS LIKE SPACING AND OTHER STYLING.',
    'THE CRUX OF THIS APP IS TO HAVE INTERESTING AND UNIQUE WEBSITES. THIS REQUIRED HELP FROM CLAUDE TO SEED THE DATABASE AND A LOT OF PRUNING, EDITING AND CURATING OF THE SEED DATA.',
  ],
  body: [
    {
      type: 'sectionTitle',
      text: 'It started with an idea and a few simple wireframes.',
    },
    {
      type: 'fullImage',
      src: '/images/curlWires.png',
      alt: 'Curl wireframes',
    },
    {
      type: 'sectionTitle',
      text: 'Then came the prompt and Figma MCP connection to start the design.',
    },
    {
      type: 'fullVideo',
      src: 'https://matte-cdn.b-cdn.net/CURL_MCP.mp4',
    },
    {
      type: 'sectionTitle',
      text: 'Followed by refining the UI directly in Figma.',
    },
    {
      type: 'fullVideo',
      src: 'https://matte-cdn.b-cdn.net/curlDesignFigma.mp4',
    },
    {
      type: 'sectionTitle',
      text: 'Next step is to build out the websites to seed the database by prompting Claude and hand curating the results.',
    },
    {
      type: 'fullVideo',
      src: 'https://matte-cdn.b-cdn.net/curlClaudeChat.mp4',
    },
  ],
}

export default function Curl({ dark }) {
  return <CaseStudyPage config={config} />
}
