interface IEnv {
    API_URL: string | undefined;
    APP_URL: string | undefined;
    ENV_MODE: "dev" | "test" | "uat" | "prod" | string | undefined;
    ENABLE_REDUX_LOGS: boolean;
    ENABLE_HTTP_LOGS: boolean;
}

const ENV: IEnv = {
    API_URL: process.env.NEXT_PUBLIC_API_URL,
    APP_URL: process.env.NEXT_PUBLIC_APP_URL,
    ENV_MODE: process.env.NEXT_PUBLIC_ENV,
    ENABLE_REDUX_LOGS: (process.env.NEXT_PUBLIC_ENABLE_REDUX_LOGS) === 'true',
    ENABLE_HTTP_LOGS: (process.env.NEXT_PUBLIC_ENABLE_HTTP_LOGS) === 'true',
}

// console.log(ENV, 'ENV')

export default ENV;
