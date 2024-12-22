import { HubConnectionBuilder, LogLevel } from '@microsoft/signalr'
import { BASE_URL } from './baseUrl'

const connection = new HubConnectionBuilder()
  .withUrl(`${BASE_URL}/notificationHub`) // Thay bằng URL của SignalR Hub
  .configureLogging(LogLevel.Information)
  .withAutomaticReconnect() // Tự động kết nối lại nếu ngắt
  .build()

export default connection
