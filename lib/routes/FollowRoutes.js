const express = require('express');
const router = express.Router();

router.get('/feed', async (req, res) => {
    //TODO: Add some kind of timestamp to get the feed since so there is a limit. Clinet can manage that.
    this._ctx = req.ctx;
    let id = req.query.id;
    let user = await this._ctx.userQuery.find(id);
    let followedIds = await this._ctx.followQuery.getFollowedAccountIds(id);
    if (followedIds.length < 0) {
        return [];
    }
    let sharedSongs = await this._ctx.songQuery.selectByUserId(followedIds);
    let displayNames = [];
    for (let song of sharedSongs) { // MongoDB returns a unique set of values which is why this loop is needed
        let displayName = await this._ctx.userQuery.selectDisplayNameById(song.userId);
        displayNames.push(...displayName);
    }
    let songIds = sharedSongs.map(song => song.songId);
    try {
        let songs = await this._ctx.songHelper.getSongsByIds(songIds, user.access_token);
        if (displayNames.length !== songs.length) {
            console.log('Hmmmmm something weird here: ', displayNames.length, songs,length);
        }
        for (let i = 0; i < songs.length; i++) {
            songs[i].displayName = displayNames[i];
        }
        console.log('Returning', songs.length, 'feed resutls')
        res.status(201).json(songs.reverse());
    }
    catch (err) {
        console.log(err);
        res.status(500);
    }
});

module.exports = router;