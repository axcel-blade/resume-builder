const fs = require('fs');

let input = '';
try {
  input = fs.readFileSync(0, 'utf8');
} catch {
  input = '';
}

let command = '';
try {
  command = JSON.parse(input || '{}').command || '';
} catch {
  command = input;
}

const denied =
  /git\s+push\s+[^\n]*--force/i.test(command) ||
  /git\s+push\s+[^\n]*-f\b/i.test(command) ||
  /git\s+reset\s+--hard/i.test(command);

if (denied) {
  process.stdout.write(
    JSON.stringify({
      permission: 'deny',
      user_message: 'Blocked a destructive git command (force-push or hard reset).',
      agent_message:
        'A project hook blocked force-push or git reset --hard. Ask the user before using destructive git.',
    }),
  );
  process.exit(0);
}

process.stdout.write(JSON.stringify({ permission: 'allow' }));
