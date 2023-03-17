import { authOptions } from "pages/api/auth/[...nextauth]";
import { getServerSession } from "next-auth/next";

export default async function handler(req, res) {
  const session = await getServerSession(req, res, authOptions);

  if (!session || !session.user || !session.user.id) {
    res.status(401).json({ error: "You must be logged in." });
    return;
  }

  return res.json({
    user: session.user,
  });
}
