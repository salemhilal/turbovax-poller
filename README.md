# Turbovax Poller

This script polls turbovax.info for data and triggers a push notification when an available center has appointments.

You'll need Node v12 or later. This script also assumes you are on a Mac and have push notifications enabled.

Edit `poll.js` to add or remove the names of locations you don't want to be notified about. For example, I added Yankee stadium, since I do not live in the Bronx.

Then: 

```
npm install
node poll.js
```
