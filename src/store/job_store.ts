import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

export interface Note {
  id: string;
  text: string;
  createdAt: number;
}

export interface Job {
  id: string;
  title: string;
  description: string;
  client: string;
  location: string;
  budget: number;
  createdAt: number;
  notes: Note[];
}

export interface JobUI extends Job {
  displayPrice: string;
  displayDate: string;
  status: 'Active' | 'Pending';
}

interface JobStore {
  jobs: Job[];
  addJob: (job: Omit<Job, 'id' | 'createdAt' | 'notes'>) => void;
  // 👇 NEW: Update Action
  updateJob: (jobId: string, updatedData: Partial<Omit<Job, 'id' | 'createdAt' | 'notes'>>) => void;
  addNote: (jobId: string, text: string) => void;
  getFormattedJobs: () => JobUI[];
  clearJobs: () => void;
}

export const useJobStore = create<JobStore>()(
  persist(
    (set, get) => ({
      jobs: [],

      addJob: (jobData) => {
        const newJob: Job = {
          ...jobData,
          id: Date.now().toString(),
          createdAt: Date.now(),
          budget: Number(jobData.budget) || 0,
          notes: [],
        };
        set((state) => ({ jobs: [newJob, ...state.jobs] }));
      },

      // 👇 NEW: Implementation
      updateJob: (jobId, updatedData) => {
        set((state) => ({
          jobs: state.jobs.map((job) =>
            job.id === jobId ? { ...job, ...updatedData } : job
          ),
        }));
      },

      addNote: (jobId, text) => {
        set((state) => ({
          jobs: state.jobs.map((job) => {
            if (job.id === jobId) {
              const newNote: Note = {
                id: Date.now().toString(),
                text: text,
                createdAt: Date.now(),
              };
              return { ...job, notes: [newNote, ...(job.notes || [])] };
            }
            return job;
          }),
        }));
      },

      getFormattedJobs: () => {
        const rawJobs = get().jobs;
        return rawJobs.map((job) => ({
          ...job,
          displayPrice: `$${job.budget.toLocaleString()}`,
          displayDate: new Date(job.createdAt).toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric',
          }),
          status: 'Active',
        }));
      },

      clearJobs: () => {
        set({ jobs: [] });
      },
    }),
    {
      name: 'job-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);