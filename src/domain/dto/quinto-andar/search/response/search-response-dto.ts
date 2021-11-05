import HitsDto from './hits-dto';
import ShardsDto from './shards-dto';

export default interface SearchResponseDto {
  took: number;

  timed_out: boolean;

  _shards: ShardsDto;

  hits: HitsDto;

  search_id: string;
}
