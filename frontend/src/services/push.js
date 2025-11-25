// Hová kerül: frontend/src/services/push.js

/*
  push.js
  Egyszerű wrapper a böngésző értesítések kezelésére.
  (Ha a böngésző nem támogatja, csendben kilép.)
*/

export async function requestNotificationPermission() {
  if (!("Notification" in window)) return false;

  const permission = await Notification.requestPermission();
  return permission === "granted";
}

export function sendLocalNotification(title, body) {
  if (!("Notification" in window)) return;
  if (Notification.permission !== "granted") return;

  new Notification(title, {
    body,
    icon: "/icon.png"
  });
}

export default {
  requestNotificationPermission,
  sendLocalNotification
};