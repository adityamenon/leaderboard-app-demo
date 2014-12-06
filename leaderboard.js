PlayersList = new Mongo.Collection('players');

if (Meteor.isClient) {
  Template.leaderboard.helpers({
    'players': function () {
      return PlayersList.find({'createdBy': Meteor.userId()}, {'sort': {'score': -1, 'name': 1}});
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
      PlayersList.update(Session.get('selectedPlayer'), {'$inc': {'score': 5}});
      return;
    },
    'click .decrement': function () {
      PlayersList.update(Session.get('selectedPlayer'), {'$inc': {'score': -5}});
    },
    'click .removePlayer': function () {
      var removePlayerConfirmation = window.confirm('Are you sure you want to remove the player?');

      if (removePlayerConfirmation) {
        PlayersList.remove(Session.get('selectedPlayer'));
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
      PlayersList.insert({
        'name': playerName,
        'score': playerScore,
        'createdBy': Meteor.userId()
      });

      ev.target.playerName.value = ev.target.playerScore.value = '';
    }
  });
}