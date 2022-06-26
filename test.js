const client = require("./client");

client.getAllUserInterface({}, (error, userInterfaces) => {
  if (!error) throw error;
/*   for(let i = 0; i < userInterfaces.length; i++){
    console.log(userInterfaces[i]);
  } */
  console.log(userInterfaces);
});

// add userInterface
client.addUserInterface(
  { 
    id: 3,
    appliance_id: 3, 
    Layout: {
      id: 1,
      ApplianceType: {
        MANUFACTURER: "LG",
        MODEL: "LG-Coffee"
      },
      // Question here
      appliance_type: "",
      views: 1
    },
    View: {
      id: 1,
      ViewType: {
        STANDBY: 1,  // 0==false || 1==true
        IDENTIFICATION: "home",
        HOMESCREEN: "standard",
        ACTIVE_PROGRAM: "coffee",
        LIBRARY: "LG home",
        PROGRAM_SETTINGS: "standard",
      },
      type: "home",
    },
    Notification: {
      id: 1,
      NotificationType: {
        DOOR_OPEN: 0, // 0==false || 1==true
        PROGRAM_FINISHED: 1,  // 0==false || 1==true
        ADD_PROGRAM: "coffee",
        FUNCTION_NOT_AVAILABLE: "Don't know what this is for",
        EMPTY: 0, //  0==false || 1==true
      },
      type: "Success", // Success / Danger / Warning?
      topic: "coffee",
      description: "Makes a standard coffee"

    },
    userInterfaceParameters: {
      font: "sans-serif",
      font_size_multiplier: 1,
      contrast: 3,
      element_size: 12,
      //  0==false || 1==true
      font_bold: 0,
      font_italic: 0,
      font_underline: 0,
    },
    categories: "Coffee",
    timestamp: "19.06.2022 - 22:44 "
  },
  (error, userInterface) => {
    if (error) throw error;
    console.log("Successfully created a new userInterface.");
  }
);

/* edit a userInterface
   Needs to be changed to fit the new Object
*/
/* client.editUserInterface(
  {
    id: "2 edited",
    appliance_id: "2 edited", 
    layout: "custom edited", 
    notifications: "Program started edited",
    categories: "Tea edited",
    userInterfaceParameters: "sans-serif",
    timestamp: "19.06.2022 - 23:51 "
  },
  (error, userInterface) => {
    if (error) throw error;
    console.log("Successfully edited a userInterface.");
  }
); */

// delete a userInterface
client.deleteUserInterface(
  {
    id: 3,
  },
  (error, userInterface) => {
    if (error) throw error;
    console.log("Successfully deleted a userInterface.");
  }
);