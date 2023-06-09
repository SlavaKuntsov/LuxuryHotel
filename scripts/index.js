// ==============	gsap scroll		==============

["DOMContentLoaded", "resize"].forEach(e => {
	window.addEventListener(e, function() {

		const wrapper = document.querySelector(".wrapper")
		const content = document.querySelector(".content")

		content.style.removeAttribute = "transform"
		// console.log("none")
		if (window.innerWidth > 550) {
			if(wrapper) {
				gsap.registerPlugin(ScrollSmoother)
			
				// console.log("gsap ok")
				
				ScrollSmoother.create({
					wrapper: '.wrapper',
					content: '.content',
					smooth: 2,
					ignoreMobileResize: true
				})
			}
		}
	})
})

// ==============	add animation	==============

document.addEventListener("DOMContentLoaded", function () {

	const animateItems = document.querySelectorAll(".animate")

	function scrollAnimation () {

		let scrollCenter = (window.innerHeight / 1.1)

		animateItems.forEach(item => {

			let itemHeight = item.offsetHeight

			let offsetItem = item.getBoundingClientRect().top

			if(scrollCenter < offsetItem + (itemHeight / 1.5)) {
				item.classList.remove("animate")
			}
			if(scrollCenter > offsetItem + (itemHeight / 3)) {
				item.classList.add("animate")
			}
		})
	}

	scrollAnimation()
	window.addEventListener("scroll", function () {
		scrollAnimation()
	})
})

// ==============	burger menu		==============

let bool = false;

const menuOpen = document.getElementById("open");
const menuClose = document.getElementById("close");
const menu = document.querySelector("#burger-menu");

window.onscroll = function () {};

menuOpen.addEventListener("click", function () {
    if (!bool) {
        menu.style.left = "0";
        bool = true;
    }
	// console.log("open")
    window.onscroll = function () {
        window.scrollTo(0, 0);
    };
});
menuClose.addEventListener("click", function () {
    if (bool) {
        menu.style.left = "100%";
        bool = false;
		// console.log("close")
    }

    window.onscroll = function () {};
});

// ==============	carts in "Room" page	==============

const allCarts = document.getElementById("all-carts");

if (allCarts) {
    let allCartsArray = [
        {
            title: "Single room",
            text: "One-person / 12m",
            person: "1",
            img: "../img/main/solo.jpg",
        },
        {
            title: "Standart room",
            text: "Two-person / 18m",
            person: "2",
            img: "../img/main/standart.jpg",
        },
        {
            title: "Classic room with 2 separate beds",
            text: "Two-person / 22m",
            person: "2",
            img: "../img/main/classic.jpg",
        },
        {
            title: "Superior room with bathroom",
            text: "Two-person / 21m",
            person: "2",
            img: "../img/main/bathroom.jpg",
        },
        {
            title: "Deluxe room",
            text: "Two-person / 26m",
            person: "2",
            img: "../img/main/delux.jpg",
        },
        {
            title: "Junior suite room",
            text: "Three-person / 27m",
            person: "3",
            img: "../img/main/polylux.jpg",
        },
        {
            title: "Luxury room",
            text: "Two-person / 26m",
            person: "2",
            img: "../img/main/luxury.jpg",
        },
        {
            title: "Family Room (two adjacent rooms)",
            text: "Five-person / 63m",
            person: "5",
            img: "../img/main/family.jpg",
        },
        {
            title: "Presidential suite with a separate entrance from the street",
            text: "Two-person / 29m",
            person: "2",
            img: "../img/main/resident.jpg",
        },
    ];

    const choose = document.getElementById("choose");
    const choose2 = document.getElementById("choose2");

    let roomChoose = false;
    let personChoose = false;
	
    choose.innerHTML = "<h5>Room not selected</h5>";
    choose2.innerHTML = "<h5>Room not selected</h5>";
	choose.style.margin = "2px 0 0 0";
	choose2.style.margin = "2px 0 0 0";

    function isClick(title, person) {
        // console.log(title + " " + person);
        roomChoose = title;
        personChoose = person;

        choose.innerHTML = `<h5>You have chosen:</h5> <h4>${roomChoose}</h4> `;
        choose2.innerHTML = `<h5>You have chosen:</h5> <h4>${roomChoose}</h4> `;
		choose.style.margin = "0px 0 0 0";
		choose2.style.margin = "0px 0 0 0";
    }

    allCarts.innerHTML = allCartsArray
        .map(
            (item) =>
                `
			<div class="cart" onClick="isClick(\'${item.title}'\, \'${item.person}'\)">
				<div class="cart-img">
					<img src=${item.img} alt="img">
				</div>
				<h5>${item.title}</h5>
				<p>${item.text}<sup>2</sup></p>
			</div>
		`
        )
        .join("");

    const inDate = document.getElementById("in");
    const outDate = document.getElementById("out");

    const radio = document.querySelector('input[name="radio"]:checked');
    let r;

    const rates = document.querySelector('input[name="radio"]');
    let rate_value;
    for (let i = 0; i < rates.length; i++) {
        if (rates[i].checked) {
            rate_value = rates[i].value;
            // console.log("rate_value: ", rate_value);
        }
    }

			// ======== reserve form =================

	const reserv = document.getElementById("reserv")
	const form = document.getElementById("form")
	const formContainer = document.querySelector("form")
	const formClose = document.getElementById("formClose")

	const inDateOutput = document.getElementById("in-output")
	const outDateOutput = document.getElementById("out-output")
	const roomDateOutput = document.getElementById("room-output")
	const personDateOutput = document.getElementById("person-output")

	const body = document.querySelector("body")

	body.style.overflowX = "hidden";
	body.style.overflowY = "auto";

	
    reserv.addEventListener("click", function () {
        // console.log(1);

		function remove() {
			reserv.classList.remove("incorrect")
		}

        if (
            roomChoose !== false &&
            personChoose !== false && 
			inDate.value !== "" &&
            outDate.value !== ""
        ) {
			// console.log(2)
			form.style.visibility = "visible";
			form.style.opacity = "1";
			body.style.overflow = "hidden";

			window.scrollTo(0, 0);
			window.onscroll = function () {
				window.scrollTo(0, 0);
			};

			inDateOutput.innerHTML = `Date-in: <span>${inDate.value}</span> `;
			outDateOutput.innerHTML = `Date-out: <span>${outDate.value}</span>`;
			roomDateOutput.innerHTML = `You have chosen: <span>${roomChoose}</span>`;
			personDateOutput.innerHTML = `For: <span>${personChoose}</span> person(s), with <span>${radio.value}</span>`;
		} 
		else {
			reserv.classList.add("incorrect")
			setTimeout(remove, 400)
        }
    });

	formClose.addEventListener("click", function() {
		form.style.visibility = "hidden";
		form.style.opacity = "0";
		body.style.overflow = "auto";
		window.onscroll = function () {};
	})

	form.addEventListener("submit", function() {
		form.style.visibility = "hidden";
		form.style.opacity = "0";
		window.onscroll = function () {};

		function formCloseAlert() {
			alert(1)
		}

		setTimeout(formCloseAlert, 800)
	})

	if (document.documentElement.clientHeight < 576) {
		formContainer.style.margin = "200px 0 0 0"
	}
}

// ========================================

const viewMap = document.getElementById("map");

if (viewMap) {
    viewMap.addEventListener("click", function () {
        alert("Sorry, the map is temporarily not working");
    });
}

// ==============	comments slider	==============

const track = document.getElementById("track");

if (track) {
    const leftBtn = document.getElementById("left");
    const rightBtn = document.getElementById("right");

    let position = 0;
    let itemWidth;

	["DOMContentLoaded", "resize"].forEach(e => {
		window.addEventListener(e, function() {
			if (window.innerWidth > 550) {
				itemWidth = 500;
			}
			if (window.innerWidth < 550 && window.innerWidth > 450) {
				itemWidth = 350;
			}
			if (window.innerWidth < 450) {
				itemWidth = 300;
			}
			
			// console.log(itemWidth)
		})
	})
	
    leftBtn.addEventListener("click", () => {
        position += itemWidth;
        setPosition();
    });

    rightBtn.addEventListener("click", () => {
        position -= itemWidth;
        setPosition();
    });

    setPosition = () => {
        track.style.transform = `translate(${position}px)`;
        track.style.transition = `transform .4s ease-in-out`;
        checkButtons();
    };

    checkButtons = () => {
        if (position === 0) {
            leftBtn.setAttribute("disabled", true);
            leftBtn.style.opacity = 0.7;
        } else {
            leftBtn.removeAttribute("disabled");
            leftBtn.style.opacity = 1;
        }
        if (position === -((3 - 1) * itemWidth)) {
            rightBtn.setAttribute("disabled", true);
            rightBtn.style.opacity = 0.7;
        } else {
            rightBtn.removeAttribute("disabled");
            rightBtn.style.opacity = 1;
        }
    };
    checkButtons();
}

// ==============	facilities in "Facilities" page	==============

const allFacilities = document.getElementById("facilities");

let allFacilitiesArray = [
    {
        title: "Restaurants",
        img: "../img/main/restaurant.png",
        time: "7.00 - 11.00",
        text: "The restaurant of the hotel provides visitors with the opportunity to enjoy different cuisines of the world. In addition, every day a wide range of original dishes are available.",
    },
    {
        title: "Poolside Bar",
        img: "../img/main/bar.png",
        time: "21.00 - 24.00",
        text: "The pool bar is the best solution to fully enjoy your vacation and not experience inconvenience due to high temperatures. Bartenders are at your service, who will offer you original cocktails.",
    },
    {
        title: "Swimming Pool",
        img: "../img/main/pool.png",
        time: "12.00 - 17.00",
        text: "The pool is a great option for those who do not like strong waves and endless sand. We offer you to swim in crystal clear water and sunbathe in the sun near the water.",
    },
    {
        title: "The Gym",
        img: "../img/main/gym.png",
        time: "12.00 - 17.00",
        text: "If you don't want to lose your shape during your vacation, we suggest you visit the gym. A gorgeous view of the sea adds strength and lifts the mood during training. There is always an opportunity to play team sports on the open-air sports ground.",
    },
    {
        title: "Spa",
        img: "../img/main/spa.png",
        time: "12.00 - 19.00",
        text: "There is peace and tranquility in this place, no one will distract you here, and the staff with higher medical education will do everything possible so that during the massage and other procedures you forget about all the problems.",
    },
    {
        title: "Laundry",
        img: "../img/main/laundry.png",
        time: "9.00 - 19.00",
        text: "In order not to worry about any household worries during your vacation, our hotel has a laundry room. You can be sure of maintaining the quality of your things, the maids will make sure that the clothes are in perfect condition.",
    },
];

if(allFacilities) {

	allFacilities.innerHTML = allFacilitiesArray.map((item) =>
		`
		<div class="cartF">
			<div class="front">
				<img src="${item.img}" alt="">
				<div class="cart-text">
					<p>${item.title}</p>
				</div>
				<span>${item.title}</span>
			</div>
			<div class="back">
				<span></span>
				<div class="time">
					<h3>Work time:</h3>
					<h4>${item.time}</h4>
				</div>
				<p>${item.text}</p>
			</div>
		</div>
		`
		).join("");
}


// ==============	card flip in "Facilities" page	==============

const cartF = document.querySelectorAll(".cartF");

const front = document.querySelectorAll(".front");
const back = document.querySelectorAll(".back");

if (cartF) {
    cartF.forEach((cart, index) => {
        let bool = false;

        cart.addEventListener("click", function () {
            bool = !bool;

            front.forEach((fItem, fIndex) => {
                if (index == fIndex) {
                    if (bool) {
                        fItem.style.transform =
                            "perspective(900px) rotateY(-180deg)";
                        fItem.style.zIndex = -10;
                    } else {
                        fItem.style.transform =
                            "perspective(900px) rotateY(0deg)";
                        fItem.style.zIndex = 10;
                    }
                }
            });
            back.forEach((bItem, bIndex) => {
                if (index == bIndex) {
                    if (bool) {
                        bItem.style.transform =
                            "perspective(900px) rotateY(0deg)";
                        bItem.style.zIndex = 10;
                    } else {
                        bItem.style.transform =
                            "perspective(900px) rotateY(180deg)";
                        bItem.style.zIndex = -10;
                    }
                }
            });
        });
    });
}