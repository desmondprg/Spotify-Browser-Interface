I utilized the Spotify API to create a web interface using Angular, Typescript, HTML, and CSS/

Setup:

1. In the webserver directory, create a JSON file called "webserver directory" containing:

>{
> "client_id": "Your Client Key",
> "client_secret": "Your Client Secret"
>} 

This information is populated from the Spotify developer dashboard 

2. in the webserver directory, create another JSON file called "tokens.json" which should contain exactly:

>{
> "access_token": null,
> "refresh_token": null
?} 

3. In your Spotify Dashboard, set the redirect URI to"

>http://localhost:8888/callback

4. In both client folder an webserver directory, run:

>npm install

5. In the webserver directory, run:
npm start

6. in the client directory, run:
ng serve --open
