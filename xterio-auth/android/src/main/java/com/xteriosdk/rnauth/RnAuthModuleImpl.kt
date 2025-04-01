
package com.xteriosdk.rnauth

import android.app.Activity
import android.content.Context
import android.content.Intent
import android.content.SharedPreferences
import android.net.Uri
import android.util.Log
import androidx.browser.customtabs.CustomTabsIntent
import com.facebook.react.bridge.ActivityEventListener
import com.facebook.react.bridge.Promise
import com.facebook.react.bridge.ReactApplicationContext

class RnAuthModuleImpl(reactContext: ReactApplicationContext) : ActivityEventListener {
  private val _reactContext: ReactApplicationContext = reactContext
  private val sharedPref = _reactContext.getSharedPreferences("my_prefs", Context.MODE_PRIVATE)

  companion object {
    private const val TAG = "NativeRnAuth"
    private var _promise: Promise? = null
    private var _scheme: String = ""

    const val NAME = "NativeRnAuth"
    fun handleUrl(url: String) {
      Log.d(TAG, url)
      _promise?.resolve(url)
      _promise = null
    }
  }
  init {
    _reactContext.addActivityEventListener(this)
  }

  override fun onActivityResult(p0: Activity?, p1: Int, p2: Int, p3: Intent?) {
    //用于处理activity页面回传数据, 例如：someActivity.startActivityForResult(intent, REQUEST_CODE)
    //p1:requestCode: p2:resultCode p3:Intent
    TODO("Not yet implemented")
  }

  //scheme处理
  override fun onNewIntent(intent: Intent?) {
    if (intent != null && intent.data != null) {
      val uri = intent.data
      val url = uri.toString()
      println("the redirect url:$url")
      if(url.startsWith(_scheme)) {
        _promise?.resolve(url)
        _promise = null
      }
    }
  }

  fun setItem(key:String, value:String){
    val editor = sharedPref.edit()
    editor.putString(key, value)
    editor.apply()
  }

  fun getItem(key: String): String {
    val username = sharedPref.getString(key, "")
    return username.toString()
  }

  fun removeItem(key: String) {
    val editor = sharedPref.edit()
    editor.remove(key)
    editor.apply()
  }

  fun clear() {
    val editor = sharedPref.edit()
    editor.clear()
    editor.apply()
  }

  fun login(url:String,scheme:String, promise: Promise){
    Log.d(TAG, "Login")
    _promise = promise
    _scheme = scheme
    val intent = CustomTabsIntent.Builder().build()
    val currentActivity = _reactContext.currentActivity
    if(currentActivity != null){
      intent.launchUrl(currentActivity, Uri.parse(url))
    }else{
      promise.reject("NO_ACTIVITY", "Current activity is null")
    }
  }

  fun multiply(a: Double, b: Double): Double {
    return a*b
  }

  //RCT_NEW_ARCH_ENABLED 新写法，兼容Legacy，写法改成上面
  // Example method
  // See https://reactnative.dev/docs/native-modules-android
  /*override fun multiply(a: Double, b: Double): Double {
    return a * b
  }*/
}
