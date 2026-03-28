Deploy the GDS website to production.

Steps:

1. Build the website:
   ```
   cd web && bunx vite build --outDir dist-site
   ```

2. Generate LLM documentation files:
   ```
   mkdir -p web/dist-site/llm
   cp .claude/rules/gds-lib.md web/dist-site/llm/gds-lib.md
   cp .claude/rules/gds-philosophy.md web/dist-site/llm/gds-philosophy.md
   cp README.md web/dist-site/llm/readme.md
   ```

3. Generate `llms.txt` in `web/dist-site/`:
   ```
   # GDS (GOLIA Design System)

   > Enterprise-grade React UI component library with contextual depth, glass materials, spring-based motion, and AI-native structure.

   ## Documentation

   - [GDS Library Standards](https://ds.golia.jp/llm/gds-lib.md): Component patterns, CVA, styling, file structure
   - [Design Philosophy](https://ds.golia.jp/llm/gds-philosophy.md): 10 design principles governing every component
   - [README](https://ds.golia.jp/llm/readme.md): Package info, installation, quick start

   ## Key Facts

   - Package: @goliapkg/gds
   - 400+ components across 8 layers (L0 tokens → L7 patterns)
   - Dark-native, keyboard-first, AI-native
   - Glass material system + spring-based motion
   - Contextual depth auto-scaling
   - React 18+, Tailwind CSS 4+, Jotai state
   ```

4. Generate `llms-full.txt` by concatenating the three LLM docs.

5. Clean the remote directory first, then deploy:
   ```
   ssh t01 'rm -rf /apps/gds/*'
   rsync -avz web/dist-site/ t01:/apps/gds/
   ```

6. Clean up local build artifact:
   ```
   rm -rf web/dist-site
   ```

7. Print confirmation: "Deployed to https://ds.golia.jp"

IMPORTANT:
- Always clean remote before rsync to remove stale hashed assets
- Always clean local dist-site after deploy (it's in .gitignore)
- Do NOT commit dist-site to git
- If any step fails, stop immediately and report the error
