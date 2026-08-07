import CaseStudyPage from '../../components/CaseStudyPage'

const config = {
  heroVideo: 'https://matte-cdn.b-cdn.net/TidalMain.mp4',
  num: '03',
  title: 'TIDAL MUSIC - COMMUNITY FEATURE',
  type: 'FEATURE ADDITION',
  year: '2025',
  role: 'PRODUCT DESIGNER',
  tools: ['FIGMA'],
  description: 'MODERN MUSIC STREAMING PLATFORMS ALL SEEM TO IGNORE THE MOST IMPORTANT PART OF EXPERIENCING MUSIC - SHARING AND DISCOVERING NEW MUISC WITH OTHER PEOPLE. THIS ADDITIONAL FEATURE IDEA FOR TIDAL HAS USERS ABLE TO VIEW OTHER MEMBERS DISCOVERY PLAYLISTS AS WELL AS PUBLICLY SHARED PLAYLISTS TO FOSTER FINDING NEW ARTISTS THROUGH HUMAN CONNECTION.',
  url: '',
  problem: 'USERS OF MUSIC STREAMING APPS TODAY RELY ON ALGORITHMICALLY DRIVEN MUSIC DISCOVERY, OFTEN LEADING TO A HOMOGENOUS POOL OF THE SAME POPULAR MUSIC AND MISSING OUT ON GREAT NEW ARTISTS.',
  solution: 'A COMMUNITY FEATURE ON TIDAL MUSIC STREAMING PLATFORM WHERE USERS CAN VIEW OTHER MEMBERS WITH SIMILAR MUSIC TASTE AND LISTEN TO THEIR DISCOVERY DAILY PLAYLISTS AS WELL AS PUBLICLY SHARED PLAYLISTS.',
  outcome: [
    'IT IS POSSIBLE TO FIND MEMBER GENERATED PLAYLISTS IN THE CURRENT VERSION OF TIDAL, HOWEVER, IT IS SOMETHING THAT IS BURIED WITHIN THE UI AND DIFFICULT TO ACCESS. THE MAIN DRIVER OF MUSIC DISCOVERY IS ALGORITHMIC ON TIDAL',
    'PUTTING THIS COMMUNITY FEATURE AS A MORE VISIBLE PART OF TIDAL PUSHES THE IDEA THAT MUSIC DISCOVERY AND SHARING IS AN INNATELY HUMAN EXPERIENCE AND LEADS TO MORE PERSONALIZED CONNECTION WITH THE OTHER USERS OF TIDAL.',
    'SOCIAL FEATURES ARE AN AFTERTHOUGHT ON MUSIC STREAMING PLATFORMS TODAY. THEY HAVE THE USER BASE TO CREATE SUCH A FEATURE BUT IN THEIR CURRENT STATE, MOST USERS ARE NOT FINDING NEW MUSIC THROUGH CONNECTING WITH OTHER PEOPLE.',
  ],
  body: [
    {
      type: 'sectionTitle',
      text: 'I grew up in an era where you disovered your new favorite band from a friends older brother. Music was shared as social currency and telling friends about a new band was how we made new friends.',
    },
    {
      type: 'sectionTitle',
      text: 'This informed my concept for a new feature on my favorite music streaming app. Sharing music with other people rather than being pushed music by an algorithm. I conducted 5 interviews with music streaming app users.',
    },
    // { type: 'fullImage', src: '/images/example.png', alt: 'example' },
    { type: 'fullVideo', src: 'https://matte-cdn.b-cdn.net/tidal01.mp4' },
    {
      type: 'sectionTitle',
      text: 'What I discovered is that all participants interviewed prefer to learn about new music from another person who understands their music taste. Connecting to the music felt more personal when they heard it from a friend.',
    },
    {
      type: 'sectionTitle',
      text: 'I took these findings into consideration for this new feature. What I needed was 1) a way to connect users with similar taste in artists and genres and 2) a new set of screens where this "community" feature would be found.',
    },
    { type: 'fullVideo', src: 'https://matte-cdn.b-cdn.net/tidal02.mp4' },
    {
      type: 'sectionTitle',
      text: 'After landing on the scope of this new feature, I created a set of testable wireframes in Figma which I got in front of the previous interview participants to get feedback on.',
    },
    { type: 'fullVideo', src: 'https://matte-cdn.b-cdn.net/tidal03.mp4' },
    {
      type: 'sectionTitle',
      text: 'Using a UI kit from Tidal as well as reference screens from the app, I built out the UI for this new feature and turned it into a prototype in Figma for further usability testing.',
    },
    { type: 'fullVideo', src: 'https://matte-cdn.b-cdn.net/tidal04.mp4' },
    {
      type: 'sectionTitle',
      text: 'Usability testing led me to realize that most of the testers were confused about the "compatability" score that each user in the community had so I reworked that section to make it more clear about how you were matched with other users in the Tidal community page.',
    },
    { type: 'fullVideo', src: 'https://matte-cdn.b-cdn.net/tidal06.mp4' },
    {
      type: 'sectionTitle',
      text: 'That iteration was implemented to create the first version of this new feature. A user could discover other users with similar taste in music through a "Match" score and they would be able to listen to their curated playlists to discover new artists loved by other Tidal users.',
    },
    { type: 'fullVideo', src: 'https://matte-cdn.b-cdn.net/tidal07.mp4' },
    // { type: 'text', text: 'Body paragraph.' },
  ],
}

export default function Tidal({ dark }) {
  return <CaseStudyPage config={config} />
}
