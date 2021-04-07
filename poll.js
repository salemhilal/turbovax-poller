const fetch = require("node-fetch");
const { execSync } = require("child_process");

const ignoredIds = [
  // Bronx only - can't go to this one.
  "Yankee Stadium (Bronx residents only – Afternoon)",
];

function pushNotif(title, desc) {
  execSync(
    `osascript -e 'display notification "${desc}" with title "${title}"'`
  );
}

async function run() {
  const response = await fetch("https://api.turbovax.info/dashboard", {
    credentials: "omit",
    referrer: "https://www.turbovax.info/",
    method: "GET",
  });

  const json = await response.json();
  const availableLocations = json.locations
    // Filter out unavailable sites
    .filter((loc) => loc.available)
    // Filter out locations we can't go to
    .filter((loc) => !ignoredIds.includes(loc.id));

  console.log(`Found ${json.locations.length} total locations`);
  if (availableLocations.length !== 0) {
    console.log("These are the available ones:", availableLocations);
    pushNotif(
      "HEADS UP",
      "TurboVax results have been found. Check iterm or just go to turbovax.info."
    );
  } else {
    console.log(
      `None of those locations currently have appointments as of ${new Date().toLocaleString()}.`
    );
  }
}

run();
setInterval(() => {
  try {
    run();
  } catch (e) {
    console.log("Something went wrong", e);
    pushNotif(
      "OH NO",
      "Something went wrong with a TurboVax request. Check the console for info."
    );
  }
}, 3 * 1000);
