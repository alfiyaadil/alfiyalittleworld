document.addEventListener("DOMContentLoaded", () => {

  /* =========================================================
     ELEMENTS
  ========================================================= */

  const pages = [...document.querySelectorAll(".page")];

  const enterBtn = document.getElementById("enterBtn");
  const page2Btn = document.getElementById("page2Btn");

  const giftBox = document.getElementById("giftBox");
  const page3OpenBtn = document.getElementById("page3OpenBtn");
  const page3Message = document.getElementById("page3Message");
  const page3Btn = document.getElementById("page3Btn");

  const flowers19Garden =
    document.getElementById("flowers19Garden");

  const page4Btn =
    document.getElementById("page4Btn");

  const reasonsGrid =
    document.getElementById("reasonsGrid");

  const page5Btn =
    document.getElementById("page5Btn");

  const transitionGlow =
    document.getElementById("transitionGlow");

  const petalsLayer =
    document.getElementById("petalsLayer");

  const sparklesLayer =
    document.getElementById("sparklesLayer");

  const navBackBtn =
    document.getElementById("navBackBtn");

  const cuteToast =
    document.getElementById("cuteToast");

  const finaleModal =
    document.getElementById("finaleModal");

  const replayBtn =
    document.getElementById("replayBtn");

  const closeFinaleBtn =
    document.getElementById("closeFinaleBtn");

  const finaleBackdrop =
    document.getElementById("finaleBackdrop");

  const cutieEnvelope =
    document.getElementById("cutieEnvelope");

  const cutieSealBtn =
    document.getElementById("cutieSealBtn");

  const cutieLetter =
    document.getElementById("cutieLetter");

  const page6Btn =
    document.getElementById("page6Btn");

  const cakeStage =
    document.getElementById("cakeStage");

  const cakeCandles =
    document.querySelectorAll(".cake-candle");

  const cakeBlowBtn =
    document.getElementById("cakeBlowBtn");

  const cakeActions =
    document.getElementById("cakeActions");

  const cakeWishCard =
    document.getElementById("cakeWishCard");

  const page7Btn =
    document.getElementById("page7Btn");

  const treatSliceBtn =
    document.getElementById("treatSliceBtn");

  const treatBerryBtn =
    document.getElementById("treatBerryBtn");

  const treatBlessingBtn =
    document.getElementById("treatBlessingBtn");


  /* =========================================================
     NAVIGATION & TOAST HELPERS
  ========================================================= */

  function updateNavBack(targetPage = PageManager.currentPage){
    if(!navBackBtn) return;
    if(targetPage > 1){
      navBackBtn.classList.add("is-visible");
    } else {
      navBackBtn.classList.remove("is-visible");
    }
  }

  let toastTimer = null;
  function showToast(message){
    if(!cuteToast) return;
    cuteToast.textContent = message;
    cuteToast.classList.add("is-shown");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => {
      cuteToast.classList.remove("is-shown");
    }, 2600);
  }

  navBackBtn?.addEventListener("click", () => {
    sparkleBurst();
    PageManager.goBack();
  });


  /* =========================================================
     PAGE MANAGER
  ========================================================= */

  const PageManager = {

    currentPage: 1,
    transitioning: false,

    goTo(number, onEnter = null, isBack = false){

      if(this.transitioning) return;
      if(number === this.currentPage) return;

      const current =
        document.querySelector(
          `[data-page="${this.currentPage}"]`
        );

      const next =
        document.querySelector(
          `[data-page="${number}"]`
        );

      if(!current || !next){
        console.warn("Page not found:", number);
        return;
      }

      this.transitioning = true;
      const goingBackward = isBack || number < this.currentPage;

      if(transitionGlow){
        transitionGlow.classList.remove("is-flashing");
        void transitionGlow.offsetWidth;
        transitionGlow.classList.add("is-flashing");
      }

      // Configure cute directional motion
      if(goingBackward){
        current.classList.add("is-backward");
        next.classList.add("is-backward");
      } else {
        current.classList.remove("is-backward");
        next.classList.remove("is-backward");
      }

      // Seamless crossfade: leaving and entering happen together with no blank flash
      current.classList.remove("is-entering");
      current.classList.add("is-leaving");

      next.classList.remove("is-leaving");
      next.classList.add(
        "is-active",
        "is-entering"
      );

      next.setAttribute(
        "aria-hidden",
        "false"
      );

      updateNavBack(number);

      if(typeof onEnter === "function"){
        onEnter();
      }

      setTimeout(() => {

        pages.forEach(page => {
          if(page !== next){
            page.classList.remove(
              "is-active",
              "is-entering",
              "is-leaving",
              "is-backward"
            );

            page.setAttribute(
              "aria-hidden",
              "true"
            );
          }
        });

        next.classList.remove("is-entering", "is-backward");

        this.currentPage = number;
        this.transitioning = false;

      }, 750);
    },

    goBack(){
      if(this.currentPage <= 1 || this.transitioning) return;
      this.goTo(this.currentPage - 1, null, true);
    }
  };


  /* =========================================================
     AMBIENCE
  ========================================================= */

  function sparkleBurst(){

    for(let i = 0; i < 18; i++){

      const sparkle =
        document.createElement("span");

      sparkle.textContent =
        Math.random() > .5 ? "✦" : "✧";

      sparkle.style.position = "fixed";
      sparkle.style.left = "50%";
      sparkle.style.top = "50%";
      sparkle.style.zIndex = "99999";
      sparkle.style.pointerEvents = "none";
      sparkle.style.fontSize = "18px";
      sparkle.style.color = "#d8aa5b";

      const angle =
        Math.random() * Math.PI * 2;

      const distance =
        80 + Math.random() * 160;

      sparkle.animate(
        [
          {
            transform:
              "translate(-50%,-50%) scale(.3)",
            opacity:1
          },
          {
            transform:
              `translate(
                calc(-50% + ${Math.cos(angle) * distance}px),
                calc(-50% + ${Math.sin(angle) * distance}px)
              ) scale(1.2)`,
            opacity:0
          }
        ],
        {
          duration:900,
          easing:"ease-out"
        }
      );

      document.body.appendChild(sparkle);

      setTimeout(() => {
        sparkle.remove();
      }, 950);
    }
  }


  function flowerRain(){

    const flowers = [
      "🌸",
      "🌷",
      "🌺",
      "✿",
      "🌼"
    ];

    for(let i = 0; i < 24; i++){

      const flower =
        document.createElement("span");

      flower.className = "flower-rain";
      flower.textContent =
        flowers[
          Math.floor(
            Math.random() * flowers.length
          )
        ];

      flower.style.position = "fixed";
      flower.style.top = "-60px";
      flower.style.left =
        Math.random() * 100 + "vw";

      flower.style.zIndex = "99999";
      flower.style.pointerEvents = "none";

      flower.style.fontSize =
        16 + Math.random() * 15 + "px";

      const drift =
        Math.random() * 180 - 90;

      const duration =
        3 + Math.random() * 2;

      flower.animate(
        [
          {
            transform:
              "translateY(-60px) rotate(0)",
            opacity:0
          },
          {
            transform:
              "translateY(15vh) rotate(80deg)",
            opacity:1
          },
          {
            transform:
              `translate(${drift}px,110vh) rotate(420deg)`,
            opacity:0
          }
        ],
        {
          duration:duration * 1000,
          delay:Math.random() * 600,
          easing:"linear"
        }
      );

      document.body.appendChild(flower);

      setTimeout(() => {
        flower.remove();
      }, 5600);
    }
  }


  /* =========================================================
     PAGE 1 → PAGE 2
  ========================================================= */

  enterBtn?.addEventListener("click", () => {

    sparkleBurst();

    PageManager.goTo(2);
  });


  /* =========================================================
     PAGE 2 → PAGE 3
  ========================================================= */

  page2Btn?.addEventListener("click", () => {

    sparkleBurst();

    PageManager.goTo(
      3,
      page3Entrance
    );
  });


  /* =========================================================
     PAGE 3 ENTRANCE
  ========================================================= */

  function page3Entrance(){

    if(giftBox){
      giftBox.classList.remove(
        "is-open",
        "is-opening",
        "is-anticipating"
      );
    }

    if(page3Message){
      page3Message.classList.remove(
        "is-visible"
      );
    }

    if(page3OpenBtn){

      page3OpenBtn.disabled = false;

      const label =
        page3OpenBtn.querySelector(
          ".cta__label"
        );

      if(label){
        label.textContent =
          "Open Your Gift ✨";
      }
    }
  }


  /* =========================================================
     PAGE 3 — GIFT OPEN
  ========================================================= */

  page3OpenBtn?.addEventListener("click", () => {

    if(!giftBox) return;

    if(
      giftBox.classList.contains("is-open")
    ){
      return;
    }

    /* Lock button */
    page3OpenBtn.disabled = true;

    /* Change button text */
    const label =
      page3OpenBtn.querySelector(
        ".cta__label"
      );

    if(label){
      label.textContent =
        "Opening Your Gift ✨";
    }

    /* Cute anticipation wiggle before opening! */
    giftBox.classList.add("is-anticipating");
    sparkleBurst();

    setTimeout(() => {

      giftBox.classList.remove("is-anticipating");
      giftBox.classList.add("is-opening");
      giftBox.classList.add("is-open");

      sparkleBurst();
      flowerRain();

      /*
        Reveal message after the lid has
        gracefully opened.
      */
      setTimeout(() => {

        if(page3Message){
          page3Message.classList.add(
            "is-visible"
          );
        }

        if(label){
          label.textContent =
            "Gift Opened ✨";
        }

      }, 700);

    }, 320);

  });


  /* =========================================================
     PAGE 3 → PAGE 4
  ========================================================= */

  page3Btn?.addEventListener("click", () => {

    sparkleBurst();

    PageManager.goTo(
      4,
      page4Entrance
    );
  });


  /* =========================================================
     PAGE 4 — 19 REASONS
  ========================================================= */

  const flowerReasons = [

    "You have a heart that makes people feel special.",

    "Your smile can make an ordinary moment beautiful.",

    "You are caring in ways you don't always notice.",

    "You have a softness that makes you different.",

    "You make little moments worth remembering.",

    "You can make me laugh without even trying.",

    "You understand things that are difficult to explain.",

    "You are beautiful in your own unique way.",

    "You make distance feel a little smaller.",

    "You have a way of making people feel loved.",

    "You are someone I can always remember with a smile.",

    "You bring warmth into ordinary days.",

    "You are stronger than you sometimes realize.",

    "You make memories feel more special.",

    "You are one of the most important parts of my story.",

    "You make my world feel a little brighter.",

    "You are simply you — and that is special.",

    "You have given me countless moments to treasure.",

    "Because after everything, you are Alfiya. ❤️"

  ];


  let discoveredFlowers = new Set();


  function page4Entrance(){

    if(!flowers19Garden) return;

    flowers19Garden.innerHTML = "";

    discoveredFlowers.clear();

    updatePage4Progress();

    if(page4Btn){

      page4Btn.disabled = true;

      const label =
        page4Btn.querySelector(
          ".cta__label"
        );

      if(label){
        label.textContent =
          "Discover More →";
      }
    }


    for(let i = 1; i <= 19; i++){

      const flower =
        document.createElement("button");

      flower.type = "button";
      flower.className = "flower19";

      flower.dataset.number = i;

      flower.setAttribute(
        "aria-label",
        `Flower ${i}`
      );

      flower.style.animationDelay =
        `${100 + i * 70}ms`;

      flower.addEventListener(
        "click",
        () => {

          openFlowerReason(
            i,
            flower
          );

        }
      );

      flowers19Garden.appendChild(
        flower
      );
    }
  }


  function openFlowerReason(
    number,
    flower
  ){

    const isFirstTime = !discoveredFlowers.has(number);

    if(isFirstTime){
      discoveredFlowers.add(number);

      flower.classList.add(
        "is-discovered"
      );

      updatePage4Progress();

      sparkleBurst();
      flowerRain();
    } else {
      createTapSparklesAtElement(flower);
    }

    setTimeout(() => {

      showFlowerNote(
        number,
        flowerReasons[number - 1]
      );

    }, 200);
  }


  function updatePage4Progress(){

    const progress =
      document.getElementById(
        "flowers19Progress"
      );

    if(!progress) return;

    progress.textContent =
      `${discoveredFlowers.size} / 19 discovered ✨`;


    if(
      discoveredFlowers.size === 19 &&
      page4Btn
    ){

      page4Btn.disabled = false;

      const label =
        page4Btn.querySelector(
          ".cta__label"
        );

      if(label){
        label.textContent =
          "All 19 discovered ✨ →";
      }

      page4Btn.classList.add(
        "is-unlocked"
      );

      sparkleBurst();
    }
  }


  /* =========================================================
     FLOWER POPUP WITH SIDE NAVIGATION ARROWS
  ========================================================= */

  let currentFlowerNumber = 1;

  function showFlowerNote(number, reason){
    currentFlowerNumber = Number(number);

    let note = document.getElementById("sweetFlowerNote");

    if(!note){
      note = document.createElement("div");
      note.id = "sweetFlowerNote";
      note.className = "flower-note";

      note.innerHTML = `
        <div class="flower-note__dialog">

          <!-- PREVIOUS ARROW BUTTON (LEFT) -->
          <button
            type="button"
            class="flower-note__side-arrow flower-note__side-arrow--prev"
            id="flowerSidePrev"
            aria-label="Previous Reason"
            title="Previous Reason (←)">
            ←
          </button>

          <div class="flower-note__card" id="flowerNoteCard">

            <!-- TOP CLOSE (✕) -->
            <button
              type="button"
              class="flower-note__top-close"
              id="flowerTopClose"
              aria-label="Close note">
              ✕
            </button>

            <div class="flower-note__flower">🌸</div>

            <div class="flower-note__number">
              Little Reason #<span id="flowerReasonNum"></span>
            </div>

            <p class="flower-note__text" id="flowerReasonText"></p>

            <!-- BOTTOM ACTIONS: PREV, CLOSE, NEXT -->
            <div class="flower-note__actions">
              <button
                type="button"
                class="flower-note__nav-btn flower-note__nav-btn--prev"
                id="flowerBtnPrev"
                aria-label="Previous reason">
                <span>← Prev</span>
              </button>

              <button
                type="button"
                class="cta flower-note__close"
                id="flowerBtnClose">
                <span class="cta__surface">
                  <span class="cta__label">
                    Keep Discovering ✨
                  </span>
                </span>
              </button>

              <button
                type="button"
                class="flower-note__nav-btn flower-note__nav-btn--next"
                id="flowerBtnNext"
                aria-label="Next reason">
                <span>Next →</span>
              </button>
            </div>

            <div class="flower-note__counter">
              Reason <span id="flowerCounterCur"></span> of 19 ✨
            </div>

          </div>

          <!-- NEXT ARROW BUTTON (RIGHT) -->
          <button
            type="button"
            class="flower-note__side-arrow flower-note__side-arrow--next"
            id="flowerSideNext"
            aria-label="Next Reason"
            title="Next Reason (→)">
            →
          </button>

        </div>
      `;

      document.body.appendChild(note);

      // Close handlers
      const closeBtn = note.querySelector("#flowerBtnClose");
      const topClose = note.querySelector("#flowerTopClose");

      function closePopup(){
        note.classList.remove("is-visible");
      }

      closeBtn?.addEventListener("click", closePopup);
      topClose?.addEventListener("click", closePopup);

      note.addEventListener("click", (event) => {
        if(event.target === note){
          closePopup();
        }
      });

      // Navigation arrow handlers
      const sidePrev = note.querySelector("#flowerSidePrev");
      const sideNext = note.querySelector("#flowerSideNext");
      const btnPrev = note.querySelector("#flowerBtnPrev");
      const btnNext = note.querySelector("#flowerBtnNext");

      sidePrev?.addEventListener("click", (e) => {
        e.stopPropagation();
        goToFlowerReason(currentFlowerNumber - 1);
        createTapSparklesAtElement(sidePrev);
      });

      sideNext?.addEventListener("click", (e) => {
        e.stopPropagation();
        goToFlowerReason(currentFlowerNumber + 1);
        createTapSparklesAtElement(sideNext);
      });

      btnPrev?.addEventListener("click", (e) => {
        e.stopPropagation();
        goToFlowerReason(currentFlowerNumber - 1);
        createTapSparklesAtElement(btnPrev);
      });

      btnNext?.addEventListener("click", (e) => {
        e.stopPropagation();
        goToFlowerReason(currentFlowerNumber + 1);
        createTapSparklesAtElement(btnNext);
      });

      // Touch swipe gestures support for mobile
      let touchStartX = 0;
      const card = note.querySelector("#flowerNoteCard");
      card?.addEventListener("touchstart", (e) => {
        touchStartX = e.changedTouches[0].clientX;
      }, { passive: true });

      card?.addEventListener("touchend", (e) => {
        const touchEndX = e.changedTouches[0].clientX;
        const diffX = touchEndX - touchStartX;
        if(diffX > 45){
          goToFlowerReason(currentFlowerNumber - 1);
        } else if(diffX < -45){
          goToFlowerReason(currentFlowerNumber + 1);
        }
      }, { passive: true });
    }

    renderFlowerNoteContent(number, reason);
    note.classList.add("is-visible");
  }

  function renderFlowerNoteContent(num, reasonText){
    const note = document.getElementById("sweetFlowerNote");
    if(!note) return;

    const numEl = note.querySelector("#flowerReasonNum");
    const textEl = note.querySelector("#flowerReasonText");
    const counterEl = note.querySelector("#flowerCounterCur");

    if(numEl) numEl.textContent = num;
    if(textEl) textEl.textContent = reasonText || flowerReasons[num - 1] || "";
    if(counterEl) counterEl.textContent = num;
  }

  function goToFlowerReason(targetNumber){
    if(targetNumber > 19) targetNumber = 1;
    if(targetNumber < 1) targetNumber = 19;

    currentFlowerNumber = targetNumber;

    const note = document.getElementById("sweetFlowerNote");
    const card = note?.querySelector("#flowerNoteCard");

    // Automatically discover the flower in the garden if not yet discovered
    if(!discoveredFlowers.has(targetNumber)){
      discoveredFlowers.add(targetNumber);
      const flowerEl = document.querySelector(`.flower19[data-number="${targetNumber}"]`);
      flowerEl?.classList.add("is-discovered");
      updatePage4Progress();
      sparkleBurst();
    }

    if(card){
      card.classList.add("is-changing");
      setTimeout(() => {
        renderFlowerNoteContent(targetNumber, flowerReasons[targetNumber - 1]);
        card.classList.remove("is-changing");
      }, 120);
    } else {
      renderFlowerNoteContent(targetNumber, flowerReasons[targetNumber - 1]);
    }

    try {
      playAudioTone(640 + targetNumber * 20, "sine", 0.16, 0.09);
    } catch(err) {}
  }


  /* =========================================================
     KEYBOARD NAVIGATION (ESC TO CLOSE, ARROWS TO BROWSE)
  ========================================================= */

  document.addEventListener("keydown", (event) => {
    const flowerNote = document.getElementById("sweetFlowerNote");
    if(flowerNote && flowerNote.classList.contains("is-visible")){
      if(event.key === "Escape"){
        flowerNote.classList.remove("is-visible");
      } else if(event.key === "ArrowLeft"){
        goToFlowerReason(currentFlowerNumber - 1);
      } else if(event.key === "ArrowRight"){
        goToFlowerReason(currentFlowerNumber + 1);
      }
    }
  });


  /* =========================================================
     PAGE 4 → PAGE 5
  ========================================================= */

  page4Btn?.addEventListener(
    "click",
    () => {

      if(
        discoveredFlowers.size < 19
      ){

        page4Btn.classList.add(
          "cta--waiting"
        );

        const remaining = 19 - discoveredFlowers.size;
        showToast(
          `Discover all 19 flowers first! 🌸 (${remaining} left)`
        );

        setTimeout(() => {

          page4Btn.classList.remove(
            "cta--waiting"
          );

        }, 600);

        return;
      }


      sparkleBurst();

      PageManager.goTo(
        5,
        page5Entrance
      );
    }
  );


  /* =========================================================
     PAGE 5
  ========================================================= */

  const reasons = [

    ["Your Heart",
      "You have a heart that makes people feel cared for."],

    ["Your Smile",
      "Your smile can turn even a normal moment into a beautiful one."],

    ["Your Kindness",
      "You care about people in ways you sometimes don't even notice."],

    ["Your Softness",
      "There is something gentle about you that makes you special."],

    ["Little Moments",
      "You somehow make the smallest moments worth remembering."],

    ["Your Laugh",
      "You can make me laugh without even trying."],

    ["Understanding",
      "You understand things that are sometimes impossible to explain."],

    ["Your Beauty",
      "You have a beauty that is completely your own."],

    ["Distance",
      "Even distance feels a little smaller because of you."],

    ["Feeling Loved",
      "You have a beautiful way of making people feel loved."],

    ["Your Memory",
      "So many memories with you still bring a smile."],

    ["Your Warmth",
      "You bring warmth into even ordinary days."],

    ["Your Strength",
      "You are stronger than you sometimes realize."],

    ["Our Memories",
      "You make memories feel more meaningful and special."],

    ["My Story",
      "You have become one of the most important parts of my story."],

    ["Your Light",
      "You make my world feel a little brighter."],

    ["Simply You",
      "You don't need to be anyone else. Being you is already special."],

    ["Everything",
      "There are countless little moments with you that I treasure."],

    ["Alfiya",
      "Because after all the reasons, you are simply Alfiya. ❤️"]

  ];


  function page5Entrance(){

    if(!reasonsGrid) return;

    reasonsGrid.innerHTML = "";

    reasons.forEach(
      (reason,index) => {

        const card =
          document.createElement("div");

        card.className =
          "reason-card";

        card.style.setProperty(
          "--card-index",
          index
        );

        card.innerHTML = `

          <span class="reason-card__number">
            ${String(index + 1).padStart(2,"0")}
          </span>

          <h3 class="reason-card__title">
            ${reason[0]}
          </h3>

          <p class="reason-card__text">
            ${reason[1]}
          </p>

          <span class="reason-card__hint">
            Tap to open ✨
          </span>
        `;


        card.addEventListener(
          "click",
          () => {

            const isOpening =
              !card.classList.contains("is-open");

            card.classList.toggle(
              "is-open"
            );

            if(isOpening){
              createTapSparklesAtElement(card);
            }

          }
        );


        reasonsGrid.appendChild(card);

      }
    );
  }


  /* =========================================================
     PAGE 5 → PAGE 6
  ========================================================= */

  page5Btn?.addEventListener(
    "click",
    () => {

      sparkleBurst();
      flowerRain();

      PageManager.goTo(
        6,
        page6Entrance
      );

    }
  );


  /* =========================================================
     PAGE 6 — CUTIEPIE SWEETEST MESSAGE
  ========================================================= */

  function page6Entrance(){

    if(cutieEnvelope){
      cutieEnvelope.classList.remove(
        "is-opening",
        "is-hidden"
      );
    }

    if(cutieLetter){
      cutieLetter.classList.remove(
        "is-visible"
      );
    }

    if(page6Btn){
      page6Btn.classList.remove(
        "is-visible"
      );
    }
  }

  function openCutieLetter(){

    if(
      !cutieEnvelope ||
      cutieEnvelope.classList.contains("is-opening") ||
      cutieEnvelope.classList.contains("is-hidden")
    ){
      return;
    }

    cutieEnvelope.classList.add("is-opening");
    sparkleBurst();
    flowerRain();

    setTimeout(() => {

      cutieEnvelope.classList.add("is-hidden");

      if(cutieLetter){
        cutieLetter.classList.add("is-visible");
      }

      setTimeout(() => {

        if(page6Btn){
          page6Btn.classList.add("is-visible");
        }

        sparkleBurst();

      }, 650);

    }, 700);
  }

  cutieSealBtn?.addEventListener(
    "click",
    openCutieLetter
  );

  cutieEnvelope?.addEventListener(
    "click",
    event => {

      if(
        event.target === cutieSealBtn ||
        cutieSealBtn?.contains(event.target)
      ){
        return;
      }

      openCutieLetter();
    }
  );

  document.querySelectorAll(".cute-sticker").forEach(sticker => {

    sticker.addEventListener("click", () => {

      const compliment =
        sticker.dataset.compliment;

      sticker.classList.remove("is-popped");
      void sticker.offsetWidth;
      sticker.classList.add("is-popped");

      createTapSparklesAtElement(sticker);

      if(compliment){
        showToast(compliment);
      }

    });

  });


  /* =========================================================
     PAGE 6 → PAGE 7
  ========================================================= */

  page6Btn?.addEventListener(
    "click",
    () => {

      sparkleBurst();
      flowerRain();

      PageManager.goTo(
        7,
        page7Entrance
      );

    }
  );


  /* =========================================================
     PAGE 7 — THE INTERACTIVE BIRTHDAY CAKE & WISH
  ========================================================= */

  let candlesExtinguishedCount = 0;
  let wishRevealed = false;

  function playCelebrationChimes(){
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if(!AudioCtx) return;
      const ctx = new AudioCtx();
      if(ctx.state === "suspended"){
        ctx.resume();
      }

      const now = ctx.currentTime;
      const notes = [523.25, 659.25, 783.99, 1046.50, 1318.51, 1567.98]; // C5, E5, G5, C6, E6, G6 (crystal chime scale)
      notes.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = "sine";
        osc.frequency.setValueAtTime(freq, now + idx * 0.12);

        gain.gain.setValueAtTime(0, now + idx * 0.12);
        gain.gain.linearRampToValueAtTime(0.18, now + idx * 0.12 + 0.04);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + idx * 0.12 + 1.2);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(now + idx * 0.12);
        osc.stop(now + idx * 0.12 + 1.3);
      });
    } catch(err) {
      // Audio optional / graceful fallback
    }
  }

  function page7Entrance(){
    if(!wishRevealed){
      candlesExtinguishedCount = 0;
      cakeCandles.forEach(candle => {
        const flame = candle.querySelector(".candle__flame");
        const smoke = candle.querySelector(".candle__smoke");
        flame?.classList.remove("is-extinguished");
        smoke?.classList.remove("is-smoking");
      });
      cakeActions?.classList.remove("is-hidden");
      cakeWishCard?.classList.remove("is-visible");
      cakeWishCard?.setAttribute("aria-hidden", "true");
      page7Btn?.classList.remove("is-visible");
    }
  }

  function extinguishCandle(candleEl){
    if(!candleEl) return;
    const flame = candleEl.querySelector(".candle__flame");
    const smoke = candleEl.querySelector(".candle__smoke");

    if(!flame || flame.classList.contains("is-extinguished")) return;

    flame.classList.add("is-extinguished");

    if(smoke){
      smoke.classList.remove("is-smoking");
      void smoke.offsetWidth;
      smoke.classList.add("is-smoking");
    }

    createTapSparklesAtElement(candleEl);
    candlesExtinguishedCount++;

    if(candlesExtinguishedCount >= cakeCandles.length){
      onAllCandlesBlown();
    }
  }

  function onAllCandlesBlown(){
    if(wishRevealed) return;
    wishRevealed = true;

    playCelebrationChimes();
    sparkleBurst();
    flowerRain();

    showToast("✨ Your wish is sent to the stars! Happy 19th Birthday! 🎂💖");

    if(cakeActions){
      cakeActions.classList.add("is-hidden");
    }

    setTimeout(() => {
      if(cakeWishCard){
        cakeWishCard.classList.add("is-visible");
        cakeWishCard.setAttribute("aria-hidden", "false");
      }

      sparkleBurst();

      setTimeout(() => {
        if(page7Btn){
          page7Btn.classList.add("is-visible");
        }
      }, 700);

    }, 500);
  }

  cakeBlowBtn?.addEventListener("click", () => {
    cakeCandles.forEach(candle => {
      extinguishCandle(candle);
    });
    if(!wishRevealed){
      onAllCandlesBlown();
    }
  });

  cakeCandles.forEach(candle => {
    candle.addEventListener("click", () => {
      extinguishCandle(candle);
    });
  });

  treatSliceBtn?.addEventListener("click", () => {
    treatSliceBtn.classList.remove("is-popped");
    void treatSliceBtn.offsetWidth;
    treatSliceBtn.classList.add("is-popped");
    createTapSparklesAtElement(treatSliceBtn);
    showToast("Sweetness overload! Saved the sweetest slice of cake just for you, Alfiya! 🍰💖");
  });

  treatBerryBtn?.addEventListener("click", () => {
    treatBerryBtn.classList.remove("is-popped");
    void treatBerryBtn.offsetWidth;
    treatBerryBtn.classList.add("is-popped");
    createTapSparklesAtElement(treatBerryBtn);
    showToast("Fresh, bright, and sweet—just like your beautiful smile! 🍓✨");
  });

  treatBlessingBtn?.addEventListener("click", () => {
    treatBlessingBtn.classList.remove("is-popped");
    void treatBlessingBtn.offsetWidth;
    treatBlessingBtn.classList.add("is-popped");
    createTapSparklesAtElement(treatBlessingBtn);
    sparkleBurst();
    showToast("Your 19th birthday wish has been sealed in the stars! 🌟❤️");
  });


  /* =========================================================
     AUDIO TONE & SOUND FX HELPERS
  ========================================================= */

  function playAudioTone(freq, type = "sine", duration = 0.22, gainVal = 0.12){
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if(!AudioCtx) return;
      const ctx = new AudioCtx();
      if(ctx.state === "suspended") ctx.resume();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = type;
      osc.frequency.setValueAtTime(freq, ctx.currentTime);
      gain.gain.setValueAtTime(gainVal, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + duration);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(ctx.currentTime);
      osc.stop(ctx.currentTime + duration);
    } catch(e) {}
  }

  function playShutterSound(){
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if(!AudioCtx) return;
      const ctx = new AudioCtx();
      if(ctx.state === "suspended") ctx.resume();
      const now = ctx.currentTime;

      const osc1 = ctx.createOscillator();
      const gain1 = ctx.createGain();
      osc1.frequency.setValueAtTime(1100, now);
      osc1.frequency.exponentialRampToValueAtTime(320, now + 0.04);
      gain1.gain.setValueAtTime(0.14, now);
      gain1.gain.linearRampToValueAtTime(0.001, now + 0.04);
      osc1.connect(gain1);
      gain1.connect(ctx.destination);
      osc1.start(now);
      osc1.stop(now + 0.05);

      const osc2 = ctx.createOscillator();
      const gain2 = ctx.createGain();
      osc2.frequency.setValueAtTime(800, now + 0.06);
      osc2.frequency.exponentialRampToValueAtTime(240, now + 0.11);
      gain2.gain.setValueAtTime(0.12, now + 0.06);
      gain2.gain.linearRampToValueAtTime(0.001, now + 0.12);
      osc2.connect(gain2);
      gain2.connect(ctx.destination);
      osc2.start(now + 0.06);
      osc2.stop(now + 0.13);
    } catch(e) {}
  }

  function playPageFlipSound(){
    playAudioTone(440, "triangle", 0.14, 0.08);
  }

  function playHeartSound(){
    playAudioTone(920, "sine", 0.22, 0.12);
  }


  /* =========================================================
     PAGE 7 → PAGE 8 (MEMORY LANE)
  ========================================================= */

  page7Btn?.addEventListener(
    "click",
    () => {
      sparkleBurst();
      flowerRain();
      PageManager.goTo(8, page8Entrance);
    }
  );


  /* =========================================================
     PAGE 8 — MEMORY LANE SCRAPBOOK MODULE
  ========================================================= */

  const page8Btn = document.getElementById("page8Btn");
  const scrapbookBoard = document.getElementById("scrapbookBoard");
  const polaroidWrappers = document.querySelectorAll(".polaroid-wrapper");
  const memCatBtns = document.querySelectorAll(".mem-cat-btn");
  const moodBtns = document.querySelectorAll(".mood-btn");
  const memScatterToggle = document.getElementById("memScatterToggle");
  const memProgressPill = document.getElementById("memProgressPill");
  const polaroidPhotoInput = document.getElementById("polaroidPhotoInput");
  const stickyMemoryForm = document.getElementById("stickyMemoryForm");
  const userNotesBoard = document.getElementById("userNotesBoard");

  // Lightbox elements
  const polaroidLightbox = document.getElementById("polaroidLightbox");
  const polaroidLightboxBackdrop = document.getElementById("polaroidLightboxBackdrop");
  const polaroidLightboxClose = document.getElementById("polaroidLightboxClose");
  const lightboxImg = document.getElementById("lightboxImg");
  const lightboxDate = document.getElementById("lightboxDate");
  const lightboxTitle = document.getElementById("lightboxTitle");
  const lightboxQuote = document.getElementById("lightboxQuote");
  const lightboxText = document.getElementById("lightboxText");
  const lightboxPrevBtn = document.getElementById("lightboxPrevBtn");
  const lightboxNextBtn = document.getElementById("lightboxNextBtn");
  const lightboxFlipBtn = document.getElementById("lightboxFlipBtn");

  const exploredMemories = new Set();
  let currentCustomizingId = null;
  let activeLightboxIndex = 0;
  let lightboxShowingNote = false;

  const memoryData = [
    {
      id: 1,
      date: "Our Little Promise 💫",
      title: "Two Hearts, One Magnet 💖",
      quote: "Kaha tha na, mera dil hamesha teri taraf hi aayega...",
      note: "Yeh dono bracelets sirf ek cheez nahi hain, yeh humare rishte ki sabse pyari nishani hain. Jaise yeh dono magnets aapas me ek dusre ko dhoondh hi lete hain, waise hi mera dil bhi bas tumhari taraf hi kheencha chala aata hai. Chahe duniya me kitni bhi bheed ho, mera sukoon sirf tum ho, Alfiya. ❤️"
    },
    {
      id: 2,
      date: "Matching Soulstrings 🌸",
      title: "Black & Pink • The Perfect Pair ✨",
      quote: "Tumhari softness, aur mera tumhe sambhale rakhna.",
      note: "Mera black bracelet, aur tumhara soft pink bracelet... Yeh photo jab bhi dekhta hu, ek ajeeb sa pyara sa sukoon milta hai. Lagta hai jaise hum do alag rang hain jo milkar sabse khubsurat tasveer banate hain. Jab tum mere pass hoti ho, toh sab kuch mukammal lagta hai. Hamesha aise hi sath jude rehna hai. 💫"
    },
    {
      id: 3,
      date: "Sath Sath Chalte Hue 🌷",
      title: "Tera Haath Thaame Chalna Hai 🤝",
      quote: "Zindagi ke har mod par bas tera sath chahiye.",
      note: "Jab tumne mera haath aise pakad rakha tha, sach bataun toh lagta tha ki saari duniya ki khushiyan mere pass hain. Na koi darr tha, na koi fikar... bas tumhara sparsh aur ek meethi si muskaan. Chahe zindagi ka safar kaisa bhi ho, har kadam par tera haath thaam kar chalna chahta hu. 🌹"
    },
    {
      id: 4,
      date: "Mehndi & Tender Warmth 🌿",
      title: "Naram Haath, Pyara Ehsaas ❤️",
      quote: "Tumhara ek sparsh, meri poori duniya ka sukoon.",
      note: "Tumhare naram haathon par saji hui yeh pyari si mehndi, aur un ungliyon ka mere haath me hona... yeh lamha mere dil me hamesha ke liye qaid ho gaya hai. Jab tumhara haath mere haath me hota hai, tab sab theek lagta hai. Happy 19th Birthday to the most special person in my life! ❤️"
    }
  ];

  function page8Entrance(){
    sparkleBurst();
    flowerRain();
    showToast("Chapter 08: Hamesha Tera Haath Mere Haath Me 🤝🌸");
  }

  function page9Entrance(){
    sparkleBurst();
    flowerRain();
    showToast("Chapter 09: Teri Aankhein Aur Wo Pyari Si Muskaan ✨💖");
  }

  function page10Entrance(){
    sparkleBurst();
    flowerRain();
    showToast("Chapter 10: Alfiya's Cute World 🌸✨");
  }

  function page11Entrance(){
    sparkleBurst();
    flowerRain();
    showToast("Chapter 11: Humari Sabse Khubsurat Yaadein 💑❤️");
  }

  function page12Entrance(){
    sparkleBurst();
    flowerRain();
    showToast("Chapter 12: Hamare Gaane & Dil Ki Dhun 🎵🎧");
  }

  function page13Entrance(){
    sparkleBurst();
    flowerRain();
    showToast("Chapter 13: Ek Aakhri Baat Jo Dil Mein Hai 💌🌹");
  }

  function updateMemoryProgress(id){
    if(!id) return;
    exploredMemories.add(Number(id));
    if(memProgressPill){
      memProgressPill.textContent = `${exploredMemories.size} / 4 moments explored ✨`;
    }
    if(exploredMemories.size === 4 && !exploredMemories.has("celebrated")){
      exploredMemories.add("celebrated");
      sparkleBurst();
      flowerRain();
      playCelebrationChimes();
      showToast("All moments explored! Alfiya, tera haath hamesha mere haath me rahe! 🌸💖");
      if(memProgressPill){
        memProgressPill.style.background = "linear-gradient(135deg, #ffd1e3, #ffb3ce)";
        memProgressPill.textContent = "All 4 moments unlocked! ✨💖";
      }
    }
  }

  function loadSavedCustomPhotos(){
    polaroidWrappers.forEach(wrapper => {
      const id = wrapper.dataset.id;
      const savedPhoto = localStorage.getItem(`alfiya_custom_photo_${id}`);
      if(savedPhoto){
        const img = wrapper.querySelector(".polaroid-img");
        if(img) img.src = savedPhoto;
      }
    });
  }

  function loadSavedStickyNotes(){
    try {
      const raw = localStorage.getItem("alfiya_pinned_notes");
      if(!raw) return;
      const notes = JSON.parse(raw);
      if(Array.isArray(notes)){
        notes.forEach(note => renderPinnedNote(note.id, note.title, note.text, false));
      }
    } catch(e) {}
  }

  function renderPinnedNote(id, title, text, save = true){
    if(!userNotesBoard) return;
    const card = document.createElement("div");
    card.className = "user-pinned-card";
    card.dataset.id = id;
    const tilt = (Math.random() * 6 - 3).toFixed(1) + "deg";
    card.style.setProperty("--user-tilt", tilt);

    card.innerHTML = `
      <div class="user-pinned-card__pin">📌</div>
      <h4 class="user-pinned-card__title">${escapeHtml(title)}</h4>
      <p class="user-pinned-card__text">${escapeHtml(text)}</p>
      <button type="button" class="user-pinned-card__del" title="Remove note">Remove</button>
    `;

    const delBtn = card.querySelector(".user-pinned-card__del");
    delBtn?.addEventListener("click", () => {
      card.remove();
      deleteSavedNote(id);
      showToast("Note removed from board 📌");
    });

    userNotesBoard.prepend(card);

    if(save){
      try {
        const raw = localStorage.getItem("alfiya_pinned_notes");
        const notes = raw ? JSON.parse(raw) : [];
        notes.unshift({ id, title, text });
        localStorage.setItem("alfiya_pinned_notes", JSON.stringify(notes));
      } catch(e) {}
    }
  }

  function deleteSavedNote(id){
    try {
      const raw = localStorage.getItem("alfiya_pinned_notes");
      if(!raw) return;
      let notes = JSON.parse(raw);
      notes = notes.filter(n => String(n.id) !== String(id));
      localStorage.setItem("alfiya_pinned_notes", JSON.stringify(notes));
    } catch(e) {}
  }

  function escapeHtml(str){
    return String(str)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }

  // Setup Polaroid Cards: Flip, Like, Photo Zoom, Custom Photo
  polaroidWrappers.forEach((wrapper, index) => {
    const card = wrapper.querySelector(".polaroid-card");
    const photoFrame = wrapper.querySelector(".polaroid-photo-frame");
    const flipBtns = wrapper.querySelectorAll(".polaroid-flip-btn");
    const likeBtn = wrapper.querySelector(".polaroid-like-btn");
    const customBtn = wrapper.querySelector(".polaroid-custom-btn");
    const id = wrapper.dataset.id || (index + 1);

    // Flip card buttons
    flipBtns.forEach(btn => {
      btn.addEventListener("click", (e) => {
        e.stopPropagation();
        card?.classList.toggle("is-flipped");
        playPageFlipSound();
        createTapSparklesAtElement(btn);
        updateMemoryProgress(id);
      });
    });

    // Like button
    likeBtn?.addEventListener("click", (e) => {
      e.stopPropagation();
      const countEl = likeBtn.querySelector(".like-count");
      let count = parseInt(countEl?.textContent || "0", 10);
      count++;
      if(countEl) countEl.textContent = count;
      likeBtn.classList.add("is-liked");
      playHeartSound();
      createTapSparklesAtElement(likeBtn);
      showToast("Added your heart to this memory! ❤️✨");
      updateMemoryProgress(id);
    });

    // Custom photo swap button
    customBtn?.addEventListener("click", (e) => {
      e.stopPropagation();
      currentCustomizingId = id;
      polaroidPhotoInput?.click();
    });

    // Tap photo frame to open Lightbox
    photoFrame?.addEventListener("click", (e) => {
      e.stopPropagation();
      openLightbox(index);
      updateMemoryProgress(id);
    });
  });

  // Photo Input Handler
  polaroidPhotoInput?.addEventListener("change", (e) => {
    const file = e.target.files?.[0];
    if(!file || !currentCustomizingId) return;

    if(!file.type.startsWith("image/")){
      showToast("Please choose an image file 📸");
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const result = event.target?.result;
      if(result){
        const targetWrapper = document.querySelector(`.polaroid-wrapper[data-id="${currentCustomizingId}"]`);
        const img = targetWrapper?.querySelector(".polaroid-img");
        if(img){
          img.src = result;
          try {
            localStorage.setItem(`alfiya_custom_photo_${currentCustomizingId}`, result);
          } catch(err) {
            // Storage quota fallback
          }
          playShutterSound();
          sparkleBurst();
          showToast("Photo updated in your scrapbook! 📸💖");
        }
      }
    };
    reader.readAsDataURL(file);
    e.target.value = "";
  });

  // Category Filter Tabs
  memCatBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      memCatBtns.forEach(b => b.classList.remove("is-active"));
      btn.classList.add("is-active");

      const cat = btn.dataset.category || "all";
      polaroidWrappers.forEach(wrapper => {
        if(cat === "all" || wrapper.dataset.category === cat){
          wrapper.classList.remove("is-hidden");
        } else {
          wrapper.classList.add("is-hidden");
        }
      });
      playPageFlipSound();
    });
  });

  // Mood Filter Buttons
  moodBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      moodBtns.forEach(b => b.classList.remove("is-active"));
      btn.classList.add("is-active");

      const mood = btn.dataset.mood || "rose";
      const pageMem = document.querySelector(".page--memories");
      pageMem?.setAttribute("data-active-mood", mood);
      showToast(`Mood filter: ${btn.textContent.trim()} 🎨`);
      playAudioTone(587.33, "sine", 0.18, 0.08);
    });
  });

  // Scrapbook Tilt vs Straight Toggle
  memScatterToggle?.addEventListener("click", () => {
    const isUntilted = scrapbookBoard?.classList.toggle("is-untilted");
    const textSpan = memScatterToggle.querySelector(".layout-toggle__text");
    const iconSpan = memScatterToggle.querySelector(".layout-toggle__icon");

    if(isUntilted){
      memScatterToggle.classList.add("is-straight");
      if(textSpan) textSpan.textContent = "Straight Grid";
      if(iconSpan) iconSpan.textContent = "📐";
      showToast("Switched to clean gallery view 📐");
    } else {
      memScatterToggle.classList.remove("is-straight");
      if(textSpan) textSpan.textContent = "Scrapbook Tilt";
      if(iconSpan) iconSpan.textContent = "📌";
      showToast("Switched to scrapbook tilt view 📌");
    }
    playPageFlipSound();
  });

  // Sticky Note Form Submit
  stickyMemoryForm?.addEventListener("submit", (e) => {
    e.preventDefault();
    const titleInput = document.getElementById("stickyInputTitle");
    const textInput = document.getElementById("stickyInputText");

    const title = titleInput?.value.trim();
    const text = textInput?.value.trim();

    if(!title || !text) return;

    const noteId = "note_" + Date.now();
    renderPinnedNote(noteId, title, text, true);

    titleInput.value = "";
    textInput.value = "";

    sparkleBurst();
    playCelebrationChimes();
    showToast("Your memory has been pinned to the board! 📌💖");
  });

  // Lightbox Functions
  function openLightbox(index){
    activeLightboxIndex = (index + memoryData.length) % memoryData.length;
    lightboxShowingNote = false;
    updateLightboxContent();

    if(polaroidLightbox){
      polaroidLightbox.classList.add("is-open");
      polaroidLightbox.setAttribute("aria-hidden", "false");
    }
    playShutterSound();
  }

  function updateLightboxContent(){
    const data = memoryData[activeLightboxIndex];
    if(!data) return;

    const targetWrapper = document.querySelector(`.polaroid-wrapper[data-id="${data.id}"]`);
    const imgEl = targetWrapper?.querySelector(".polaroid-img");
    const imgSrc = imgEl?.src || `assets/images/hands_${data.id}.jpg`;

    if(lightboxImg) lightboxImg.src = imgSrc;
    if(lightboxDate) lightboxDate.textContent = data.date;
    if(lightboxTitle) lightboxTitle.textContent = data.title;
    if(lightboxQuote) lightboxQuote.textContent = `"${data.quote}"`;
    if(lightboxText) lightboxText.textContent = data.note;

    if(lightboxFlipBtn){
      lightboxFlipBtn.textContent = lightboxShowingNote ? "🖼️ View Photo" : "💌 Read Note";
    }

    if(lightboxImg){
      lightboxImg.style.display = lightboxShowingNote ? "none" : "block";
    }
  }

  function closeLightbox(){
    if(polaroidLightbox){
      polaroidLightbox.classList.remove("is-open");
      polaroidLightbox.setAttribute("aria-hidden", "true");
    }
  }

  polaroidLightboxClose?.addEventListener("click", closeLightbox);
  polaroidLightboxBackdrop?.addEventListener("click", closeLightbox);

  lightboxPrevBtn?.addEventListener("click", () => {
    activeLightboxIndex = (activeLightboxIndex - 1 + memoryData.length) % memoryData.length;
    lightboxShowingNote = false;
    updateLightboxContent();
    playPageFlipSound();
  });

  lightboxNextBtn?.addEventListener("click", () => {
    activeLightboxIndex = (activeLightboxIndex + 1) % memoryData.length;
    lightboxShowingNote = false;
    updateLightboxContent();
    playPageFlipSound();
  });

  lightboxFlipBtn?.addEventListener("click", () => {
    lightboxShowingNote = !lightboxShowingNote;
    updateLightboxContent();
    playPageFlipSound();
  });

  document.addEventListener("keydown", (e) => {
    if(polaroidLightbox && polaroidLightbox.classList.contains("is-open")){
      if(e.key === "Escape"){
        closeLightbox();
      } else if(e.key === "ArrowLeft"){
        lightboxPrevBtn?.click();
      } else if(e.key === "ArrowRight"){
        lightboxNextBtn?.click();
      }
    }
  });

  const page9Btn = document.getElementById("page9Btn");
  const page10Btn = document.getElementById("page10Btn");

  // Page 8 CTA Button -> Advances to Page 9 (Her Eyes & Her Smile)
  page8Btn?.addEventListener("click", () => {
    sparkleBurst();
    flowerRain();
    PageManager.goTo(9, page9Entrance);
  });

  // Page 9 CTA Button -> Advances to Page 10 (Alfiya's Cute Moments)
  page9Btn?.addEventListener("click", () => {
    sparkleBurst();
    flowerRain();
    PageManager.goTo(10, page10Entrance);
  });

  const page11Btn = document.getElementById("page11Btn");

  // Page 10 CTA Button -> Advances to Page 11 (Best Couple Moments)
  page10Btn?.addEventListener("click", () => {
    sparkleBurst();
    flowerRain();
    PageManager.goTo(11, page11Entrance);
  });

  // Page 11 CTA Button -> Advances to Page 12 (Music Page)
  page11Btn?.addEventListener("click", () => {
    sparkleBurst();
    flowerRain();
    PageManager.goTo(12, page12Entrance);
  });


  /* =========================================================
     PAGE 11 — HER EYES & HER SMILE INTERACTIONS & PHOTO LOGIC
  ========================================================= */

  const eyesImg = document.getElementById("eyesImg");
  const eyesPlaceholder = document.getElementById("eyesPlaceholder");
  const changeEyesBtn = document.getElementById("changeEyesBtn");
  const eyesReactBtn = document.getElementById("eyesReactBtn");

  const smileImg = document.getElementById("smileImg");
  const smilePlaceholder = document.getElementById("smilePlaceholder");
  const changeSmileBtn = document.getElementById("changeSmileBtn");
  const smileReactBtn = document.getElementById("smileReactBtn");

  const eyesPhotoInputs = document.querySelectorAll(".eyes-photo-input");
  const eyesComplimentChips = document.querySelectorAll(".eyes-compliment-chip");

  // React to Eyes
  eyesReactBtn?.addEventListener("click", () => {
    playAudioTone(880, "sine", 0.45, 0.16); // High celestial chime
    sparkleBurst();
    createTapSparklesAtElement(eyesReactBtn);
    showToast("Those eyes could outshine every star in the universe! ✨🌌");
  });

  // React to Smile
  smileReactBtn?.addEventListener("click", () => {
    playCelebrationChimes();
    flowerRain();
    createTapSparklesAtElement(smileReactBtn);
    showToast("That smile is pure magic! Always keep smiling, Alfiya 🌸💖");
  });

  // Compliment chips
  eyesComplimentChips.forEach(chip => {
    chip.addEventListener("click", () => {
      chip.classList.remove("is-popped");
      void chip.offsetWidth;
      chip.classList.add("is-popped");
      playAudioTone(659.25, "sine", 0.25, 0.12);
      createTapSparklesAtElement(chip);
      const msg = chip.dataset.msg;
      if(msg) showToast(msg);
    });
  });

  // Photo Upload & Preview Logic for Page 11
  function updateEyesPhoto(src, save = true){
    if(!eyesImg || !src) return;
    eyesImg.src = src;
    eyesImg.style.display = "block";
    if(eyesPlaceholder) eyesPlaceholder.style.display = "none";
    if(changeEyesBtn) changeEyesBtn.style.display = "block";
    if(save){
      try {
        localStorage.setItem("alfiya_photo_eyes", src);
      } catch(e) {}
    }
  }

  function updateSmilePhoto(src, save = true){
    if(!smileImg || !src) return;
    smileImg.src = src;
    smileImg.style.display = "block";
    if(smilePlaceholder) smilePlaceholder.style.display = "none";
    if(changeSmileBtn) changeSmileBtn.style.display = "block";
    if(save){
      try {
        localStorage.setItem("alfiya_photo_smile", src);
      } catch(e) {}
    }
  }

  changeEyesBtn?.addEventListener("click", (e) => {
    e.stopPropagation();
    const input = document.querySelector('.eyes-photo-input[data-target="eyes"]');
    input?.click();
  });

  changeSmileBtn?.addEventListener("click", (e) => {
    e.stopPropagation();
    const input = document.querySelector('.eyes-photo-input[data-target="smile"]');
    input?.click();
  });

  eyesPhotoInputs.forEach(input => {
    input.addEventListener("change", (e) => {
      const file = e.target.files?.[0];
      const target = input.dataset.target;
      if(!file) return;

      if(!file.type.startsWith("image/")){
        showToast("Please choose an image file 📸");
        return;
      }

      const reader = new FileReader();
      reader.onload = (event) => {
        const result = event.target?.result;
        if(result){
          if(target === "eyes"){
            updateEyesPhoto(result, true);
            showToast("Alfiya's eye photo updated beautifully! 👁️✨");
          } else {
            updateSmilePhoto(result, true);
            showToast("Alfiya's smile photo updated beautifully! 🌸😊");
          }
          sparkleBurst();
          playShutterSound();
        }
      };
      reader.readAsDataURL(file);
      e.target.value = "";
    });
  });

  function loadSavedEyesSmilePhotos(){
    const savedEyes = localStorage.getItem("alfiya_photo_eyes");
    if(savedEyes){
      updateEyesPhoto(savedEyes, false);
    } else {
      // Test if default asset file exists
      const testEyes = new Image();
      testEyes.onload = () => { updateEyesPhoto("assets/images/eyes.jpg", false); };
      testEyes.src = "assets/images/eyes.jpg";
    }

    const savedSmile = localStorage.getItem("alfiya_photo_smile");
    if(savedSmile){
      updateSmilePhoto(savedSmile, false);
    } else {
      const testSmile = new Image();
      testSmile.onload = () => { updateSmilePhoto("assets/images/smile.jpg", false); };
      testSmile.src = "assets/images/smile.jpg";
    }
  }


  /* =========================================================
     PAGE 10 — ALFIYA'S SOLO MOMENTS PHOTO LOGIC
  ========================================================= */

  function updateAlfiyaCardPhoto(cardNum, src, save = true){
    const img = document.getElementById(`alfiyaImg${cardNum}`);
    const placeholder = document.getElementById(`alfiyaPlaceholder${cardNum}`);
    const changeBtn = document.querySelector(`.alfiya-change-btn[data-card="${cardNum}"]`);
    if(!img || !src) return;
    img.src = src;
    img.style.display = "block";
    if(placeholder) placeholder.style.display = "none";
    if(changeBtn) changeBtn.style.display = "block";
    if(save){
      try {
        localStorage.setItem(`alfiya_photo_solo_${cardNum}`, src);
      } catch(e) {}
    }
  }

  document.querySelectorAll(".alfiya-photo-input").forEach(input => {
    input.addEventListener("change", (e) => {
      const file = e.target.files?.[0];
      const cardNum = input.dataset.card;
      if(!file || !cardNum) return;
      if(!file.type.startsWith("image/")){
        showToast("Please choose an image file 📸");
        return;
      }
      const reader = new FileReader();
      reader.onload = (event) => {
        const result = event.target?.result;
        if(result){
          updateAlfiyaCardPhoto(cardNum, result, true);
          sparkleBurst();
          playShutterSound();
          showToast(`Photo updated for Card #${cardNum}! 🌸✨`);
        }
      };
      reader.readAsDataURL(file);
      e.target.value = "";
    });
  });

  document.querySelectorAll(".alfiya-change-btn").forEach(btn => {
    btn.addEventListener("click", (e) => {
      e.stopPropagation();
      const cardNum = btn.dataset.card;
      const input = document.querySelector(`.alfiya-photo-input[data-card="${cardNum}"]`);
      input?.click();
    });
  });

  function loadSavedAlfiyaSoloPhotos(){
    [1, 2, 3, 4, 5, 6, 7, 8].forEach(cardNum => {
      const saved = localStorage.getItem(`alfiya_photo_solo_${cardNum}`);
      if(saved){
        updateAlfiyaCardPhoto(cardNum, saved, false);
      } else {
        const testImg = new Image();
        testImg.onload = () => { updateAlfiyaCardPhoto(cardNum, `assets/images/alfiya_${cardNum}.jpg`, false); };
        testImg.src = `assets/images/alfiya_${cardNum}.jpg`;
      }
    });
  }


  /* =========================================================
     PAGE 11 — OUR BEST COUPLE MOMENTS PHOTO LOGIC
  ========================================================= */

  function updateCoupleCardPhoto(cardNum, src, save = true){
    const img = document.getElementById(`coupleImg${cardNum}`);
    const placeholder = document.getElementById(`couplePlaceholder${cardNum}`);
    const changeBtn = document.querySelector(`.couple-change-btn[data-card="${cardNum}"]`);
    const card = document.querySelector(`.couple-card[data-card="${cardNum}"]`);
    if(!img || !src) return;
    img.src = src;
    img.style.display = "block";
    card?.classList.add("has-photo");
    if(placeholder) placeholder.style.display = "none";
    if(changeBtn) changeBtn.style.display = "block";
    if(save){
      try {
        localStorage.setItem(`alfiya_photo_couple_${cardNum}`, src);
      } catch(e) {}
    }
  }

  document.querySelectorAll(".couple-photo-input").forEach(input => {
    input.addEventListener("change", (e) => {
      const file = e.target.files?.[0];
      const cardNum = input.dataset.card;
      if(!file || !cardNum) return;
      if(!file.type.startsWith("image/")){
        showToast("Please choose an image file 📸");
        return;
      }
      const reader = new FileReader();
      reader.onload = (event) => {
        const result = event.target?.result;
        if(result){
          updateCoupleCardPhoto(cardNum, result, true);
          sparkleBurst();
          playShutterSound();
          showToast(`Couple photo #${cardNum} updated! 💑❤️`);
        }
      };
      reader.readAsDataURL(file);
      e.target.value = "";
    });
  });

  document.querySelectorAll(".couple-change-btn").forEach(btn => {
    btn.addEventListener("click", (e) => {
      e.stopPropagation();
      const cardNum = btn.dataset.card;
      const input = document.querySelector(`.couple-photo-input[data-card="${cardNum}"]`);
      input?.click();
    });
  });

  function loadSavedCouplePhotos(){
    [1, 2].forEach(cardNum => {
      const saved = localStorage.getItem(`alfiya_photo_couple_${cardNum}`);
      if(saved){
        updateCoupleCardPhoto(cardNum, saved, false);
      } else {
        updateCoupleCardPhoto(cardNum, `assets/images/couple_${cardNum}.jpg`, false);
      }
    });
  }

  /* =========================================================
     PAGE 12 — MUSIC PLAYER & VINYL TURNTABLE LOGIC
  ========================================================= */

  const musicAudioPlayer = document.getElementById("musicAudioPlayer");
  const musicPlayBtn = document.getElementById("musicPlayBtn");
  const musicPlayIcon = document.getElementById("musicPlayIcon");
  const turntableDeck = document.getElementById("turntableDeck");
  const musicPlayerCard = document.querySelector(".music-player-card");
  const musicProgressBar = document.getElementById("musicProgressBar");
  const musicProgressFill = document.getElementById("musicProgressFill");
  const musicCurrentTime = document.getElementById("musicCurrentTime");
  const musicDuration = document.getElementById("musicDuration");
  const musicPrevBtn = document.getElementById("musicPrevBtn");
  const musicNextBtn = document.getElementById("musicNextBtn");
  const musicLoopBtn = document.getElementById("musicLoopBtn");
  const musicMuteBtn = document.getElementById("musicMuteBtn");
  const musicVolumeSlider = document.getElementById("musicVolumeSlider");
  const musicFileInput = document.getElementById("musicFileInput");
  const musicSynthesizerBtn = document.getElementById("musicSynthesizerBtn");

  const musicTrackTitle = document.getElementById("musicTrackTitle");
  const musicTrackArtist = document.getElementById("musicTrackArtist");
  const musicTrackQuote = document.getElementById("musicTrackQuote");
  const musicTrackBadge = document.getElementById("musicTrackBadge");

  const playlistCards = document.querySelectorAll(".playlist-card");
  const page12Btn = document.getElementById("page12Btn");

  let isMusicPlaying = false;
  let isLooping = false;
  let currentTrackIndex = 0;
  let synthMelodyTimer = null;
  let synthNoteIndex = 0;
  let isSynthActive = false;

  // Romantic acoustic chime notes for offline / lullaby fallback
  const romanticMelodyNotes = [
    329.63, 415.30, 493.88, 659.25, 622.25, 554.37, 493.88, 415.30,
    440.00, 554.37, 659.25, 739.99, 659.25, 493.88, 440.00, 392.00,
    349.23, 440.00, 523.25, 659.25, 587.33, 523.25, 493.88, 392.00,
    440.00, 493.88, 523.25, 587.33, 659.25, 783.99, 659.25, 493.88
  ];

  function playSynthNote(){
    if(!isSynthActive) return;
    const freq = romanticMelodyNotes[synthNoteIndex % romanticMelodyNotes.length];
    synthNoteIndex++;
    playAudioTone(freq, "sine", 0.45, 0.12);

    if(synthNoteIndex % 4 === 0){
      playAudioTone(freq / 2, "triangle", 0.6, 0.08);
    }

    synthMelodyTimer = setTimeout(playSynthNote, 420);
  }

  function startSynthMelody(){
    isSynthActive = true;
    synthNoteIndex = 0;
    playSynthNote();
  }

  function stopSynthMelody(){
    isSynthActive = false;
    clearTimeout(synthMelodyTimer);
  }

  function formatTime(seconds){
    if(isNaN(seconds) || seconds < 0) return "0:00";
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
  }

  function updatePlayerUI(playing){
    isMusicPlaying = playing;
    if(playing){
      turntableDeck?.classList.add("is-playing");
      musicPlayerCard?.classList.add("is-playing");
      if(musicPlayIcon) musicPlayIcon.textContent = "⏸";
      if(musicTrackBadge) musicTrackBadge.textContent = "Playing Now 🎶";
    } else {
      turntableDeck?.classList.remove("is-playing");
      musicPlayerCard?.classList.remove("is-playing");
      if(musicPlayIcon) musicPlayIcon.textContent = "▶";
      if(musicTrackBadge) musicTrackBadge.textContent = "Paused ⏸";
    }
  }

  function playCurrentTrack(){
    const activeCard = playlistCards[currentTrackIndex];
    const isSynthMode = activeCard && activeCard.dataset.src === "synth";

    if(isSynthMode){
      if(musicAudioPlayer) musicAudioPlayer.pause();
      startSynthMelody();
      updatePlayerUI(true);
      showToast("Playing Alfiya's Dreamy Music Box ✨");
      return;
    }

    stopSynthMelody();

    if(musicAudioPlayer){
      if(musicVolumeSlider && !isNaN(parseFloat(musicVolumeSlider.value))){
        musicAudioPlayer.volume = parseFloat(musicVolumeSlider.value);
      } else {
        musicAudioPlayer.volume = 0.85;
      }

      const playPromise = musicAudioPlayer.play();
      if(playPromise !== undefined){
        playPromise.then(() => {
          updatePlayerUI(true);
        }).catch(err => {
          console.warn("Audio playback notice:", err);
          updatePlayerUI(false);
          showToast("Tap Play ▶ button to start the song! 🌸");
        });
      }
    }
  }

  function pauseCurrentTrack(){
    stopSynthMelody();
    if(musicAudioPlayer) musicAudioPlayer.pause();
    updatePlayerUI(false);
  }

  function togglePlayPause(){
    if(isMusicPlaying){
      pauseCurrentTrack();
    } else {
      sparkleBurst();
      playCurrentTrack();
    }
  }

  musicPlayBtn?.addEventListener("click", () => {
    createTapSparklesAtElement(musicPlayBtn);
    togglePlayPause();
  });

  // Track progress updating
  musicAudioPlayer?.addEventListener("timeupdate", () => {
    if(!musicAudioPlayer.duration) return;
    const current = musicAudioPlayer.currentTime;
    const duration = musicAudioPlayer.duration;
    const percent = (current / duration) * 100;

    if(musicProgressBar) musicProgressBar.value = percent;
    if(musicProgressFill) musicProgressFill.style.width = `${percent}%`;
    if(musicCurrentTime) musicCurrentTime.textContent = formatTime(current);
    if(musicDuration) musicDuration.textContent = formatTime(duration);
  });

  // Duration loaded
  musicAudioPlayer?.addEventListener("loadedmetadata", () => {
    if(musicDuration && musicAudioPlayer.duration){
      musicDuration.textContent = formatTime(musicAudioPlayer.duration);
    }
  });

  // Seeking on scrubber
  musicProgressBar?.addEventListener("input", (e) => {
    if(!musicAudioPlayer || !musicAudioPlayer.duration) return;
    const val = parseFloat(e.target.value);
    const seekTime = (val / 100) * musicAudioPlayer.duration;
    musicAudioPlayer.currentTime = seekTime;
    if(musicProgressFill) musicProgressFill.style.width = `${val}%`;
    if(musicCurrentTime) musicCurrentTime.textContent = formatTime(seekTime);
  });

  // Track finished
  musicAudioPlayer?.addEventListener("ended", () => {
    if(isLooping){
      musicAudioPlayer.currentTime = 0;
      musicAudioPlayer.play();
    } else {
      selectTrack((currentTrackIndex + 1) % playlistCards.length);
    }
  });

  // Volume slider
  musicVolumeSlider?.addEventListener("input", (e) => {
    if(musicAudioPlayer){
      musicAudioPlayer.volume = parseFloat(e.target.value);
      if(musicMuteBtn){
        musicMuteBtn.textContent = musicAudioPlayer.volume === 0 ? "🔇" : "🔊";
      }
    }
  });

  // Mute toggle
  musicMuteBtn?.addEventListener("click", () => {
    if(!musicAudioPlayer) return;
    if(musicAudioPlayer.volume > 0){
      musicAudioPlayer.dataset.lastVol = musicAudioPlayer.volume;
      musicAudioPlayer.volume = 0;
      if(musicVolumeSlider) musicVolumeSlider.value = 0;
      musicMuteBtn.textContent = "🔇";
      showToast("Muted 🔇");
    } else {
      const restored = parseFloat(musicAudioPlayer.dataset.lastVol || "0.85");
      musicAudioPlayer.volume = restored;
      if(musicVolumeSlider) musicVolumeSlider.value = restored;
      musicMuteBtn.textContent = "🔊";
      showToast("Unmuted 🔊");
    }
  });

  // Loop toggle
  musicLoopBtn?.addEventListener("click", () => {
    isLooping = !isLooping;
    musicLoopBtn.classList.toggle("is-active", isLooping);
    showToast(isLooping ? "Track Loop Enabled 🔁" : "Track Loop Disabled ➡️");
  });

  // Select Track function
  function selectTrack(index, autoPlay = true){
    if(index < 0 || index >= playlistCards.length) return;
    currentTrackIndex = index;

    playlistCards.forEach((card, idx) => {
      const isCurrent = idx === index;
      card.classList.toggle("is-active", isCurrent);
      const statusEl = card.querySelector(".playlist-card__status");
      if(statusEl){
        statusEl.textContent = isCurrent ? "Playing 🎧" : "Tap to Play";
      }
    });

    const activeCard = playlistCards[index];
    if(!activeCard) return;

    const title = activeCard.dataset.title;
    const artist = activeCard.dataset.artist;
    const quote = activeCard.dataset.quote;
    const src = activeCard.dataset.src;

    if(musicTrackTitle) musicTrackTitle.textContent = title;
    if(musicTrackArtist) musicTrackArtist.textContent = `${artist} • Dedicated to Alfiya 🌸`;
    if(musicTrackQuote) musicTrackQuote.textContent = `"${quote}"`;

    if(src === "synth"){
      pauseCurrentTrack();
      if(autoPlay){
        startSynthMelody();
        updatePlayerUI(true);
      }
    } else {
      stopSynthMelody();
      if(musicAudioPlayer){
        musicAudioPlayer.src = src;
        musicAudioPlayer.load();
        if(autoPlay){
          playCurrentTrack();
        }
      }
    }
  }

  // Playlist card clicks
  playlistCards.forEach((card, idx) => {
    card.addEventListener("click", () => {
      sparkleBurst();
      createTapSparklesAtElement(card);
      selectTrack(idx, true);
    });
  });

  // Previous & Next buttons
  musicPrevBtn?.addEventListener("click", () => {
    sparkleBurst();
    const prevIdx = (currentTrackIndex - 1 + playlistCards.length) % playlistCards.length;
    selectTrack(prevIdx, isMusicPlaying);
  });

  musicNextBtn?.addEventListener("click", () => {
    sparkleBurst();
    const nextIdx = (currentTrackIndex + 1) % playlistCards.length;
    selectTrack(nextIdx, isMusicPlaying);
  });

  // Custom MP3 Upload
  musicFileInput?.addEventListener("change", (e) => {
    const file = e.target.files?.[0];
    if(!file) return;

    const objUrl = URL.createObjectURL(file);
    const cleanName = file.name.replace(/\.[^/.]+$/, "");

    if(musicTrackTitle) musicTrackTitle.textContent = cleanName;
    if(musicTrackArtist) musicTrackArtist.textContent = "Your Selected Track • Dedicated to Alfiya 🌸";
    if(musicTrackQuote) musicTrackQuote.textContent = `"Har dhun jo hume pasand hai, har gaana jo dil ko chhu jaye..." ❤️`;

    stopSynthMelody();
    if(musicAudioPlayer){
      musicAudioPlayer.src = objUrl;
      musicAudioPlayer.load();
      musicAudioPlayer.play().then(() => {
        updatePlayerUI(true);
        sparkleBurst();
        flowerRain();
        showToast(`Playing your song: "${cleanName}" 🎵`);
      }).catch(err => {
        console.warn("Could not autoplay uploaded file:", err);
      });
    }
  });

  // Play Track 6 (Kaun Tujhe) shortcut button
  musicSynthesizerBtn?.addEventListener("click", () => {
    sparkleBurst();
    createTapSparklesAtElement(musicSynthesizerBtn);
    selectTrack(5, true); // Track 6 is Kaun Tujhe
    showToast("Playing: Kaun Tujhe • Palak Muchhal 💖");
  });

  // Next page buttons from Music Page (Page 12 -> Page 13)
  const musicQuickNextBtn = document.getElementById("musicQuickNextBtn");
  const musicHeaderNextBtn = document.getElementById("musicHeaderNextBtn");
  const musicFloatingNextBtn = document.getElementById("musicFloatingNextBtn");

  function goToNextPageFromMusic(){
    sparkleBurst();
    flowerRain();
    PageManager.goTo(13, page13Entrance);
  }

  page12Btn?.addEventListener("click", goToNextPageFromMusic);
  musicQuickNextBtn?.addEventListener("click", goToNextPageFromMusic);
  musicHeaderNextBtn?.addEventListener("click", goToNextPageFromMusic);
  musicFloatingNextBtn?.addEventListener("click", goToNextPageFromMusic);


  /* =========================================================
     PAGE 13 — THE HEARTFELT END PAGE (LETTER & CLOSING) LOGIC
  ========================================================= */

  const page13Btn = document.getElementById("page13Btn");
  const endHeartsBtn = document.getElementById("endHeartsBtn");
  const endPetalsBtn = document.getElementById("endPetalsBtn");
  const endWishBtn = document.getElementById("endWishBtn");
  const endReplayJourneyBtn = document.getElementById("endReplayJourneyBtn");

  const endEditLetterBtn = document.getElementById("endEditLetterBtn");
  const endResetLetterBtn = document.getElementById("endResetLetterBtn");
  const endLetterEditor = document.getElementById("endLetterEditor");
  const endEditorCloseBtn = document.getElementById("endEditorCloseBtn");
  const endCustomMessageInput = document.getElementById("endCustomMessageInput");
  const endSaveCustomMessageBtn = document.getElementById("endSaveCustomMessageBtn");
  const endCancelCustomMessageBtn = document.getElementById("endCancelCustomMessageBtn");
  const endLetterBody = document.getElementById("endLetterBody");

  // Default original letter content backup
  const defaultLetterContent = endLetterBody ? endLetterBody.innerHTML : "";

  function loadSavedEndLetter(){
    const savedMsg = localStorage.getItem("alfiya_custom_end_message");
    if(savedMsg && endLetterBody){
      endLetterBody.innerHTML = `
        <p class="end-letter__p" style="white-space: pre-line;">${savedMsg}</p>
        <div class="end-letter__quote-card">
          <span class="end-letter__quote-mark">“</span>
          <p class="end-letter__quote-text">Hamesha aise hi muskurati rehna, kyunki tumhari muskaan kisi ki poori duniya hai.</p>
          <span class="end-letter__quote-sub">Forever & Always ❤️✨</span>
        </div>
      `;
      if(endResetLetterBtn) endResetLetterBtn.style.display = "inline-flex";
    }
  }

  // Edit letter handler
  endEditLetterBtn?.addEventListener("click", () => {
    sparkleBurst();
    if(endLetterEditor){
      endLetterEditor.style.display = "flex";
      const currentText = localStorage.getItem("alfiya_custom_end_message") ||
        "Happy Birthday Again Shonu... Allah kare ki tumhe sab khushiya mile, sab sahi rahe, aur hum sath rahe aur humara sath humesha rahe... Aur hum dono me trust, love, care badhe, aur sabse zyada understanding badhe...\n\nMay your 19th year be full of gentle moments, endless laughter, big dreams coming true, and all the happiness this universe can offer.\n\nLast one is: Check your WhatsApp at 6 AM ⏰🤫💖";
      if(endCustomMessageInput) endCustomMessageInput.value = currentText;
    }
  });

  function closeLetterEditor(){
    if(endLetterEditor) endLetterEditor.style.display = "none";
  }

  endEditorCloseBtn?.addEventListener("click", closeLetterEditor);
  endCancelCustomMessageBtn?.addEventListener("click", closeLetterEditor);

  endSaveCustomMessageBtn?.addEventListener("click", () => {
    const text = endCustomMessageInput?.value?.trim();
    if(!text){
      showToast("Please enter a message or click cancel! 🌸");
      return;
    }
    localStorage.setItem("alfiya_custom_end_message", text);
    loadSavedEndLetter();
    closeLetterEditor();
    sparkleBurst();
    flowerRain();
    showToast("Aapka message save ho gaya hai! 💌✨");
  });

  endResetLetterBtn?.addEventListener("click", () => {
    localStorage.removeItem("alfiya_custom_end_message");
    if(endLetterBody) endLetterBody.innerHTML = defaultLetterContent;
    if(endResetLetterBtn) endResetLetterBtn.style.display = "none";
    sparkleBurst();
    showToast("Reset to default message 🌸");
  });

  // Reaction 1: 100 Hearts Shower
  endHeartsBtn?.addEventListener("click", () => {
    playHeartSound();
    for(let i = 0; i < 28; i++){
      setTimeout(() => {
        const heart = document.createElement("span");
        heart.className = "tap-sparkle";
        heart.textContent = Math.random() > 0.3 ? "💖" : "❤️";
        heart.style.position = "fixed";
        heart.style.left = `${Math.random() * 85 + 7}vw`;
        heart.style.top = `${Math.random() * 70 + 15}vh`;
        heart.style.fontSize = `${20 + Math.random() * 26}px`;
        heart.style.zIndex = "99999";
        heart.style.pointerEvents = "none";
        heart.style.setProperty("--dx", `${(Math.random() - 0.5) * 60}px`);
        heart.style.setProperty("--dy", `-${40 + Math.random() * 80}px`);
        heart.style.setProperty("--rot", `${(Math.random() - 0.5) * 45}deg`);
        document.body.appendChild(heart);
        setTimeout(() => heart.remove(), 900);
      }, i * 35);
    }
    showToast("A shower of 100 hearts for Alfiya! 💖✨");
  });

  // Reaction 2: Blossom Rain
  endPetalsBtn?.addEventListener("click", () => {
    flowerRain();
    sparkleBurst();
    showToast("Fresh cherry blossoms falling for you 🌸🌿");
  });

  // Reaction 3: 19th Birthday Blessing
  endWishBtn?.addEventListener("click", () => {
    playCelebrationChimes();
    sparkleBurst();
    flowerRain();
    showToast("May your 19th year be blessed with boundless love & joy! ✨🎂");
  });

  // Page 13 CTA Button -> Launches Finale Celebration Modal!
  page13Btn?.addEventListener("click", () => {
    sparkleBurst();
    flowerRain();
    playCelebrationChimes();

    if(finaleModal){
      finaleModal.classList.add("is-open");
      finaleModal.setAttribute(
        "aria-hidden",
        "false"
      );
    }
  });

  // Replay whole journey
  endReplayJourneyBtn?.addEventListener("click", () => {
    sparkleBurst();
    flowerRain();
    PageManager.goTo(1, null, true);
    showToast("Starting again from Chapter 1 🌸");
  });


  // Restore saved photos and sticky notes on startup
  loadSavedCustomPhotos();
  loadSavedStickyNotes();
  loadSavedEyesSmilePhotos();
  loadSavedAlfiyaSoloPhotos();
  loadSavedCouplePhotos();
  loadSavedEndLetter();


  /* =========================================================
     FINALE CELEBRATION MODAL CONTROLS
  ========================================================= */

  function closeFinale(){
    if(finaleModal){
      finaleModal.classList.remove("is-open");
      finaleModal.setAttribute(
        "aria-hidden",
        "true"
      );
    }
  }

  closeFinaleBtn?.addEventListener(
    "click",
    closeFinale
  );

  finaleBackdrop?.addEventListener(
    "click",
    closeFinale
  );

  replayBtn?.addEventListener(
    "click",
    () => {

      closeFinale();
      sparkleBurst();
      flowerRain();

      PageManager.goTo(
        1,
        null,
        true
      );

    }
  );


  /* =========================================================
     BACKGROUND PETALS
  ========================================================= */

  function createBackgroundPetals(){

    if(!petalsLayer) return;

    for(let i = 0; i < 12; i++){

      const petal =
        document.createElement("span");

      petal.className = "petal";

      petal.style.left =
        Math.random() * 100 + "%";

      petal.style.animationDelay =
        Math.random() * 8 + "s";

      petal.style.animationDuration =
        7 + Math.random() * 5 + "s";

      petalsLayer.appendChild(petal);
    }
  }


  /* =========================================================
     BACKGROUND SPARKLES
  ========================================================= */

  function createSparkles(){

    if(!sparklesLayer) return;

    for(let i = 0; i < 18; i++){

      const sparkle =
        document.createElement("span");

      sparkle.className =
        "sparkle";

      sparkle.style.left =
        Math.random() * 100 + "%";

      sparkle.style.top =
        Math.random() * 100 + "%";

      sparkle.style.animationDelay =
        Math.random() * 3 + "s";

      sparklesLayer.appendChild(
        sparkle
      );
    }
  }


  /* =========================================================
     CUTE TAP / CLICK SPARKLES MICRO-INTERACTION
  ========================================================= */

  function createTapSparkle(x, y){
    const symbols = ["✨", "🌸", "💖", "✦", "✧"];
    for(let i = 0; i < 4; i++){
      const sparkle = document.createElement("span");
      sparkle.className = "tap-sparkle";
      sparkle.textContent =
        symbols[Math.floor(Math.random() * symbols.length)];
      sparkle.style.left = `${x}px`;
      sparkle.style.top = `${y}px`;

      const angle = Math.random() * Math.PI * 2;
      const dist = 24 + Math.random() * 45;
      sparkle.style.setProperty("--dx", `${Math.cos(angle) * dist}px`);
      sparkle.style.setProperty("--dy", `${Math.sin(angle) * dist - 26}px`);
      sparkle.style.setProperty("--rot", `${(Math.random() - 0.5) * 50}deg`);

      document.body.appendChild(sparkle);

      setTimeout(() => {
        sparkle.remove();
      }, 820);
    }
  }

  function createTapSparklesAtElement(el){
    if(!el) return;
    const rect = el.getBoundingClientRect();
    createTapSparkle(rect.left + rect.width / 2, rect.top + rect.height / 2);
  }

  document.addEventListener("pointerdown", (event) => {
    if(event.clientY !== undefined && event.clientX !== undefined){
      createTapSparkle(event.clientX, event.clientY);
    }
  });


  /* =========================================================
     INITIALIZE
  ========================================================= */

  createBackgroundPetals();
  createSparkles();

});