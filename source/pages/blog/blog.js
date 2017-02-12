import 'normalize.css';
import './../../main.scss';
import './blog.scss';

import createMenu from '../../components/menu/menu.js';
var menu = createMenu(['Главная', 'Обо мне', 'Портфолио', 'Блог'], 'menu');
document.body.appendChild(menu);
