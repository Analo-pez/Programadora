// 'use strict';


import 'https://flackr.github.io/scroll-timeline/dist/scroll-timeline.js';


import polyfill from "https://cdn.skypack.dev/css-typed-om";

// Stuff that needs to be done first
const bootstrap = async () => {

    // Load CSSKeywordValue Polyfill
    // @note: Script already imported (see import above), only needs to be attached to window
    if (typeof CSSKeywordValue == "undefined") {
        polyfill(window);
    }

    // Load ScrollTimeline
    // @note: This polyfill contains an IIFE, so we only need to load it.
    if (typeof ScrollTimeline == "undefined") {
        const polyfill = () => new Promise((resolve, reject) => {
            const script = document.createElement("script");
            script.async = true;
            script.src =
                "https://flackr.github.io/scroll-timeline/dist/scroll-timeline.js";
            script.onload = resolve;
            script.onerror = reject;
            document.head.appendChild(script);
        });

        await polyfill().catch(e => false);
    }

    // Make sure we have everything
    if (
        typeof Animation == "undefined" ||
        typeof CSSKeywordValue == "undefined" ||
        typeof KeyframeEffect == "undefined" ||
        typeof ScrollTimeline == "undefined"
    ) {
        return false;
    }

    return true;
}

// Our Actual Demo Code
const hookAnimations = () => {

    const $ul = document.querySelector('section > ul');
    const $lis = document.querySelectorAll('section > ul > li');

    $ul.style.perspective = '40em';

    $lis.forEach(($li) => {

        const scrollTimeline = new ScrollTimeline({
            scrollSource: $ul,
            timeRange: 1,
            orientation: 'inline',
            fill: 'both',
            scrollOffsets: [
                { target: $li, edge: 'end', threshold: 0 },
                { target: $li, edge: 'start', threshold: 0 },
            ],
        });

        // Animate <li>
        $li.style.position = 'relative';
        new Animation(
            new KeyframeEffect(
                $li,
                {
                    zIndex: ["1", "100", "1000", "100", "1"],
                },
                { duration: 1, fill: "both" }
            ),
            scrollTimeline
        ).play();

        // Animate nested <img>
        new Animation(
            new KeyframeEffect(
                $li.querySelector('img'),
                {
                    transform: [
                        'translateX(-100%) rotateY(-45deg)',
                        'translateX(0) rotateY(-45deg)',
                        'rotateY(0deg) translateZ(1em) scale(1.5)',
                        'translateX(0) rotateY(45deg)',
                        'translateX(100%) rotateY(45deg)',
                    ],
                },
                { duration: 1, fill: "both" }
            ),
            scrollTimeline
        ).play();

        // Animate <li>
        new Animation(
            new KeyframeEffect(
                $li,
                {
                    zIndex: [1, 100, 1000, 100, 1],
                },
                { duration: 1, fill: "both" }
            ),
            scrollTimeline
        ).play();

    });
}

hookAnimations();



// MENU HAMBURGUESA
var menu = document.querySelector('.hamburger');

function toggleMenu(event) {
    this.classList.toggle('is-active');
    document.querySelector('.menuppal').classList.toggle("is_active");
    event.preventDefault();
}

menu.addEventListener('click', toggleMenu, false);