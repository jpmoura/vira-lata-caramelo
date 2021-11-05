
import Availability from '../../../../enum/quinto-andar/availability';
import Occupancy from '../../../../enum/quinto-andar/occupancy';
import CostDto from './cost.dto';
import MapDto from './map.dto';
import SortingDto from './sorting.dto';

export default interface FilterDto {
  map: MapDto;

  cost: CostDto;

  min_bedrooms: number;

  availability: Availability;

  occupancy: Occupancy;

  sorting: SortingDto;

  page_size: number;

  offset: number;

  search_dropdown_value: string;
}
