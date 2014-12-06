PlayersList = new Mongo.Collection('players');

if (Meteor.isClient) {
  Template.leaderboard.helpers({
    'players': function () {
      return PlayersList.find();
    },
    'selectedClass': function () {
      return (Session.get('selectedPlayer') === this._id) ? 'selected' : '';
    },
    'playerId': function () {
      return this._id;
    }
  });

  Template.leaderboard.events({
    'click .player': function () {
      Session.set('selectedPlayer', this._id);
    },
    'click .pointsBtn': function () {
      var player = PlayersList.find(this._id).fetch()[0];
      PlayersList.update(this._id, {'name': player.name, 'score': player.score + 5});
      return;
    }
  });
}

if (Meteor.isServer) {
}