import { onRequestPost as __api_echo_js_onRequestPost } from "D:\\gitLocal\\homepage\\functions\\api\\echo.js"
import { onRequestGet as __api_ping_js_onRequestGet } from "D:\\gitLocal\\homepage\\functions\\api\\ping.js"

export const routes = [
    {
      routePath: "/api/echo",
      mountPath: "/api",
      method: "POST",
      middlewares: [],
      modules: [__api_echo_js_onRequestPost],
    },
  {
      routePath: "/api/ping",
      mountPath: "/api",
      method: "GET",
      middlewares: [],
      modules: [__api_ping_js_onRequestGet],
    },
  ]