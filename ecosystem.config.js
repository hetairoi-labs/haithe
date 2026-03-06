module.exports = {
  apps: [
    {
      name: 'haithe-client',
      script: 'bun run start',
      cwd: './packages/server',
      env_file: './packages/server/.env',
      env: {
        NODE_ENV: 'production',
      },
      env_production: {
        NODE_ENV: 'production',
      },
    },
    {
      name: 'haithe-server',
      script: './target/release/main',
      cwd: './cargo',
      env_file: './cargo/.env',
      env: {
        NODE_ENV: 'production',
      },
    },
  ],
};