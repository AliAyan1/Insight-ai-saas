// File: tailwind.config.ts

import type { Config } from "tailwindcss";

const config: Config = {
  // ... aapki baaqi config
  plugins: [
    require("@tailwindcss/typography"), // <-- YEH LINE ADD KAREIN
  ],
};
export default config;