import { IsNotEmpty, IsObject, IsString } from 'class-validator';

export class JoinCollabDto {
  @IsString()
  @IsNotEmpty()
  clientId: string;
}

export class PublishCollabDto {
  @IsString()
  @IsNotEmpty()
  clientId: string;

  @IsObject()
  resume: Record<string, unknown>;
}
