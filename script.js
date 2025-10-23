// script.js - password check and simple canvas butterflies + confetti generator

function checkPassword() {
  const password = document.getElementById("password").value.trim();
  const error = document.getElementById("error");
  if (password === "Raihan Arib") {
    window.location.href = "birthday.html";
  } else {
    error.textContent = "Password salah 😅 coba lagi ya! (Perhatikan spasi dan kapitalisasi)";
    setTimeout(()=> error.textContent = "", 3500);
  }
}

// Canvas animation for flowers and butterflies
window.addEventListener('load', ()=>{
  const canvas = document.getElementById('butterCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let w = canvas.width = canvas.clientWidth;
  let h = canvas.height = canvas.clientHeight;

  function onResize() { w = canvas.width = canvas.clientWidth; h = canvas.height = canvas.clientHeight; }
  window.addEventListener('resize', onResize);

  // simple flower objects
  function Flower(x,y, size, color){
    this.x = x; this.y = y; this.size = size; this.color = color;
    this.draw = function(ctx){
      ctx.save();
      ctx.translate(this.x, this.y);
      for(let i=0;i<6;i++){
        ctx.beginPath();
        ctx.rotate(Math.PI/3);
        ctx.ellipse(this.size*0.6,0,this.size*0.5,this.size*0.8,Math.PI/6,0,Math.PI*2);
        ctx.fillStyle = this.color;
        ctx.fill();
      }
      ctx.beginPath();
      ctx.arc(0,0,this.size*0.4,0,Math.PI*2);
      ctx.fillStyle = '#ffd27f';
      ctx.fill();
      ctx.restore();
    }
  }

  // butterflies
  function Butterfly(x,y, vx, vy, color){
    this.x=x; this.y=y; this.vx=vx; this.vy=vy; this.color=color;
    this.draw = function(ctx){
      ctx.save();
      ctx.translate(this.x,this.y);
      ctx.scale(1,1);
      ctx.beginPath();
      ctx.moveTo(0,0);
      ctx.bezierCurveTo(-12,-8,-24,-22,-30, -12);
      ctx.bezierCurveTo(-18,-4,-6,6,0,0);
      ctx.fillStyle = this.color;
      ctx.fill();
      ctx.beginPath();
      ctx.moveTo(0,0);
      ctx.bezierCurveTo(12,8,24,22,30,12);
      ctx.bezierCurveTo(18,4,6,-6,0,0);
      ctx.fillStyle = this.color;
      ctx.fill();
      ctx.restore();
    }
    this.update = function(){
      this.x += this.vx; this.y += this.vy;
      // slight flap
      this.vx += (Math.random()-0.5)*0.4;
      this.vy += (Math.random()-0.5)*0.4;
      if(this.x < -50) this.x = w+50;
      if(this.x > w+50) this.x = -50;
      if(this.y < -50) this.y = h+50;
      if(this.y > h+50) this.y = -50;
    }
  }

  const flowers = [];
  for(let i=0;i<8;i++){
    flowers.push(new Flower(Math.random()*w, h - 60 - Math.random()*40, 12+Math.random()*14, ['#ff9fb8','#ffc0d1','#ffd6e0'][i%3]));
  }
  const butterflies = [];
  for(let i=0;i<12;i++){
    butterflies.push(new Butterfly(Math.random()*w, Math.random()*h*0.6, (Math.random()*1.4-0.6), (Math.random()*0.8-0.2), `hsl(${Math.random()*60+300},70%,65%)`));
  }

  function drawBackground(){
    // soft gradient sky
    const g = ctx.createLinearGradient(0,0,0,h);
    g.addColorStop(0,'#fff7f5');
    g.addColorStop(1,'#fffaf3');
    ctx.fillStyle = g;
    ctx.fillRect(0,0,w,h);
  }

  function animate(){
    ctx.clearRect(0,0,w,h);
    drawBackground();
    // draw flowers near bottom
    flowers.forEach(f => f.draw(ctx));
    // update and draw butterflies
    butterflies.forEach(b => { b.update(); b.draw(ctx); });
    requestAnimationFrame(animate);
  }
  animate();

  // confetti pieces on the page (not canvas)
  const confettiContainer = document.querySelector('.confetti');
  if(confettiContainer){
    for(let i=0;i<60;i++){
      const piece = document.createElement('div');
      piece.className = 'confetti-piece';
      piece.style.left = Math.random()*100 + 'vw';
      piece.style.backgroundColor = `hsl(${Math.random()*60 + 300}, 80%, 70%)`;
      piece.style.animationDelay = Math.random()*4 + 's';
      piece.style.width = (6 + Math.random()*8) + 'px';
      piece.style.height = (6 + Math.random()*8) + 'px';
      confettiContainer.appendChild(piece);
    }
  }
});
