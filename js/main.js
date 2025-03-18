//ハンバーガーメニュー
$(document).ready(function () {
    $(".hamburger").click(function () {
        $(this).toggleClass("open");
        $(".gnav-list").toggleClass("open");
        $(".gnav-wrapper").toggleClass("open");
        $(".menu-text").text($(this).hasClass("open") ? "とじる" : "メニュー");
    });
});

//fancybox
window.onload = function () {
    $('[data-fancybox="artwork"]').fancybox({
        buttons: [
            "close"
        ],
        thumbs: {
            autoStart: false
        },
        zIndex: 10000,
        loop: true,
    });
};

window.onload = function () {
    $('[data-fancybox="painting"]').fancybox({
        buttons: [
            "close"
        ],
        thumbs: {
            autoStart: false
        },
        zIndex: 10000,
        loop: true,
    });
};
//gsap
document.addEventListener('DOMContentLoaded', () => {
    gsap.registerPlugin(ScrollTrigger);

    //トップへ戻るのスクロールトリガー
    const sankaku = document.querySelector('.to-top');
    gsap.to(sankaku, {
        scrollTrigger: {
            trigger: "body",
            start: "top bottom",
            end: "bottom bottom",
            scrub: 1,
            invalidateOnRefresh: true,
        },
        rotation: 1080,
        ease: "none",
    });

    //コンタクトdlの色をかえる
    gsap.utils.toArray(".contact-wrapper dl").forEach((dl) => {
        gsap.to(dl, {
            scrollTrigger: {
                trigger: dl,
                start: "top center",
                end: "bottom center",
                toggleActions: "play reverse play reverse",
                invalidateOnRefresh: true,
            },
            backgroundColor: "#f6ea25",
            duration: .5,
            ease: "none",
        });

    });
    //全てを見るボタンのスライド
    const isMobile = window.innerWidth < 720;

    if (!isMobile) {
        gsap.utils.toArray(".all-view").forEach((btn) => {
            gsap.to(btn, {
                scrollTrigger: {
                    trigger: btn,
                    start: "top bottom",
                    end: "top center",
                    scrub: .1,
                    invalidateOnRefresh: true
                },
                x: 0,
            });
        });
    } else {
        gsap.utils.toArray(".all-view").forEach((btn) => {
            ScrollTrigger.getAll().forEach(trigger => trigger.kill());
        });
    }

    ///ミミズ
    const images = [
        "https://annfalo.github.io/anfalopophagi/icon/mimizu1.webp",
        "https://annfalo.github.io/anfalopophagi/icon/mimizu2.webp",
        "https://annfalo.github.io/anfalopophagi/icon/mimizu3.webp"
    ];

    gsap.set(".mimizu", { backgroundImage: `url(${images[0]})` });

    ScrollTrigger.create({
        trigger: "body",
        start: "top top",
        end: "bottom bottom",
        scrub: true,

        onUpdate: (self) => {
            const progress = self.progress;

            const index = Math.floor(progress * (images.length * 10)) % images.length;

            gsap.set(".mimizu", { backgroundImage: `url(${images[index]})` });
            const moveX = progress * 100;
            gsap.set(".mimizu", { backgroundPosition: `${moveX}% center` });

            // スマホ
            if (window.innerWidth <= 768) {
                const moveLeft = (1 - progress) * 350;
                gsap.set(".mimizu", { left: `${20 + moveLeft}px` });
            } else {
                // PC
                const moveLeft = (1 - progress) * 1000;
                gsap.set(".mimizu", { left: `${20 + moveLeft}px` });
            }
        }
    });

    //アンダーライン
    // document.querySelectorAll('.underline').forEach((element) => {
    //     gsap.to(element, {
    //         scrollTrigger: {
    //             trigger: element.closest('.btn'),
    //             start: 'top bottom',
    //             end: 'bottom center',
    //             invalidateOnRefresh: true,
    //             toggleActions: 'restart none none none'
    //         },
    //         width: '70%',
    //         duration: .8,
    //         ease: 'power3'
    //     });
    // });
});

//手紙開く
document.addEventListener('DOMContentLoaded', function () {
    const image = document.getElementById('mail');

    image.addEventListener('mouseover', function () {
        image.src = 'icon/mail-open.png';
    });

    image.addEventListener('mouseout', function () {
        image.src = 'icon/mail.png';
    });
});
//ちょうちょ
document.addEventListener('DOMContentLoaded', function () {
    const image = document.getElementById('instagram');

    image.addEventListener('mouseover', function () {
        image.src = 'icon/tyoutyo.png';
    });

    image.addEventListener('mouseout', function () {
        image.src = 'biology/tehutehu.webp';
    });
});

//kv
window.onload = () => {
    const images = document.querySelectorAll(".kv-item li");

    if (images.length === 0) {
        return;
    }

    images.forEach(img => {
        img.style.position = "absolute";
        randomizePosition(img);
    });

    function randomizePosition(img) {
        let isMobaile = window.innerWidth <= 768;
        let minSize = isMobaile ? 50 : 100;
        let maxSize = isMobaile ? 150 : 300;
        let randomSize = minSize + Math.random() * (maxSize - minSize);
        let randomRotation = Math.random() * 360;

        img.style.width = `${randomSize}px`;
        img.style.height = `${randomSize}px`;

        let randomX = Math.random() * (window.innerWidth - randomSize);
        let randomY = Math.random() * (window.innerHeight - randomSize);


        img.style.left = `${randomX}px`;
        img.style.top = `${randomY}px`;

        img.style.transform = `rotate(${randomRotation}deg)`;
    }


    setInterval(() => {
        let numToChange = Math.floor(Math.random() * 3) + 1;
        let shuffled = [...images].sort(() => Math.random() - 0.5);

        for (let i = 0; i < numToChange; i++) {
            randomizePosition(shuffled[i]);
        }
    }, 3000);

    document.body.addEventListener("click", () => {
        images.forEach(img => randomizePosition(img));
    });
};


//キャンバス
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const clearButton = document.getElementById('clear');
const colorPicker = document.getElementById("colorPicker");
const lineWidthSlider = document.getElementById("hutosa");
const rectangleButton = document.getElementById("rectangle");
const circleButton = document.getElementById("circle");
const triangleButton = document.getElementById("triangle");
const penButton = document.getElementById('pen');
const saveButton = document.getElementById("save");

let drawing = false;
let currentShape = null;
let startX, startY;
let shapes = [];

ctx.lineWidth = 3;
ctx.lineCap = "round";

lineWidthSlider.value = ctx.lineWidth;

//getMousePos関数
function getMousePos(event) {
    const rect = canvas.getBoundingClientRect();
    const touch = event.touches ? event.touches[0] : event;
    return {
        x: touch.clientX - rect.left,
        y: touch.clientY - rect.top
    };
}

// mousedown / touchstart イベント
canvas.addEventListener("mousedown", startDrawing);
canvas.addEventListener("touchstart", startDrawing);

function startDrawing(event) {
    event.preventDefault();
    drawing = true;
    const pos = getMousePos(event);
    startX = pos.x;
    startY = pos.y;

    if (currentShape === 'rectangle' || currentShape === 'circle') {
        return;
    }

    ctx.beginPath();
    ctx.moveTo(pos.x, pos.y);
}

// mousemove / touchmove イベント
canvas.addEventListener("mousemove", draw);
canvas.addEventListener("touchmove", draw);

function draw(event) {
    if (!drawing) return;
    const pos = getMousePos(event);

    if (currentShape === 'rectangle') {
        ctx.beginPath();
        ctx.rect(startX, startY, pos.x - startX, pos.y - startY);
        ctx.stroke();
    } else if (currentShape === 'circle') {
        ctx.beginPath();
        const radius = Math.sqrt(Math.pow(pos.x - startX, 2) + Math.pow(pos.y - startY, 2));
        ctx.arc(startX, startY, radius, 0, 2 * Math.PI);
        ctx.stroke();
    } else if (currentShape === 'triangle') {
        ctx.beginPath();
        ctx.moveTo(startX, startY);
        ctx.lineTo(pos.x, pos.y);
        ctx.lineTo(startX * 2 - pos.x, pos.y);
        ctx.closePath();
        ctx.stroke();
    } else {
        ctx.lineTo(pos.x, pos.y);
        ctx.stroke();
    }
}

// mouseup / touchend イベント
canvas.addEventListener("mouseup", stopDrawing);
canvas.addEventListener("touchend", stopDrawing);
canvas.addEventListener("mouseleave", stopDrawing);

function stopDrawing() {
    drawing = false;
    if (currentShape === 'rectangle' || currentShape === 'circle') {
        ctx.beginPath();
    }
}

colorPicker.addEventListener("input", function () {
    ctx.strokeStyle = colorPicker.value;
});

lineWidthSlider.addEventListener("input", function () {
    ctx.lineWidth = lineWidthSlider.value;
});

rectangleButton.addEventListener("click", () => {
    currentShape = 'rectangle';
});

circleButton.addEventListener("click", () => {
    currentShape = 'circle';
});

triangleButton.addEventListener("click", () => {
    currentShape = 'triangle';
});

clearButton.addEventListener('click', () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
});
penButton.addEventListener("click", () => {
    currentShape = null;
});

saveButton.addEventListener("click", function () {
    const dataURL = canvas.toDataURL();
    const link = document.createElement("a");
    link.href = dataURL;
    link.download = "anfalopophagi.png";
    link.click();
});
