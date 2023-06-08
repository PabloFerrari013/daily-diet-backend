import { PassportStatic } from "passport";
import { ExtractJwt, Strategy as JWTStrategy } from "passport-jwt";
import { Strategy as LocalStrategy } from "passport-local";
import { Strategy as GoogleStrategy } from "passport-google-oauth2";
import { compare } from "bcryptjs";
import { User } from "@prisma/client";
import { UserRepository } from "src/repository/user-repository";
import { env } from "src/env";

interface PassportConfigParms {
  usersRepository: UserRepository;
  passport: PassportStatic;
}

export default async function ({
  passport,
  usersRepository,
}: PassportConfigParms) {
  passport.serializeUser<any, any>(async (req, user, done) => {
    if (!user)
      return done(
        new Error("Serialize user error, user is not available"),
        null
      );
    process.nextTick(() => {
      done(null, user);
    });
  });

  passport.deserializeUser(async (user, done) => {
    try {
      if (!user)
        return done(
          new Error("Deserialize user error, user is not available"),
          null
        );

      process.nextTick(() => {
        done(null, user);
      });
    } catch (error) {
      done(error, null);
    }
  });

  passport.use(
    new LocalStrategy(
      { usernameField: "email", passwordField: "password" },
      async (username, password, done) => {
        try {
          const user = await usersRepository.findByEmail(username);

          if (!user)
            return done(null, false, {
              message: "Invalid email or password.",
            });

          const isPasswordCorrectlyHashed = await compare(
            password,
            user.password
          );

          if (!isPasswordCorrectlyHashed)
            return done(null, false, {
              message: "Invalid email or password.",
            });

          const jwtUser = {
            id: user.id,
            name: user.name,
            email: user.email,
            department: user.department,
          };

          return done(undefined, jwtUser);
        } catch (error) {
          return done(error);
        }
      }
    )
  );

  passport.use(
    new JWTStrategy(
      {
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey: env.JWT_SECRET,
      },
      async (jwt_payload: User, done) => {
        try {
          const user = await usersRepository.findById(jwt_payload.id);

          if (!user) return done(null, false, { message: "User not found" });

          return done(null, user);
        } catch (error) {
          return done(error, false);
        }
      }
    )
  );

  passport.use(
    new GoogleStrategy(
      {
        clientID: env.GOOGLE_CLIENT_ID,
        clientSecret: env.EXPRESS_SESSION_SECRET,
        callbackURL: env.GOOGLE_CALLBACK_URL,
      },
      (accessToken, refreshToken, profile, done) => {
        console.log({ accessToken, refreshToken, profile, done });

        done(null, profile);
      }
    )
  );
}
