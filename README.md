# RyuGuardian.github.io

This is my portfolio: a page that uses Vue.js to show a collection of my other projects in one location. It's designed and implemented as an interactive page that's functionally a platformer, because video games originally inspired me to get into programming.

## Documentation for Development

Details for myself so I can easily pick up the project again when it needs updating.

### Local Dev Environment

To work locally, run `npm start`. This uses webpack-dev-server, so go to localhost:8080 to view the page.

Note: Although changes are watched and will be implemented on file saves, rebuilds can still cause the game loop to initialize over the old loop. Refreshing the page fixes it.

### Building a Release

Generated files specifically needed for the hosted GitHub Page will be built locally and pushed to the master branch.

1. Make sure the local repo is up to date.
2. Merge dev to master (make sure to `git checkout master`).
3. Run `npm build`. This should create 3 files in a folder called 'dist'.
4. Test it by opening index.html in browser(s).
5. Add files and commit.
6. Push to repo.
