/**
 * Scrolls to an element and centers it in the viewport
 * @param {string} elementId - The ID of the element to scroll to
 * @param {Object} options - Additional options
 * @param {number} options.offset - Additional offset from center (in pixels)
 * @param {number} options.delay - Delay before scrolling (in ms)
 * @param {string} options.behavior - Scroll behavior ('auto', 'smooth')
 */
export const scrollToElementCentered = (elementId, options = {}) => {
  const {
    offset = 0,
    delay = 10,
    behavior = 'smooth'
  } = options;

  setTimeout(() => {
    const element = document.getElementById(elementId);
    if (!element) return;

    // Calculate the position to center the element in the viewport
    const elementRect = element.getBoundingClientRect();
    const elementHeight = elementRect.height;
    const viewportHeight = window.innerHeight;

    // If element is smaller than viewport, center it
    // Otherwise, just scroll to the top of the element
    const scrollPosition = window.scrollY + elementRect.top;
    const centeredPosition = elementHeight < viewportHeight
      ? scrollPosition - ((viewportHeight - elementHeight) / 2)
      : scrollPosition;

    // Apply additional offset
    const finalPosition = centeredPosition - offset;

    // Scroll to the calculated position
    window.scrollTo({
      top: finalPosition,
      behavior
    });
  }, delay);
};
