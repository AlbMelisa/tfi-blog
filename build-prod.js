const fs = require("fs").promises;
const path = require("path");
const { spawn } = require("child_process");

const cwd = process.cwd();
const envLocalPath = path.join(cwd, ".env.local");
const hiddenEnvLocalPath = path.join(cwd, ".env.local.hidden");

async function fileExists(filePath) {
  try {
    await fs.access(filePath);
    return true;
  } catch {
    return false;
  }
}

async function moveEnvLocalAway() {
  if (await fileExists(envLocalPath)) {
    await fs.rename(envLocalPath, hiddenEnvLocalPath);
    console.log("Ocultando .env.local para build de producción...");
  }
}

async function restoreEnvLocal() {
  if (await fileExists(hiddenEnvLocalPath)) {
    await fs.rename(hiddenEnvLocalPath, envLocalPath);
    console.log("Restaurando .env.local después del build...");
  }
}

function runCommand(command, args) {
  return new Promise((resolve, reject) => {
    const child = spawn(command, args, {
      cwd,
      shell: true,
      stdio: "inherit",
    });

    child.on("exit", (code) => {
      if (code === 0) {
        resolve();
      } else {
        reject(new Error(`${command} ${args.join(" ")} exited with code ${code}`));
      }
    });

    child.on("error", (error) => {
      reject(error);
    });
  });
}

async function main() {
  try {
    await moveEnvLocalAway();
    await runCommand("npm", ["run", "build"]);
    await runCommand("node", ["deploy-pack.js"]);
    console.log("Build de producción completado.");
  } catch (error) {
    console.error("Error en build:prod:", error);
    process.exitCode = 1;
  } finally {
    await restoreEnvLocal();
  }
}

main();
