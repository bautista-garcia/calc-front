import { useState } from "react";

export default function MatrixForm({ onSubmit }) {
  const [numVariables, setNumVariables] = useState(0);
  const [numEquations, setNumEquations] = useState(0);
  const [matrix, setMatrix] = useState([]);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newMatrix = Array.from({ length: numEquations }, () =>
      Array(numVariables + 1).fill("")
    );
    setMatrix(newMatrix);
    setSubmitted(false);
  };

  const handleChange = (e, row, col) => {
    const updatedMatrix = matrix.map((r, rIndex) =>
      r.map((c, cIndex) =>
        rIndex === row && cIndex === col ? e.target.value : c
      )
    );
    setMatrix(updatedMatrix);
  };

  const handleMatrixSubmit = async (e) => {
    e.preventDefault();
    const A = matrix.map((row) => row.slice(0, -1).map(Number));
    const B = matrix.map((row) => Number(row[row.length - 1]));
    await onSubmit(A, B);
  };

  return (
    <div>
      <form className="flex flex-col py-6 mx-8 items-center text-center gap-3" onSubmit={handleSubmit}>
        <label>
          Number of Variables <br /> 
          <input
            className="w-[60px] h-[40px] text-center border border-[#261E18]"
            type="number"
            value={numVariables}
            onChange={(e) => setNumVariables(Number(e.target.value))}
          />
        </label>
        <label>
          Number of Equations <br />
          <input
            className="w-[60px] h-[40px] text-center border border-[#261E18]"
            type="number"
            value={numEquations}
            onChange={(e) => setNumEquations(Number(e.target.value))}
          />
        </label>
        <button className="bg-[#261E18] text-[#F2F2F2] p-2 rounded-lg" type="submit">Create Matrix</button>
      </form>

      {matrix.length > 0 && (
        <form className="flex flex-col mx-8 items-center text-center gap-[1px]" onSubmit={handleMatrixSubmit}>
          <h2 className="font-bold">Input Matrix</h2>
          {matrix.map((row, rowIndex) => (
            <div
             className="flex gap-[1px]"
              key={rowIndex}
            >
              {row.map((value, colIndex) => (
                <input
                  key={colIndex}
                  type="number"
                  value={value}
                  className="w-[40px] h-[40px] text-center border border-[#261E18]"
                  onChange={(e) => handleChange(e, rowIndex, colIndex)}
                />
              ))}
            </div>
          ))}
          <button type="submit" className="bg-[#261E18] text-[#F2F2F2] p-2 rounded-lg mt-6" >Submit Matrix</button>
        </form>
      )}

      {submitted && <div>Matrix has been submitted!</div>}
    </div>
  );
}
