import CaseStudyPage from '../../components/CaseStudyPage'

const config = {
  heroVideo: 'https://matte-cdn.b-cdn.net/out/shrtctsDesign.mp4',
  num: '02',
  title: 'SHRTCTS',
  type: 'WEB APP',
  year: '2026',
  role: 'PRODUCT DESIGNER / DEVELOPER',
  tools: ['FIGMA', 'CLAUDE CODE', 'NEXT.JS', 'ADOBE'],
  description: 'SHRTCTS.IO IS A TOOL FOR BUILDERS THAT WANT TO INCREASE THEIR PRODUCTIVITY USING APPS SUCH AS FIGMA, MIRO AND VSCODE BY TRAINING TO LEARN KEYBOARD SHORTCUTS TO BECOME POWER USERS WITH THE KNOWLEDGE TO WORK FASTER AND SMARTER.',
  url: 'https://www.shrtcts.io',
  problem: 'PEOPLE KNOW KEYBOARD SHORTCUTS WOULD MAKE THEM FASTER, BUT READING A LIST OF KEYBINDINGS DOESN\'T BUILD MUSCLE MEMORY AND THERE\'S NO STRUCTURED WAY TO ACTUALLY PRACTICE AND RETAIN THEM.',
  solution: 'shtrcts.io turns shortcut memorization into deliberate practice with structured drills across Figma, Miro, and VSCode that build real muscle memory instead of a cheat sheet you forget the next day.',
  outcome: [
    'THIS APP I STARTED TO REFINE MY WORKFLOW WITH CONNECTING FIGMA VIA MCP IN THE CLAUDE TERMINAL',
    'I REALIZED IT IS IMPORTANT TO CONSIDER AND FULLY DEFINE THE APPLICATION architecture BEFORE BUILDING ANYTHING IN CLAUDE CODE. THIS WOULD HAVE SAVED TIME AND TOKENS BY AVOIDING A SLIGHT REBUILD. ',
    'A LOT OF FRONTEND CHANGES NEEDED TO BE MADE IN CODE DUE TO THE THREE APPS BEING DIFFERENT FRONTENDS. CLAUDE DID NOT HANDLE THAT WELL.',
  ],
  body: [
    {
      type: 'sectionTitle',
      text: 'It started with an idea in Figma, three different arenas with the same base logic.',
    },
    {
      type: 'fullVideo',
      src: 'https://matte-cdn.b-cdn.net/out/shrtctsFigma.mp4',
    },
    {
      type: 'sectionTitle',
      text: 'I forgot to record my prompting of Claude (here is a recording of the project overview). I connected Figma MCP to get a connection between Claude code and the design files and prompted my way through the build stage.',
    },
    {
      type: 'fullVideo',
      src: 'https://matte-cdn.b-cdn.net/out/shrtctsClaude.mp4',
    },
    {
      type: 'sectionTitle',
      text: 'Halfway through I needed to completely overhaul the structure to support subdomains for each of the different applications. Working with Claude to build out dynamic app routing so that I could have three different apps in one with shared login information.',
    },
    {
      type: 'fullVideo',
      src: 'https://matte-cdn.b-cdn.net/out/shrtctsThree.mp4',
    },
    {
      type: 'sectionTitle',
      text: 'With one shared login and account, a user can access and train keyboard shortcuts for any of the three apps that they use. With this structure, future apps can be added easily.',
    },
    {
      type: 'fullVideo',
      src: 'https://matte-cdn.b-cdn.net/out/shrtcsPlay.mp4',
    },
    {
      type: 'sectionTitle',
      text: 'The app has two main modes of play. A user can "Train" with hints and unlimited shortcuts or "Challenge" mode where there are no hints and they have to make few mistakes to level up and learn the next set of shortcuts.',
    },
    {
      type: 'fullVideo',
      src: 'https://matte-cdn.b-cdn.net/out/SHRTCTSCHALLENGE.mp4',
    },
  ],
}

export default function Shrtcts({ dark }) {
  return <CaseStudyPage config={config} />
}
