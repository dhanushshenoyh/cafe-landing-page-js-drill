// Snippet 5 (both var and let comparisons)

console.log('--- var loop ---');
for (var i = 0; i < 3; i++) {
  setTimeout(() => console.log('var i:', i));
}

// Allow var timeouts to finish before let loop demo
setTimeout(() => {
  console.log('--- let loop ---');
  for (let j = 0; j < 3; j++) {
    setTimeout(() => console.log('let j:', j));
  }
}, 50);
