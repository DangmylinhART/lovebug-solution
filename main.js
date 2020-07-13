// A solution!


// our clients' names, used only for grabbing the right client from the user input
const names = [
  'ladybug',
  'caterpillar',
  'bee',
  'ant',
  'snail',
  'spider',
]

// the data we working with
// rank 1 is best
const clients = [
  '🐞', // rank: 6
  '🐛', // rank: 5
  '🐝', // rank: 4
  '🐜', // rank: 3
  '🐌', // rank: 2
  '🕷', // rank: 1
]


// the command the user wants run
const command = process.argv[2];
// the name they want it run on
const name = process.argv[3]
// the corresponding client
//
// BUG FIX 1
// ORIGINAL:
// const client = clients[names.indexOf(name) !== -1]
// FIXED:
const client = clients[names.indexOf(name)]
// EXPLANATION:
// The boolean check as to whether indexOf found anything was arguably necessary (we might consider some check to make sure there is a client by that name!), but if we DID implement that, we'd use it in something like an `if` statement to do something if it's not found. Putting that raw true/false boolean in an index will mean you'll look at something like `client[true]` or `clients[false]`, and that's never gonna hit anything. We can just delete that check entirely.


// get a random client from whatever list was passed in
const randomClient = function(clients) {
  // BUG FIX 2
  // ORIGINAL:
  // return clients[Math.floor(Math.random() * clients.length - 1)];
  // FIXED:
  return clients[Math.floor(Math.random() * clients.length)];
  // EXPLANATION:
  // Subtracting 1 from length is for when you need to talk about the last index, but here we want just the length of the array for randomization purposes.
}

const matchRandomly = function(client) {
  // get our client's location within our system
  const clientLocation = clients.indexOf(client);

  // exclude our client from matches by making an array of everyone else
  // find all the clients before our client in the system
  const clientsBeforeOurClient = clients.slice(0, clientLocation);
  // find all the clients after our client in the system
  // BUG FIX 3
  // ORIGINAL:
  // const clientsAfterOurClient = clients.slice(clientLocation);
  // FIXED:
  const clientsAfterOurClient = clients.slice(clientLocation + 1);
  // EXPLANATION:
  // `.slice` is looking for the index at which to start slicing, so if we want to get the clients AFTER our client, we need to start at their location plus 1.

  // add them together
  // BUG FIX 4:
  // ORIGINAL:
  // const otherClients = clientsBeforeOurClient + clientsAfterOurClient;
  // FIXED:
  const otherClients = clientsBeforeOurClient.concat(clientsAfterOurClient);
  // EXPLANATION:
  // There are various ways to add two arrays together. `.concat` is the old best practice, and still works great. You could do it manually as well with a `for` loop and some `.pushing` into the first array. There's also the neat "spread operator" now, which is how the cool folks are doing it.
  // What definitely won't work, though, is simly adding an array to another array. + now, which is how the cool folks are doing it.
  // What definitely won't work, though, is simly adding an array to another array. `+` is for strings or numbers only!

  // return a random client from the remaining pool
  return randomClient(otherClients);
}

const getRank = function(client) {
  // BUG FIX 5:
  // ORIGINAL:
  // return clients.indexOf(client);
  // FIXED:
  return clients.length - clients.indexOf(client);
  // EXPLANATION:
  // `.indexOf` is going to return a 0-based index, and going the wrong way. Instead of 0, 1, 2, 3, 4, 5, we want 6, 5, 4, 3, 2, 1. The solution here is to subtract the index of our client from how many clients we have. For the first one, 6 - 0 is their rank, 6. For the second, 6 - 1 is their rank, 5. And so on.
}

const getMatch = function(client) {
  // get the client's location in our data
  const clientLocation = clients.indexOf(client);

  // find their two nearest neighbors
  const neighbor1 = clients[clientLocation - 1];
  const neighbor2 = clients[clientLocation + 1];
  // BUG FIX 6:
  // ORIGINAL:
  // const neighbors = [neighbor1, neighbor2];
  // FIXED:
  const neighbors = [];
  if (neighbor1 !== undefined) {
    neighbors.push(neighbor1);
  }

  if (neighbor2 !== undefined) {
    neighbors.push(neighbor2);
  }
  // EXPLANATION:
  // If the client is at the first or last index, one of their would-be neighbors is going to be `undefined`, since indices 0 - 1 and 5 + 1 don't exist. A simple check to make sure before pushing it in will fix that!

  // pick one of them and return it
  // BUG FIX 7:
  // ORIGINAL:
  // return matchRandomly(neighbors);
  // FIXED:
  return randomClient(neighbors);
  // EXPLANATION:
  // We want to randomly pick between the 1 or 2 neighbors, so `randomClient`, which simply picks a random element from an array, is what we want. `matchRandomly` takes in one client and finds them a totally random match, which is not what we want at all here.
}


if (command === 'random') {
  // match them randomly
  console.log(matchRandomly(client));
} else if (command === 'rate') {
  // get back their rank in the system
  console.log(getRank(client));
} else if (command === 'match') {
  // get one of their neighbors in the ranking
  console.log(getMatch(client));
  // BUG FIX 8:
  // ORIGINAL:
// } else if (command !== 'match') {
  // FIXED:
} else {
  // EXPLANATION:
  // We just want a default message for if the user didn't use any of our commands. An `else` works beautifully here. If none of the above `if` checks returned `true`, we already know that the command wasn't "match". Although not technically a breaking bug, it's confusing and unnecessary to have that last `if` check.
  console.log('Please try one of our options:');
  console.log('random [client name] -> a totally random other user');
  console.log('match [client name] -> a match of similar ranking');
  console.log("rate [client name] -> the client's ranking in our system");
}
