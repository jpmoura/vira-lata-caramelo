import NotificationIcon from '../../domain/enum/notification-icon';

/* eslint-disable @typescript-eslint/no-explicit-any */
export default class NotificationRepository {
  private notify(icon: NotificationIcon, title: string, body: string): void {
    window.electron.notificationApi.sendNotification(icon, title, body);
  }

  error(message: string): void {
    this.notify(NotificationIcon.Error, 'Erro', message);
  }

  success(message: string): void {
    this.notify(NotificationIcon.Success, 'Sucesso', message);
  }

  newFindings(count: number): void {
    const title = count > 1 ? 'Novos imóveis encontrados' : 'Novo imóvel encontrado';
    this.notify(NotificationIcon.NewItens, title, 'Confira a página inicial para ver o resultado da busca');
  }
}
