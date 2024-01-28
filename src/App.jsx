import { useCallback, useEffect, useRef, useState } from "react";
import { shuffleArray } from "./util/ShuffleArray";

function App() {
  const [length, setLength] = useState(8);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [specialCharAllowed, setSpecialCharAllowed] = useState(false);
  const [password, setPassword] = useState("");

  const passwordRef = useRef(null);

  const generatedPassword = useCallback(() => {
    let password = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (numberAllowed) str += "0123456789";
    if (specialCharAllowed) str += "!@#$%^&*-_=+[]{}~";

    const strArray = str.split("");
    shuffleArray(strArray);

    for (let i = 1; i <= length; i++) {
      let index = Math.floor(Math.random() * length);
      password = password + strArray[index];
    }
    setPassword(password);
  }, [length, numberAllowed, specialCharAllowed, setPassword]);

  useEffect(() => {
    generatedPassword();
  }, [length, numberAllowed, specialCharAllowed, generatedPassword]);

  const copyToClipboard = useCallback(() => {
    passwordRef.current?.select();
    window.navigator.clipboard.writeText(password);
  }, [password]);

  return (
    <main className="bg-black h-screen flex flex-col justify-center">
      <div className="w-screen max-w-md mx-auto bg-gray-700 p-8 rounded-lg">
        <h1 className="text-xl font-medium text-white text-center mb-4">
          Generate Password
        </h1>
        <div className="input-container flex flex-row items-center gap-2 mb-4">
          <input
            type="text"
            value={password}
            readOnly
            className="rounded-sm flex-grow px-1"
            ref={passwordRef}
          />
          <button
            className="text-white bg-black text-lg font-medium px-2 rounded-sm transition duration-300 ease-in-out hover:text-black hover:bg-white"
            onClick={copyToClipboard}
          >
            copy
          </button>
        </div>
        <div className="range-container flex flex-row items-center gap-2 mb-2">
          <input
            type="range"
            id="rangeId"
            min={8}
            max={128}
            value={length}
            className="w-full mt-2"
            onChange={(event) => setLength(event.target.value)}
          />
          <label
            htmlFor="rangeId"
            className="text-white font-medium flex flex-row items-center gap-2"
          >
            <span>Length:</span>
            <span>{length}</span>
          </label>
        </div>
        <div className="checkbox flex flex-row justify-evenly">
          <div className="number-checkobx flex flex-row gap-2">
            <label
              htmlFor="numbersCheckBoxId"
              className="text-white font-medium"
            >
              Numbers
            </label>
            <input
              type="checkbox"
              id="numbersCheckBoxId"
              defaultChecked={numberAllowed}
              onChange={() =>
                setNumberAllowed((previousState) => !previousState)
              }
            />
          </div>
          <div className="special-char-checkobx flex flex-row gap-2">
            <label htmlFor="specialCharId" className="text-white font-medium">
              Special Characters
            </label>
            <input
              type="checkbox"
              id="specialCharId"
              defaultChecked={specialCharAllowed}
              onChange={() =>
                setSpecialCharAllowed((previousState) => !previousState)
              }
            />
          </div>
        </div>
      </div>
    </main>
  );
}

export default App;
