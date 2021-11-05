import HitDto from './hit-dto';
import TotalDto from './total-dto';

export default interface HitsDto {
  total: TotalDto;

  max_score?: number;

  hits: Array<HitDto>;
}
