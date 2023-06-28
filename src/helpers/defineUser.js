export function defineUser() {
  const args = process.argv.slice(2);

  const anonymous = 'Anonymous';

  if (args.length === 0) {
    return anonymous;
  }

  const argsMap = getArgsMap(args);

  return argsMap['--username'] || anonymous;
}

function getArgsMap(args) {
  const argsEntry = args.map((arg) => arg.split('='));
  return Object.fromEntries(argsEntry);
}
