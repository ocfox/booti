document.addEventListener("DOMContentLoaded", function() {
  fetch('content.html')
    .then(response => response.text())
    .then(data => {
      document.getElementById('content').innerHTML = data;

      const paragraphs = document.querySelectorAll('#content p');
      let cumulativeDelay = 0; // Cumulative delay for each paragraph

      function skewedRandomDelay(min, max) {
        let rand = Math.random();
        return Math.floor(rand < 0.5 ? min + rand * (max - min) : max - rand * (max - min));
      }

      paragraphs.forEach(p => {
        if (p.innerHTML.trim() === "") {
          p.innerHTML = "&nbsp;"; // Add non-breaking space to empty paragraphs
        }

        let randomDelay = skewedRandomDelay(0, 180); // Random delay skewed towards extremes
        cumulativeDelay += randomDelay;


        setTimeout(() => {
          p.style.display = 'block';
          window.scrollTo(0, document.body.scrollHeight); // Scroll to the bottom of the page

          // Check if the paragraph is the "Welcome" message
          if (p.innerHTML.includes('3305b2b')) {
            // Hide all paragraphs above the "Welcome" message
            const prevParagraphs = Array.from(paragraphs).slice(0, Array.from(paragraphs).indexOf(p));
            prevParagraphs.forEach(prevP => prevP.style.display = 'none');
          }
        }, cumulativeDelay);

      });

      paragraphs.forEach(p => {
        p.innerHTML = p.innerHTML.replace(/OK/g, '<span class="green">OK</span>');
      });

      setTimeout(() => {
        const input = document.createElement('input');
        input.type = 'text';
        input.classList.add('dynamic-width');
        const placeholder = document.querySelector('#input-placeholder');
        placeholder.replaceWith(input);

        // Adjust input width dynamically based on content
        input.addEventListener('input', () => {
          input.style.width = ((input.value.length + 1) * 1) + 'ch';
        });

        input.focus();

        function typeText(element, text, delay) {
          let index = 0;
          function addCharacter() {
            if (index < text.length) {
              element.value += text[index];
              element.style.width = ((element.value.length + 1) * 1) + 'ch';
              index++;
              setTimeout(addCharacter, delay);
            }
          }
          addCharacter();
        }

        input.focus();
        typeText(input, 'hello', 200);

        document.addEventListener('click', () => {
          input.focus();
        });
      }, cumulativeDelay + 200);
    });
});
