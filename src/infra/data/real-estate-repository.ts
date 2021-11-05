import PouchDB from 'pouchdb';
import RealEstate from '../../domain/models/real-estate';
import QuintoAndarRepository from './quinto-andar-repository';

export default class RealEstateRepository {
  private readonly database = new PouchDB<RealEstate>('real-estates');

  private readonly quintoAndarRepository = new QuintoAndarRepository();

  async create(realEstate: RealEstate): Promise<void> {
    await this.database.post({ ...realEstate, _id: realEstate.id.toString() });
  }

  async list(): Promise<Array<RealEstate>> {
    const response = await this.database.allDocs({
      include_docs: true,
    });
    return response.total_rows === 0 ?  [] : response.rows.map((row) => row.doc as RealEstate);
  }

  async fetchNew(): Promise<Array<RealEstate>> {
    return this.quintoAndarRepository.list();
  }
}
