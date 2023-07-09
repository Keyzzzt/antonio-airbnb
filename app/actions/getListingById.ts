import Prisma from '@/app/libs/prismadb'

export type ListingParams = {
  listingId?: string
}

export async function getListingById(params: ListingParams) {
  try {
    const { listingId } = params
    if (!listingId) {
      return null
    }
    const listing = await Prisma.listing.findUnique({
      where: { id: listingId },
      include: { user: true },
    })
    if (!listing) {
      return null
    }

    return {
      ...listing,
      createdAt: listing.createdAt.toISOString(),
      user: {
        ...listing.user,
        createdAt: listing.user.createdAt.toISOString(),
        updatedAt: listing.user.updatedAt.toISOString(),
        emailVerified: listing.user.emailVerified?.toISOString() || null,
      },
    }
  } catch (error: any) {
    console.error(`Error fetching listing by ID: ${error}`)
  }
}
