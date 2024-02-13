import { useState } from "react";
import CodeEditorWindow from "../CodeEditorWindow/CodeEditor";
import Grid from "../Grid/Grid";
import debugService, { Data } from "../../services/debug-service.ts"

const javascriptDefault = `/**
* Problem: Binary Search: Search a sorted array for a target value.
*/

// Time: O(log n)
const binarySearch = (arr, target) => {
 return binarySearchHelper(arr, target, 0, arr.length - 1);
};

const binarySearchHelper = (arr, target, start, end) => {
 if (start > end) {
   return false;
 }
 let mid = Math.floor((start + end) / 2);
 if (arr[mid] === target) {
   return mid;
 }
 if (arr[mid] < target) {
   return binarySearchHelper(arr, target, mid + 1, end);
 }
 if (arr[mid] > target) {
   return binarySearchHelper(arr, target, start, mid - 1);
 }
};

const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const target = 5;
console.log(binarySearch(arr, target));
`;

const Landing = () => {
  const [code, setCode] = useState(javascriptDefault);
  const [debug, setDebug] = useState<Data[]>([])
  // const [theme, setTheme] = useState("cobalt");
  // const [customInput, setCustomInput] = useState("");
  // const [language, setLanguage] = useState(languageOptions[0]);

  // const enterPress = useKeyPress("Enter");
  // const ctrlPress = useKeyPress("Control");

  /*   const onSelectChange = (sl) => {
    console.log("selected Option...", sl);
    setLanguage(sl);
  }; */

  const onChange = (action: string, data: string) => {
    switch (action) {
      case "code": {
        setCode(data);
        break;
      }
      default: {
        console.warn("case not handled!", action, data);
      }
    }
  };

  const handleExecute = () => {
    const data = {
      code: code
    };
    debugService.getDebugResponse(data)
      .then(res => {
        console.log(res.data)
        setDebug(res.data)
      })
      .catch(err => console.log(err))
  }

  /*   function handleThemeChange(th) {
    const theme = th;
    console.log("theme...", theme);

    if (["light", "vs-dark"].includes(theme.value)) {
      setTheme(theme);
    } else {
      defineTheme(theme.value).then((_) => setTheme(theme));
    }
  } */

  return (
    <>
      <div className="h-4 w-full bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500"></div>
      <div className="flex flex-row">
        <div className="px-4 py-2"></div>
        <div className="px-4 py-2"></div>
      </div>
      <div className="flex flex-row space-x-4 items-start px-4 py-4">
        <div className="flex flex-col w-full h-full justify-start items-start">
          <CodeEditorWindow
            code={code}
            onChange={onChange}
            language={"Python"}
            theme={""}
          />
          <div className="left-container flex justify-left flex-shrink-0 w-[30%]">
            {/*  <OutputWindow outputDetails={outputDetails} /> */}
            <button
              // onClick={handleCompile}
              disabled={!code}
              className={
                "mt-4 border-2 border-black z-10 rounded-md shadow-[5px_5px_0px_0px_rgba(0,0,0)] px-4 py-2 hover:shadow transition duration-200 bg-white flex-shrink-0"
              }
              onClick={handleExecute}
            >
              {"Compile and Execute"}
            </button>
            {/*     {outputDetails && <OutputDetails outputDetails={outputDetails} />} */}
          </div>
        </div>

        <Grid debugOutput={debug} />
      </div>
    </>
  );
};
export default Landing;
