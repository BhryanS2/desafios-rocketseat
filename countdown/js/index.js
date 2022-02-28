const timesToCounter = {
  dayTime: 8,
  hourTime: 12,
  minuteTime: 44,
  secondTime: 28,
}

const timeConvert = {
  dayToSeconds: 24 * 60 * 60,
  hourToSeconds: 60 * 60,
  minuteToSeconds: 60,
  secondToSeconds: 1,
}

const totalTime = () => {
  const { dayTime, hourTime, minuteTime, secondTime } = timesToCounter;
  const { dayToSeconds, hourToSeconds, minuteToSeconds, secondToSeconds } = timeConvert;
  const day = dayTime * dayToSeconds;
  const hour = hourTime * hourToSeconds;
  const minute = minuteTime * minuteToSeconds;
  const second = secondTime * secondToSeconds;
  const totalTime = day + hour + minute + second;
  return totalTime;
}

const time = {
  timeCurrent: totalTime(),
  getTime() {
    return time.timeCurrent;
  },

  setTime(newTime) {
    time.timeCurrent = newTime;
  }
}

const interval = setInterval(updateTime, 1000);

function updateTime() {
  if (time.getTime() <= 0) {
    clearInterval(interval);
    return;
  }
  time.setTime(time.getTime() - 1);
  const newTime = time.getTime();
  const day = Math.floor(newTime / (24 * 60 * 60));
  const hour = Math.floor(newTime / (60 * 60)) % 24;
  const minute = Math.floor(newTime / 60) % 60;
  const second = newTime % 60;
  updateHTML(day, hour, minute, second);
}

function updateHTML(day, hour, minute, second) {
  const dayEl = document.getElementById('days');
  const hourEl = document.getElementById('hours');
  const minuteEl = document.getElementById('minutes');
  const secondEl = document.getElementById('seconds');
  const [dayElText, hourElText, minuteElText, secondElText] = [day, hour, minute, second].map(time => time.toString().padStart(2, '0'));
  dayEl.innerText = dayElText;
  hourEl.innerText = hourElText;
  minuteEl.innerText = minuteElText;
  secondEl.innerText = secondElText;
}
