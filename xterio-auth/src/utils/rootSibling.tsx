import { type ReactElement } from 'react'
import RootSiblings from 'react-native-root-siblings'

export class RootSiblingManger {
  private id: number = 1
  sibList: Map<number, RootSiblings> = new Map()

  constructor() {}

  public getId() {
    return ++this.id
  }
  public append(element: ReactElement, id?: number) {
    let _id = this.id
    if (id) {
      _id = id
    } else {
      this.id++
      _id += 1
    }

    if (this.sibList.get(_id)) {
      this.update(element, _id)
      return _id
    }
    const sib = new RootSiblings(element)
    this.sibList.set(_id, sib)
    return _id
  }
  public destroy(id?: number) {
    id && this.sibList.get(id)?.destroy()
  }
  public update(element: ReactElement, id: number) {
    id && this.sibList.get(id)?.update(element, () => {})
  }
}

export default new RootSiblingManger()
