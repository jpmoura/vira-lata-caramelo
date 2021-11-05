import SortingCriteria from '../../../../enum/quinto-andar/sorting-criteria';
import SortingOrder from '../../../../enum/quinto-andar/sorting-order';

export default interface SortingDto {
  criteria: SortingCriteria;

  order: SortingOrder;
}
