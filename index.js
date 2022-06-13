function toggleTimer() {
	let wt1 = document.getElementById("workTimer1").value;
	let wt2 = document.getElementById("workTimer2").value;
	const bt1 = document.getElementById("breakTimer1").value;
	const bt2 = document.getElementById("breakTimer2").value;
	const worktime = wt1 + ":" + wt2;
	const breaktime = bt1 + ":" + bt2;
	if (document.getElementById("btn").innerText == "Start") {
		const btn = document.getElementById("btn");
		btn.children[0].innerText = "Stop";
		console.log(worktime);
		console.log(breaktime);
		countdownTimer(worktime, breaktime);
	} else if (document.getElementById("btn").innerText == "Stop") {
		const btn = document.getElementById("btn");
		btn.children[0].innerText = "Start";
		wt1 = worktime.split(":")[0];
		wt2 = breaktime.split(":")[1];
	}
}

async function countdownTimer(worktime, breaktime) {
	const work = worktime.split(":");
	const breakt = breaktime.split(":");
	let workMinutes = parseInt(work[0]);
	let workSeconds = parseInt(work[1]);
	console.log(workMinutes);
	console.log(workSeconds);
	let breakMinutes = parseInt(breakt[0]);
	let breakSeconds = parseInt(breakt[1]);
	while (workMinutes + workSeconds >= 0) {
		// substract one second from the seconds
		workSeconds--;
		if (workSeconds < 0) {
			workMinutes--;
			workSeconds = 59;
		}
		console.log(workMinutes + ":" + workSeconds);
		if (workSeconds < 10) workSeconds = "0" + workSeconds;
		if (workMinutes < 10 && workMinutes > 0) workMinutes = "0" + workMinutes;
		document.getElementById("workTimer1").value = workMinutes ? workMinutes : "00";
		document.getElementById("workTimer2").value = workSeconds ? workSeconds : "00";
		if (workMinutes + workSeconds == 0) {
			playsound();
			const btn = document.getElementById("btn");
			btn.children[0].innerText = "Start";
			startPauseTimer(breaktime);
			break;
		} else if (workMinutes + workSeconds < 0) {
			document.getElementById("workTimer1").value = "00";
			document.getElementById("workTimer2").value = "00";
			break;
		}
		// wait for 1 second
		await sleep(1000);
	}
}

function startPauseTimer(breaktime) {
	const breakt = breaktime.split(":");
	let breakMinutes = parseInt(breakt[0]);
	let breakSeconds = parseInt(breakt[1]);
	while (breakMinutes + breakSeconds >= 0) {
		// substract one second from the seconds
		breakSeconds--;
		if (breakSeconds < 0) {
			breakMinutes--;
			breakSeconds = 59;
		}
		console.log(breakMinutes + ":" + breakSeconds);
		if (breakSeconds < 10) breakSeconds = "0" + breakSeconds;
		if (breakMinutes < 10 && breakMinutes > 0) breakMinutes = "0" + breakMinutes;
		document.getElementById("breakTimer1").value = breakMinutes ? breakMinutes : "00";
		document.getElementById("breakTimer2").value = breakSeconds ? breakSeconds : "00";
		if (breakMinutes + breakSeconds == 0) {
			playsound();
			const btn = document.getElementById("btn");
			btn.children[0].innerText = "Start";
			break;
		} else if (breakMinutes + breakSeconds < 0) {
			document.getElementById("breakTimer1").value = "00";
			document.getElementById("breakTimer2").value = "00";
			break;
		}
		// wait for 1 second
		sleep(1000);
	}
}

function sleep(ms) {
	return new Promise((resolve) => setTimeout(resolve, ms));
}
function playsound() {
	const url = "https://cdn.discordapp.com/attachments/827609255708328006/985932187742371920/mixkit-bell-notification-933.wav";
	const audio = new Audio(url);
	audio.play();
}

