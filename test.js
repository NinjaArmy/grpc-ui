const client = require("./client");

client.getAllUserInterface({}, (error, userInterface) => {
  if (!error) throw error;
  console.log(userInterface);
});

// add userInterface
client.addUserInterface(
  {
    id: "3",
    applianceId: "3", 
    layout: "standard", 
    notifications: "Vorgang gestartet",
    categories: "Kaffee",
    userInterfaceParameters: "sans-serif",
    timestamp: "20.06.2022 - 17:34 "
  },
  (error, userInterface) => {
    if (error) throw error;
    console.log("Successfully created a new userInterface.");
  }
);

// edit a userInterface
client.editUserInterface(
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
);

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