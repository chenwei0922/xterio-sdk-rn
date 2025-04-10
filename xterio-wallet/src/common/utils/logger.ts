import { XterLog } from "@xterio-sdk/rn-auth";
import { Utils } from "./util";

class XLog extends XterLog {
  getName(): string {
    return 'XterioWallet'
  }
  getVersion(): string {
    return Utils.pkgVersion
  }
}

export default new XLog()