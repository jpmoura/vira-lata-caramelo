import PouchDB from 'pouchdb';
import AppSettings from '../../domain/models/app-settings';

export default class SettingsRepository {
  private readonly database = new PouchDB('settings');

  private readonly defaultId = 'unique-setting';

  async get(): Promise<AppSettings> {
    return this.database.get(this.defaultId);
  }

  async upsert(newSettings: AppSettings): Promise<void> {
    await this.database.put({ ...newSettings, _id: this.defaultId }, {
      force: true,
    });
  }
}
