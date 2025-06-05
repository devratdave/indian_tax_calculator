import { prisma } from "@components/db/index"
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
      const { name, comment } = await request.json()

      const response = await prisma.comments.create({
        data: {
          name,
          comment
        }
      });

      return NextResponse.json({
        response
      }, {
        status: 200
      })

  } catch(err){
      console.log('err', err)
      return Response.json({
        message: 'post error'
      }, {
        status: 500
      })
  }
}

export async function GET() {
  try {
      const response = await prisma.comments.findMany()
      return NextResponse.json({
        response
      }, {
        status: 200
      })
  } catch(err){
    console.log('err', err)
  }
}
