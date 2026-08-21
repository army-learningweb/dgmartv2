import { createInertiaApp } from '@inertiajs/react';
import DashboardLayout from './layouts/Admin/DashboardLayout';
import HomeLayout from './layouts/Client/HomeLayout';

const appName = import.meta.env.VITE_APP_NAME;

createInertiaApp({
    title: (title) => (title ? `${title} - ${appName}` : appName),
    layout: (name) => {
        if (name.startsWith('Admin/')) {
            return DashboardLayout;
        }
        return HomeLayout;
    },
    progress: {
        color: '#4B5563',
    },
});
