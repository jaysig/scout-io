angular.module('ScoutIOApp')
  .controller('CommentsController', function(Auth, Save){
    this.comment = {};
    this.getCurrentUser = Auth.getCurrentUser
    this.author = Auth.getCurrentUser().username;
    this.isSavedPhoto = function(photoId){
      // this function when built will return a boolean
      return Save.isSavedPhoto(photoId);
    };
    this.edit = function(){};
    this.delete = function(){};
    this.save = function(){};
});