const grpc = require("@grpc/grpc-js");
const PROTO_PATH = "./userInterface.proto";
var protoLoader = require("@grpc/proto-loader");

const options = {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
};

var packageDefinition = protoLoader.loadSync(PROTO_PATH, options);
const userInterfaceProto = grpc.loadPackageDefinition(packageDefinition);

const server = new grpc.Server();
let userInterfaces = [
  { 
    id: 1,
    applianceId: 1, 
    Layout: {
      id: 1,
      ApplianceType: {
        MANUFACTURER: "Bosch",
        MODEL: "X-3"
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
        LIBRARY: "bosch home",
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
  { 
    id: 2,
    applianceId: 2, 
    Layout: {
      id: 1,
      ApplianceType: {
        MANUFACTURER: "Siemens",
        MODEL: "S12"
      },
      // Question here
      applianceType: "",
      views: 1
    },
    View: {
      id: 2,
      ViewType: {
        STANDBY: 0,  // 0==false || 1==true
        IDENTIFICATION: "home",
        HOMESCREEN: "standard",
        ACTIVE_PROGRAM: "espresso",
        LIBRARY: "siemens home",
        PROGRAM_SETTINGS: "standard",
      },
      type: "home",
    },
    Notification: {
      id: 2,
      NotificationType: {
        DOOR_OPEN: 0, // 0==false || 1==true
        PROGRAM_FINISHED: 1,  // 0==false || 1==true
        ADD_PROGRAM: "espresso",
        FUNCTION_NOT_AVAILABLE: "Don't know what this is for",
        EMPTY: 0, //  0==false || 1==true
      },
      type: "Success", // Success / Danger / Warning?
      topic: "espresso",
      description: "Makes a standard espresso"

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
    categories: "espresso",
    timestamp: "21.06.2022 - 22:54"
  },
];

server.addService(userInterfaceProto.UserInterfaceService.service, {
  getAllUserInterface: (_, callback) => {
    callback(null, userInterfaces);
  },
  getUserInterface: (_, callback) => {
    const userInterfaceId = _.request.id;
    const userInterfaceItem = userInterfaces.find(({ id }) => userInterfaceId == id);
    callback(null, userInterfaceItem);
  },
  deleteUserInterface: (_, callback) => {
    const userInterfaceId = _.request.id;
    userInterfaces = userInterfaces.filter(({ id }) => id !== userInterfaceId);
    callback(null, {});
  },
  editUserInterface: (_, callback) => {
    const userInterfaceId = _.request.id;
    const userInterfaceItem = userInterfaces.find(({ id }) => userInterfaceId == id);
    
    /* timestamp probably not editable? */
    userInterfaceItem.applianceId = _.request.applianceId;
    userInterfaceItem.layout = _.request.layout;
    userInterfaceItem.notifications = _.request.notifications;
    userInterfaceItem.categories = _.request.categories;
    userInterfaceItem.userInterfaceParameters = _.request.userInterfaceParameters;
    callback(null, userInterfaceItem);
  },
  addUserInterface: (call, callback) => {
    let _userInterface = { id: Date.now(), ...call.request };
    userInterfaces.push(_userInterface);
    callback(null, _userInterface);
  },
});

server.bindAsync(
  "127.0.0.1:50051",
  grpc.ServerCredentials.createInsecure(),
  (error, port) => {
    console.log("Server at port:", port);
    console.log("Server running at http://127.0.0.1:50051");
    server.start();
  }
);