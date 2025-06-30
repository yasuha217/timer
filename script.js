class PomodoroTimer {
    constructor() {
        this.workTime = 25 * 60; // 25分
        this.shortBreakTime = 5 * 60; // 5分
        this.longBreakTime = 15 * 60; // 15分
        this.currentTime = this.workTime;
        this.isRunning = false;
        this.timer = null;

        this.initializeElements();
        this.setupEventListeners();
    }

    initializeElements() {
        this.timerDisplay = document.getElementById('timer-display');
        this.startBtn = document.getElementById('start-btn');
        this.resetBtn = document.getElementById('reset-btn');
        this.workBtn = document.getElementById('work-btn');
        this.shortBreakBtn = document.getElementById('short-break-btn');
        this.longBreakBtn = document.getElementById('long-break-btn');
    }

    setupEventListeners() {
        this.startBtn.addEventListener('click', () => this.toggleTimer());
        this.resetBtn.addEventListener('click', () => this.resetTimer());
        this.workBtn.addEventListener('click', () => this.setMode('work'));
        this.shortBreakBtn.addEventListener('click', () => this.setMode('short-break'));
        this.longBreakBtn.addEventListener('click', () => this.setMode('long-break'));
    }

    formatTime(seconds) {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
    }

    startTimer() {
        if (this.isRunning) return;

        this.isRunning = true;
        this.startBtn.textContent = '停止';

        this.timer = setInterval(() => {
            if (this.currentTime > 0) {
                this.currentTime--;
                this.timerDisplay.textContent = this.formatTime(this.currentTime);
            } else {
                this.stopTimer();
                alert('時間になりました！');
            }
        }, 1000);
    }

    stopTimer() {
        if (!this.isRunning) return;

        this.isRunning = false;
        this.startBtn.textContent = '開始';
        clearInterval(this.timer);
    }

    toggleTimer() {
        if (this.isRunning) {
            this.stopTimer();
        } else {
            this.startTimer();
        }
    }

    resetTimer() {
        this.stopTimer();
        this.currentTime = this.workTime;
        this.timerDisplay.textContent = this.formatTime(this.currentTime);
        this.setMode('work');
    }

    setMode(mode) {
        this.workBtn.classList.remove('active');
        this.shortBreakBtn.classList.remove('active');
        this.longBreakBtn.classList.remove('active');

        switch (mode) {
            case 'work':
                this.currentTime = this.workTime;
                this.workBtn.classList.add('active');
                break;
            case 'short-break':
                this.currentTime = this.shortBreakTime;
                this.shortBreakBtn.classList.add('active');
                break;
            case 'long-break':
                this.currentTime = this.longBreakTime;
                this.longBreakBtn.classList.add('active');
                break;
        }
        this.timerDisplay.textContent = this.formatTime(this.currentTime);
    }
}

// インスタンスの作成
const pomodoroTimer = new PomodoroTimer();
