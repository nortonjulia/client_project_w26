// Stepper function created and debugged with assistance from Claude (claude-sonnet-4-6).
//    Anthropic. (2025). Claude [Large language model]. https://claude.ai */

(function () {
    const stepper = document.getElementById('stepper');
    const btnPrev = document.getElementById('btn-prev');
    const btnNext = document.getElementById('btn-next');

    if (!stepper || !btnPrev || !btnNext) return;

    const steps = Array.from(stepper.querySelectorAll('.step-item'));
    let current = 0;

    function updateStepper() {
        steps.forEach(function (step, i) {
            step.classList.remove('active', 'completed');
            if (i === current) {
                step.classList.add('active');
                step.setAttribute('aria-current', 'step');
            } else {
                step.removeAttribute('aria-current');
                if (i < current) {
                    step.classList.add('completed');
                }
            }
        });

        btnPrev.disabled = current === 0;
        btnNext.disabled = current === steps.length - 1;

        if (current === steps.length - 1) {
            btnNext.textContent = 'Done ✓';
        } else {
            btnNext.innerHTML = 'Next &#8594;';
        }
    }

    function goTo(index) {
        if (index < 0 || index >= steps.length) return;
        current = index;
        updateStepper();
    }

    btnNext.addEventListener('click', function () {
        if (current < steps.length - 1) {
            goTo(current + 1);
        }
    });

    btnPrev.addEventListener('click', function () {
        if (current > 0) {
            goTo(current - 1);
        }
    });

    steps.forEach(function (step, i) {
        const heading = step.querySelector('h3');
        const number  = step.querySelector('.step-number');
        if (heading) {
            heading.addEventListener('click', function () { goTo(i); });
        }
        if (number) {
            number.addEventListener('click', function () { goTo(i); });
        }
    });

    updateStepper();
})();
