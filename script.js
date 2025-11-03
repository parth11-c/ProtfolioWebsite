function locomotive() {
  gsap.registerPlugin(ScrollTrigger);

  const locoScroll = new LocomotiveScroll({
    el: document.querySelector("#main"),
    smooth: true ,
  });
  locoScroll.on("scroll", ScrollTrigger.update);

  ScrollTrigger.scrollerProxy("#main", {
    scrollTop(value) {
      return arguments.length
        ? locoScroll.scrollTo(value, 0, 0)
        : locoScroll.scroll.instance.scroll.y;
    },

    getBoundingClientRect() {
      return {
        top: 0,
        left: 0,
        width: window.innerWidth,
        height: window.innerHeight,
      };
    },

    pinType: document.querySelector("#main").style.transform
      ? "transform"
      : "fixed",
  });
  ScrollTrigger.addEventListener("refresh", () => locoScroll.update());
  ScrollTrigger.refresh();
}
locomotive();


const canvas = document.querySelector("canvas");
const context = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;


window.addEventListener("resize", function () {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  render();
});

function files(index) {
  var data = `
     ./000001.png
     ./000002.png
     ./000003.png
     ./000004.png
     ./000005.png
     ./000006.png
     ./000007.png
     ./000008.png
     ./000009.png
     ./000010.png
     ./000011.png
     ./000012.png
     ./000013.png
     ./000014.png
     ./000015.png
     ./000016.png
     ./000017.png
     ./000018.png
     ./000019.png
     ./000020.png
     ./000021.png
     ./000022.png
     ./000023.png
     ./000024.png
     ./000025.png
     ./000026.png
     ./000027.png
     ./000028.png
     ./000029.png
     ./000030.png
     ./000031.png
     ./000032.png
     ./000033.png
     ./000034.png
     ./000035.png
     ./000036.png
     ./000037.png
     ./000038.png
     ./000039.png
     ./000040.png
     ./000041.png
     ./000042.png
     ./000043.png
     ./000044.png
     ./000045.png
     ./000046.png
     ./000047.png
     ./000048.png
     ./000049.png
     ./000050.png
     ./000051.png
     ./000052.png
     ./000053.png
     ./000054.png
     ./000055.png
     ./000056.png
     ./000057.png
     ./000058.png
     ./000059.png
     ./000060.png
     ./000061.png
     ./000062.png
     ./000063.png
     ./000064.png
     ./000065.png
     ./000066.png
     ./000067.png
     ./000068.png
     ./000069.png
     ./000070.png
     ./000071.png
     ./000072.png
     ./000073.png
     ./000074.png
     ./000075.png
     ./000076.png
     ./000077.png
     ./000078.png
     ./000079.png
     ./000080.png
     ./000081.png
     ./000082.png
     ./000083.png
     ./000084.png
     ./000085.png
     ./000086.png
     ./000087.png
     ./000088.png
     ./000089.png
     ./000090.png
     ./000091.png
     ./000092.png
     ./000093.png
     ./000094.png
     ./000095.png
     ./000096.png
     ./000097.png
     ./000098.png
     ./000099.png
     ./000100.png
     ./000101.png
     ./000102.png
     ./000103.png
     ./000104.png
     ./000105.png
     ./000106.png
     ./000107.png
     ./000108.png
     ./000109.png
     ./000110.png
     ./000111.png
     ./000112.png
     ./000113.png
     ./000114.png
     ./000115.png
     ./000116.png
     ./000117.png
     ./000118.png
     ./000119.png
     ./000120.png
     ./000121.png

 `;
  return data.split("\n")[index];
}

const frameCount = 121;

const images = [];
const imageSeq = {
  frame: 1,
};

for (let i = 0; i < frameCount; i++) {
  const img = new Image();
  img.src = files(i);
  images.push(img);
}

gsap.to(imageSeq, {
  frame: frameCount - 1,
  snap: "frame",
  ease: `none`,
  scrollTrigger: {
    scrub: 0.15,
    trigger: `#page>canvas`,
    start: `top top`,
    end: `600% top`,
    scroller: `#main`,
  },
  onUpdate: render,
});

images[1].onload = render;

function render() {
  scaleImage(images[imageSeq.frame], context);
}

function scaleImage(img, ctx) {
  var canvas = ctx.canvas;
  var hRatio = canvas.width / img.width;
  var vRatio = canvas.height / img.height;
  var ratio = Math.min(hRatio, vRatio); // Changed from Math.max to Math.min to contain the image within canvas
  var centerShift_x = (canvas.width - img.width * ratio) / 2;
  var centerShift_y = (canvas.height - img.height * ratio) / 2;
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(
    img,
    0,
    0,
    img.width,
    img.height,
    centerShift_x,
    centerShift_y,
    img.width * ratio,
    img.height * ratio
  );
}
ScrollTrigger.create({
  trigger: "#page>canvas",
  pin: true,
  // markers:true,
  scroller: `#main`,
  start: `top top`,
  end: `600% top`,
});



// Sunglasses scroll animation over the center model
const sunglasses = document.getElementById("sunglasses");
if (sunglasses) {
  // initial state slightly above and scaled down
  gsap.set(sunglasses, { yPercent: -30, opacity: 0, rotate: -6, scale: 0.9, transformOrigin: "50% 50%" });

  // timeline tied to the canvas scroll section
  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: `#page>canvas`,
      scroller: `#main`,
      start: `top top`,
      end: `+=300%`,
      scrub: true,
    },
  });

  // drop in and fade
  tl.to(sunglasses, {
    yPercent: -4,
    opacity: 1,
    scale: 1,
    rotate: 0,
    ease: "power2.out",
    duration: 1,
  });

  // subtle bounce/tilt as you keep scrolling
  tl.to(sunglasses, {
    yPercent: 0,
    rotate: 2,
    ease: "sine.inOut",
    duration: 0.6,
  }).to(sunglasses, {
    yPercent: -2,
    rotate: 0,
    ease: "sine.inOut",
    duration: 0.6,
  });
}

// Restore original section pinning
gsap.to("#page1",{
  scrollTrigger:{
    trigger:`#page1`,
    start:`top top`,
    end:`bottom top`,
    pin:true,
    scroller:`#main`
  }
})
gsap.to("#page2",{
  scrollTrigger:{
    trigger:`#page2`,
    start:`top top`,
    end:`bottom top`,
    pin:true,
    scroller:`#main`
  }
})
gsap.to("#page3",{
  scrollTrigger:{
    trigger:`#page3`,
    start:`top top`,
    end:`bottom top`,
    pin:true,
    scroller:`#main`
  }
})