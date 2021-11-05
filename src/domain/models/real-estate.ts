import RealEstateType from '../enum/quinto-andar/real-estate-type';
import VisitStatus from '../enum/quinto-andar/visit-status';
import RealEstateProvider from '../enum/real-estate-provider';

export default interface RealEstate {
  imageCaptionList: Array<string>;

  area: number;

  forSale: boolean;

  address: string;

  city: string;

  salePrice: number;

  regionName: string;

  rent: number;

  type: RealEstateType;

  forRent: boolean;

  bedrooms: number;

  iptuPlusCondominium: number;

  visitStatus: VisitStatus;

  coverImage: string;

  id: number;

  imageList: Array<string>;

  parkingSpaces: number;

  totalCost: number;

  activeSpecialConditions: Array<string>;

  url: string;

  provider: RealEstateProvider;
}
