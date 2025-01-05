import React, { useState } from "react";
import TextToSpeech from "./components/TextToSpeech";

const App = () => {
  const [text, setText] = useState("");

  return (
    <div className="flex flex-col gap-8 items-center justify-center h-screen p-4 ">
      {/* Title */}
      <h1 className="font-bold text-3xl md:text-4xl lg:text-5xl text-white text-center font-poppins">
        Text to Speech Converter
      </h1>

      {/* Shared Container for Consistent Width */}
      <div className="w-full max-w-3xl flex flex-col gap-8">
        {/* Text-to-Speech Features */}
        <TextToSpeech text={text} />

        {/* Textarea Input */}
        <textarea
          id="editor"
          rows="6"
          className="block w-full rounded-md p-3 text-base md:text-lg text-gray-800 bg-white border-0 placeholder-gray-500 placeholder:text-sm md:placeholder:text-lg outline-purple-700 resize-none shadow-md"
          placeholder="Please enter your text to select voices..."
          onChange={(e) => setText(e.target.value)}
          required
        ></textarea>
      </div>
    </div>
  );
};

export default App;
