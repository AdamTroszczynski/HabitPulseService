import { writeFileSync, chmodSync } from "fs";
import { execSync } from "child_process";

const root = execSync("git rev-parse --show-toplevel")
  .toString()
  .trim()
  .replace(/\\/g, "/");

const hook = (name, args) => `#!/bin/sh
export LEFTHOOK_BIN="${root}/server/node_modules/lefthook-windows-x64/bin/lefthook.exe"
if [ "$LEFTHOOK" = "0" ]; then exit 0; fi
"$LEFTHOOK_BIN" run "${name}" ${args}
`;

["pre-commit", "commit-msg", "prepare-commit-msg"].forEach((name) => {
  writeFileSync(`${root}/.git/hooks/${name}`, hook(name, '"$@"'));
  chmodSync(`${root}/.git/hooks/${name}`, 0o755);
});

console.log("✅ Git hooks installed");
