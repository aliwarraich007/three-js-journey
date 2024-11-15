import restart from 'vite-plugin-restart'
import { viteStaticCopy } from 'vite-plugin-static-copy'

export default {
    root: 'src/', // Sources files (typically where index.html is)
    publicDir: '../static/', // Path from "root" to static assets (files that are served as they are)
    server:
      {
          host: true, // Open to local network and display URL
          open: !('SANDBOX_URL' in process.env || 'CODESANDBOX_HOST' in process.env) // Open if it's not a CodeSandbox
      },
    build:
      {
          outDir: '../dist', // Output in the dist/ folder
          emptyOutDir: true, // Empty the folder first
          sourcemap: true // Add sourcemap
      },
    plugins: [
        restart({ restart: [ '../static/**' ] }), // Restart server on static file change
        viteStaticCopy({
            targets: [
                {
                    src: '../static/textures/environmentMap/*.hdr', // Source of the .hdr files
                    dest: 'assets/environmentMap' // Destination in the build output
                }
            ]
        })
    ],
    assetsInclude: ['**/*.hdr'] // Tell Vite to include .hdr files as assets
}
