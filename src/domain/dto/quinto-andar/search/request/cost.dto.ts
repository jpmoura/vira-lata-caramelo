import CostType from '../../../../enum/quinto-andar/cost-type';

export default interface CostDto {
  cost_type: CostType;

  max_value: number;

  min_value: number;
}
