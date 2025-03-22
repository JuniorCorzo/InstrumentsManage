import { CampDomain, LocationDomain } from "@/interfaces/camp-domain.interface";
import { CampDTO, LocationDTO } from "@/models";

export const CampAdapter = (camp: CampDTO): CampDomain => {
  const { id, name, location } = camp;

  return { id: id, name, location: LocationAdapter(location) } as CampDomain;
};

const LocationAdapter = (location: LocationDTO): LocationDomain => {
  const { municipality, department, country, coordinate } = location;

  return { municipality, department, country, coordinate } as LocationDomain;
};
