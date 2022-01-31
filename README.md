To be a better citizen the master branch has been renamed to main, so update if you need to.

# Rotato 🥔+🔄=🍐

This project is a pairing board for teams that use pair programming . It allows you to rotate team members and tasks easily with the click of a button. It is designed to be independent of a backend as both an engineering challenge, and because what do you think I am made of money? It is a progressive web app so you can even install it on your phone, if you want. It offers several themes and pairing options including sharing boards via a link.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.
Of course, this will not run the service worker. If you want to run it with the service worker you will need to run `ng build --prod` and then `http-server -p 4200 -c-1 dist/rotato-ui`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `npm run test` to run the test for the project. This run automatically when you push 
