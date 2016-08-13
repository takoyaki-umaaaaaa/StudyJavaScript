// 空白のテンプレートの概要については、次のドキュメントを参照してください:
// http://go.microsoft.com/fwlink/?LinkId=232509

(function () {
	"use strict";

	var app = WinJS.Application;
	var activation = Windows.ApplicationModel.Activation;
	var isFirstActivation = true;

	app.onactivated = function (args) {
		if (args.detail.kind === activation.ActivationKind.voiceCommand) {
			// TODO: 関連する ActivationKind を処理します。たとえば、アプリを音声コマンドで起動できる場合は、
			// 入力フィールドを設定するか、それとも別の初期ビューを選ぶかをここで決定します。
		}
		else if (args.detail.kind === activation.ActivationKind.launch) {
			// ユーザーがタイルを使用してアプリを起動すると、起動アクティベーションが行われます
			// または本文をクリックするかタップすると、トースト通知が呼び出されます。
			if (args.detail.arguments) {
				// TODO: アプリがトーストをサポートしている場合、トースト ペイロードのこの値を使用して、
				// トースト通知を起動する操作に対応して、アプリ内のどこにユーザーを移動させるかを決定します。
			}
			else if (args.detail.previousExecutionState === activation.ApplicationExecutionState.terminated) {
				// TODO: このアプリケーションは中断され、メモリを確保するために終了されました。
				// スムーズなユーザー エクスペリエンスとなるよう、ここでアプリケーション状態を復元し、アプリが停止したようには見えないようにします。
				// メモ: すぐに回復した場合は、アプリが最後に中断された時間を記録し、状態のみを復元することもできます。
			}
		}

		if (!args.detail.prelaunchActivated) {
			// TODO: prelaunchActivated が true だったとすれば、アプリは最適化のためにバックグラウンドで事前起動するはずでした。
			// このケースでは、その後すぐに中断状態になったはずです。
			// 起動時に発生する長時間実行の操作 (コストのかかるネットワークまたはディスクの I/O など) またはユーザーの状態に対する変更は、
			// ここで行う必要があります (事前起動のケースで実行されないようにするため)。
			// あるいは、この操作を resume または visibilitychanged ハンドラーで実行することもできます。
		}

		if (isFirstActivation) {
			// TODO: アプリはアクティブ化されましたが、実行されていませんでした。ここで一般的なスタートアップの初期化を行います。
			document.addEventListener("visibilitychange", onVisibilityChanged);
			args.setPromise(WinJS.UI.processAll());

			setWindowColors();
		}

		isFirstActivation = false;
	};

	function onVisibilityChanged(args) {
		if (!document.hidden) {
			// TODO: アプリが表示されるようになりました。ここでビューを最新の情報に更新することができます。
		    showToast();
		}
	}

	app.oncheckpoint = function (args) {
		// TODO: このアプリケーションは中断しようとしています。ここで中断中に維持する必要のある状態を保存します。
		// WinJS.Application.sessionState オブジェクトを使用している可能性があります。このオブジェクトは、中断の間自動的に保存され、復元されます。
		//ご使用のアプリケーションを中断する前に非同期の操作を完了する必要がある場合は、args.setPromise() を呼び出してください。
	};

	app.start();


	function setWindowColors() {
	    // Titlebarの色を変更
	    // ApplicationViewはこれらの他に、isFullScreenModeやOrientation (landscape or portrait) など
	    // Windowの状態が取れるっぽい
	    var titlebar = Windows.UI.ViewManagement.ApplicationView.getForCurrentView().titleBar;
	    titlebar.backgroundColor = Windows.UI.Colors.orange;
	    titlebar.buttonBackgroundColor = Windows.UI.ColorHelper.fromArgb(255, 255, 255, 255); // Transparencyは無視されるようだ…
	    titlebar.buttonForegroundColor = Windows.UI.Colors.orange;
	    titlebar.buttonHoverBackgroundColor = Windows.UI.Colors.oldLace;
	    titlebar.buttonHoverForegroundColor = Windows.UI.Colors.black;
	}


    // Toast schema : https://msdn.microsoft.com/en-us/library/windows/apps/br230849.aspx
    // Toast template catalog : https://msdn.microsoft.com/en-us/library/windows/apps/hh761494.aspx
	function toastData1() {
	     return "<toast launch=\"app-defined-string\">" +
                                 "<visual>" +
                                   "<binding template =\"ToastGeneric\">" +
                                     "<text>Sample Notification</text>" +
                                     "<text>" +
                                       "This is a sample toast notification from kunal-chowdhury.com" +
                                     "</text>" +
                                   "</binding>" +
                                 "</visual>" +
                               "</toast>";
	}
	function toastData2() {
	    return "<toast launch=\"app-defined-string\">" +
                "<visual>" +
                 "<binding template =\"ToastGeneric\">" +
                  "<text>Sample Notification</text>" +
                  "<text>" +
                   "Would you like to visit kunal-chowdhury.com?" +
                  "</text>" +
                 "</binding>" +
                "</visual>" +
                "<actions>" +
                 "<action activationType=\"background\" content=\"yes\" arguments=\"yes\"/>" +
                 "<action activationType=\"background\" content=\"no\" arguments=\"no\"/>" +
                "</actions>" +
               "</toast>";
	}
    // Toastの構文はMicrosoft製 Notifications Visualizerを使うのが良さそう
    // MSDNには載っていない構文も多数あり
	var toastData3 = (function () {/*
	    <toast launch="action=viewEvent&amp;eventId=1983" scenario="reminder">
          <visual>
            <binding template="ToastGeneric">
              <text>Adaptive Tiles Meeting</text>
              <text>Conf Room 2001 / Building 135</text>
              <text>10:00 AM - 10:30 AM</text>
            </binding>
          </visual>

          <actions>
            <input id="snoozeTime" type="selection" defaultInput="15">
              <selection id="1" content="1 minute"/>
              <selection id="15" content="15 minutes"/>
              <selection id="60" content="1 hour"/>
              <selection id="240" content="4 hours"/>
              <selection id="144" content="1 day"/>
            </input>

            <action
	            activationType="system"
	            arguments="snooze"
	            hint-inputId="snoozeTime"
	            content=""/>
              <action
	            activationType="system"
	            arguments="dismiss"
	            content=""/>
            </actions>
  
          </toast>
    */}).toString().match(/\n([\s\S]*)\n/)[1]; // この書き方はminify時に不要コメントとして削除されるらしいので使わないほうが良さそう；´Д｀）

	function showToast() {
	    // Toastって表示要求してから実際に表示されるまで、かなり間がある；´Д｀）
	    // ちょっとDebugには使えなさそうな感じ。
	    // あとUserに何か通知するにしても、押してすぐには通知されないため
	    // アプリがフリーズしているのかと思われる可能性が高い。
        // Realtimeで通知が必要なら、HTML上でpopupしたほうが良さそう
	    var xmlToastTemplate = toastData3;

	    var xmlDocument = new Windows.Data.Xml.Dom.XmlDocument();
	    xmlDocument.loadXml(xmlToastTemplate);
	    var toastNotification = new Windows.UI.Notifications.ToastNotification(xmlDocument);
	    var norification = Windows.UI.Notifications.ToastNotificationManager.createToastNotifier();
	    norification.show(toastNotification);
	}

})();
