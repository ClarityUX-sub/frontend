figma.showUI(__html__, { width: 400, height: 300 });

// Handle messages from the React UI
figma.ui.onmessage = (msg) => {
  if (msg.type === "fetch-image") {
    figma.ui.postMessage({
      type: "image-url",
      url: "http://localhost:8000/analyze",
    });
  }
};