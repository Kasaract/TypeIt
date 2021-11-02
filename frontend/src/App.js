import React from 'react';
// import axios from 'axios';

import Routes from './Routes';

function App() {
  // useEffect(async () => {
  //   // Update typing model
  //   for (const model in modelGroups) {
  //     if (modelGroups[model].includes(language.toUpperCase())) {
  //       setModel(models[model]);
  //       // setWords(models[model].preprocess(sampleMorse));
  //       // Update typing text
  //       // await axios
  //       //   .get('http://localhost:4000/sampletext/' + language.toUpperCase())
  //       //   .then((response) => {
  //       //     setWords(models[model].preprocess(response.data.text));
  //       //     setPosition(0);
  //       //     setCharPosition(0);
  //       //     setInput('');
  //       //     setWordIndex(0);
  //       //     setInputStatus(STATECODE.READY);
  //       //   });
  //       break;
  //     }
  //   }
  // }, [language, model]);

  return (
    // <TimeRunningContext.Provider value={{ timeRunning, setTimeRunning }}>
    //   <TimerContext.Provider value={{ time, setTime }}>
    <Routes />
    //   </TimerContext.Provider>
    // </TimeRunningContext.Provider>
  );
}

export default App;
