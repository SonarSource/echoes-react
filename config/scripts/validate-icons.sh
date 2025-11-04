#!/bin/bash

ICONS_DIR="src/components/icons"
INDEX_FILE="$ICONS_DIR/index.ts"

if [ ! -f "$INDEX_FILE" ]; then
  echo "Error: Index file $INDEX_FILE not found."
  exit 1
fi

# Find all Icon*.tsx files except IconWrapper.tsx
icon_files=$(find "$ICONS_DIR" -maxdepth 1 -name "Icon*.tsx" ! -name "IconWrapper.tsx" -type f | sort)

missing_exports=()
incorrect_exports=()

# Check each icon file has a corresponding export
for icon_file in $icon_files; do
  icon_name=$(basename "$icon_file" .tsx)
  if ! grep -q "^export { $icon_name } from './$icon_name';" "$INDEX_FILE"; then
    missing_exports+=("$icon_name")
  fi
done

# Check for exports without corresponding files
exported_icons=$(grep -E "^export \{ Icon[A-Za-z0-9]+ \} from '\./Icon[A-Za-z0-9]+';" "$INDEX_FILE" | sed -E "s/export \{ (Icon[A-Za-z0-9]+) \} from '\.\/(Icon[A-Za-z0-9]+)';/\1/")

for exported_icon in $exported_icons; do
  if [ ! -f "$ICONS_DIR/$exported_icon.tsx" ]; then
    incorrect_exports+=("$exported_icon")
  fi
done

# Report results
if [ ${#missing_exports[@]} -gt 0 ]; then
  echo "Missing exports in $INDEX_FILE:"
  printf '  - %s\n' "${missing_exports[@]}"
  echo ""
fi

if [ ${#incorrect_exports[@]} -gt 0 ]; then
  echo "Exports without corresponding files:"
  printf '  - %s\n' "${incorrect_exports[@]}"
  echo ""
fi

if [ ${#missing_exports[@]} -gt 0 ] || [ ${#incorrect_exports[@]} -gt 0 ]; then
  echo "Icon exports validation failed."
  exit 1
fi

echo "All icon exports are correct."
