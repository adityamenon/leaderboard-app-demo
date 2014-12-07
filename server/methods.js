Meteor.methods({
  'insertPlayerData': function (player) {
    return PlayersList.insert({
      'name': player.name,
      'score': player.score,
      'createdBy': Meteor.userId()
    });
  },
  'removePlayerData': function (playerId) {
    return PlayersList.remove(playerId);
  },
  'updatePlayerScore': function (playerId, score) {
    return PlayersList.update(playerId, {'$inc': {'score': parseInt(score)}});
  }
});
