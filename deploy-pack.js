const fs = require("fs").promises;
const path = require("path");

const root = process.cwd();
const sourceStatic = path.join(root, ".next/static");
const targetStatic = path.join(root, ".next/standalone/.next/static");
const sourcePublic = path.join(root, "public");
const targetPublic = path.join(root, ".next/standalone/public");

async function ensureDir(dir) {
  await fs.mkdir(dir, { recursive: true });
}

async function copyDirectory(src, dest) {
  await ensureDir(dest);
  const entries = await fs.readdir(src, { withFileTypes: true });

  for (const entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);

    if (entry.isDirectory()) {
      await copyDirectory(srcPath, destPath);
    } else if (entry.isFile()) {
      await fs.copyFile(srcPath, destPath);
    } else if (entry.isSymbolicLink()) {
      const linkTarget = await fs.readlink(srcPath);
      await fs.symlink(linkTarget, destPath);
    }
  }
}

async function main() {
  try {
    console.log("Preparando copia de archivos para standalone...");
    await copyDirectory(sourceStatic, targetStatic);
    await copyDirectory(sourcePublic, targetPublic);
    console.log("Copia completada correctamente.");
    console.log(".next/static -> .next/standalone/.next/static");
    console.log("public -> .next/standalone/public");
  } catch (error) {
    console.error("Error al copiar archivos de standalone:", error);
    process.exit(1);
  }
}

main();
