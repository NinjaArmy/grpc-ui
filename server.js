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
    id: "1",
    applianceId: "1", 
    layout: "standard", 
    notifications: "Program started",
    categories: "Coffee",
    userInterfaceParameters: "sans-serif",
    timestamp: "19.06.2022 - 22:44 "
  },
  { 
    id: "2",
    applianceId: "2", 
    layout: "custom", 
    notifications: "Program started",
    categories: "Tea",
    userInterfaceParameters: "sans-serif",
    timestamp: "19.06.2022 - 23:51 "
  },
];

server.addService(userInterfaceProto.UserInterfaceService.service, {
  getAllUserInterface: (_, callback) => {
    callback(null, userInterface);
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
    console.log("Server running at http://127.0.0.1:50051");
    server.start();
  }
);