const client = require("./client");

client.getAllUserInterface({}, (error, userInterfaces) => {
  if (!error) throw error;
  for(let i = 0; i < userInterfaces.length; i++){
    console.log(userInterfaces[i]);
  }
});

// add userInterface
client.addUserInterface(
  { 
    id: 3,
    applianceId: 3, 
    Layout: {
      id: 1,
      ApplianceType: {
        MANUFACTURER: "LG",
        MODEL: "LG-Coffee"
      },
      // Question here
      applianceType: "",
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
      fontSizeMultiplier: 1,
      contrast: 3,
      elementSize: 12,
      //  0==false || 1==true
      fontBold: 0,
      fontItalic: 0,
      fontUnderline: 0,
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
    applianceId: "2 edited", 
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