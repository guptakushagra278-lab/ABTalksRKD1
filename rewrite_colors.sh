#!/bin/bash
find src -type f -name "*.tsx" -o -name "*.ts" | xargs sed -i 's/bg-\[#0A0A0A\]/bg-ab-surface/g'
find src -type f -name "*.tsx" -o -name "*.ts" | xargs sed -i 's/bg-\[#161616\]/bg-ab-card/g'
find src -type f -name "*.tsx" -o -name "*.ts" | xargs sed -i 's/bg-\[#111\]/bg-ab-card-alt/g'
find src -type f -name "*.tsx" -o -name "*.ts" | xargs sed -i 's/bg-\[#1A1A1A\]/bg-ab-surface-alt/g'
find src -type f -name "*.tsx" -o -name "*.ts" | xargs sed -i 's/border-\[#262626\]/border-ab-border-alt/g'
find src -type f -name "*.tsx" -o -name "*.ts" | xargs sed -i 's/stroke="#262626"/stroke="var(--color-ab-border-alt)"/g'
find src -type f -name "*.tsx" -o -name "*.ts" | xargs sed -i 's/bg-black/bg-ab-black/g'
find src -type f -name "*.tsx" -o -name "*.ts" | xargs sed -i 's/bg-ab-black\/80/bg-ab-black\/80/g'
