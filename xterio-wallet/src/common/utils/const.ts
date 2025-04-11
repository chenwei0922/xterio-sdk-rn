import { Env } from '@xterio-sdk/rn-auth';

export type EnvItemType = {
  PN_CHAIN_ID: string | number;
  PN_PROJECT_ID: string;
  PN_CLIENT_KEY: string;
  PN_APP_ID: string;
};
export const EnvBaseURLConst: Record<Env, EnvItemType> = {
  [Env.Dev]: {
    PN_CHAIN_ID: 1637450,
    PN_PROJECT_ID: '63afedf8-0ebc-4474-b911-45f22dd0f4d2',
    PN_CLIENT_KEY: 'c9ZWwJOsJUTJjmMWajCL9hcMqczgS19U5RfEvwlD',
    PN_APP_ID: '40ad8524-f844-496d-8de2-50a8a322d6ba',
  },
  [Env.Staging]: {
    PN_CHAIN_ID: 1637450,
    PN_PROJECT_ID: '6b4a0cd5-32c3-4641-a809-2bd9ac7a175f',
    PN_CLIENT_KEY: 'cU43QlI3GMvPqW4Ep0Z8BK4mXDkaHd8kgpQlr8NG',
    PN_APP_ID: '9cd6a325-3082-4e98-8803-82a66cd9e86f',
  },
  [Env.Production]: {
    PN_CHAIN_ID: 112358,
    PN_PROJECT_ID: 'fab00091-f966-437f-8ae9-12aa495f2828',
    PN_CLIENT_KEY: 'cif8thrddJ9Iz46tecZ9UiEQmjxRaKy42AuutAZj',
    PN_APP_ID: '926a55ad-1aad-4147-901e-ee66ff288e74',
  },
};
