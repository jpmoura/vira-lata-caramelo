import RealEstate from '../domain/models/real-estate';
import NotificationService from './notification-service';
import RealEstateService from './real-estate-service';
import SettingsService from './settings-service';
import schedule from 'node-schedule';

export default class CronService {
  private readonly realEstateService = new RealEstateService();

  private readonly settingsService = new SettingsService();

  private readonly notificationService = new NotificationService();

  private static job: schedule.Job;

  private realEstates: Array<RealEstate>;

  private async updateRealEstateList(): Promise<void> {
    const freshRealEstates = await this.realEstateService.fetchNew();

    const currentRealEstatesIds = this.realEstates.map(
      (currentRealEstate) => currentRealEstate.id,
    );

    const newRealEstates = freshRealEstates.filter(
      (newRealEstate) => !currentRealEstatesIds.includes(newRealEstate.id),
    );

    if (newRealEstates.length === 0) {
      return;
    }

    const updatePromises: Array<Promise<void>> = [];

    newRealEstates.forEach((newRealEstate) => {
      this.realEstates.push(newRealEstate);
      updatePromises.push(this.realEstateService.create(newRealEstate));
    });

    await Promise.all(updatePromises);
    this.notificationService.newFindings(newRealEstates.length);
  }

  public async start(): Promise<void> {
    const settings = await this.settingsService.get();

    if (CronService.job || !settings) {
      return;
    }

    this.realEstates = await this.realEstateService.list();
    CronService.job = schedule.scheduleJob('* * * * *', () => this.updateRealEstateList());
  }

  public static nextInvocation(): Date {
    return CronService.job.nextInvocation();
  }
}
