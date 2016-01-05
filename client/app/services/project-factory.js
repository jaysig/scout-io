angular.module('ScoutIOApp')
  .factory('Project', function ($http, Auth) {
    var projects = [];

// GET ALL USER PROJECTS
    var getUserProjects = function() {
      projects = [];
      return $http({
        method: 'GET',
        url: '/api/users/projects'
      })
        .then(function(response){
          projects = response.data;
          return response.data;
        })
        .catch(function(error){
          console.log(error, "in catch: project-factory")
        });
    };

// GET A PROJECT BY ID
  var getProjectById = function(project){
    return $http({
      method: 'GET',
      url: '/api/projects/' + project._id
    })
      .then(function(response){
        console.log(response);
        return response.data;
      })
      .catch(function(error){
        console.log(error, "in catch: project-factory")
      });
  };

//GET ALL FOLDERS THAT BELONG TO A PROJECT
  var getProjectFolders = function(project){
    return $http({
      method: 'GET',
      url: '/api/projects/' + project._id + '/folders'
    })
      .then(function(response){
        return response.data;
      })
      .catch(function(error){
        console.log(error, "in catch: project-factory")
      });
  };

//CREATE A PROJECT
  var createProject = function(project){
    return $http({
      method: 'POST',
      url: '/api/projects',
      data: project
    })
      .then(function(response){
        console.log('project was created');
        var message = 'Your Project Has Been Successfully Saved';
        return message;
   
      })
      .catch(function(error){
        console.log(error, "in catch: project-factory")
      });
  };

//EDIT A PROJECT 
  var editProject = function(project){
    return $http({
      method: 'PUT',
      url: '/api/projects/' + project._id,
      data: project
    })
      .then(function(response){
        console.log('project was updated');
        var message = 'Your Project Has Been Successfully Updated';
        return message;
      })
      .catch(function(error){
        console.log(error, "in catch: project-factory")
      });
  };

//DELETE A PROJECT 
  var deleteProject = function(project){
    return $http({
      method: 'DELETE',
      url: '/api/projects/' + project._id
    })
      .then(function(response){
        console.log('project was deleted');
        var message = 'Your Project Has Been Successfully Deleted';
        return message;
      })
      .catch(function(error){
        console.log(error, "in catch: project-factory")
      });
  };


    return {
      getProjects: function(){return projects;},
      getUserProjects: getUserProjects,
      getProjectById: getProjectById,
      getProjectFolders: getProjectFolders,
      createProject: createProject,
      editProject: editProject,
      deleteProject: deleteProject
    };
  });

