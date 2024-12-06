app.get('/login', (req, res) => {
  const queryParams = querystring.stringify({
    client_id: CLIENT_ID,
    redirect_uri: REDIRECT_URI,
    response_type: 'code',
    scope: 'user-read-recently-played'
  });

  res.redirect(`https://accounts.spotify.com/authorize?${queryParams}`);
});