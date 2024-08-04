"use client";
import { useState } from "react";
import MatrixForm from "@/app/components/MatrixForm";
import { solveSystem } from "@/utils/api";

export default function Home() {
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const handleSubmit = async (A, B) => {
    try {
      const data = await solveSystem(A, B);
      console.log(data);
      setResult(data.Soluciones);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="flex flex-col items-center mt-10">
      <h1 className="font-bold text-[30px]">Equations Solver</h1>
      <MatrixForm onSubmit={handleSubmit} />
      {result && (
        <div className="flex flex-col gap-3 text-center my-8">
          <h1 className="font-bold text-[20px]">Resultados</h1>
          <div>
            {result.map((solution, index) => (
              <p key={index}>
                X<sub>{index + 1}</sub>: {solution}
              </p>
            ))}
          </div>
        </div>
      )}
      {error && <p>Error: {error}</p>}
    </div>
  );
}
