import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // Belangrijk voor GitHub Pages: base moet matchen met je repo naam
  base: '/tester/',
})