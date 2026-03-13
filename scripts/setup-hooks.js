import { writeFileSync, chmodSync } from 'fs';
import { execSync } from 'child_process';

const root = execSync('git rev-parse --show-toplevel').toString().trim();

const hook = (name, args) => `#!/bin/sh
export LEFTHOOK_BIN="${root}/server/node_modules/.bin/lefthook"
if [ "$LEFTHOOK" = "0" ]; then exit 0; fi
"$LEFTHOOK_BIN" run "${name}" ${args}
`;

writeFileSync(`${root}/.git/hooks/pre-commit`, hook('pre-commit', '"$@"'));
writeFileSync(`${root}/.git/hooks/commit-msg`, hook('commit-msg', '"$@"'));
chmodSync(`${root}/.git/hooks/pre-commit`, 0o755);
chmodSync(`${root}/.git/hooks/commit-msg`, 0o755);

console.log('✅ Git hooks installed');