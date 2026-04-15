@tailwind base;
@tailwind components;
@tailwind utilities;

:root {
  color-scheme: dark;
}

html, body {
  background: #020617;
  color: #e2e8f0;
}

body {
  min-height: 100vh;
  background-image: radial-gradient(circle at top, rgba(59,130,246,.18), transparent 30%);
}

.card {
  @apply rounded-2xl border border-slate-800 bg-slate-900/80 shadow-lg shadow-black/20 backdrop-blur;
}

.label {
  @apply text-xs uppercase tracking-[0.2em] text-slate-400;
}

.input {
  @apply w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm text-slate-100 outline-none transition focus:border-sky-400;
}

.button-primary {
  @apply rounded-xl bg-sky-500 px-4 py-3 text-sm font-medium text-slate-950 transition hover:bg-sky-400 disabled:opacity-50;
}

.button-secondary {
  @apply rounded-xl border border-slate-700 px-4 py-3 text-sm font-medium text-slate-100 transition hover:border-slate-500 hover:bg-slate-800;
}
