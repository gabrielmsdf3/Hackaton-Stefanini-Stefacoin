import Exception from "./exception"

export default class UnauthorizedException extends Exception {
  // #pegabandeira - resolvido
  constructor(message: string, status = 401) {
    super(message, status)
  }
}
