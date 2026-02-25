import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
    build: {
        rollupOptions: {
            input: {
                main: resolve(__dirname, 'index.html'),
                menu: resolve(__dirname, 'menu.html'),
                shop: resolve(__dirname, 'shop.html'),
                cart: resolve(__dirname, 'cart.html'),
                contact: resolve(__dirname, 'contact.html'),
            }
        }
    }
});
