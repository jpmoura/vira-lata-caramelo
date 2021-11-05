import RealEstate from '../domain/models/real-estate';
import RealEstateRepository from '../infra/data/real-estate-repository';

export default class RealEstateService {
  private readonly realEstateRepository = new RealEstateRepository();

  create(newRealEstate: RealEstate): Promise<void> {
    return this.realEstateRepository.create(newRealEstate);
  }

  list(): Promise<Array<RealEstate>> {
    return this.realEstateRepository.list();
  }

  fetchNew(): Promise<Array<RealEstate>> {
    return this.realEstateRepository.fetchNew();
  }
}
