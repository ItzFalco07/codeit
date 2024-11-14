import {useState, useEffect} from 'react';
import Terminal from 'react-console-emulator'

const Console = () => {
  const commands = {
  echo: {
    description: 'Echo a passed string.',
    usage: 'echo <string>',
    fn: (...args) => args.join(' ')
  }
}

  return (
    <>
      <Terminal
        commands={commands}
        promptLabel={'me@codeit:~$'}
        className="h-full"
      />
    </>
  );
};

export default Console;