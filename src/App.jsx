import { useState, useEffect } from "react";

export default function App() {
  const [sliderValue, setSliderValue] = useState(0.5);
  const [name, setName] = useState("");
  const [isPower, setIsPower] = useState(true)
  const [isBank, setIsBank] = useState(false)

  const clips = {
    Q: {
      src1: "https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3",
      src2: "https://s3.amazonaws.com/freecodecamp/drums/Chord_1.mp3",
      name1: "Heater 1",
      name2: "Chord 1",
      keyCode: "81"
    },
    W: {
      src1: "https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3",
      src2: "https://s3.amazonaws.com/freecodecamp/drums/Chord_2.mp3",
      name1: "Heater 2",
      name2: "Chord 2",
      keyCode: "87"
    },
    E: {
      src1: "https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3",
      src2: "https://s3.amazonaws.com/freecodecamp/drums/Chord_3.mp3",
      name1: "Heater 3",
      name2: "Chord 3",
      keyCode: "69"
    },
    A: {
      src1: "https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3",
      src2: "https://s3.amazonaws.com/freecodecamp/drums/Give_us_a_light.mp3",
      name1: "Heater 4",
      name2: "Shaker",
      keyCode: "65"
    },
    S: {
      src1: "https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3",
      src2: "https://s3.amazonaws.com/freecodecamp/drums/Dry_Ohh.mp3",
      name1: "Clap",
      name2: "Open HH",
      keyCode: "83"
    },
    D: {
      src1: "https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3",
      src2: "https://s3.amazonaws.com/freecodecamp/drums/Bld_H1.mp3",
      name1: "Open HH",
      name2: "Closed HH",
      keyCode: "68"
    },
    Z: {
      src1: "https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3",
      src2: "https://s3.amazonaws.com/freecodecamp/drums/punchy_kick_1.mp3",
      name1: "Kick n' Hat",
      name2: "Punchy Kick",
      keyCode: "90"
    },
    X: {
      src1: "https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3",
      src2: "https://s3.amazonaws.com/freecodecamp/drums/side_stick_1.mp3",
      name1: "Kick",
      name2: "Side Stick",
      keyCode: "88"
    },
    C: {
      src1: "https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3",
      src2: "https://s3.amazonaws.com/freecodecamp/drums/Brk_Snr.mp3",
      name1: "Closed HH",
      name2: "Snare",
      keyCode: "67"
    }
  }

  const drumArr = Object.entries(clips)
  const drumPads = drumArr.map(item => {
    return (
      <div className="drum-pad" id={item[1].keyCode} key={item[1].keyCode} onClick={handleClick}>
        <audio controls src={isBank ? item[1].src2 : item[1].src1} id={item[0]} className="clip"></audio>
        {item[0]}
      </div>
    )
  })

  function handleClick(event) {
    const id = String.fromCharCode(event.target.getAttribute("id"))
    playAudio(id)
  }

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (isPower) {
        const id = event.key.toUpperCase();
        playAudio(id);
      }
    };
  
    document.addEventListener("keydown", handleKeyDown);
  
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [playAudio]);


  function playAudio(id) {
    if (isPower) {
      setName(clips[id].name1)
      const audioElement = document.getElementById(id);
      if (audioElement) {
        audioElement.currentTime = 0;
        audioElement.volume = sliderValue
        audioElement.play();
      }
    }
  }

  const handleSliderChange = (event) => {
    setSliderValue(event.target.value);
    setName(`Volume: ${Math.ceil(sliderValue*100)}`);
  };

  const handlePowerChange = () => {
    setIsPower(prev => !prev)
    if (!isPower) {
      setName("");
    }
  }

  const handleBankChange = () => {
    if (!isPower) {
      setName("");
    } else {
      setIsBank(prev => !prev)
    }
  }

  return (
    <div className="app">
      <div id="drum-machine">
        <div className="drum-pads">
          {drumPads}
        </div>
        <div className="settings">
          <h3>Power</h3>
          <label className="switch">
            <input type="checkbox" id="power" checked={isPower} onChange={handlePowerChange}/>
            <span className="slider"></span>
          </label>
          <div id="display">
            {isPower && name}
          </div>
          <label>
            <input type="range" id="points" name="points" min="0" max="1" step="0.01" value={sliderValue} onInput={handleSliderChange}></input>
          </label>
          <h3>Bank</h3>
          <label className="switch">
            <input type="checkbox" id="bank" checked={isBank} onInput={handleBankChange} />
            <span className="slider"></span>
          </label>
        </div>
      </div>
    </div>
  )
}