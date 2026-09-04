import puppeteer from "puppeteer-core";
const SP = process.env.SP;
const errs = [];
const b = await puppeteer.launch({
  executablePath: "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
  headless: "new", args: ["--hide-scrollbars"],
});
const p = await b.newPage();
p.on("pageerror", e => errs.push("PAGEERROR " + e.message));
p.on("response", r => { if (r.status() >= 400 && r.url().includes("ytimg")) errs.push("THUMB " + r.status() + " " + r.url().split("/vi/")[1]); });
await p.setViewport({ width: 1440, height: 1000 });
await p.goto("http://localhost:3000/", { waitUntil: "networkidle2" });
await p.evaluate(async () => {
  document.documentElement.style.scrollBehavior = "auto";
  for (let y = 0; y < document.body.scrollHeight; y += 400) {
    window.scrollTo(0, y); await new Promise(r => setTimeout(r, 110));
  }
  document.querySelector("#work").scrollIntoView();
});
await new Promise(r => setTimeout(r, 2500));
console.log("cards (All):", await p.$$eval("#work button[aria-label^='Watch']", n => n.length));
await p.screenshot({ path: `${SP}/work-grid.png` });

// Filter down to one category.
const pills = await p.$$("#work button[aria-pressed]");
await pills[1].click();  // Teasers
await new Promise(r => setTimeout(r, 1200));
console.log("cards (Teasers):", await p.$$eval("#work button[aria-label^='Watch']", n => n.length));
await pills[2].click();  // Client Work
await new Promise(r => setTimeout(r, 1200));
console.log("cards (Client Work):", await p.$$eval("#work button[aria-label^='Watch']", n => n.length));

// Open one and confirm the embed URL.
await (await p.$("#work button[aria-label^='Watch']")).click();
await new Promise(r => setTimeout(r, 2500));
console.log("lightbox src:", await p.$eval("[role='dialog'] iframe", el => el.src));
await p.screenshot({ path: `${SP}/work-play.png` });
console.log(errs.length ? errs.slice(0,6).join("\n") : "no errors, no failed thumbnails");
await b.close();
