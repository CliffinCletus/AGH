(function() {
    // Load jQuery
    var jqueryScript = document.createElement('script');
    jqueryScript.src = "https://code.jquery.com/jquery-3.6.0.min.js";
    jqueryScript.integrity = "sha384-vtXRMe3mGCbOeY7l30aIg8H9p3GdeSe4IFlP6G8JMa7o7lXvnz3GFKzPxzJdPfGK";
    jqueryScript.crossOrigin = "anonymous";
    document.head.appendChild(jqueryScript);

    jqueryScript.onload = function() {
        var clearoutInitialized = false;
        var emailValid = false; // Track if the email is valid

        function initializeClearout() {
            if (clearoutInitialized) return;
            clearoutInitialized = true;

            var clearout = window.clearout = window.clearout || [],
            opts = {
                "app_token": "0ac6a795137d14feced62c106cd6cfa2:18a95beff2b67b2875ec4616b81156bb500ea15a53190da1052f3294a3ad0c47",
                "api_url": "https://api.clearout.io",
                "mode": "ajax",
                "timeout": 10,
                "submit_button_selector": ".button-element", // Adjust to match your button class
                "on_result": function(result) {
                    emailValid = result.status === "valid"; // Set email validity
                }
            };
            clearout.push(["initialize", opts]);

            // Load Clearout script dynamically
            var t = document, e = t.createElement("script"), a = t.getElementsByTagName("script")[0];
            e.type = "text/javascript";
            e.async = true;
            e.src = "https://clearout.io/wp-content/co-js-widget/clearout_js_widget.js";
            a.parentNode.insertBefore(e, a);
        }

        // Form submission handler
        var form = document.querySelector("form"); // Select the form element
        form.addEventListener('submit', function(event) {
            if (!emailValid) {
                event.preventDefault(); // Prevent form submission if email is invalid
                alert("Please enter a valid email address before submitting.");
            }
        });

        // Initialize Clearout once when overlay opens
        document.querySelector('#open-overlay-button').addEventListener('click', function() { initializeClearout(); });
        document.addEventListener('mouseleave', function(event) { if (event.clientY <= 0) initializeClearout(); });
        var overlayObserver = new MutationObserver(function(mutations) {
            mutations.forEach(function(mutation) {
                if (mutation.target.style.display !== "none") initializeClearout();
            });
        });
        overlayObserver.observe(document.querySelector('#overlay-element'), { attributes: true, attributeFilter: ['style'] });
    };
})();
