export class GoogleDistanceApiResponse {
    destination_addresses: string[];
    origin_addresses: string[];
    rows: GoogleDistanceRow[];
    status: string;
}

class GoogleDistanceRow {
    elements: GoogleDistanceElement[];
}

class GoogleDistanceElement {
    distance: GoogleDistanceElementData;
    duration: GoogleDistanceElementData;
    status: string;
}

class GoogleDistanceElementData {
    text: string;
    value: number;
}