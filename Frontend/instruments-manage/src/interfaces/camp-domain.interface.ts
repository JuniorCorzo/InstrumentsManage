export interface CampDomain {
  id: string;
  name: string;
  location: LocationDomain;
}

export interface LocationDomain {
  municipality: string;
  department: string;
  country: string;
  coordinate: number[];
}
