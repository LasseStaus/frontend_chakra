import cookie from 'cookie'
import { NextApiRequest, NextApiResponse } from 'next'

const API_URL = 'http://localhost:3333' // TO DO

export default async function getUser(context: any) {
    // console.log("SE NU LIGE", context);


    if (context.method === 'GET') {


        if (!context.cookies) {
            console.log("ingen cookie");
            context.status(403).json({ message: 'Not Authorized' })
            return
        }

        console.log("det er get", context);
        const at = cookie.parse(context.cookies.AT)
        console.log();


        // console.log("AT ", token);

        const response = await fetch(`${API_URL}/user/profile`, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${at} `
            }
        })

        const data = await response.json()

        if (response.ok) {

            return data

        } else {
            console.log('User forbidden');

            context.status(403).json({ message: 'User forbidden' })
        }
    } else {
        context.setHeader('Allow', ['POST'])
        context.status(405).json({ message: `Method ${context.req.method} not allowed ` })
    }
}