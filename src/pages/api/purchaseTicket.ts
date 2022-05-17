import cookie from 'cookie'
import { NextApiRequest, NextApiResponse } from 'next'

const API_URL = 'http://localhost:3333' // TO DO

export default async function purchaseTicket(req: NextApiRequest, res: NextApiResponse) {

    if (req.method === 'POST') {
        if (!req.headers.cookie) {
            res.status(403).json({ message: 'Not Authorized' })
            return
        }

        console.log("Api frontend", JSON.stringify({
            amountOfTickets: req.body
        }), typeof req.body);


        const token = cookie.parse(req.headers.cookie)

        const response = await fetch(`${API_URL}/ticket/purchase`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token.AT} `,
            },
            body: JSON.stringify({
                amountOfTickets: req.body
            })


        })

        const data = await response.json()
        console.log(data);



        if (response.ok) {
            return res.status(200).json(data)
        } else {
            res.status(data.statusCode).json({ message: data.message })
        }
    } else {
        res.setHeader('Allow', ['POST'])
        res.status(405).json({ message: `Method ${req.method} not allowed` })
    }
}
