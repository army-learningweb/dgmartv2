import { createInertiaApp } from '@inertiajs/react';
import DashboardLayout from './layouts/Admin/DashboardLayout';

const appName = import.meta.env.VITE_APP_NAME;

createInertiaApp({
    title: (title) => (title ? `${title} - ${appName}` : appName),
    layout: (name) => {
        if (name.startsWith('Admin/')) {
            return DashboardLayout;
        }
        return null
    },
    progress: {
        color: '#4B5563',
    },
});
