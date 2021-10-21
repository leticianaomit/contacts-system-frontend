export interface Contact {
  id?: string;
  name: string;
}

export interface ResponseContactDTO {
  id: string;
  name: string;
  email: string;
  phone: string;
  whatsapp: string;
  idPerson: string
}
