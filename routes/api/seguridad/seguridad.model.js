var fs = require('fs');
var fileToSave = 'security.json';
var userModel = {};
var userCollection = [];

function writeToFile(){
  var serializedJSON = JSON.stringify(userCollection);
  fs.writeFileSync(fileToSave, serializedJSON, { encoding: 'utf8' } );
  return true;
}
function openFile(){
  try{
  var serializedJSON = fs.readFileSync(fileToSave,{encoding:'utf8'});
  userCollection = JSON.parse(serializedJSON);
  } catch(e){
    console.log(e);
  }
}

var userTemplate = {
  userID:'',
  usertitle:"",
  userurl:"",
  userthumbnailUrl:"",
  useralbum: ""
}

openFile();

userModel.getAll = ()=>{
  return userCollection;
}

userModel.getById = (id)=>{
  var filteredUsers = userCollection.filter(
    (o)=>{
      return o.userID === id;
    }
  );
  if(filteredUsers.length){
    return filteredUsers[0];
  }else{
    return null
  }
}
userModel.addNew = ({ usertitle, userurl, userthumbnailUrl ,useralbum }  )=>{
  var newUser = Object.assign(
    {},
    userTemplate,
    {
      usertitle: usertitle,
      userurl: userurl,
      userthumbnailUrl:userthumbnailUrl,
      useralbum: useralbum
    }
  );
  newUser.userID = userCollection.length + 1;

  userCollection.push(newUser);
  writeToFile();
  return newUser;
}
userModel.update = (id, { usertitle, userurl, userthumbnailUrl, useralbum  })=>{
 var updatingUser = userCollection.filter(
   (o, i)=>{
     return o.userID === id;
   }
 );
 if(updatingUser && updatingUser.length>0){
   updatingUser = updatingUser[0];
 } else {
   return null;
 }
 var updateUser = {};
 var newUpdatedCollection = userCollection.map(
   (o, i)=>{
     if(o.userID === id){
       updateUser = Object.assign({},
          o,
         { usertitle: usertitle, userurl:userurl, userthumbnailUrl:userthumbnailUrl, useralbum: useralbum }
       );
       return updateUser;
     }else{
       return o;
     }
   }
 );
  userCollection = newUpdatedCollection;
  writeToFile();
  return updateUser;
}
