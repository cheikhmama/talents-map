import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useProjectStore = create(
  persist(
    (set, get) => ({
      projects: [],
      invitations: [],

      // Add a new project
      addProject: (project) =>
        set((state) => ({
          projects: [
            {
              ...project,
              id: `proj-${crypto.randomUUID()}`,
              createdAt: new Date().toISOString(),
            },
            ...state.projects,
          ],
        })),

      // Invite a talent to a project
      inviteTalent: (projectId, talentId) =>
        set((state) => {
          // Prevent duplicate invitations
          const exists = state.invitations.some(
            (inv) => inv.projectId === projectId && inv.talentId === talentId
          );
          if (exists) return {};

          return {
            invitations: [
              ...state.invitations,
              {
                id: `inv-${crypto.randomUUID()}`,
                projectId,
                talentId,
                status: "pending", // pending | accepted | denied
                timestamp: new Date().toISOString(),
              },
            ],
          };
        }),

      // Respond to an invitation
      respondToInvitation: (invId, status) =>
        set((state) => ({
          invitations: state.invitations.map((inv) =>
            inv.id === invId ? { ...inv, status } : inv
          ),
        })),

      // Selectors
      getInvitationsForTalent: (talentId) => {
        const { invitations, projects } = get();
        return invitations
          .filter((inv) => inv.talentId === talentId)
          .map((inv) => {
            const project = projects.find((p) => p.id === inv.projectId);
            return { ...inv, project };
          });
      },

      getProject: (id) => get().projects.find((p) => p.id === id),
    }),
    {
      name: "projects-map-storage",
    }
  )
);