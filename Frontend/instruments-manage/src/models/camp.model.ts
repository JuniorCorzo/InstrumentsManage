export interface CampDTO {
  id: string;
  name: string;
  location: LocationDTO;
}

export interface CreateCampDTO extends Omit<CampDTO, "id"> {}
export interface UpdateCampDTO extends CampDTO {}

export interface LocationDTO {
  municipality: string;
  department: string;
  country: string;
  coordinate: number[];
}
