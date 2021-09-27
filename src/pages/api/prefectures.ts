// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { resaxios } from "@utils/custom-axios";

const axios = resaxios;

export default async function handler(req, res) {
    await axios
        .get("/prefectures")
        .then(r => {
            res.status(200).json(r.data);
        })
        .catch(err => {
            res.status(200).json({
                description: "",
                message: "Internal.",
                statusCode: "500",
            });
        });
}
