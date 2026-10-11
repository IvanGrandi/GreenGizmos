import { createRouter, createWebHistory } from 'vue-router';
import Home from './views/Home.vue';
import { auth } from './auth.js';

// Pages are loaded on demand, so visitors only download the code they use
const CategoryPage = () => import('./views/CategoryPage.vue');

const categoryRoute = (path, title, categories) => ({
  path,
  component: CategoryPage,
  props: { categories },
  meta: { title },
});

const routes = [
  { path: '/', component: Home, meta: { title: 'Home' } },
  categoryRoute('/computing-equipment', 'Computing Equipment', [
    'Laptops',
    'Desktops',
    'Workstations',
    'Mini PCs / Thin Clients',
    'All-in-One PCs',
  ]),
  categoryRoute('/components-upgrades', 'Components & Upgrades', [
    'Processors (CPUs)',
    'RAM (Memory Modules)',
    'Storage Devices',
    'SSDs',
    'HDDs',
    'NVMe Drives',
    'Graphic Cards (GPUs)',
    'Motherboards',
    'Power Supplies',
    'Cooling Fans / Heatsinks',
  ]),
  categoryRoute('/monitors-displays', 'Monitors & Displays', [
    'LED / LCD Monitors',
    'Touchscreen Monitors',
    'Monitor Stands / Mounts / Arms',
    'Portable Monitors',
  ]),
  categoryRoute('/peripherals', 'Peripherals', [
    'Docking Stations',
    'Keyboards (wired/wireless)',
    'Mice (wired/wireless)',
    'Headsets & Headphones',
    'Webcams',
    'Speakers',
    'USB Hubs / Extenders',
  ]),
  categoryRoute('/printing-scanning', 'Printing & Scanning', [
    'Laser Printers',
    'Inkjet Printers',
    'Multifunction Printers (MFPs)',
    'Scanners',
    'Label Printers',
    'Toner / Ink (refurbished or compatible)',
  ]),
  categoryRoute('/mobile-gear', 'Mobile Gear', [
    'Tablets',
    'Mobile Phones',
    'Laptop Bags / Cases',
    'Portable Chargers / Power Banks',
  ]),
  { path: '/sign-up', component: () => import('./views/Sign_up.vue'), meta: { title: 'Sign Up' } },
  { path: '/log-in', component: () => import('./views/Log_in.vue'), meta: { title: 'Log In' } },
  { path: '/cart', component: () => import('./views/Cart.vue'), meta: { title: 'Cart' } },
  { path: '/search-results', component: () => import('./components/SearchResults.vue'), meta: { title: 'Search Results' } },
  { path: '/add-product', component: () => import('./components/AddProduct.vue'), meta: { title: 'Add Product', requiresAdmin: true } },
  { path: '/delete-product', component: () => import('./components/DeleteProduct.vue'), meta: { title: 'Delete Product', requiresAdmin: true } },
  { path: '/user-manager', component: () => import('./views/UserManager.vue'), meta: { title: 'User Manager', requiresAdmin: true } },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior: () => ({ top: 0 }),
});

router.beforeEach((to) => {
  if (to.meta.requiresAdmin && !auth.isAdmin) return '/log-in';
  document.title = to.meta.title ? `${to.meta.title} | GreenGizmos` : 'GreenGizmos';
});

export default router;
