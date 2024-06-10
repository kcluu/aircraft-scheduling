export interface AircraftData {
    ident: string;
    type: string;
    economySeats: number;
    base: string;
}

export interface FlightData {
    ident: string;
    departuretime: number;
    arrivaltime: number;
    readable_departure: string;
    readable_arrival: string;
    origin: string;
    destination: string;
}