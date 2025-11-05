export interface Reservation {
  propertyId: string
  propertyName: string
  checkInDate: string
  checkOutDate: string
  guests: number
  totalPrice: number
  currency: string
}

export function calculateNights(checkIn: string, checkOut: string): number {
  const start = new Date(checkIn)
  const end = new Date(checkOut)
  const diffTime = Math.abs(end.getTime() - start.getTime())
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
  return diffDays
}

export function calculateTotalPrice(pricePerNight: number, nights: number): number {
  return Math.round(pricePerNight * nights * 100) // Convert to cents
}
