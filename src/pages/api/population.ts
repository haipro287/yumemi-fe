// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { resaxios } from "@utils/custom-axios";

const axios = resaxios;

export default async function handler(req, res) {
    const {
        query: { prefCode },
    } = req;
    await axios
        .get(`/population/composition/perYear?cityCode=-&prefCode=${prefCode}`)
        .then(r => {
            res.status(200).json({
                message: null,
                result: r.data.result.data[0].data.map(e => {
                    return e.value;
                }),
            });
        })
        .catch(err => {
            res.status(200).json({
                description: "",
                message: "Internal.",
                statusCode: "500",
            });
        });
}
