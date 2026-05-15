"use client";

import { create } from "zustand";

interface CourseContext {
  courseId: string | null;
  courseSlug: string | null;
  userId: string | null;
  setContext: (ctx: { courseId: string; courseSlug: string; userId: string }) => void;
  reset: () => void;
}

export const useCourseStore = create<CourseContext>((set) => ({
  courseId: null,
  courseSlug: null,
  userId: null,
  setContext: ({ courseId, courseSlug, userId }) => set({ courseId, courseSlug, userId }),
  reset: () => set({ courseId: null, courseSlug: null, userId: null }),
}));
