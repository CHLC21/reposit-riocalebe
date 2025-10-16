// Mapeia caracteres para frequências musicais (notas simplificadas)
const noteMap = {
    a: 261.63, b: 293.66, c: 329.63, d: 349.23,
    e: 392.00, f: 440.00, g: 493.88, h: 523.25,
    i: 587.33, j: 659.25, k: 698.46, l: 783.99,
    m: 880.00, n: 987.77, o: 1046.50, p: 1174.66,
    q: 1318.51, r: 1396.91, s: 1567.98, t: 1760.00,
    u: 1975.53, v: 2093.00, w: 2349.32, x: 2637.02,
    y: 2793.83, z: 3135.96, '0': 100, '1': 150, '2': 200,
    '3': 250, '4': 300, '5': 350, '6': 400, '7': 450,
    '8': 500, '9': 550
  };
  
  const playButton = document.getElementById("playSound");
  const passwordInput = document.getElementById("passwordInput");
  const generatedPasswordInput = document.getElementById("generatedPassword");
  const generatePasswordBtn = document.getElementById("generatePassword");
  const toggleThemeBtn = document.getElementById("toggleTheme");
  
  let audioCtx = null;
  let analyser = null;
  let dataArray = null;
  let source = null;
  let animationId = null;
  
  // Função para tocar a senha como melodia
  function playPasswordMelody(password) {
    if (!password) return;
  
    if (audioCtx) {
      audioCtx.close();
      cancelAnimationFrame(animationId);
    }
    audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    analyser = audioCtx.createAnalyser();
    analyser.fftSize = 256;
    const bufferLength = analyser.frequencyBinCount;
    dataArray = new Uint8Array(bufferLength);
  
    let time = audioCtx.currentTime;
  
    for (let char of password.toLowerCase()) {
      const freq = noteMap[char] || 100;
  
      const oscillator = audioCtx.createOscillator();
      oscillator.type = 'sine';
      oscillator.frequency.setValueAtTime(freq, time);
  
      const gainNode = audioCtx.createGain();
      gainNode.gain.setValueAtTime(0.1, time);
  
      oscillator.connect(gainNode);
      gainNode.connect(analyser);
      analyser.connect(audioCtx.destination);
  
      oscillator.start(time);
      oscillator.stop(time + 0.25);
  
      time += 0.3;
    }
  
    visualizeAudio();
  }
  
  // Visualização do áudio
  function visualizeAudio() {
    const canvas = document.getElementById('audioVisualizer');
    const canvasCtx = canvas.getContext('2d');
  
    function draw() {
      animationId = requestAnimationFrame(draw);
      analyser.getByteFrequencyData(dataArray);
  
      canvasCtx.fillStyle = 'rgba(0, 0, 0, 0.2)';
      canvasCtx.fillRect(0, 0, canvas.width, canvas.height);
  
      const barWidth = (canvas.width / dataArray.length) * 1.5;
      let x = 0;
  
      for (let i = 0; i < dataArray.length; i++) {
        const barHeight = dataArray[i] / 2;
        const r = barHeight + 100;
        const g = 255 - barHeight;
        const b = 255;
  
        canvasCtx.fillStyle = `rgb(${r},${g},${b})`;
        canvasCtx.fillRect(x, canvas.height - barHeight, barWidth, barHeight);
  
        x += barWidth + 1;
      }
    }
    draw();
  }
  
  // Função para gerar senha musical segura
  function generateMusicalPassword(length = 12) {
    const chars = 'abcdefghijklmnopqrstuvwxyz0123456789';
    let password = '';
  
    // Gera a senha com caracteres aleatórios
    for (let i = 0; i < length; i++) {
      password += chars.charAt(Math.floor(Math.random() * chars.length));
    }
  
    return password;
  }
  
  // Eventos dos botões
  playButton.addEventListener('click', () => {
    const pwd = passwordInput.value.trim();
    if (!pwd) {
      alert("Digite uma senha para ouvir sua melodia criptográfica!");
      return;
    }
    playPasswordMelody(pwd);
  });
  
  generatePasswordBtn.addEventListener('click', () => {
    const newPass = generateMusicalPassword();
    generatedPasswordInput.value = newPass;
  });
  
  toggleThemeBtn.addEventListener('click', () => {
    document.body.classList.toggle('light');
  });
  