export interface BaseEntityModel {
  id?: string | null;
  modifiedOn?: Date | null;
}

export interface BlobObjectDto {
  container: string;
  fileName: string;
}
