// Configuration for some standard constants

// const backendServer = "141.252.231.194:8010" // school ip
// const backendServer = "butter-robot-mv.herokuapp.com" // server adress
// const imageAddress = "192.168.178.16:8010/static" // local adress

export const backendServer = "192.168.178.16:8010" // thuis ip
export const imageAddress = "robot-bucket-r-m.s3.amazonaws.com/media" // server adress
export const protocol = 'https'
export const wsProtocol = 'ws'
export const defaultDateDelimiter = '/'
export const baseCameraUrl = `${protocol}://${imageAddress}/capture.bmp`;
export const cleanAsyncStorage = false; // indien je even het onboarding screen wilt zien
export const productionBuild = true;

export const websocketUrl = `${wsProtocol}://${backendServer}/ws/test1/`;
export const socket = new WebSocket(websocketUrl);