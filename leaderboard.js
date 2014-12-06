PlayersList = new Mongo.Collection('players');

if (Meteor.isClient) {
  Template.leaderboard.helpers({
    'players': function () {
      return PlayersList.find({}, {'sort': {'score': -1, 'name': 1}});
    },
    'selectedClass': function () {
      return (Session.get('selectedPlayer') === this._id) ? 'selected' : '';
    },
    'playerId': function () {
      return this._id;
    },
    'disablePoints': function () {
      return (typeof Session.get('selectedPlayer') !== 'string') ? 'disabled' : '';
    },
    'selectedPlayerName': function () {
      var player = PlayersList.find(Session.get('selectedPlayer')).fetch()[0];
      if (player) return player.name;
    }
  });

  Template.leaderboard.events({
    'click .player': function () {
      Session.set('selectedPlayer', this._id);
    },
    'click .increment': function () {
      PlayersList.update(Session.get('selectedPlayer'), {'$inc': {'score': 5}});
      return;
    },
    'click .decrement': function () {
      PlayersList.update(Session.get('selectedPlayer'), {'$inc': {'score': -5}});
    }
  });
}

if (Meteor.isServer) {
}