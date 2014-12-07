Meteor.publish('thePlayers', function () {
    return PlayersList.find({'createdBy': this.userId});
});