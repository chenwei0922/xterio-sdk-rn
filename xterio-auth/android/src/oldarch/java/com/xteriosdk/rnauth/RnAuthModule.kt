package com.xteriosdk.rnauth

import com.facebook.react.bridge.Promise
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod
import com.facebook.react.module.annotations.ReactModule

@ReactModule(name = RnAuthModuleImpl.NAME)
class RnAuthModule(reactContext: ReactApplicationContext) : ReactContextBaseJavaModule(reactContext) {
  private var mRnAuthModuleImpl: RnAuthModuleImpl = RnAuthModuleImpl(reactContext)

  override fun getName(): String = RnAuthModuleImpl.NAME

  @ReactMethod
  fun setItem(key:String, value:String){
    mRnAuthModuleImpl.setItem(key, value)
  }

  @ReactMethod
  fun getItem(key: String, promise: Promise?) {
    promise?.resolve(mRnAuthModuleImpl.getItem(key))
  }

  @ReactMethod
  fun removeItem(key: String) {
    mRnAuthModuleImpl.removeItem(key)
  }

  @ReactMethod
  fun clear() {
    mRnAuthModuleImpl.clear()
  }

  @ReactMethod
  fun login(url:String,scheme:String, promise: Promise){
    mRnAuthModuleImpl.login(url, scheme, promise)
  }

  @ReactMethod
  fun multiply(a: Double, b: Double, promise: Promise?) {
    promise?.resolve(mRnAuthModuleImpl.multiply(a,b))
  }
}
