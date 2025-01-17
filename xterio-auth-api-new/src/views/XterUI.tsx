import { rootSiblingManger } from '../utils'
import XWebView from './Web'

export class XterUI {
  private static globalWebId: number = rootSiblingManger.getId()
  static openWeb(uri: string) {
    return rootSiblingManger.append(<XWebView url={uri} uid={this.globalWebId} />, this.globalWebId)
  }
}
