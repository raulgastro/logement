import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  const email = "admin@gmail.com";       // ton admin
  const newPassword = "admin123";   // mot de passe que tu veux utiliser
  const hashedPassword = await bcrypt.hash(newPassword, 10);

  const updatedAdmin = await prisma.user.update({
    where: { email },
    data: { password: hashedPassword }
  });

  console.log("✅ Mot de passe admin mis à jour :", updatedAdmin);
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
