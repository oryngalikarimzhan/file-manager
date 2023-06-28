import os from 'os';

export function showOSInfo(params) {
  params.forEach((param) => {
    switch (param) {
      case '--eol': {
        console.log('EOL:', JSON.stringify(os.EOL));
        return;
      }
      case '--cpus': {
        console.log('CPUs:');
        console.table(os.cpus().map(({ model, speed }) => ({ model, rate: `${speed / 1000}GHz` })));
        return;
      }
      case '--homedir': {
        console.log('Home directory:', os.userInfo().homedir);
        return;
      }
      case '--username': {
        console.log('Username:', os.userInfo().username);
        return;
      }
      case '--architecture': {
        console.log('Architecture:', process.arch);
        return;
      }
    }
  });
}
