import { Data } from "../../services/debug-service";

interface DebugOutputList {
  debugOutput: Data[]
}

const Grid = ({ debugOutput }: DebugOutputList) => {

  return (
    <div className="grid grid-cols-3 gap-4 w-[50%]">
      <div className="col">
        <div className="font-bold">Attribute</div>
        {debugOutput.map((node) =>
          <div className="mt-4 border-2 border-black z-10 rounded-md shadow-[5px_5px_0px_0px_rgba(0,0,0)] px-4 py-2 hover:shadow transition duration-200 bg-white flex-shrink-0">
            {node.variable}
          </div>
        )}
      </div>
      <div className="col">
        <div className="font-bold">Value</div>
        {debugOutput.map((node) =>
          <div className="mt-4 border-2 border-black z-10 rounded-md shadow-[5px_5px_0px_0px_rgba(0,0,0)] px-4 py-2 hover:shadow transition duration-200 bg-white flex-shrink-0">
            {node.value.value}
          </div>
        )}
      </div>
    </div>
  );
};

export default Grid;