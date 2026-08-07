import CaseStudyPage from '../../components/CaseStudyPage'

const config = {
  heroVideo: 'https://matte-cdn.b-cdn.net/contextoMain.mp4',
  num: '01',
  title: 'CONTEXTO',
  type: 'MOBILE APP',
  year: '2025',
  role: 'PRODUCT DESIGNER',
  tools: ['FIGMA', 'FIGJAM'],
  description: 'CONTEXTO IS AN AI DRIVEN LANGUAGE LEARNING APPLICATION FOR INTERMEDIATE TO ADVANCED LEVEL LANGUAGE LEARNERS. USERS ARE TASKED WITH 5 DIFFERENT LANGUAGE EXCERCISES PER DAY THAT CLOSELY MIRROR IMMERSIVE EXPERIENCES TO ACCELERATE ACHIEVING FLUENCY.',
  url: '',
  problem: 'Intermediate to advanced level foreign language learners have few chances to practice their new language in a meaningful way outside of a classroom or immersive experience.',
  solution: 'A daily language "workout" with a set of 5 excersises that are informed by real world language comprehension scenarios and powered by advanced LLMs. Users are also paired with a human that natively speaks the language as their "partner".',
  outcome: [
    'I disovered through my interviews that there was a gap that existed between an app like Duolingo and an immersive travel experience. This is where intermediate to advanced language learners get stuck without opportunities to practice.',
    'Language learners that achieved a level of fluency all had a sense of when they realized that they were capable of using their non native language confidently enough to use it comfortably.',
    'Advancement in LLM technology has its limitations and in order to combat incorrect or false AI information, the app has a language learning "Partner" to allow users to connect with a human native language speaker to practice with.',
    'Voice based learning is much more natural and technically possible with some of the frontier AI models that can be implemented for the audio features of the app.'
  ],
  body: [
    {
      type: 'sectionTitle',
      text: 'This project began with an idea and a round of 6 interviews with intermediate to advanced level language learners.',
    },
    {
      type: 'fullVideo',
      src: 'https://matte-cdn.b-cdn.net/contexto01.mp4',
    },
    {
      type: 'sectionTitle',
      text: 'After affinity diagrams and synthesizing the iterview findings, I discovered that language learners who achieved fluency could each pinpoint when they felt confident with their new language.',
    },
    {
      type: 'sectionTitle',
      text: 'These moments included; using humor in a new language, watching film or television in the new language feeling natural, having the ability to react in a new or unexpected situation and being able to discuss complicated topics like politics or philosophy.',
    },
    {
      type: 'sectionTitle',
      text: 'This informed my user personas and user flows as I designed for these type of lanugage experiences being the focus of the app.',
    },
    {
      type: 'fullVideo',
      src: 'https://matte-cdn.b-cdn.net/contexto02.mp4',
    },
    {
      type: 'sectionTitle',
      text: 'I took my findings into an initial design by a first round of wireframes that I would take to potential users for usability testing.',
    },
    {
      type: 'fullVideo',
      src: 'https://matte-cdn.b-cdn.net/contexto03.mp4',
    },
    {
      type: 'sectionTitle',
      text: 'After successful wireframe testing of the main user flows, I refined the main app components and arranged them into the MVP UI design.',
    },
    {
      type: 'sectionTitle',
      text: 'I ran usability tests with the Figma prototype. What I disocovered is that most users were more interested in a voice based UI where they could "converse" with the LLM in a new language.',
    },
    {
      type: 'fullVideo',
      src: 'https://matte-cdn.b-cdn.net/contexto04.mp4',
    },
    {
      type: 'sectionTitle',
      text: 'This informed my iteration for the MVP in which each conversation context within the app had an option to "hear" as well as "speak" to the LLM in a new language.',
    },
    {
      type: 'sectionTitle',
      text: 'Instead of a clunky UX where a user would type and read on a mobile device, the language learner could practice speaking and listening to the language in a more natural way.',
    },
    {
      type: 'sectionTitle',
      text: 'The trade-off between technical feasability and user experience made this change worth making as I understand that it would be more challenging and expensive to have an audio component to the app. In the end this felt a much more natural way to learn.',
    },
    {
      type: 'fullVideo',
      src: 'https://matte-cdn.b-cdn.net/contexto05.mp4',
    },
    // { type: 'fullImage', src: '/images/example.png', alt: 'example' },
    // { type: 'fullVideo', src: 'https://matte-cdn.b-cdn.net/example.mp4' },
    // { type: 'text', text: 'Body paragraph.' },
  ],
}

export default function Contexto({ dark }) {
  return <CaseStudyPage config={config} />
}
