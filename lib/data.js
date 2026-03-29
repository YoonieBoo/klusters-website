const CREATORS_KEY = 'kluster_creators'
const DATA_VERSION_KEY = 'kluster_data_version'
const CURRENT_DATA_VERSION = '6'

const seedCreators = [
  {
    id: '1',
    slug: 'test-user-1',
    name: 'Test User 1',
    title: 'Product Designer',
    location: 'Bangkok, Thailand',
    bio: 'I design digital products that people love to use. With 8 years of experience in tech, I specialize in creating intuitive interfaces for complex systems.',
    skills: ['UI Design', 'UX Research', 'Figma', 'Prototyping', 'Design Systems'],
    photoUrl: '/creators/main.jpg',
    links: [],
    socials: {},
    showcaseItems: [],
    role: 'creator',
  },
  {
    id: '2',
    slug: 'test-user-2',
    name: 'Test User 2',
    title: 'Full Stack Developer',
    location: 'Austin, TX',
    bio: 'Building web applications that scale. I love working with React, Node.js, and cloud technologies to create seamless user experiences.',
    skills: ['React', 'Node.js', 'TypeScript', 'AWS', 'PostgreSQL'],
    photoUrl: '/creators/user-1.jpg',
    links: [],
    socials: {},
    showcaseItems: [],
    role: 'creator',
  },
  {
    id: '3',
    slug: 'test-user-3',
    name: 'Test User 3',
    title: 'Brand Strategist',
    location: 'New York, NY',
    bio: 'I help startups find their voice and build memorable brands. From naming to visual identity, I craft stories that resonate with audiences.',
    skills: ['Brand Strategy', 'Copywriting', 'Visual Identity', 'Market Research'],
    photoUrl: '/creators/user-2.jpg',
    links: [],
    socials: {},
    showcaseItems: [],
    role: 'creator',
  },
  {
    id: '4',
    slug: 'test-user-4',
    name: 'Test User 4',
    title: 'Video Editor & Filmmaker',
    location: 'Los Angeles, CA',
    bio: 'Crafting visual stories that captivate audiences. I specialize in documentary-style content, commercials, and social media videos.',
    skills: ['Video Editing', 'Motion Graphics', 'Color Grading', 'Adobe Premiere', 'After Effects'],
    photoUrl: '/creators/user-3.jpg',
    links: [],
    socials: {},
    showcaseItems: [],
    role: 'creator',
  },
  {
    id: '5',
    slug: 'test-user-5',
    name: 'Test User 5',
    title: 'Illustrator & Artist',
    location: 'Seattle, WA',
    bio: 'Creating whimsical illustrations that bring ideas to life. From editorial to children’s books, I blend traditional and digital techniques.',
    skills: ['Illustration', 'Character Design', 'Procreate', 'Adobe Illustrator', 'Watercolor'],
    photoUrl: '/creators/user-4.jpg',
    links: [],
    socials: {},
    showcaseItems: [],
    role: 'creator',
  },
  {
    id: '6',
    slug: 'test-user-6',
    name: 'Test User 6',
    title: 'Photographer',
    location: 'Chicago, IL',
    bio: 'Capturing authentic moments and compelling portraits. Specializing in lifestyle, product, and event photography.',
    skills: ['Photography', 'Lightroom', 'Portrait Photography', 'Product Photography', 'Photo Editing'],
    photoUrl: '/creators/user-5.jpg',
    links: [],
    socials: {},
    showcaseItems: [],
    role: 'creator',
  },
]

export function initializeData() {
  if (typeof window === 'undefined') return

  const storedVersion = localStorage.getItem(DATA_VERSION_KEY)
  const existing = localStorage.getItem(CREATORS_KEY)

  if (!existing || storedVersion !== CURRENT_DATA_VERSION) {
    localStorage.setItem(CREATORS_KEY, JSON.stringify(seedCreators))
    localStorage.setItem(DATA_VERSION_KEY, CURRENT_DATA_VERSION)
  }
}

export function getCreators() {
  if (typeof window === 'undefined') return []
  initializeData()
  const data = localStorage.getItem(CREATORS_KEY)
  return data ? JSON.parse(data) : []
}

export function getCreatorById(id) {
  return getCreators().find((creator) => creator.id === id) || null
}

export function getCreatorBySlug(slug) {
  return getCreators().find((creator) => creator.slug === slug) || null
}

export function updateCreator(id, updates) {
  const creators = getCreators()
  const index = creators.findIndex((creator) => creator.id === id)
  if (index === -1) return null

  creators[index] = { ...creators[index], ...updates }
  localStorage.setItem(CREATORS_KEY, JSON.stringify(creators))
  return creators[index]
}

export function deleteCreator(id) {
  const filtered = getCreators().filter((creator) => creator.id !== id)
  localStorage.setItem(CREATORS_KEY, JSON.stringify(filtered))
}

export function addShowcaseItem(creatorId, item) {
  const creators = getCreators()
  const index = creators.findIndex((creator) => creator.id === creatorId)
  if (index === -1) return null

  const newItem = { ...item, id: Date.now().toString() }
  creators[index].showcaseItems.push(newItem)
  localStorage.setItem(CREATORS_KEY, JSON.stringify(creators))
  return newItem
}

export function updateShowcaseItem(creatorId, itemId, updates) {
  const creators = getCreators()
  const creatorIndex = creators.findIndex((creator) => creator.id === creatorId)
  if (creatorIndex === -1) return null

  const itemIndex = creators[creatorIndex].showcaseItems.findIndex((item) => item.id === itemId)
  if (itemIndex === -1) return null

  creators[creatorIndex].showcaseItems[itemIndex] = {
    ...creators[creatorIndex].showcaseItems[itemIndex],
    ...updates,
  }
  localStorage.setItem(CREATORS_KEY, JSON.stringify(creators))
  return creators[creatorIndex].showcaseItems[itemIndex]
}

export function deleteShowcaseItem(creatorId, itemId) {
  const creators = getCreators()
  const creatorIndex = creators.findIndex((creator) => creator.id === creatorId)
  if (creatorIndex === -1) return

  creators[creatorIndex].showcaseItems = creators[creatorIndex].showcaseItems.filter((item) => item.id !== itemId)
  localStorage.setItem(CREATORS_KEY, JSON.stringify(creators))
}

export function searchCreators(query) {
  const creators = getCreators()
  if (!query) return creators

  const lowerQuery = query.toLowerCase()
  return creators.filter(
    (creator) =>
      creator.name.toLowerCase().includes(lowerQuery) ||
      creator.skills.some((skill) => skill.toLowerCase().includes(lowerQuery)) ||
      creator.title.toLowerCase().includes(lowerQuery),
  )
}
