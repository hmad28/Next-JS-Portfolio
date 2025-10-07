// lib/tech-config.ts

export const toolStyles: Record<string, { bg: string; text: string }> = {
  Canva: { bg: "bg-cyan-500/90", text: "text-cyan-200" },
  Capcut: { bg: "bg-black/90", text: "text-white" },
  Photography: { bg: "bg-slate-600/90", text: "text-slate-300" },
  Videography: { bg: "bg-gray-400/90", text: "text-gray-200" },
  "Fifa Kit Creator": { bg: "bg-black", text: "text-green-400" },

  // === LANGUAGES ===
  HTML: { bg: "bg-orange-500/90", text: "text-orange-100" },
  CSS: { bg: "bg-blue-500/90", text: "text-blue-100" },
  JavaScript: { bg: "bg-yellow-400/90", text: "text-yellow-800" },
  TypeScript: { bg: "bg-blue-600/90", text: "text-blue-100" },
  PHP: { bg: "bg-violet-400/90", text: "text-violet-200" },
  Python: { bg: "bg-blue-400/90", text: "text-yellow-100" },
  Ruby: { bg: "bg-red-600/90", text: "text-red-100" },
  Java: { bg: "bg-orange-600/90", text: "text-orange-100" },
  C: { bg: "bg-gray-600/90", text: "text-gray-100" },
  "C++": { bg: "bg-blue-700/90", text: "text-blue-100" },
  CSharp: { bg: "bg-purple-600/90", text: "text-purple-100" },
  Go: { bg: "bg-cyan-500/90", text: "text-cyan-100" },
  Rust: { bg: "bg-orange-700/90", text: "text-orange-100" },

  // === FRONTEND FRAMEWORKS ===
  React: { bg: "bg-sky-500/90", text: "text-sky-100" },
  NextJS: { bg: "bg-neutral-900", text: "text-white" },
  Vue: { bg: "bg-emerald-500/90", text: "text-emerald-100" },
  Nuxt: { bg: "bg-green-600/90", text: "text-green-100" },
  Svelte: { bg: "bg-orange-500/90", text: "text-orange-100" },
  Angular: { bg: "bg-red-600/90", text: "text-red-100" },
  AlpineJS: { bg: "bg-teal-500/90", text: "text-teal-100" },
  jQuery: { bg: "bg-blue-400/90", text: "text-blue-100" },

  // === BACKEND FRAMEWORKS ===
  Laravel: { bg: "bg-red-500/90", text: "text-red-100" },
  NodeJS: { bg: "bg-green-600/90", text: "text-green-100" },
  Express: { bg: "bg-gray-800", text: "text-gray-100" },
  Django: { bg: "bg-emerald-700/90", text: "text-emerald-100" },
  Flask: { bg: "bg-gray-700/90", text: "text-gray-200" },
  Spring: { bg: "bg-green-500/90", text: "text-green-100" },
  FastAPI: { bg: "bg-teal-600/90", text: "text-teal-100" },
  ".NET": { bg: "bg-indigo-700/90", text: "text-indigo-100" },

  // === DATABASES ===
  MySQL: { bg: "bg-sky-600/90", text: "text-sky-100" },
  PostgreSQL: { bg: "bg-blue-700/90", text: "text-blue-100" },
  MongoDB: { bg: "bg-green-700/90", text: "text-green-100" },
  SQLite: { bg: "bg-indigo-500/90", text: "text-indigo-100" },
  Firebase: { bg: "bg-amber-500/90", text: "text-amber-100" },
  Supabase: { bg: "bg-emerald-500/90", text: "text-emerald-100" },
  Redis: { bg: "bg-red-600/90", text: "text-red-100" },
  Prisma: { bg: "bg-blue-500/90", text: "text-blue-100" },

  // === TOOLS & LIBRARIES ===
  Tailwind: { bg: "bg-cyan-400/90", text: "text-cyan-100" },
  Bootstrap: { bg: "bg-indigo-600/90", text: "text-indigo-100" },
  Vite: { bg: "bg-purple-500/90", text: "text-purple-100" },
  Webpack: { bg: "bg-blue-700/90", text: "text-blue-100" },
  Babel: { bg: "bg-yellow-500/90", text: "text-yellow-900" },
  ESLint: { bg: "bg-indigo-500/90", text: "text-indigo-100" },
  Prettier: { bg: "bg-pink-500/90", text: "text-pink-100" },
  Git: { bg: "bg-orange-600/90", text: "text-orange-100" },
  GitHub: { bg: "bg-gray-900", text: "text-white" },
  Docker: { bg: "bg-sky-600/90", text: "text-sky-100" },
  Postman: { bg: "bg-orange-500/90", text: "text-orange-100" },
  Figma: { bg: "bg-pink-500/90", text: "text-pink-100" },
  VSCode: { bg: "bg-blue-500/90", text: "text-blue-100" },

  // === CLOUD / DEPLOY ===
  Vercel: { bg: "bg-black", text: "text-white" },
  Netlify: { bg: "bg-emerald-500/90", text: "text-emerald-100" },
  Railway: { bg: "bg-purple-600/90", text: "text-purple-100" },
  Render: { bg: "bg-blue-700/90", text: "text-blue-100" },
  AWS: { bg: "bg-orange-600/90", text: "text-orange-100" },
  GoogleCloud: { bg: "bg-sky-500/90", text: "text-sky-100" },
  Cloudflare: { bg: "bg-orange-400/90", text: "text-orange-100" },
  Bun: { bg: "bg-gray-800", text: "text-white" },
  Deno: { bg: "bg-gray-700/90", text: "text-gray-100" },
};

// List semua tech untuk autocomplete
export const availableTechs = Object.keys(toolStyles).sort();
