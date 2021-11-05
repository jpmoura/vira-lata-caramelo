import { AxiosRequestConfig } from 'axios';
import SearchRequestDto from '../../domain/dto/quinto-andar/search/request/search-request-dto';
import SearchResponseDto from '../../domain/dto/quinto-andar/search/response/search-response-dto';
import Availability from '../../domain/enum/quinto-andar/availability';
import BusinessContext from '../../domain/enum/quinto-andar/business-context';
import CostType from '../../domain/enum/quinto-andar/cost-type';
import Occupancy from '../../domain/enum/quinto-andar/occupancy';
import SortingCriteria from '../../domain/enum/quinto-andar/sorting-criteria';
import SortingOrder from '../../domain/enum/quinto-andar/sorting-order';
import RealEstateProvider from '../../domain/enum/real-estate-provider';
import AppSettings from '../../domain/models/app-settings';
import RealEstate from '../../domain/models/real-estate';
import HttpClient from '../client/http-client';
import SettingsRepository from './settings-repository';

export default class QuintoAndarRepository {
  private readonly httpClient = new HttpClient();

  private readonly settingsRepository = new SettingsRepository();

  private static buildReturnAttributesArray(): Array<string> {
    return [
      'id',
      'coverImage',
      'rent',
      'totalCost',
      'salePrice',
      'iptuPlusCondominium',
      'area',
      'imageList',
      'imageCaptionList',
      'address',
      'regionName',
      'city',
      'visitStatus',
      'activeSpecialConditions',
      'type',
      'forRent',
      'forSale',
      'bedrooms',
      'parkingSpaces',
      'listingTags',
      'yield',
      'yieldStrategy',
    ];
  }

  private buildSearchRequest(appSettings: AppSettings): SearchRequestDto {
    return {
      business_context: BusinessContext.Rent,
      filters: {
        availability: Availability.Any,
        cost: {
          cost_type: CostType.Total,
          max_value: appSettings.rentalMaxValue,
          min_value: 0,
        },
        map: {
          bounds_north: appSettings.map.coordinates.north,
          bounds_south: appSettings.map.coordinates.south,
          bounds_east: appSettings.map.coordinates.east,
          bounds_west: appSettings.map.coordinates.west,
        },
        min_bedrooms: appSettings.rooms,
        occupancy: Occupancy.Any,
        offset: 0,
        page_size: 50,
        sorting: {
          criteria: SortingCriteria.Relevance,
          order: SortingOrder.Descending,
        },
      },
      return: QuintoAndarRepository.buildReturnAttributesArray(),
    } as SearchRequestDto;
  }

  async list(): Promise<Array<RealEstate>> {
    const appSettings = await this.settingsRepository.get();
    const data = this.buildSearchRequest(appSettings);
    const request: AxiosRequestConfig = {
      url: 'https://www.quintoandar.com.br/api/yellow-pages/v2/search',
      method: 'POST',
      data,
    };

    const result = await this.httpClient.make<SearchResponseDto>(request);
    const realEstates = result.hits.hits.map((hitDto) => hitDto._source as RealEstate);

    return realEstates.map((realEstate) => ({
      ...realEstate,
      coverImage: `https://www.quintoandar.com.br/img/sml/${realEstate.coverImage}`,
      imageList: realEstate.imageList.map((image) => `https://www.quintoandar.com.br/img/sml/${image}`),
      url: `https://www.quintoandar.com.br/imovel/${realEstate.id}`,
      provider: RealEstateProvider.QuintoAndar,
    }));
  }
}
