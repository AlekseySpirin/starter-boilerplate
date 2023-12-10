import {
	DashboardOutlined,
	FileTextOutlined,
	GiftOutlined,
	MailOutlined,
	MobileOutlined,
	PictureOutlined,
	PlusCircleOutlined,
	SettingOutlined,
	ShopOutlined,
	ShoppingCartOutlined,
	ShoppingOutlined,
	UsergroupAddOutlined,
	UserOutlined,
	BuildOutlined
} from '@ant-design/icons';
import {APP_PREFIX_PATH} from 'configs/AppConfig';

const mainNavTree = [
	{
		key: 'main',
		path: `${APP_PREFIX_PATH}/main`,
		title: 'sidenav.main',
		icon: PlusCircleOutlined,
		breadcrumb: true,
		submenu: [
			{
				key: 'main-dashboard',
				path: `${APP_PREFIX_PATH}/main/dashboard`,
				title: 'sidenav.main.dashboard',
				icon: DashboardOutlined,
				breadcrumb: true,
				submenu: []
			},
			{
				key: 'main-planner',
				path: `${APP_PREFIX_PATH}/main/planner`,
				title: 'sidenav.main.planner',
				icon: BuildOutlined,
				breadcrumb: true,
				submenu: []
			},
			{
				key: 'main-catalog',
				path: `${APP_PREFIX_PATH}/main/catalog`,
				title: 'sidenav.main.catalog',
				icon: ShoppingCartOutlined,
				breadcrumb: true,
				submenu: [
					{
						key: 'main-catalog-items',
						path: `${APP_PREFIX_PATH}/main/catalog/items`,
						title: 'sidenav.main.catalog.items',
						icon: '',
						breadcrumb: true,
						submenu: []
					},
					{
						key: 'main-catalog-category',
						path: `${APP_PREFIX_PATH}/main/catalog/category`,
						title: 'sidenav.main.catalog.category',
						icon: '',
						breadcrumb: true,
						submenu: []
					},
					{
						key: 'main-catalog-collection',
						path: `${APP_PREFIX_PATH}/main/catalog/collection`,
						title: 'sidenav.main.catalog.collection',
						icon: '',
						breadcrumb: true,
						submenu: []
					},
					{
						key: 'main-catalog-combo',
						path: `${APP_PREFIX_PATH}/main/catalog/combo`,
						title: 'sidenav.main.catalog.combo',
						icon: '',
						breadcrumb: true,
						submenu: []
					}
				]
			},
			{
				key: 'main-purchases',
				path: `${APP_PREFIX_PATH}/main/purchases`,
				title: 'sidenav.main.purchases',
				icon: ShoppingOutlined,
				breadcrumb: true,
				submenu: []
			},
			{
				key: 'main-clients',
				path: `${APP_PREFIX_PATH}/main/clients`,
				title: 'sidenav.main.clients',
				icon: UserOutlined,
				breadcrumb: true,
				submenu: [
					{
						key: 'main-clients-list',
						path: `${APP_PREFIX_PATH}/main/clients/list`,
						title: 'sidenav.main.clients.list',
						icon: '',
						breadcrumb: true,
						submenu: []
					},
					{
						key: 'main-clients-groups',
						path: `${APP_PREFIX_PATH}/main/clients/groups`,
						title: 'sidenav.main.clients.groups',
						icon: '',
						breadcrumb: true,
						submenu: []
					}
				]
			},
			{
				key: 'main-banners',
				path: `${APP_PREFIX_PATH}/main/banners`,
				title: 'sidenav.main.banners',
				icon: PictureOutlined,
				breadcrumb: true,
				submenu: []
			},
			{
				key: 'main-promocodes',
				path: `${APP_PREFIX_PATH}/main/promocodes`,
				title: 'sidenav.main.promocodes',
				icon: GiftOutlined,
				breadcrumb: true,
				submenu: []
			},
			{
				key: 'main-offline',
				path: `${APP_PREFIX_PATH}/main/offline`,
				title: 'sidenav.main.offline',
				icon: ShopOutlined,
				breadcrumb: true,
				submenu: [
					{
						key: 'main-offline-address',
						path: `${APP_PREFIX_PATH}/main/offline/address`,
						title: 'sidenav.main.clients.address',
						icon: '',
						breadcrumb: true,
						submenu: []
					},
					{
						key: 'main-offline-geofences',
						path: `${APP_PREFIX_PATH}/main/offline/geofences`,
						title: 'sidenav.main.clients.geofences',
						icon: '',
						breadcrumb: true,
						submenu: []
					}
				]
			},
			{
				key: 'main-worker',
				path: `${APP_PREFIX_PATH}/main/worker`,
				title: 'sidenav.main.worker',
				icon: UsergroupAddOutlined,
				breadcrumb: true,
				submenu: []
			},
			{
				key: 'main-dispatch',
				path: `${APP_PREFIX_PATH}/main/dispatch`,
				title: 'sidenav.main.dispatch',
				icon: MailOutlined,
				breadcrumb: true,
				submenu: []
			}
		
		]
	}
];

const systemNavTree = [{
	key: 'system',
	path: `${APP_PREFIX_PATH}/system`,
	title: 'sidenav.system',
	icon: '',
	breadcrumb: true,
	submenu: [
		{
			key: 'system-settings',
			path: `${APP_PREFIX_PATH}/system/settings`,
			title: 'sidenav.system.settings',
			icon: SettingOutlined,
			breadcrumb: true,
			submenu: []
		},
		{
			key: 'system-mobile-app',
			path: `${APP_PREFIX_PATH}/system/mobile-app`,
			title: 'sidenav.system.mobile-app',
			icon: MobileOutlined,
			breadcrumb: true,
			submenu: []
		},
		{
			key: 'system-logs',
			path: `${APP_PREFIX_PATH}/system/logs`,
			title: 'sidenav.system.logs',
			icon: FileTextOutlined,
			breadcrumb: true,
			submenu: []
		}
	]
}];

const navigationConfig = [
	...mainNavTree,
	...systemNavTree
];

export default navigationConfig;
