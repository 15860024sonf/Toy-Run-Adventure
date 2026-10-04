/* Original procedural toy art. No external images or fonts are required. */
(() => {
  'use strict';
  const TAU = Math.PI * 2;
  const rounded = (c, x, y, w, h, r, fill, stroke) => {
    c.beginPath(); c.moveTo(x+r,y); c.lineTo(x+w-r,y); c.quadraticCurveTo(x+w,y,x+w,y+r);
    c.lineTo(x+w,y+h-r); c.quadraticCurveTo(x+w,y+h,x+w-r,y+h); c.lineTo(x+r,y+h);
    c.quadraticCurveTo(x,y+h,x,y+h-r); c.lineTo(x,y+r); c.quadraticCurveTo(x,y,x+r,y);
    if(fill){c.fillStyle=fill;c.fill()} if(stroke){c.strokeStyle=stroke;c.lineWidth=2;c.stroke()}
  };
  const circle = (c,x,y,r,fill,stroke) => {c.beginPath();c.arc(x,y,r,0,TAU);if(fill){c.fillStyle=fill;c.fill()}if(stroke){c.strokeStyle=stroke;c.lineWidth=2;c.stroke()}};
  const poly = (c,pts,fill,stroke) => {c.beginPath();c.moveTo(pts[0][0],pts[0][1]);pts.slice(1).forEach(p=>c.lineTo(p[0],p[1]));c.closePath();if(fill){c.fillStyle=fill;c.fill()}if(stroke){c.strokeStyle=stroke;c.lineWidth=2;c.stroke()}};
  const gradient = (c,x,y,w,h,a,b) => {const g=c.createLinearGradient(x,y,x+w*.35,y+h);g.addColorStop(0,a);g.addColorStop(1,b);return g};

  function drawCharacter(c, player, game) {
    if(player.invuln && Math.floor(player.invuln/5)%2===0)return;
    const sliding=player.slide>0, grounded=player.grounded;
    const bob=grounded&&!sliding?Math.sin(game.elapsed*.5)*2.5:0;
    const stride=grounded&&!sliding?Math.sin(game.elapsed*.42)*5:0;
    const x=player.x+27, y=(sliding?game.floor-32:player.y+6)-bob;
    c.save(); c.translate(x,y); c.rotate(grounded&&!sliding?Math.sin(game.elapsed*.42)*.045:player.vy<0?-.08:.06);
    c.shadowColor='#17203655';c.shadowBlur=9;c.shadowOffsetY=5;
    if(sliding){
      rounded(c,-24,-21,48,26,12,gradient(c,-24,-21,48,26,'#f7d27d','#b87943'));
      circle(c,17,-11,11,'#f4d6a1','#8d5e42');circle(c,20,-14,2,'#352b49');
    } else if(game.char.id==='star') {
      // Violet space suit with a clear glass helmet, chest patch and toy jet pack.
      rounded(c,-17,-10,34,37,12,gradient(c,-18,-11,38,40,'#8fe5ff','#745be0'),'#fbffff');
      rounded(c,-23,-2,7,20,4,'#ec8ce8');rounded(c,16,-2,7,20,4,'#ec8ce8');
      rounded(c,-19,22,13,9,4,'#334c91');rounded(c,6,22,13,9,4,'#334c91');
      rounded(c,-8,0,16,15,5,'#fff0a1','#dfa844');circle(c,0,7,3,'#e87076');
      circle(c,0,-19,18,gradient(c,-18,-38,36,38,'#effcff','#85c7f2'),'#fff');
      circle(c,-5,-21,3,'#342f58');circle(c,6,-21,3,'#342f58');
      c.globalAlpha=.48;circle(c,-7,-28,6,'#fff');c.globalAlpha=1;
      poly(c,[[22,-9],[29,-4],[22,1]],'#ffbb58');circle(c,26,-4,2,'#fff7ae');
    } else if(game.char.id==='cowboy') {
      rounded(c,-16,-4,32,29,8,gradient(c,-16,-4,32,29,'#eaa753','#b96738'),'#fff0cc');
      rounded(c,-19,20,14,12,4,'#704638');rounded(c,5,20,14,12,4,'#704638');
      rounded(c,-7,2,14,21,4,'#844931');rounded(c,-14,5,7,19,3,'#f7d876');rounded(c,7,5,7,19,3,'#f7d876');
      rounded(c,-17,28+stride,15,7,3,'#493648');rounded(c,2,28-stride,15,7,3,'#493648');
      circle(c,0,-17,15,'#f1c58a','#946241');circle(c,-5,-19,2,'#332a40');circle(c,5,-19,2,'#332a40');
      c.fillStyle='#7b482d';c.fillRect(-19,-30,38,8);poly(c,[[-15,-29],[-12,-39],[10,-39],[16,-29]],'#a76634','#6d402d');
      rounded(c,-8,14,16,4,2,'#f4d75d');circle(c,0,16,2,'#fff0aa');
    } else if(game.char.id==='dino') {
      poly(c,[[-15,11],[-37,19+stride],[-28,27+stride],[-12,20]],gradient(c,-37,12,27,18,'#7bdc88','#31955a'),'#dbffc4');
      rounded(c,-18,-4,36,33,12,gradient(c,-18,-4,36,33,'#a7ed76','#4fae60'),'#e2ffc5');
      circle(c,-10,0,10,'#8de66c');circle(c,-13,-3,3,'#fff');circle(c,-12,-3,1.4,'#202d41');
      circle(c,8,0,10,'#8de66c');circle(c,5,-3,3,'#fff');circle(c,6,-3,1.4,'#202d41');
      rounded(c,-13,22+stride,11,9,4,'#328554');rounded(c,3,22-stride,11,9,4,'#328554');
      for(let i=0;i<4;i++)poly(c,[[-12+i*8,-7],[-8+i*8,-15],[-3+i*8,-7]],'#fff4a2','#72ad55');
      circle(c,0,11,2,'#326c4c');
    } else {
      // Rounded plastic block bot, antenna, illuminated eyes and alternating feet.
      c.strokeStyle='#ffe79b';c.lineWidth=3;c.beginPath();c.moveTo(0,-27);c.lineTo(0,-37);c.stroke();circle(c,0,-40,4,'#ff7b93','#fff1ae');
      rounded(c,-18,-7,36,33,7,gradient(c,-18,-7,36,33,'#ffe598','#ed9e4d'),'#fff2bd');
      rounded(c,-24,-1,7,19,3,'#4fc8d2','#fff');rounded(c,17,-1,7,19,3,'#4fc8d2','#fff');
      rounded(c,-13,24+stride,10,9,3,'#6774ad','#fff');rounded(c,3,24-stride,10,9,3,'#6774ad','#fff');
      rounded(c,-12,-25,24,17,6,'#6975a9','#fff');
      circle(c,-5,-17,3,'#69f9ff');circle(c,5,-17,3,'#69f9ff');
      rounded(c,-5,-4,10,7,3,'#fa7795');c.globalAlpha=.45;circle(c,-7,-2,7,'#fff');c.globalAlpha=1;
    }
    c.restore();
  }

  function toyCrate(c,x,y,s,color,offset=0){
    c.save();c.translate(x,y);c.shadowColor='#111b3744';c.shadowBlur=10;c.shadowOffsetY=6;
    rounded(c,0,0,s,s*.72,7,gradient(c,0,0,s,s*.72,color,'#754d3c'),'#fff0c6');
    c.shadowBlur=0;c.globalAlpha=.22;c.strokeStyle='#fff4d6';c.lineWidth=2;
    c.beginPath();c.moveTo(8,8);c.lineTo(s-8,s*.72-8);c.moveTo(s-8,8);c.lineTo(8,s*.72-8);c.stroke();c.globalAlpha=1;
    rounded(c,s*.28,s*.25,s*.44,s*.2,4,'#ffe9a3');
    circle(c,offset%s,s*.72+5,2,'#ffe98b');c.restore();
  }
  function drawBackground(c,game){
    const t=game.theme,w=960,h=440,scroll=game.bgOffset;
    const sky=c.createLinearGradient(0,0,0,h);
    if(t.id==='midnight'){sky.addColorStop(0,'#11182e');sky.addColorStop(.7,'#33304c');sky.addColorStop(1,'#8b6477')}
    else if(t.id==='neon'){sky.addColorStop(0,'#101c39');sky.addColorStop(.7,'#153b5b');sky.addColorStop(1,'#24746e')}
    else{sky.addColorStop(0,'#243b7b');sky.addColorStop(.62,'#819bd8');sky.addColorStop(1,'#f2c6ea')}
    c.fillStyle=sky;c.fillRect(0,0,w,h);
    if(t.id==='midnight'){
      // Wallpaper, moonlit window, cabinet and an open toy-room door.
      for(let i=0;i<20;i++){let x=(i*55-scroll*.13+1100)%1000;c.globalAlpha=.13;c.fillStyle=i%2?'#c6b4ff':'#f7d58b';c.fillRect(x,0,2,game.floor)}c.globalAlpha=1;
      c.shadowColor='#b8d8ff88';c.shadowBlur=26;rounded(c,92,38,142,132,9,'#283c62','#a8cfff');c.shadowBlur=0;
      c.fillStyle='#9ec9ef';c.globalAlpha=.7;c.fillRect(101,48,124,112);c.globalAlpha=1;
      c.strokeStyle='#d4eaff';c.lineWidth=5;c.beginPath();c.moveTo(163,40);c.lineTo(163,170);c.moveTo(92,104);c.lineTo(234,104);c.stroke();
      circle(c,190,70,20,'#fff2ba');
      rounded(c,650,83,205,250,9,'#54455b','#bb91d0');for(let i=0;i<3;i++){c.fillStyle='#c2a26d';c.fillRect(660,143+i*62,185,8);circle(c,695+i*50,132+i*62,15,['#d98c91','#9cadd9','#a8c67d'][i])}
      rounded(c,835,118,106,247,5,'#172139','#cfb184');c.fillStyle='#0a1226';c.fillRect(849,132,82,233);circle(c,914,253,4,'#ffd477');
      // Soft animated foreground fog.
      c.globalAlpha=.12;c.fillStyle='#d7ccff';for(let i=0;i<5;i++){let x=(i*240-scroll*.32+1200)%1080;c.beginPath();c.ellipse(x,318+i%2*15,95,18,0,0,TAU);c.fill()}c.globalAlpha=1;
    } else if(t.id==='dream'){
      for(let i=0;i<58;i++){let x=(i*167-scroll*.16+1200)%960,y=(i*73)%280,twinkle=.45+.45*Math.sin(game.elapsed*.08+i);circle(c,x,y,1+(i%3),`rgba(255,255,255,${twinkle})`)}
      circle(c,790,77,37,'#fff4c8');circle(c,804,68,34,'#617fb8');
      c.globalAlpha=.85;c.font='60px serif';c.fillText('☁',190-scroll*.22%1000,164);c.fillText('☁',540-scroll*.17%1000,120);c.globalAlpha=1;
      // Floating pastel toy blocks in distant parallax.
      for(let i=0;i<7;i++){let x=(i*176-scroll*.36+1100)%1060,y=205+(i%3)*38;c.save();c.translate(x,y);c.rotate(Math.sin(game.elapsed*.018+i)*.12);rounded(c,-15,-15,30,30,6,['#ff9db3','#ffe17d','#86e2dc','#b6a0ff'][i%4],'#fff6') ;c.restore()}
      if(game.elapsed%210<2){game.particles.burst(960,75,'#fff4b1',5)}
    } else {
      // Conveyor, repeated neon girders, pipes and a moving toy-machine arm.
      for(let i=0;i<9;i++){let x=(i*126-scroll*.48+1100)%1080;c.shadowColor=t.accent;c.shadowBlur=11;c.strokeStyle=`${t.accent}88`;c.lineWidth=3;c.strokeRect(x,65,78,245);c.shadowBlur=0;rounded(c,x+9,96,60,35,5,['#ff6fb2','#ffe05f','#55f4df'][i%3]+'bb','#d5ffff');c.fillStyle='#a0b4d955';c.fillRect(x+13,151,52,5)}
      c.shadowColor='#44ffe6aa';c.shadowBlur=18;c.strokeStyle='#60f5db';c.lineWidth=5;c.beginPath();c.moveTo(0,287);c.lineTo(960,287);c.stroke();c.shadowBlur=0;
      const armX=710+Math.sin(game.elapsed*.025)*24;c.strokeStyle='#ff7bb6';c.lineWidth=12;c.beginPath();c.moveTo(armX,0);c.lineTo(armX,45);c.lineTo(armX-30,83);c.stroke();circle(c,armX,45,11,'#ffe264','#fff');
      for(let i=0;i<12;i++){let x=(i*94-scroll*.95+1000)%1000;rounded(c,x,302,55,22,6,'#243a54','#59eee0');circle(c,x+14,313,3,'#dcffff');circle(c,x+42,313,3,'#dcffff')}
      if(game.speed>8){for(let i=0;i<8;i++){let x=(i*141-scroll*1.7+1000)%1000;c.globalAlpha=.35;c.fillStyle=t.accent;c.fillRect(x,30+i%5*42,42,2)}c.globalAlpha=1}
    }
    // Foreground toy-room floor with scrolling seams and warm plastic sheen.
    const floor=game.floor;const fg=c.createLinearGradient(0,floor,0,h);fg.addColorStop(0,t.ground);fg.addColorStop(1,t.id==='midnight'?'#302b44':t.id==='neon'?'#162c42':'#8a73ad');
    c.fillStyle=fg;c.fillRect(0,floor,w,h-floor);c.globalAlpha=.27;c.fillStyle='#fff';c.fillRect(0,floor,w,3);c.globalAlpha=1;
    for(let i=0;i<13;i++){const x=(i*93-scroll+1300)%1000;rounded(c,x,floor+33,55,7,3,t.id==='neon'?'#5ef4dc99':t.id==='midnight'?'#d9b3ff66':'#fff0aa88');}
    // Close toy chest at the edge of the room.
    if(t.id!=='neon')toyCrate(c,23,floor-38,51,t.id==='midnight'?'#9a5d49':'#d78450',scroll*.3);
  }
  function drawObstacle(c,o,floor){
    const y=o.overhead?floor-116:floor-o.h;
    if(o.overhead){c.save();c.shadowColor=o.type==='⚡'?'#54ffeb':'#ddcaff';c.shadowBlur=16;
      if(o.type==='⚡'){c.strokeStyle='#58ffe7';c.lineWidth=8;c.beginPath();c.moveTo(o.x,y+20);c.lineTo(o.x+o.w,y+20);c.stroke();poly(c,[[o.x+o.w/2-6,y+12],[o.x+o.w/2+2,y+12],[o.x+o.w/2-2,y+28],[o.x+o.w/2+7,y+28],[o.x+o.w/2-7,y+39],[o.x+o.w/2-4,y+26],[o.x+o.w/2-10,y+26]],'#e7ffff')}
      else if(o.type==='☁️'){circle(c,o.x+15,y+25,13,'#fff','#d9ddff');circle(c,o.x+28,y+17,17,'#fff','#d9ddff');circle(c,o.x+39,y+26,12,'#fff','#d9ddff')}
      else{for(let i=0;i<4;i++){c.strokeStyle='#d6c5ff';c.lineWidth=2;c.beginPath();c.moveTo(o.x+i*13,y);c.lineTo(o.x+i*13,y+38);c.stroke()}poly(c,[[o.x,y+38],[o.x+o.w,y+38],[o.x+o.w-7,y+44],[o.x+6,y+44]],'#9272a9')}
      c.restore();return;
    }
    const colors=o.type==='🧸'?['#e8a56e','#985936']:o.type==='🚧'?['#ffe17b','#f17c53']:o.type==='🧱'?['#ed718f','#8e456a']:['#d99a64','#87543e'];
    c.save();c.shadowColor='#10162955';c.shadowBlur=10;c.shadowOffsetY=5;
    if(o.type==='🧸'){
      circle(c,o.x+13,y+12,12,colors[0], '#ffdda5');circle(c,o.x+o.w-13,y+12,12,colors[0],'#ffdda5');
      rounded(c,o.x+6,y+9,o.w-12,o.h-8,17,gradient(c,o.x,y,o.w,o.h,...colors),'#ffdda5');
      circle(c,o.x+o.w/2-8,y+24,3,'#39283d');circle(c,o.x+o.w/2+8,y+24,3,'#39283d');circle(c,o.x+o.w/2,y+31,4,'#54384a');
    } else if(o.type==='🚧'){
      rounded(c,o.x+4,y+4,o.w-8,o.h-8,5,'#f7d76b','#fff2bd');for(let i=0;i<4;i++){c.save();c.translate(o.x+11+i*11,y+7);poly(c,[[0,0],[7,0],[0,14]],'#eb765e');c.restore()}c.fillStyle='#d4b15c';c.fillRect(o.x+3,y+o.h-8,o.w-6,6);
    } else {
      rounded(c,o.x+2,y+3,o.w-4,o.h-4,7,gradient(c,o.x,y,o.w,o.h,colors[0],colors[1]),'#fff0c5');
      c.globalAlpha=.38;c.strokeStyle='#fff6d2';c.lineWidth=2;c.beginPath();c.moveTo(o.x+8,y+8);c.lineTo(o.x+o.w-8,y+o.h-8);c.moveTo(o.x+o.w-8,y+8);c.lineTo(o.x+8,y+o.h-8);c.stroke();c.globalAlpha=1;
      for(let i=0;i<3;i++)circle(c,o.x+12+i*13,y+8,2,'#fff1b5');
    }
    c.restore();
  }
  function drawCollectible(c,item,x,y,phase){
    const bob=Math.sin(phase)*4;c.save();c.translate(x,y+bob);c.shadowColor=item.item.id==='coin'?'#ffd36d':'#fff';c.shadowBlur=18;
    if(item.item.id==='coin'){const g=c.createLinearGradient(-12,-15,12,15);g.addColorStop(0,'#fff2a5');g.addColorStop(.45,'#ffce47');g.addColorStop(1,'#d88925');circle(c,0,0,14,g,'#fff1a7');circle(c,0,0,8,null,'#fff4c1');c.fillStyle='#fff';c.globalAlpha=.7;c.fillRect(-5,-8,3,7)}
    else if(item.item.id==='rainbow'){for(let i=0;i<5;i++){c.strokeStyle=['#ff6f8f','#ffbb54','#fff16c','#5fdfae','#8a9aff'][i];c.lineWidth=5;c.beginPath();c.arc(0,0,13-i*2,Math.PI,TAU);c.stroke()}circle(c,0,5,4,'#fff4a6')}
    else if(item.item.id==='toy'){rounded(c,-12,-12,24,24,8,gradient(c,-12,-12,24,24,'#ffc1bc','#de6f80'),'#fff1cf');circle(c,-6,-2,2,'#46354a');circle(c,6,-2,2,'#46354a');c.strokeStyle='#fff1cf';c.lineWidth=2;c.beginPath();c.arc(0,2,6,0,Math.PI);c.stroke()}
    else{poly(c,[[0,-17],[4,-5],[17,-5],[7,3],[11,16],[0,8],[-11,16],[-7,3],[-17,-5],[-4,-5]],'#fff2a5','#fff');circle(c,0,0,4,'#ffbb63')}
    c.restore();
  }
  function drawPowerUp(c,power,x,y,phase){
    const colors={magnet:'#ff8d9f',shield:'#6ae3ed',dash:'#ffdc61',battery:'#8be68c'};
    c.save();c.translate(x,y+Math.sin(phase)*4);c.shadowColor=colors[power.item.id]||'#fff';c.shadowBlur=18;
    circle(c,0,0,18,gradient(c,-18,-18,36,36,'#fff',colors[power.item.id]||'#8edcf1'),'#fff');
    c.shadowBlur=0;c.strokeStyle='#fff9';c.lineWidth=2;c.beginPath();c.ellipse(0,0,23,9,phase*.04,0,TAU);c.stroke();
    c.font='20px serif';c.textAlign='center';c.textBaseline='middle';c.fillText(power.item.icon,0,1);c.restore();
  }
  window.ToyArt={drawCharacter,drawBackground,drawObstacle,drawCollectible,drawPowerUp};
})();
