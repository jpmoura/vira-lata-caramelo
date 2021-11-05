import AppSettings from '../domain/models/app-settings';
import SettingsRepository from '../infra/data/settings-repository';

export default class SettingsService {
  private readonly settingsRepository = new SettingsRepository();

  async get(shouldReturnFallbackValue?: boolean): Promise<AppSettings> {
    let appSettings: AppSettings;

    try {
      appSettings = await this.settingsRepository.get();
    } catch (_) {
      if (shouldReturnFallbackValue) {
        appSettings = {
          rentalMaxValue: null,
          rooms: null,
          map: null,
        };
      }
    }

    return appSettings;
  }

  async upsert(newSettings: AppSettings): Promise<void> {
    this.settingsRepository.upsert(newSettings);
  }
}
