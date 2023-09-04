console.log("header");

(function () {

    //_____________________show navItems onclicking menuBar's icon______________________
    function showNavItems() {
        let menubar = document.querySelector('#menu-bar i');
        let navItems = document.getElementById('nav-items');
        let blur = document.querySelector('.blur');
        menubar.classList.remove('fa-bars');
        menubar.classList.add('fa-xmark');
        navItems.classList.add('custom-dropdown');
        blur.classList.add('opacity');
    }

    //__________________hide navItems onclicking menubar's icon _________________________
    function hideNavItems() {
        let menubar = document.querySelector('#menu-bar i');
        let navItems = document.getElementById('nav-items');
        let blur = document.querySelector('.blur');
        menubar.classList.remove('fa-xmark');
        menubar.classList.add('fa-bars');
        navItems.classList.remove('custom-dropdown');
        blur.classList.remove('opacity');
    }


    function navFeatures() {

        var menubar = document.querySelector('#menu-bar i');
        let display = false;
        menubar.onclick = () => {

            display = !display;       // toggles value of display
            if (display) {
                showNavItems();
            } else {
                hideNavItems();
            }
        }

        let navLinks = document.querySelector('#nav-items a');
        navLinks.onclick = () => {
            hideNavItems();
        }
    }

    //__________________________________________calling navFeatures()_____________________________________
    navFeatures();

})();