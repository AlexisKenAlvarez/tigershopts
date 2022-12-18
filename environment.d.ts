declare global {
    namespace NodeJS {
      interface ProcessEnv {
        NODE_ENV: 'development' | 'production';
        PORT?: string;
        PWD: string;
        NEXT_PUBLIC_SECRET: string,
        SENDGRID_API_KEY: string,
        NEXT_PUBLIC_BASE_URL: string
      }
    }
  }