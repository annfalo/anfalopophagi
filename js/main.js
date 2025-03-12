//#topのmargin--top:0;
window.addEventListener('scroll', () => {
    const body = document.body;
    const topSection = document.querySelector('#top');
    if (body.classList.contains('main')) {
        if (window.scrollY >= 1000) {
            topSection.style.marginTop = '0';
        } else {
            topSection.style.marginTop = '75px';
        }
    }
});

//ハンバーガーメニュー
$(document).ready(function () {
    $(".hamburger").click(function () {
        $(this).toggleClass("open");
        $(".gnav-list").toggleClass("open");
        $(".gnav-wrapper").toggleClass("open");
        $(".menu-text").text($(this).hasClass("open") ? "とじる" : "メニュー");
    });
});

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

    //fancybox
    $(document).ready(function () {
        $('[data-fancybox="artwork"]').fancybox({
            buttons: [
                "close"
            ],
            thumbs: {
                autoStart: false
            },
            zIndex: 10000,
            loop: true,
            afterShow: function (instance, current) {
                // 現在表示されている画像のURLを取得
                var imageUrl = current.src;

                // オーバーレイの背景画像として設定
                $('.fancybox-overlay').css('background-image', 'url(' + imageUrl + ')');
            },
        });
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

    ///ミミズ
    const images = [
        "../icon/mimizu1.webp",
        "../icon/mimizu2.webp",
        "../icon/mimizu3.webp"
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
    document.querySelectorAll('.underline').forEach((element) => {
        gsap.to(element, {
            scrollTrigger: {
                trigger: element.closest('.btn'),
                start: 'top bottom',
                end: 'bottom center',
                invalidateOnRefresh: true,
                toggleActions: 'restart none none none'
            },
            width: '70%',
            duration: .8,
            ease: 'power3'
        });
    });
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
const penButton = document.getElementById("triangle");
const saveButton = document.getElementById("save");
const lineButton = document.getElementById("pen");

let drawing = false;
let currentShape = null;
let startX, startY;
let shapes = [];


ctx.lineWidth = 3;
ctx.lineCap = "round";

lineWidthSlider.value = ctx.lineWidth;

function getMousePos(event) {
    const rect = canvas.getBoundingClientRect();
    return {
        x: event.clientX - rect.left,
        y: event.clientY - rect.top
    };
}

canvas.addEventListener("mousedown", (event) => {
    drawing = true;
    const pos = getMousePos(event);
    startX = pos.x;
    startY = pos.y;

    if (currentShape === 'rectangle' || currentShape === 'circle') {
        return;
    }

    ctx.beginPath();
    ctx.moveTo(pos.x, pos.y);
});

canvas.addEventListener("mousemove", (event) => {
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
    }
    else {
        ctx.lineTo(pos.x, pos.y);
        ctx.stroke();
    }
});

canvas.addEventListener("mouseup", () => {
    drawing = false;
    if (currentShape === 'rectangle' || currentShape === 'circle') {
        ctx.beginPath();
    }
});

canvas.addEventListener("mouseleave", () => {
    drawing = false;
});

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

penButton.addEventListener("click", () => {
    currentShape = 'triangle';
});

lineButton.addEventListener("click", () => {
    currentShape = null;
});

clearButton.addEventListener('click', () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
});

saveButton.addEventListener("click", function () {
    const dataURL = canvas.toDataURL();
    const link = document.createElement("a");
    link.href = dataURL;
    link.download = "anfalopophagi.png";
    link.click();
});
