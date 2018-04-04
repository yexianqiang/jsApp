


const originRouteParser = zzhJs.helpers.routeParser;

/**
 * 附加初试参数
 */
function routeParser(route, params) {
  return originRouteParser(route, params);
}

window.zzhJs.helpers.routeParser = routeParser;
