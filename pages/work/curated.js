import CaseStudyPage from '../../components/CaseStudyPage'

const config = {
  heroVideo: 'https://matte-cdn.b-cdn.net/curatedMain.mp4',
  num: '02',
  title: 'CURATED',
  type: 'WEB APP',
  year: '2025',
  role: 'PRODUCT DESIGNER',
  tools: ['FIGMA'],
  description: 'THE RIGHT PLAYLIST CAN COMPLETELY CHANGE AN EXPERIENCE, MAKING A TIME AND PLACE MORE MEMORABLE. TODAY WE INCREASINGLY RELY ON ALGORITHMS TO DRIVE MUSIC DISCOVERY AND INFORM OUR MUSIC CHOICES. CURATED TAKES THE POWER BACK TO THE PEOPLE THAT DEFINE TASTE BY PROVIDING A MARKETPLACE OF WELL CRAFTED MUSIC PLAYLISTS AND MUSIC BASED STORIES.',
  url: '',
  problem: 'IN THE CURRENT LANDSCAPE OF MUSIC STREAMING PLATFORMS, ALGORITHMS ARE THE GATEKEEPERS OF DISCOVERING NEW MUSIC. WE INCREASINGLY RELY ON TECH COMPANIES WHO PUSH THE SAME FEW INDUSTRY FAVORITE ARTISTS AND SEEM TO IGNORE THE HUMAN ELEMENT OF FINDING NEW MUSIC.',
  solution: 'CURATED IS A MARKETPLACE OF MUSIC ENTHUSIASTS WHO SHARE WELL CRAFTED PLAYLISTS AS WELL AS BLOG STYLE STORIES BEHIND THEIR FAVORITE MUSIC GENRES AND ARTISTS. THE GOAL OF THIS PLATFORM IS TO GIVE THE POWER OF MUSIC DISCOVERY BACK TO THE PEOPLE WHO DEFINE TASTE.',
  outcome: [
    'PEOPLE THAT I INTERVIEWED WERE AS INTERESTED IN THE STORIES BEHIND THE MUSIC THEY WERE DISCOVERING AND SO THE IDEA OF MUSIC STORIES CAME FROM THAT. SORT OF LIKE A BLOG THAT CAN BE PLAYED AS AUDIO LIKE A RADIO HOUR DJ SET.',
    'THE FIRST ITERATION OF THE EDITOR TOOLS FOR CREATING A MUSIC PLAYLIST OR STORY WAS NOT AS INTUATIVE AS IT SHOULD HAVE BEEN. WHAT I ENDED UP CREATING WAS A MODULAR WYSIWYG STYLE SYSTEM WHERE A USER COULD BUILD AND PREVIEW THEIR PLAYLIST.',
    'I SHORTENED THE ONBOARDING PROCESS TO ONLY INCLUDE A USERS FAVORITE GENRE SO THAT INFORMATION WAS DISPLAYED ON THEIR PROFILE. IN THE FIRST ITERATION I WAS CAPTURING THE USERS FAVORITE ARTISTS BUT THAT ULTIMATELY BECAME UNNECESSARY.',
  ],
  body: [
    {
      type: 'sectionTitle',
      text: 'Music has a unique ability to affect our lives. The right playlist can make a roadtrip fly by and be remembered for years. Discovering a new favorite artist or song can change the way you feel and elevate your mood.',
    },
    {
      type: 'sectionTitle',
      text: 'Out of this thought was born the idea for an app that pushed new music discovery. I interviewed 6 music creators and enthusiasts in order to better understand how they connect to the artform.',
    },
    // { type: 'fullImage', src: '/images/example.png', alt: 'example' },
    { type: 'fullVideo', src: 'https://matte-cdn.b-cdn.net/curated011.mp4' },
    {
      type: 'sectionTitle',
      text: 'What I discovered through these conversations is that people trust music recommendations from other humans that they feel a connection to. Beyond that, most of these participants were interested in the stories behind the music that they were listening to.',
    },
    {
      type: 'sectionTitle',
      text: 'My competition analysis revealed a gap in the market. Many playlist marketplaces existed - most of them were geared towards charging artists money to get their music on public playlists. There were no great D2C applications where users could discover expert crafted playlists and blog style music stories.',
    },
    // { type: 'fullImage', src: '/images/example.png', alt: 'example' },
    { type: 'fullVideo', src: 'https://matte-cdn.b-cdn.net/curated02.mp4' },
    {
      type: 'sectionTitle',
      text: 'This led me to the idea of an application where users could 1) Discover well crafted playlists and music stories 2) Connect with a community of music enthusiasts 3) Create their own playlists and blog style stories to share with the Curated community',
    },
    {
      type: 'sectionTitle',
      text: 'I then had two unique personas to design for. The user that wants to discover new music and the user that wants to make a name for themselves as music curators who share playlists with others.',
    },
    // { type: 'fullImage', src: '/images/example.png', alt: 'example' },
    { type: 'fullVideo', src: 'https://matte-cdn.b-cdn.net/curated03.mp4' },
    {
      type: 'sectionTitle',
      text: 'The first draft of wireframes were meant to test users preferences for the dashboard layout inlcuding the Discover page, Profile page and Community page. I built low and mid fidelity wireframes before moving into creating a visual design system and components.',
    },
    // { type: 'fullImage', src: '/images/example.png', alt: 'example' },
    { type: 'fullVideo', src: 'https://matte-cdn.b-cdn.net/curated04.mp4' },
    {
      type: 'sectionTitle',
      text: 'The next step was to create resuable components and define the visual identity of Curated. I created screens for the main features of the app and wired them up into a clickable prototype for user testing.',
    },
    // { type: 'fullImage', src: '/images/example.png', alt: 'example' },
    { type: 'fullVideo', src: 'https://matte-cdn.b-cdn.net/curated05.mp4' },
    // { type: 'fullImage', src: '/images/example.png', alt: 'example' },
    // { type: 'fullVideo', src: 'https://matte-cdn.b-cdn.net/example.mp4' },
    // { type: 'text', text: 'Body paragraph.' },
  ],
}

export default function Curated({ dark }) {
  return <CaseStudyPage config={config} />
}
