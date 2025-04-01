package com.xteriosdk.rnauth

import com.facebook.react.bridge.Promise
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.module.annotations.ReactModule

@ReactModule(name = RnAuthModuleImpl.NAME)
class RnAuthModule(reactContext: ReactApplicationContext) :
  NativeRnAuthSpec(reactContext) {
  private var mRnAuthModuleImpl: RnAuthModuleImpl = RnAuthModuleImpl(reactContext)

  override fun getName(): String = RnAuthModuleImpl.NAME

  override fun setItem(key:String, value:String){
    mRnAuthModuleImpl.setItem(key, value)
  }

  override fun getItem(key: String, promise: Promise?) {
    promise?.resolve(mRnAuthModuleImpl.getItem(key))
  }

  override fun removeItem(key: String) {
    mRnAuthModuleImpl.removeItem(key)
  }

  override fun clear() {
    mRnAuthModuleImpl.clear()
  }

  override fun login(url:String,scheme:String, promise: Promise){
    mRnAuthModuleImpl.login(url, scheme, promise)
  }

  override fun multiply(a: Double, b: Double, promise: Promise?) {
    promise?.resolve(mRnAuthModuleImpl.multiply(a,b))
  }
}
