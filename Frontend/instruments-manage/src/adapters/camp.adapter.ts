import { CampDomain, LocationDomain } from "@/interfaces/camp-domain.interface";
import { CampDTO, CreateCampDTO, LocationDTO } from "@/models";

export const CampAdapter = (camp: CampDTO): CampDomain => {
  const { id, name, location } = camp;

  return { id: id, name, location: LocationAdapter(location) } as CampDomain;
};

export const formToCampsDTO = (names: {
  [key: string]: FormDataEntryValue;
}): CreateCampDTO => {
  const { name, department, municipality, coordinate } = names;

  return {
    name: name as string,
    location: {
      municipality: municipality as string,
      department: department as string,
      country: "Colombia",
      coordinate: (coordinate as string)
        .split(",")
        .map((coordinate) => Number(coordinate)),
    },
  } as CreateCampDTO;
};

const LocationAdapter = (location: LocationDTO): LocationDomain => {
  const { municipality, department, country, coordinate } = location;

  return { municipality, department, country, coordinate } as LocationDomain;
};
