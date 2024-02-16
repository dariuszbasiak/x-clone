export const signup = async (email: string, name: string) => {
  return await fetch("http://localhost:3001/users", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name,
      email,
      id: name.split(" ").join("").toLowerCase(),
    }),
  });
};
