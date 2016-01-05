angular.module('ScoutIOApp')
   .factory('Comment', function ($http) {
  
    // GET ALL OF A USERS COMMENTS
    var getAllComments = function(user){
      return $http({
        method: 'GET',
        url: 'api/comments/' + user.id + '/user'
      })
      .then(function(response){
        console.log(response);
        return response
      })
      .catch(function(error){
        console.log(error, "in catch: comment-factory")
      });
    };

    // GET A COMMENT BY ID
    var getCommentById = function(comment){
      return $http({
        method: 'GET',
        url: 'api/comments/' + comment.id
      })
      .then(function(response){
        console.log(response);
        return response
      })
      .catch(function(error){
        console.log(error, "in catch: comment-factory")
      });
    };


    // SAVE A COMMENT
    // need to pass in id for link or asset, author, will add created_at, updated_at
    var saveComment = function(comment){
      return $http({
        method: 'POST',
        url: '/api/comments',
        data: comment
      })
      .then(function(response){
        console.log('comment was saved');
        var message = 'Comment Has Been Successfully Saved';
        return message;
      })
      .catch(function(error){
        console.log(error, "in catch: comment-factory")
      });
    };

    // EDIT A COMMENT
    var editComment = function(comment){
      return $http({
        method: 'PUT',
        url: '/api/comments/' + comment.id,
        data: comment
      })
      .then(function(response){
       console.log('comment was updated');
       var message = 'Comment Has Been Successfully Updated';
       return message;
      })
      .catch(function(error){
        console.log(error, "in catch: comment-factory")
      });
    };

    // DELETE A COMMENT
    var deleteComment = function(comment){
      return $http({
        method: 'DELETE',
        url: '/api/comments/' + comment.id
      })
      .then(function(response){
       console.log('comment was deleted');
       var message = 'Comment Has Been Successfully Deleted';
      })
      .catch(function(error){
        console.log(error, "in catch: comment-factory")
      });
    };

    return {
      getAllComments: getAllComments,
      getCommentById: getCommentById,
      saveComment: saveComment,
      editComment: editComment,
      deleteComment: deleteComment
    };

  }); 