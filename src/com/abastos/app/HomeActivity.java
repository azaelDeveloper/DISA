package com.abastos.app;

import org.apache.cordova.DroidGap;

import android.os.Bundle;

public class HomeActivity extends DroidGap {
	/** Called when the activity is first created. */
	@Override
	public void onCreate(Bundle savedInstanceState) {
		super.onCreate(savedInstanceState);
		this.getIntent().putExtra("loadUrlTimeoutValue", 60000);
		super.loadUrl("file:///android_asset/www/views/shared/layout.html");
	}
}