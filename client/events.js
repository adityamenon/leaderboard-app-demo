Template.mainDisplay.events({
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
