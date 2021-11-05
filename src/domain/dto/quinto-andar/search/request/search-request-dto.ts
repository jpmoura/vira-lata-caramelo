
import BusinessContext from '../../../../enum/quinto-andar/business-context';
import FilterDto from './filter.dto';

export default interface SearchRequestDto {
  filters: FilterDto;

  return: Array<string>;

  business_context: BusinessContext;
}
