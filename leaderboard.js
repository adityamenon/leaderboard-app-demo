PlayersList = new Mongo.Collection('players');

if (Meteor.isClient) {
  Meteor.subscribe('thePlayers');

  Template.leaderboard.helpers({
    'players': function () {
      return PlayersList.find({}, {'sort': {'score': -1, 'name': 1}}).fetch();
    },
    'selectedClass': function () {
      return (Session.get('selectedPlayer') === this._id) ? 'selected' : '';
    },
    'playerId': function () {
      return this._id;
    },
    'disablePlayerActions': function () {
      return (typeof Session.get('selectedPlayer') !== 'string') ? 'disabled' : '';
    },
    'showSelectedPlayer': function () {
      return PlayersList.findOne(Session.get('selectedPlayer'));
    }
  });

  Template.leaderboard.events({
    'click .player': function () {
      var selectedPlayer = Session.get('selectedPlayer'),
          clickedPlayer = this._id;

      if (selectedPlayer === clickedPlayer) {
        Session.set('selectedPlayer', undefined)
      } else {
        Session.set('selectedPlayer', clickedPlayer);
      }

      return;
    },
    'click .increment': function () {
      Meteor.call('updatePlayerScore', Session.get('selectedPlayer'), 5)
      return;
    },
    'click .decrement': function () {
      Meteor.call('updatePlayerScore', Session.get('selectedPlayer'), -5)
      return;
    },
    'click .removePlayer': function () {
      var removePlayerConfirmation = window.confirm('Are you sure you want to remove the player?');

      if (removePlayerConfirmation) {
        Meteor.call('removePlayerData', Session.get('selectedPlayer'));
      } else {
        window.alert('Removal cancelled.');
      }

      return;
    }
  });

  Template.addPlayerForm.events({
    'submit form': function (ev) {
      ev.preventDefault();

      var playerName = ev.target.playerName.value,
          playerScore = ev.target.playerScore.value;

      ev.target.playerName.value = ev.target.playerScore.value = '';

      return Meteor.call('insertPlayerData', {
        'name': playerName,
        'score': parseInt(playerScore)
      });
    }
  });
}

if (Meteor.isServer) {
  Meteor.publish('thePlayers', function () {
    return PlayersList.find({'createdBy': this.userId});
  });

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
}