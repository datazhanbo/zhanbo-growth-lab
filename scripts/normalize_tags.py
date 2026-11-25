#!/usr/bin/env python3
"""把 content 下 frontmatter tags 按 data/tag_aliases.yaml 规范名合并。

用法：
  python3 scripts/normalize_tags.py
  python3 scripts/normalize_tags.py --dry-run
"""

from __future__ import annotations

import re
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
ALIAS_FILE = ROOT / "data" / "tag_aliases.yaml"
CONTENT = ROOT / "content"


def load_aliases() -> dict[str, str]:
    mapping: dict[str, str] = {}
    in_block = False
    for line in ALIAS_FILE.read_text(encoding="utf-8").splitlines():
        if line.strip().startswith("canonical:"):
            in_block = True
            continue
        if not in_block or not line.strip() or line.lstrip().startswith("#"):
            continue
        m = re.match(r'^\s*"([^"]+)":\s*"([^"]+)"\s*$', line)
        if m:
            mapping[m.group(1)] = m.group(2)
    return mapping


def parse_tags(raw: str) -> list[str]:
    return [a or b for a, b in re.findall(r'"([^"]+)"|\'([^\']+)\'', raw)]


def normalize(
    tags: list[str], aliases: dict[str, str]
) -> tuple[list[str], list[tuple[str, str]]]:
    out: list[str] = []
    seen: set[str] = set()
    renames: list[tuple[str, str]] = []
    for t in tags:
        c = aliases.get(t, t)
        if c != t:
            renames.append((t, c))
        if c not in seen:
            seen.add(c)
            out.append(c)
    return out, renames


def main() -> int:
    aliases = load_aliases()
    dry = "--dry-run" in sys.argv
    changed = 0
    rename_n = 0
    for path in sorted(CONTENT.rglob("*.md")):
        text = path.read_text(encoding="utf-8")
        if not text.startswith("---"):
            continue
        parts = text.split("---", 2)
        if len(parts) < 3:
            continue
        fm, body = parts[1], parts[2]
        m = re.search(r"^tags:\s*\[(.*?)\]\s*$", fm, re.M | re.S)
        if not m:
            continue
        old = parse_tags(m.group(1))
        new, renames = normalize(old, aliases)
        if old == new:
            continue
        changed += 1
        rename_n += len(renames)
        print(f"{path.relative_to(ROOT)}:")
        for a, b in renames:
            print(f"  {a} -> {b}")
        if not dry:
            new_fm = (
                fm[: m.start()]
                + "tags: ["
                + ", ".join(f'"{t}"' for t in new)
                + "]"
                + fm[m.end() :]
            )
            path.write_text("---" + new_fm + "---" + body, encoding="utf-8")
    print(f"{'DRY ' if dry else ''}files={changed} renames={rename_n}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
