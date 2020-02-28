const express = require('express');
const router = express.Router();

router.get('/feed', async (req, res) => {
    this._ctx = req.ctx;
    let id = req.query.id;
    let user = await this._ctx.userQuery.find(id);
    let ids = await this._ctx.followQuery.getFollowedAccounts(id);
    if (ids.length < 0) {
        return [];
    }
    let sharedSongs = await this._ctx.songQuery.selectByUserId(ids);
    let songIds = sharedSongs.map(song => song.songId);
    try {
        let songs = await this._ctx.songHelper.getSongsByIds(songIds, user.access_token);
        res.status(201).json(songs);
    }
    catch (err) {
        console.log(err);
        res.status(500);
    }
});

module.exports = router;