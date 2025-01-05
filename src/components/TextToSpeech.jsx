import { useState, useEffect } from "react";

const TextToSpeech = ({ text }) => {
  const [isPaused, setIsPaused] = useState(false);
  const [utterance, setUtterance] = useState(null);
  const [voice, setVoice] = useState(null);
  const [pitch, setPitch] = useState(1);
  const [rate, setRate] = useState(1);
  const [volume, setVolume] = useState(1);
  const [voices, setVoices] = useState([]);

  useEffect(() => {
    const synth = window.speechSynthesis;

    // Function to load voices
    const loadVoices = () => {
      const availableVoices = synth.getVoices();
      setVoices(availableVoices);
      if (!voice) {
        setVoice(availableVoices[0]); // Set default voice if not already set
      }
    };

    // Try to load voices immediately, but if it's not ready, wait for the event
    if (speechSynthesis.onvoiceschanged !== undefined) {
      speechSynthesis.onvoiceschanged = loadVoices;
    } else {
      loadVoices(); // Fallback for environments that do not support the event
    }

    // Delay voice loading on mobile to make sure it's available
    setTimeout(loadVoices, 1000); // 1 second delay to give voices time to load

    return () => {
      if (speechSynthesis.onvoiceschanged !== undefined) {
        speechSynthesis.onvoiceschanged = null;
      }
    };
  }, []);

  useEffect(() => {
    if (utterance) {
      utterance.voice = voice;
      utterance.pitch = pitch;
      utterance.rate = rate;
      utterance.volume = volume;
    }
  }, [voice, pitch, rate, volume, text]);

  const handlePlay = () => {
    const synth = window.speechSynthesis;

    if (isPaused) {
      synth.resume();
    } else {
      const u = new SpeechSynthesisUtterance(text);
      u.voice = voice;
      u.pitch = pitch;
      u.rate = rate;
      u.volume = volume;
      synth.speak(u);
    }

    setIsPaused(false);
  };

  const handlePause = () => {
    const synth = window.speechSynthesis;
    synth.pause();
    setIsPaused(true);
  };

  const handleStop = () => {
    const synth = window.speechSynthesis;
    synth.cancel();
    setIsPaused(false);
  };

  const handleVoiceChange = (event) => {
    const selectedVoice = voices.find((v) => v.name === event.target.value);
    setVoice(selectedVoice);
  };

  const handlePitchChange = (event) => {
    setPitch(parseFloat(event.target.value));
  };

  const handleRateChange = (event) => {
    setRate(parseFloat(event.target.value));
  };

  const handleVolumeChange = (event) => {
    setVolume(parseFloat(event.target.value));
  };

  return (
    <div className="w-full text-white p-4 bg-[#8174A0] rounded-lg shadow-lg">
      {/* Voice Selection */}
      <div>
        <label htmlFor="voices" className="block mb-2 text-lg font-medium">
          Select a Voice:
        </label>
        <select
          id="voices"
          className="bg-white border border-gray-300 text-sm md:text-md rounded-lg block w-full p-2.5 text-black"
          value={voice?.name}
          onChange={handleVoiceChange}
        >
          {voices.map((v) => (
            <option key={v.name} value={v.name}>
              {v.name} ({v.lang})
            </option>
          ))}
        </select>
      </div>

      {/* Sliders for Pitch, Rate, and Volume */}
      <div className="flex flex-col gap-6 md:flex-row md:gap-10 mt-6">
        <label className="text-sm md:text-md font-medium">
          Pitch:
          <input
            type="range"
            min="0.5"
            max="2"
            step="0.1"
            className="w-full h-2 bg-white-200 rounded-lg appearance-none cursor-pointer mt-2"
            value={pitch}
            onChange={handlePitchChange}
          />
        </label>
        <label className="text-sm md:text-md font-medium">
          Speed:
          <input
            type="range"
            min="0.5"
            max="2"
            step="0.1"
            className="w-full h-2 bg-white-200 rounded-lg appearance-none cursor-pointer mt-2"
            value={rate}
            onChange={handleRateChange}
          />
        </label>
        <label className="text-sm md:text-md font-medium">
          Volume:
          <input
            type="range"
            min="0"
            max="1"
            step="0.1"
            className="w-full h-2 bg-white-200 rounded-lg appearance-none cursor-pointer mt-2"
            value={volume}
            onChange={handleVolumeChange}
          />
        </label>
      </div>

      {/* Control Buttons */}
      <div className="flex flex-wrap gap-4 mt-6 justify-center">
        <button
          onClick={handlePlay}
          className="focus:outline-none text-white bg-green-600 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-6 py-2 mr-2"
        >
          {isPaused ? "Resume" : "Play"}
        </button>
        <button
          className="focus:outline-none text-black bg-yellow-300 hover:bg-yellow-500 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm px-6 py-2 mr-2"
          onClick={handlePause}
        >
          Pause
        </button>
        <button
          onClick={handleStop}
          className="focus:outline-none text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-6 py-2"
        >
          Stop
        </button>
      </div>
    </div>
  );
};

export default TextToSpeech;
