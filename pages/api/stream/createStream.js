export default async function handler(req, res) {
  const { name, profiles } = req.body;
  console.log(name, profiles);
  try {
    const response = await fetch(`https://livepeer.studio/api/stream`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_STUDIO_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: name,
        profiles: profiles,
        record: true,
      }),
    });

    const data = await response.json();
    return res.status(200).json(data);
  } catch (error) {
    console.log(error);
  }
}
