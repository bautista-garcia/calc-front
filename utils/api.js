export async function solveSystem(A, B) {
  const response = await fetch(process.env.NEXT_PUBLIC_VM, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ A, B }),
  });

  if (!response.ok) {
    throw new Error("Network response was not ok");
  }

  return response.json();
}
