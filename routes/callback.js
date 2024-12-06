const db = require('./db/db_setup');

app.get('/callback', async (req, res) => {
  const code = req.query.code;

  try {
    const tokenResponse = await axios.post('https://accounts.spotify.com/api/token', querystring.stringigy({
      grant_type: 'authorization_code',
      code,
      redirect_uri: REDIRECT_URI,
      client_id: CLIENT_ID,
      client_secret: CLIENT_SECRET,
    }), {
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    });

    const { access_token, refresh_token, token_expiration } = response.data;

    const userPRofile = await.get('https://api.spotify.com/v1/me', {
      headers: { Authorization: `Bearer ${access_token}` }
    });

    const spotifyUserId = userProfile.data.id;

    const tokenExpiresAt = new Date(Date.now() + expires_in * 1000);
    
    await db.query(`
      `)

    res.join({
      message: 'AUTHENTICATION WAS A SUCCESS!',
      access_token,
      refresh_token
    });
  } catch (error) {
    console.error('ERROR Exchanging code for tokens:', error.response.data);
    res.status(500).send('FAILED AUTHENTICATION..');
  }
});