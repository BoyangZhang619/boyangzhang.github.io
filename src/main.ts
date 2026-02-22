import { createApp } from 'vue'
import './style.css'
import App from './App.vue'

createApp(App).mount('#app')

const pageIconAddresses: string[] = ['/iconWhite.png', '/iconBlack.png'];
const updateFavicon = () => {
  const hour = new Date().getHours();
  const iconAddress = hour >= 7 && hour < 19 ? pageIconAddresses[0] : pageIconAddresses[1];
  if (!iconAddress) return;
  let linkElement = document.querySelector("link[rel='icon']") as HTMLLinkElement | null;
  if (!linkElement) {
    linkElement = document.createElement('link');
    linkElement.rel = 'icon';
    document.head.appendChild(linkElement);
  }
  linkElement.type = 'image/jpeg';
  linkElement.href = `${iconAddress}?v=${Date.now()}`;
};
updateFavicon();
setInterval(updateFavicon, 10 * 1000);