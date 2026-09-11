// One-off script to create (or promote) an admin account without going
// through public registration. Run with:
//   npm run create-admin -- "Full Name" admin@example.com "StrongPassword123"
//
// Point DATABASE_URL (in .env) at whichever database you want the admin
// created in — local dev or production — before running this.

require("dotenv").config();
const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcryptjs");

const prisma = new PrismaClient();

async function main() {
  const [, , name, email, password] = process.argv;

  if (!name || !email || !password) {
    console.error(
      'Usage: npm run create-admin -- "Full Name" admin@example.com "StrongPassword123"'
    );
    process.exit(1);
  }
  if (password.length < 8) {
    console.error("Password must be at least 8 characters.");
    process.exit(1);
  }

  const passwordHash = await bcrypt.hash(password, 10);

  const user = await prisma.user.upsert({
    where: { email },
    update: { role: "admin" },
    create: { name, email, passwordHash, role: "admin" },
  });

  console.log(`Admin ready: ${user.email} (role=${user.role})`);
}

main()
  .catch((err) => {
    console.error(err);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
