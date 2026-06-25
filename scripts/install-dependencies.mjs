import { readFileSync } from "fs";
import { execSync } from "child_process";

const file = readFileSync("dependencies.txt", "utf-8");
const deps = file.trim().split("\n").filter(Boolean);

if (deps.length === 0) {
  console.log("Nenhuma dependência encontrada em dependencies.txt");
  process.exit(0);
}

console.log(`Instalando ${deps.length} dependências de dependencies.txt...`);
execSync(`yarn add ${deps.join(" ")}`, { stdio: "inherit" });
console.log("Dependências instaladas com sucesso.");
