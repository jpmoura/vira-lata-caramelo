import NotificationRepository from '../infra/data/notification-repository';

export default class NotificationService {
  private readonly notificationRepository = new NotificationRepository();

  public error(message: string): void {
    this.notificationRepository.error(message);
  }

  public success(message: string): void {
    this.notificationRepository.success(message);
  }

  public newFindings(count: number): void {
    this.notificationRepository.newFindings(count);
  }
}
