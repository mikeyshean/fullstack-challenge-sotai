import { cpuHoursRouter } from "./routers/cpuHoursRouter";

// Not necessary for this project, but this is how I 
// might export all my apis/hooks needed throughout the 
// client. 
export const api = {
  cpuHours: cpuHoursRouter
}