import Prisma from '@/app/libs/prismadb'

export type ListingParams = {
  userId?: string
}

export async function getListings(params: ListingParams) {
  try {
    const { userId } = params
    let query: any = {}
    if (userId) {
      query.userId = userId
    }
    const listings = await Prisma.listing.findMany({
      where: query,
      orderBy: { createdAt: 'desc' },
    })

    const safeListings = listings.map((listing) => ({
      ...listing,
      createdAt: listing.createdAt.toISOString(),
    }))

    return safeListings
  } catch (error) {
    console.error(`Error fetching listing by ID: ${error}`)
  }
}
