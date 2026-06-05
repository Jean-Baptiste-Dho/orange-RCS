import { registerAs } from '@nestjs/config';
import { SUPABASE_ENV_MISSING } from './constants';

export default registerAs('supabase', () => {
  const url = process.env.SUPABASE_URL;
  // const servicePublicKey = process.env.SUPABASE_PUBLIC_KEY;
  const serviceSecretKey = process.env.SUPABASE_SECRET_KEY;

  if (!url || !serviceSecretKey) {
    throw new Error(SUPABASE_ENV_MISSING);
  }

  return {
    url,
    serviceSecretKey,
  };
});
