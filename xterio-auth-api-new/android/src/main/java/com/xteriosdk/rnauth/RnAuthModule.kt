package com.xteriosdk.rnauth

import android.content.Context
import android.content.SharedPreferences
import android.net.Uri
import android.util.Log
import androidx.browser.customtabs.CustomTabsIntent
import com.facebook.react.bridge.Promise
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.module.annotations.ReactModule

@ReactModule(name = RnAuthModule.NAME)
class RnAuthModule(reactContext: ReactApplicationContext) :
  NativeRnAuthSpec(reactContext) {
  private val _reactContext: ReactApplicationContext = reactContext

  override fun getName(): String {
    return NAME
  }

  override fun setItem(key:String, value:String){
    val sharedPref = reactApplicationContext.getSharedPreferences("my_prefs", Context.MODE_PRIVATE)
    val editor = sharedPref.edit()
    editor.putString(key, value)
    editor.apply()
  }

  override fun getItem(key: String): String? {
    reactApplicationContext
    val sharedPref = reactApplicationContext.getSharedPreferences("my_prefs", Context.MODE_PRIVATE)
    val username = sharedPref.getString(key, null)
    return username.toString()
  }

  override fun removeItem(key: String) {
    val sharedPref = reactApplicationContext.getSharedPreferences("my_prefs", Context.MODE_PRIVATE)
    val editor = sharedPref.edit()
    editor.remove(key)
    editor.apply()
  }

  override fun clear() {
    val sharedPref = reactApplicationContext.getSharedPreferences("my_prefs", Context.MODE_PRIVATE)
    val editor = sharedPref.edit()
    editor.clear()
    editor.apply()
  }

  override fun login(url:String,scheme:String, promise: Promise){
    Log.d(TAG, "Login")
    _promise = promise
    val intent = CustomTabsIntent.Builder().build()
    val currentActivity = _reactContext.currentActivity
    if(currentActivity != null){
      intent.launchUrl(currentActivity, Uri.parse(url))
    }else{
      promise.reject("NO_ACTIVITY", "Current activity is null")
    }
  }

  // Example method
  // See https://reactnative.dev/docs/native-modules-android
  override fun multiply(a: Double, b: Double): Double {
    return a * b
  }

  companion object {
    private const val TAG = "NativeRnAuth"
    private var _promise: Promise? = null

    const val NAME = "NativeRnAuth"
    fun handleUrl(url: String) {
      Log.d(TAG, url)
      _promise?.resolve(url)
      _promise = null
    }
  }
}
