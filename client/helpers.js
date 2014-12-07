Template.mainDisplay.helpers({
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
