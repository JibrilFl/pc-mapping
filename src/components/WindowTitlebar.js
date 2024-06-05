"use client"

import {useState, useEffect} from "react";
import Image from "next/image";

const WindowTitlebar = () => {
	const [appWindow, setAppWindow] = useState();

	async function setupAppWindow() {
		const appWindow = (await import('@tauri-apps/api/window')).appWindow
		setAppWindow(appWindow)
	}

	useEffect(() => {
		setupAppWindow()
	}, [])

	function windowMinimize() {
		appWindow?.minimize()
	}
	function windowToggleMaximize() {
		appWindow?.toggleMaximize()
	}
	function windowClose() {
		appWindow?.close()
	}

	return (
		<div data-tauri-drag-region className="titlebar">
			<div className="titlebar-logo">
				<Image src="/windowTitlebar/logo-30x30.png" width="18" height="18" alt="logo-okb2"/>
				{/*<p>OKB2_test</p>*/}
			</div>
			<div className="titlebar-inner">
				<div onClick={windowMinimize} className="titlebar-button">
					<Image
						src="/windowTitlebar/lodash.svg"
						width="15"
						height="15"
						alt="lodash"
					/>
				</div>
				<div onClick={windowToggleMaximize} className="titlebar-button">
					<Image
						src="/windowTitlebar/winToWin.svg"
						width="15"
						height="15"
						alt="window"
					/>
				</div>
				<div onClick={windowClose} className="titlebar-button">
					<Image
						src="/windowTitlebar/close.svg"
						width="15"
						height="15"
						alt="close"
					/>
				</div>
			</div>
		</div>
	)
};

export default WindowTitlebar;