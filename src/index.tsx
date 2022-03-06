import './components';
import { scene } from './scene';

document.addEventListener('DOMContentLoaded', () => {
  document.querySelector('body').appendChild(scene());
});
