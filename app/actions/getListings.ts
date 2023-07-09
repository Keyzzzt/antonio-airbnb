import Prisma from '@/app/libs/prismadb'

export async function getListings() {
  try {
    const listings = await Prisma.listing.findMany({
      orderBy: { createdAt: 'desc' },
    })

    const safeListings = listings.map(listing => ({
      ...listing,
      createdAt: listing.createdAt.toISOString(),
    }))

    return safeListings
  } catch (error) {
    console.error(`Error fetching listing by ID: ${error}`)
    return null
  }
}