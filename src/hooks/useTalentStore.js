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
          talents: [
            {
              id: 't1',
              fullName: 'Alice Dev',
              passions: 'Creative Coding & UI Design',
              skills: ['React', 'Tailwind', 'Framer Motion'],
              projects: [{ title: 'Portfolio 2024', year: '2024' }],
              verified: true,
              location: 'Paris, France',
              geo: { x: 48, y: 35 } // Approx % on map
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
            {
              id: 't3',
              fullName: 'Charlie Design',
              passions: 'UX Research & Accessibility',
              skills: ['Figma', 'CSS', 'User Testing'],
              projects: [{ title: 'E-commerce Redesign', year: '2024' }],
              verified: true,
              location: 'London, UK',
              geo: { x: 46, y: 32 }
            },
            {
              id: 't4',
              fullName: 'David Cloud',
              passions: 'DevOps & Scalability',
              skills: ['AWS', 'Kubernetes', 'Terraform'],
              projects: [{ title: 'Cloud Migration', year: '2023' }],
              verified: false,
              location: 'Berlin, Germany',
              geo: { x: 52, y: 33 }
            }
          ],
          myProfileId: null
        });
        // Force reload to clear any stale state if needed, though zustand updates should handle it
        window.location.reload();
      }
    }),
    {
      name: 'talents-map-storage',
    }
  )
);

export default useTalentStore;

