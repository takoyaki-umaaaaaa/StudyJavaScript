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
		}

		isFirstActivation = false;
	};

	function onVisibilityChanged(args) {
		if (!document.hidden) {
			// TODO: アプリが表示されるようになりました。ここでビューを最新の情報に更新することができます。
		}
	}

	app.oncheckpoint = function (args) {
		// TODO: このアプリケーションは中断しようとしています。ここで中断中に維持する必要のある状態を保存します。
		// WinJS.Application.sessionState オブジェクトを使用している可能性があります。このオブジェクトは、中断の間自動的に保存され、復元されます。
		//ご使用のアプリケーションを中断する前に非同期の操作を完了する必要がある場合は、args.setPromise() を呼び出してください。
	};

	app.start();

})();
