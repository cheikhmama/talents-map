import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useTalentStore = create(
  persist(
    (set, get) => ({
      talents: [
        {
          id: 't1',
          fullName: 'Alice Dev',
          passions: 'Creative Coding & UI Design',
          skills: ['React', 'Tailwind', 'Framer Motion'],
          projects: [{ title: 'Portfolio 2024', year: '2024' }],
          verified: true,
          location: 'Paris, France',
          geo: { x: 48, y: 35 }
        },
        {
          id: 't2',
          fullName: 'Bob Data',
          passions: 'Big Data & AI',
          skills: ['Python', 'Docker', 'TensorFlow'],
          projects: [{ title: 'AI Model', year: '2023' }],
          verified: false,
          location: 'New York, USA',
          geo: { x: 28, y: 40 }
        },
      ],
      myProfileId: null,

      // Actions
      addOrUpdateTalent: (talentData) =>
        set((state) => {
          const isUpdate = state.myProfileId !== null;
          const id = state.myProfileId || `talent-${crypto.randomUUID()}`;

          const newProfile = {
            ...talentData,
            id,
            verified: talentData.verified || false, // Default to false if not specified
          };

          // If updating, replace the existing entry in talents array
          // If creating, add to the beginning
          const newTalents = isUpdate
            ? state.talents.map((t) => (t.id === id ? { ...t, ...newProfile } : t))
            : [newProfile, ...state.talents];

          return {
            talents: newTalents,
            myProfileId: id,
          };
        }),

      getMyProfile: () => {
        const { talents, myProfileId } = get();
        return talents.find((t) => t.id === myProfileId) || null;
      },

      resetData: () => {
        set({
          talents: [],
          myProfileId: null
        });
        window.location.reload();
      },

      generateRandomTalents: () => {
        const randomSkills = ['React', 'Node.js', 'Python', 'Design', 'Marketing', 'Sales', 'Vue', 'Angular', 'Java', 'C++', 'Go', 'Rust', 'AWS', 'Azure'];
        const randomLocations = ['Paris, France', 'New York, USA', 'London, UK', 'Berlin, Germany', 'Tokyo, Japan', 'San Francisco, USA', 'Toronto, Canada'];
        const randomPassions = ['Creative Coding', 'UI/UX Design', 'Data Science', 'Mobile Dev', 'Cloud Architecture', 'Cybersecurity', 'Game Dev'];

        const id = `random-${Date.now()}`;
        const skillCount = Math.floor(Math.random() * 4) + 2;
        const skills = [];
        for (let j = 0; j < skillCount; j++) {
          const s = randomSkills[Math.floor(Math.random() * randomSkills.length)];
          if (!skills.includes(s)) skills.push(s);
        }

        // Find next available letter
        const { talents } = get();
        const usedLetters = talents
          .map(t => {
            const match = t.fullName.match(/^Talent ([A-Z])$/);
            return match ? match[1] : null;
          })
          .filter(Boolean)
          .sort();

        let nextLetter = 'A';
        if (usedLetters.length > 0) {
          const lastChar = usedLetters[usedLetters.length - 1].charCodeAt(0);
          if (lastChar < 90) { // 90 is 'Z'
            nextLetter = String.fromCharCode(lastChar + 1);
          } else {
            nextLetter = String.fromCharCode(65 + Math.floor(Math.random() * 26));
          }
        }

        const newTalent = {
          id,
          fullName: `Talent ${nextLetter}`,
          passions: randomPassions[Math.floor(Math.random() * randomPassions.length)],
          skills,
          projects: [],
          verified: Math.random() > 0.5,
          location: randomLocations[Math.floor(Math.random() * randomLocations.length)],
          geo: { x: Math.random() * 80 + 10, y: Math.random() * 60 + 20 }
        };

        set((state) => ({
          talents: [...state.talents, newTalent],
          // If no profile exists, make this new talent the current profile
          myProfileId: state.myProfileId || newTalent.id
        }));
      }
    }),
    {
      name: 'talents-map-storage',
    }
  )
);

export default useTalentStore;
