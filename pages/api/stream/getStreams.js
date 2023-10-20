export default async function handler(req, res) {
  try {
    const response = await fetch(
      "https://livepeer.studio/api/stream?streamsonly=1",
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_STUDIO_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    const data = await response.json();
    console.log(data);
    return res.status(200).json(data);
  } catch (error) {
    res.status(400).send("Error");
  }
}
