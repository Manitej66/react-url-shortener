import type { NextApiRequest, NextApiResponse } from "next";
const faunadb = require("faunadb"),
  q = faunadb.query;

const client = new faunadb.Client({
  secret: process.env.NEXT_PUBLIC_FAUNA_KEY,
});

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const ourl = await client.query(
      q.Map(
        q.Paginate(q.Match(q.Index("get_short_url"), req.body.url)),
        q.Lambda("X", q.Get(q.Var("X")))
      )
    );

    res.send(ourl.data[0].data.ourl);
  } catch (error) {
    res.status(400).send(error.message);
  }
};
