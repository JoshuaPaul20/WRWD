document.addEventListener('DOMContentLoaded', () => {
  const envelopeWrapper = document.getElementById('envelope-wrapper');
  const openBtn = document.getElementById('open-btn');
  const envelopeStage = document.getElementById('envelope-stage');
  const cardStage = document.getElementById('card-stage');
  const replayBtn = document.getElementById('replay-btn');

  let isAnimating = false;

  // Function to execute the opening flow sequence
  function openEnvelope() {
    if (isAnimating) return;
    isAnimating = true;

    // Step 1: Open the envelope flap
    envelopeWrapper.classList.add('open');

    // Step 2: Fade out envelope and transition to the card stage
    setTimeout(() => {
      envelopeStage.classList.add('fade-out');

      setTimeout(() => {
        // Hide envelope stage completely and show glassmorphic card stage
        envelopeStage.classList.add('hidden');
        cardStage.classList.remove('hidden');
        
        // Force reflow for CSS transition to trigger correctly
        void cardStage.offsetWidth;
        
        cardStage.classList.add('show');
        isAnimating = false;
      }, 800); // Wait for envelope fade-out transition to complete

    }, 1300); // Keep envelope visible in open state briefly
  }

  // Function to reset the application state
  function resetEnvelope() {
    if (isAnimating) return;
    isAnimating = true;

    // Step 1: Fade out the card stage
    cardStage.classList.remove('show');

    setTimeout(() => {
      // Hide card stage and restore envelope stage structure
      cardStage.classList.add('hidden');
      envelopeStage.classList.remove('hidden');
      
      // Force reflow
      void envelopeStage.offsetWidth;

      // Step 2: Fade envelope back in and close flap
      envelopeStage.classList.remove('fade-out');
      envelopeWrapper.classList.remove('open');

      setTimeout(() => {
        isAnimating = false;
      }, 800); // Wait for reset transitions to settle

    }, 500); // Wait for card fade-out transition to complete
  }

  // Event Listeners
  envelopeWrapper.addEventListener('click', openEnvelope);
  openBtn.addEventListener('click', (e) => {
    e.stopPropagation(); // Avoid triggering openEnvelope twice via wrapper click
    openEnvelope();
  });
  replayBtn.addEventListener('click', resetEnvelope);
});
