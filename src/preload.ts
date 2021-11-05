import { AxiosRequestConfig } from 'axios';
import { contextBridge, ipcRenderer } from 'electron';
import NotificationIcon from './domain/enum/notification-icon';

contextBridge.exposeInMainWorld('electron', {
  notificationApi: {
    sendNotification(icon: NotificationIcon, title: string, body: string): void {
      ipcRenderer.send('notify', icon, title, body);
    },
  },
  httpApi: {
    async makeRequest(request: AxiosRequestConfig): Promise<string> {
      return ipcRenderer.invoke('makeRequest', request);
    },
    async getBase64(request: AxiosRequestConfig): Promise<string> {
      return ipcRenderer.invoke('getBase64', request);
    },
  },
  externalApi: {
    open(url: string) {
      ipcRenderer.send('open', url);
    },
  },
});
