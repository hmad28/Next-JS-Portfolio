export const categoryStyles: Record<string, { text: string }> = {
  Design: { text: "text-orange-500" },
  "Graphic Design": { text: "text-orange-400" },
  "UI/UX Design": { text: "text-pink-500" },
  "Frontend Development": { text: "text-blue-500" },
  "Backend Development": { text: "text-indigo-500" },
  "Fullstack Web Development": { text: "text-emerald-500" },
  "Mobile Development": { text: "text-green-500" },
  "Video Editing": { text: "text-purple-500" },
  "Photo Editing": { text: "text-fuchsia-500" },
  Multimedia: { text: "text-yellow-500" },
  "Content Creation": { text: "text-rose-500" },
  "Public Speaking": { text: "text-red-500" },
  Teach: { text: "text-teal-500" },
  Writing: { text: "text-amber-600" },
  Course: { text: "text-cyan-500" },
  Competition: { text: "text-violet-600" },
  Research: { text: "text-sky-500" },
  "Cyber Security": { text: "text-gray-700" },
  "Data Science": { text: "text-lime-600" },
  "Open Source": { text: "text-green-600" },
  "Project Management": { text: "text-indigo-600" },
  Entrepreneurship: { text: "text-pink-600" },
  "Community Event": { text: "text-blue-600" },
  Collaboration: { text: "text-emerald-600" },
};

// List semua tech untuk autocomplete
export const availableCategories = Object.keys(categoryStyles).sort();
