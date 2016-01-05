angular.module('ScoutIOApp')
  .factory('Link', function ($http) {

    var currentLinks = [];

    var isSavedLink = function(photo){
    // a photo that is saved in the db when returned by a search will have a boolean property "saved"
    return photo.saved;
    }

    // GET ALL OF A USERS LINKS
    var getAllLinks = function(user){
      return $http({
        method: 'GET',
        url: '/api/links/' + user.id + '/user' 
      })
        .then(function(response){
          console.log(response);
          return response
        })
        .catch(function(error){
          console.log(error, "in catch: link-factory")
        });
    };

    // GET A LINK BY ID
    var getLinkById = function(link){
      return $http({
        method: 'GET',
        url: '/api/links/' + link.id
      })
        .then(function(response){
          console.log(response);
          return response
        })
        .catch(function(error){
          console.log(error, "in catch: link-factory")
        });
    };

    //GET ALL COMMENTS FOR A LINK
    var getLinkComments = function(link){
      return $http({
        method: 'GET',
        url: '/api/links/' + asset.id + '/comments'
      })
        .then(function(response){
          console.log(response);
          return response
        })
        .catch(function(error){
          console.log(error, "in catch: link-factory")
        });
    };

    // SAVE A LINK
    var saveLink = function(link){
      return $http({
        method: 'POST',
        url: '/api/links',
        data: link
      })
      .then(function(response){
        var message = 'Location Has Been Successfully Saved';
        return message;
      })
        .catch(function(error){
          console.log(error, "in catch: link-factory")
        });
    };

    // EDIT A LINK 
    var editLink = function(link){
      return $http({
        method: 'PUT',
        url: '/api/links/' + link.id,
        data: link
      })
        .then(function(response){
         console.log('link was updated');
         var message = 'Location Has Been Successfully Updated';
         return message;
        })
        .catch(function(error){
          console.log(error, "in catch: link-factory")
        });
    };

    // DELETE A LINK
    var deleteLink = function(link){
      return $http({
        method: 'DELETE',
        url: '/api/links/' + link.id
      })
        .then(function(response){
         console.log('link was deleted');
         var message = 'Location Has Been Successfully Deleted';
        })
        .catch(function(error){
          console.log(error, "in catch: link-factory")
        });
    };

    return {
       getCurrentLinks: function(){return currentLinks;},
       getAllLinks: getAllLinks,
       getLinkById: getLinkById,
       saveLink: saveLink,
       editLink: editLink,
       deleteLink: deleteLink
    };
    
   }); 







  