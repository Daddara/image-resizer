document.addEventListener("DOMContentLoaded", function() {
    document.getElementById('imageInput').addEventListener('change', function() {
      if (this.files && this.files[0]) {
        const reader = new FileReader();
  
        reader.onload = function(event) {
          // Instantly display the thumbnail
          const thumbnail = document.createElement('img');
          thumbnail.src = event.target.result;
          thumbnail.className = 'thumbnail';
          document.getElementById('thumbnailContainer').innerHTML = '';
          document.getElementById('thumbnailContainer').appendChild(thumbnail);
  
          // Automatic resizing of images
          const img = new Image();
          img.onload = function() {
            resizeImage(img);
          };
          img.src = event.target.result;
        };
  
        reader.readAsDataURL(this.files[0]);
      }
    });
  });
  
  function resizeImage(img) {
    // Clear existing output
    document.getElementById('imageRow').innerHTML = '';
  
    ["25% minni", "50% minni", "75% minni"].forEach((label, index) => {
      const scale = 1 - (index + 1) * 0.25;
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      canvas.width = img.width * scale;
      canvas.height = img.height * scale;
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      const resizedImage = canvas.toDataURL("image/jpeg");
  
      const container = document.createElement('div');
      container.className = 'image-container';
  
      const percentage = document.createElement('h3');
      percentage.innerHTML = label;
      container.appendChild(percentage);
  
      const imageElement = document.createElement('img');
      imageElement.src = resizedImage;
      container.appendChild(imageElement);
  
      const downloadButton = document.createElement('a');
      downloadButton.href = resizedImage;
      downloadButton.download = `resized_image_${(scale * 100).toFixed(0)}.jpg`;
      downloadButton.className = 'download-button';
      downloadButton.innerHTML = "SÆKJA";
      container.appendChild(downloadButton);
      
      document.getElementById('imageRow').appendChild(container);
    });
  }
  