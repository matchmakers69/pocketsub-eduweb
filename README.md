// Install next with yarn https://paulintrognon.fr/blog/typescript-prettier-eslint-next-js
// https://codevoweb.com/how-to-setup-prisma-orm-in-nextjs-13-app-directory/#google_vignette - next + Prisma CRUD explained
// https://strapi.io/blog/introducing-the-new-strapi-starter-with-nextjs13-tailwind-and-typescript?utm_campaign=ProductMarketing-StrapiBlog&utm_source=email&utm_medium=strapiweekly&utm_content=logbook88 - ARTICLE Strapi with Next code examples with github repos
https://levinhkhang.org/blog/build-a-blog-using-strapi-and-nextjs/ - building blog with strapi and Next
https://stackoverflow.com/questions/76294039/nextjs-13-next-auth-authentication-with-strapi-cms - some authorization

https://www.youtube.com/watch?v=S4YAVm5VQnU - NextAuth with Prisma
https://www.youtube.com/watch?v=w2h54xz6Ndw - NextAuth no Prisma by Dave Grey
https://www.youtube.com/watch?v=c_-b_isI4vg&t=6319s - Next.js13 AirBnb - Auth 02:05 - register API
https://medium.com/ascentic-technology/authentication-with-next-js-13-and-next-auth-9c69d55d6bfd - NextAuth well explained
https://github.com/tkssharma/t3-stack-monorepo/blob/develop/apps/nextjs-prisma-auth/src/app/register/register-form.tsx

https://www.youtube.com/watch?v=2kgqPvs0j_I - Another tutorial how to create login with NextAuth

https://www.youtube.com/watch?v=X-idRZaTE48 - create multistep form react hook form with Next.js

model User {
id String @id @unique @default(uuid())
name String
email String @unique
verified Boolean? @default(false)
image String?
hashedPassword String?
createdAt DateTime? @default(now())
updatedAt DateTime @updatedAt
subscriptions Subscription[]
Account Account?
}

Prisma commands
npx prisma db push - updated database
npx prisma generate
npx prisma migrate dev --name init - migracja prismy po zmianach
npx prisma studio - odpalenie bazy danej do podgladu
npx prisma db seed - to push seeds
