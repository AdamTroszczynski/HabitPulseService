import passport, { Profile } from 'passport';
import { Strategy as GoogleStrategy, VerifyCallback } from 'passport-google-oauth20';
import { Strategy as GitHubStrategy } from 'passport-github2';
import { env } from '@shared/helpers/ConfigEnv';
import { changeUserProviderId, createUserOAuth, getUserByEmail, getUserByProvider } from '@/repositories/User/UserRepository';

export type Providers = 'google' | 'github';

const handleOAuthUser = async (provider: Providers, providerId: string, email: string) => {
  let user = await getUserByProvider({ providerName: provider, providerValue: providerId });

  if (!user) {
    user = await getUserByEmail({ email });

    if (user) {
      user = await changeUserProviderId({ id: user.id, providerName: provider, providerValue: providerId });
    } else {
      user = await createUserOAuth({ email, providerName: provider, providerValue: providerId });
    }
  }

  return user;
};

passport.use(
  new GoogleStrategy(
    {
      clientID: env.GOOGLE_CLIENT_ID,
      clientSecret: env.GOOGLE_CLIENT_SECRET,
      callbackURL: `${env.API_URL}:${env.PORT}/auth/v1/google/callback`,
    },
    async (accessToken: string, refreshToken: string, profile: Profile, done: VerifyCallback) => {
      try {
        const user = await handleOAuthUser('google', profile.id, profile.emails?.[0].value ?? '');
        return done(null, user);
      } catch (err) {
        return done(err as Error);
      }
    },
  ),
);

passport.use(
  new GitHubStrategy(
    {
      clientID: env.GITHUB_CLIENT_ID,
      clientSecret: env.GITHUB_CLIENT_SECRET,
      callbackURL: `${env.API_URL}:${env.PORT}/auth/v1/github/callback`,
    },
    async (accessToken: string, refreshToken: string, profile: Profile, done: VerifyCallback) => {
      try {
        const user = await handleOAuthUser('github', profile.id, profile.emails?.[0].value ?? '');
        return done(null, user);
      } catch (err) {
        return done(err as Error);
      }
    },
  ),
);
