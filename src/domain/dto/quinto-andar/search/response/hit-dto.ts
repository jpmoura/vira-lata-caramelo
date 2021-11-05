import SourceDto from './source-dto';

export default interface HitDto {
  _index: string;

  _type: string;

  _id: string;

  _score?: number;

  _source: SourceDto;
}
