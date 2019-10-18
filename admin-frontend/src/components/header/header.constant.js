import { SELECTION_HOME, RESULT, VIDEO, TEST_HOME} from '../../constant/routes-map.constant';

export const MENU_ITEMS = [
    {
        text: 'Наборы',
        pathTo: SELECTION_HOME,
    },
    {
        text: 'Тесты',
        pathTo: TEST_HOME,
    },
    {
        text: 'Проверить тесты',
        pathTo: VIDEO,
    },
    {
        text: 'Результаты наборов',
        pathTo: RESULT,
    },
];
