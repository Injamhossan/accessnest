
import { prisma } from "../src/lib/prisma";

async function main() {
  try {
    const p = await prisma.product.create({
      data: {
        title: "Test " + Date.now(),
        description: "Test",
        price: 99,
        category: "Security" as any,
        image: "https://placehold.co/600x400",
        isActive: false
      }
    });
    console.log("Success! Created:", p.id);
    await prisma.product.delete({ where: { id: p.id } });
    console.log("Deleted test product.");
  } catch (err) {
    console.error("FAILED outside Next.js:", err);
  } finally {
    await (prisma as any).$disconnect?.();
  }
}

main();
