# Code Citations

## License: unknown

https://github.com/r-freeman/portfolio/tree/460d9b21d10cfa7019e894e601564373ac815d48/lib/prisma.ts

```
} from '@prisma/client'

const globalForPrisma = global as unknown as { prisma: PrismaClient }

export const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({ log: ['query'] })

if (process.env.NODE_ENV !== 'production'
```

## License: unknown

https://github.com/newmanferrer/project-170223-store-app/tree/4e746797e5eb7b4c8e6e6aa762645ed6a3344eeb/lib/prisma/db/client.ts

```
client'

const globalForPrisma = global as unknown as { prisma: PrismaClient }

export const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({ log: ['query'] })

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma
```

## License: unknown

https://github.com/andyyou/nextjs-nextauth/tree/3ebd0eeffe27f6892a203c19c9e7f261632a9105/pages/api/auth/%5B...nextauth%5D.ts

```
CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' }
      },
      async authorize(credentials) {
        const user = await
```

## License: MIT

https://github.com/nezdemkovski/nezdemkovski.com/tree/65c3aa0c16b7b4a955b90026e7be69958ea1d674/tailwind.config.ts

```
export default {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}'
  ],
  theme: { extend: {
```
