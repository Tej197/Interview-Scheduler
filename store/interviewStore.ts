import { create } from "zustand"
import { persist } from "zustand/middleware"
import { toZonedTime } from "date-fns-tz"

export interface Interview {
  id: string
  candidateName: string
  interviewerName: string
  dateTime: string
  type: "Technical" | "HR" | "Behavioral"
  timeZone: string
}

interface InterviewStore {
  interviews: Interview[]
  addInterview: (interview: Interview) => void
  updateInterview: (id: string, updatedInterview: Partial<Interview>) => void
  deleteInterview: (id: string) => void
  getInterview: (id: string) => Interview | undefined
  moveInterview: (id: string, newDateTime: string) => void
}

export const useInterviewStore = create<InterviewStore>()(
  persist(
    (set, get) => ({
      interviews: [],
      addInterview: (interview) => set((state) => ({ interviews: [...state.interviews, interview] })),
      updateInterview: (id, updatedInterview) =>
        set((state) => ({
          interviews: state.interviews.map((interview) =>
            interview.id === id ? { ...interview, ...updatedInterview } : interview,
          ),
        })),
      deleteInterview: (id) =>
        set((state) => ({
          interviews: state.interviews.filter((interview) => interview.id !== id),
        })),
      getInterview: (id) => get().interviews.find((interview) => interview.id === id),
      moveInterview: (id, newDateTime) =>
        set((state) => ({
          interviews: state.interviews.map((interview) =>
            interview.id === id
              ? {
                  ...interview,
                  dateTime: toZonedTime(new Date(newDateTime), interview.timeZone).toISOString(),
                }
              : interview,
          ),
        })),
    }),
    {
      name: "interview-store",
    },
  ),
)

