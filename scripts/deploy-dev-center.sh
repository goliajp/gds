#!/bin/bash
# deploy dev-center to ds.golia.jp
set -euo pipefail

echo "Building dev-center..."
bunx vite build --config dev-center/vite.config.ts --outDir dist-dev-center

echo "Generating LLM files..."
mkdir -p dev-center/dist-dev-center/llm
cp .claude/rules/gds-lib.md dev-center/dist-dev-center/llm/gds-lib.md
cp .claude/rules/gds-philosophy.md dev-center/dist-dev-center/llm/gds-philosophy.md
cp README.md dev-center/dist-dev-center/llm/readme.md

# generate llms.txt
cat > dev-center/dist-dev-center/llms.txt << 'EOF'
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
EOF

# generate llms-full.txt
cat dev-center/dist-dev-center/llm/gds-lib.md \
    dev-center/dist-dev-center/llm/gds-philosophy.md \
    dev-center/dist-dev-center/llm/readme.md \
    > dev-center/dist-dev-center/llms-full.txt

echo "Deploying to t01:/apps/gds..."
rsync -avz --delete dev-center/dist-dev-center/ t01:/apps/gds/

echo "Done: https://ds.golia.jp"
