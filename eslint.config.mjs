import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";

const eslintConfig = defineConfig([
  ...nextVitals,
  globalIgnores([
    ".next/**",
    "out/**",
    "dist/**",
    "build/**",
    "next-env.d.ts",
    // Other sessions' git worktrees live here and carry their own built
    // .next output, which the root-only ".next/**" above does not cover.
    ".claude/worktrees/**",
  ]),
]);

export default eslintConfig;
