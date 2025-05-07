document.addEventListener("DOMContentLoaded", function () {
    for (let i = 1.; i <= 5; i++) {
        const question = document.getElementById("q" + i);
        const answer = document.getElementById("a" + i);

        if (answer) answer.style.display = "none";

        if (question && answer) {
            question.style.cursor = "pointer";
            question.addEventListener('click', function () {
                const isVisible = answer.style.display === "block";
                answer.style.display = isVisible ? "none" : "block";
            });
        }
    }
});