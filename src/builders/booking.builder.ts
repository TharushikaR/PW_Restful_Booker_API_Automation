import { Booking } from '../models/booking.model';

export class BookingBuilder {
  private data: Booking = {
    firstname: 'Tharushi',
    lastname: 'Tester',
    totalprice: 150,
    depositpaid: true,
    bookingdates: { checkin: '2026-12-01', checkout: '2026-12-05' },
    additionalneeds: 'Breakfast',
  };

  withFirstname(v: string) { this.data.firstname = v; return this; }
  withLastname(v: string) { this.data.lastname = v; return this; }
  withTotalPrice(v: number) { this.data.totalprice = v; return this; }
  withDepositPaid(v: boolean) { this.data.depositpaid = v; return this; }
  withDates(checkin: string, checkout: string) {
    this.data.bookingdates = { checkin, checkout };
    return this;
  }
  withAdditionalNeeds(v?: string) { this.data.additionalneeds = v; return this; }

  build(): Booking {
    return structuredClone(this.data);
  }
}