// Configuration for some standard constants
// export const backendServer = "192.168.178.16:8010" // home ip
// export const backendServer = "butter-robot-mv.herokuapp.com";

export const backendServer = "thawing-tor-95409.herokuapp.com";
export const imageAddress = "robot-bucket-r-m.s3.amazonaws.com/media"; // server address bucket
export const protocol = 'https';
export const wsProtocol = 'wss';
export const defaultDateDelimiter = '/';
export const baseCameraUrl = `${protocol}://${imageAddress}/capture.bmp`;
export const cleanAsyncStorage = false; // used for debugging
export const productionBuild = true;
export const websocketUrl = `${wsProtocol}://${backendServer}/ws/test1/`;
export const socket = new WebSocket(websocketUrl);