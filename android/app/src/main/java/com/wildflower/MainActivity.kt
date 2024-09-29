package com.wildflower

import com.facebook.react.ReactActivity
import android.os.Bundle;
import android.content.res.Resources
import android.content.res.Configuration
import com.facebook.react.ReactActivityDelegate
import android.content.Context
import android.util.Log 
import android.util.DisplayMetrics  // DisplayMetrics import
import android.view.WindowManager   // WindowManager import
import com.facebook.react.defaults.DefaultNewArchitectureEntryPoint.fabricEnabled
import com.facebook.react.defaults.DefaultReactActivityDelegate

class MainActivity : ReactActivity() {

  /**
   * Returns the name of the main component registered from JavaScript. This is used to schedule
   * rendering of the component.
   */
  override fun getMainComponentName(): String = "wildflower"

  /**
   * Returns the instance of the [ReactActivityDelegate]. We use [DefaultReactActivityDelegate]
   * which allows you to enable New Architecture with a single boolean flags [fabricEnabled]
   */
  override fun createReactActivityDelegate(): ReactActivityDelegate =
      DefaultReactActivityDelegate(this, mainComponentName, fabricEnabled)

  override fun onCreate(savedInstanceState: Bundle?) {
    super.onCreate(null)
    logCurrentDensity()

    window.setFlags(
      WindowManager.LayoutParams.FLAG_SECURE,
      WindowManager.LayoutParams.FLAG_SECURE
    )
  }
      // 화면 밀도 출력 함수
  private fun logCurrentDensity() {
      val metrics: DisplayMetrics = resources.displayMetrics
      val density = metrics.density
      val scaledDensity = metrics.scaledDensity
      val densityDpi = metrics.densityDpi

      // Log 클래스를 이용하여 density 값 출력
      Log.d("MainActivity", "Current Density: $density")
      Log.d("MainActivity", "Current Scaled Density: $scaledDensity")
      Log.d("MainActivity", "Current Density DPI: $densityDpi")
  }
    // 시스템 폰트 크기 조정 무시 설정
  override fun attachBaseContext(newBase: Context?) {
        super.attachBaseContext(newBase)

        // 새로 정의된 리소스 적용
        newBase?.let { context ->
            val res: Resources = context.resources
            val config: Configuration = res.configuration

            // 폰트 크기 강제 설정 (1배율 고정)
            if (config.fontScale != 1f) {
                config.fontScale = 1f
            }

            // 화면 밀도 강제 설정 (1배율 고정)
            val metrics: DisplayMetrics = res.displayMetrics
            val defaultDensity = 1.0f

            if (metrics.density != defaultDensity || metrics.scaledDensity != defaultDensity) {
                metrics.density = defaultDensity
                metrics.scaledDensity = defaultDensity
                metrics.densityDpi = (defaultDensity * 160).toInt()

                Log.d("MainActivity", "Density updated in attachBaseContext: ${metrics.density}")
            }

            res.updateConfiguration(config, metrics)
        }
    }
}
