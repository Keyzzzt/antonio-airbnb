import { NextResponse } from 'next/server'
import Prisma from '@/app/libs/prismadb'
import getCurrentUser from '@/app/actions/getCurrentUser'

type Params = { reservationId: string }

export async function DELETE(request: Request, { params }: { params: Params }) {
  const currentUser = await getCurrentUser()

  if (!currentUser) {
    return NextResponse.error()
  }

  const { reservationId } = params

  if (!reservationId || typeof reservationId !== 'string') {
    console.error('Invalid reservation ID')
  }
  const reservation = await Prisma.reservation.deleteMany({
    where: {
      id: reservationId,
      OR: [{ userId: currentUser.id }, { listing: { userId: currentUser.id } }],
    },
  })

  return NextResponse.json(reservation)
}
